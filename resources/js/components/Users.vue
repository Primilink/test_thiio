<template>
    <!-- <p v-if="usersForm.processing">Loading users...</p> -->
    <div class="tw-max-w-7xl tw-mx-auto tw-py-6 sm:tw-px-6 lg:tw-px-8">
        <v-card v-if="user">
            <v-card-title> User Details </v-card-title>
            <v-card-text>
                <h3
                    class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-2"
                >
                    {{ user.name }}
                </h3>
                <p class="tw-text-sm tw-text-gray-500 tw-mb-2">
                    {{ user.email }}
                </p>

                <v-divider></v-divider>

                <!-- Created at -->
                <div class="tw-flex tw-items-center tw-mt-4">
                    <span class="tw-ml-2"
                        >Created at:
                        {{ new Date(user.created_at).toLocaleString() }}</span
                    >
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useForm from "../useForm";
import { useRouter } from "vue-router";

const usersForm = useForm({});

const user = ref({});
const confirmed = ref(false);

onMounted(() => {
    const router = useRouter();

    // get id from the route /users/:id
    const id = router.currentRoute.value.params.id;

    usersForm.get("/api/users/" + id, {
        onSuccess: (response) => {
            user.value = response.data;
        },
    });
});
</script>
