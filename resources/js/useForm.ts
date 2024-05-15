import { reactive, watch } from "vue";
import useSession from "./useSession";

interface Config {
    method: string;
}

interface Callback {
    onFinish?: Function;
    onError?: Function;
    onSuccess?: Function;
}

function useForm(params: object) {
    const form = reactive({
        data: { ...params },
        prevData: { ...params },
        originalData: { ...params },
        processing: false,
        state: "idle",
        errors: {},
        timeout: null,
        isDirty: false,
        setErrors(errors: object) {
            this.errors = errors;
        },
        reset() {
            this.data = { ...this.originalData };
            this.errors = {};

            // iterate over the data and if file, clear the input field
            for (let key in this.data) {
                if (
                    this.data[key]?.type === "file" &&
                    this.data[key].input_id
                ) {
                    let input_field = document.getElementById(
                        this.data[key].input_id
                    ) as HTMLInputElement;
                    input_field.value = "";
                }
            }
        },
        fetch(url: string, callback: Callback, config: Config) {
            if (this.processing) {
                return; // prevent multiple requests
            }
            this.processing = true;

            let session = useSession();

            let _token = session.getToken();

            // alert missing csrf token
            // if (!_token) {
            //     alert("Página expirada, recargando...");
            //     window.location.reload();
            // }

            const form = new FormData();
            let sendingFiles = false;

            // iterate over the data
            for (let key in this.data) {
                // append each data to the form
                if (
                    this.data[key]?.type === "file" &&
                    this.data[key].input_id
                ) {
                    let input_field = document.getElementById(
                        this.data[key].input_id
                    ) as HTMLInputElement;

                    // if the input field is empty or has no files, skip it
                    if (!input_field.files || !input_field.files[0]) {
                        continue;
                    }
                    form.append(key, input_field.files[0]);
                    sendingFiles = true;
                } else {
                    if (this.data[key] !== null) {
                        let val = this.data[key];

                        // if val is an object or array, convert it to JSON
                        if (typeof val === "object" || Array.isArray(val)) {
                            val = JSON.stringify(val);
                        }

                        form.append(key, val);
                    }
                }
            }

            let body: FormData | undefined = form;
            if (config.method === "GET" || config.method === "HEAD") {
                body = new FormData();
            }

            // add method to the form data as well
            form.append("_method", config.method);

            if (
                config.method === "PUT" ||
                config.method === "PATCH" ||
                config.method === "DELETE"
            ) {
                config.method = "POST";
            }

            const headers = new Headers({
                Authorization: `Bearer ${_token}`,
                Accept: "application/json",
            });

            fetch(url, {
                method: config.method,
                headers,
                body,
            })
                .then(async (response) => {
                    this.processing = false;

                    let data = await response.json();

                    if (!response.ok) {
                        this.updateStateWithDelay("error");
                        this.unpackErrors(data.errors);
                        if (callback.onError) callback.onError(data);
                    } else {
                        this.updateData();
                        this.updateStateWithDelay("success");
                        if (callback.onSuccess) callback.onSuccess(data);
                    }

                    if (callback.onFinish) callback.onFinish(data);
                })
                .catch((error) => {
                    this.processing = false;
                    this.updateStateWithDelay("error");
                    if (callback.onError) callback.onError(error);
                    console.error("Error:", error);
                });
        },
        put(url: string, callback: any) {
            this.fetch(url, callback, { method: "PUT" });
        },
        post(url: string, callback: any) {
            this.fetch(url, callback, { method: "POST" });
        },
        delete(url: string, callback: any) {
            this.fetch(url, callback, { method: "DELETE" });
        },
        get(url: string, callback: any) {
            this.fetch(url, callback, { method: "GET" });
        },
        updateStateWithDelay(state: string) {
            this.state = state;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.state = "idle";
            }, 3000);
        },
        unpackErrors(errors: object) {
            let unpackedErrors: any = {};
            for (let key in errors) {
                unpackedErrors[key] = errors[key][0];
            }
            this.errors = unpackedErrors;
        },
        updateDirtyState() {
            this.isDirty =
                JSON.stringify(this.data) !== JSON.stringify(this.prevData);
        },
        updateData() {
            this.prevData = { ...this.data };
            this.refresh();
        },
        refresh() {
            this.data = { ...this.prevData };
            this.errors = {};
            this.isDirty = false;
        },
    });

    watch(
        () => form.data,
        (newVal, oldVal) => {
            form.updateDirtyState();
        },
        { deep: true } // watch nested properties
    );

    return form;
}

export default useForm;
