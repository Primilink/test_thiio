<template>
    <!-- <p v-if="usersForm.processing">Loading users...</p> -->
    <div class="tw-max-w-7xl tw-mx-auto tw-py-6 sm:tw-px-6 lg:tw-px-8">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td
                        class="tw-flex tw-flex-row tw-justify-start tw-align-middle tw-items-center tw-gap-2"
                    >
                        <v-btn color="#376bc4" :to="'/users/' + user.id">
                            View Details
                        </v-btn>

                        <v-dialog max-width="500">
                            <template
                                v-slot:activator="{ props: activatorProps }"
                            >
                                <v-btn
                                    v-bind="activatorProps"
                                    color="surface-variant"
                                    text="Edit"
                                    variant="flat"
                                ></v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Edit user">
                                    <v-card-text>
                                        <v-text-field
                                            v-model="user.name"
                                            label="Name"
                                            :rules="nameRules"
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="user.email"
                                            label="Email"
                                            :rules="emailRules"
                                        ></v-text-field>

                                        <v-alert
                                            v-if="confirmed"
                                            type="success"
                                            title="User updated"
                                            closable
                                        ></v-alert>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            text="Close Dialog"
                                            @click="
                                                isActive.value = false;
                                                confirmed = false;
                                            "
                                        ></v-btn>
                                        <v-btn
                                            text="Save Changes"
                                            color="primary"
                                            @click="editUser(user)"
                                            :disabled="
                                                updateUserForm.processing
                                            "
                                        />
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-btn color="#c43747" @click="deleteUser(user.id)">
                            Delete
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useForm from "../useForm";

const usersForm = useForm({});
const updateUserForm = useForm({});
const delForm = useForm({});

const nameRules = [
    (value) => {
        if (value) return true;

        return "Name is requred.";
    },
];

const emailRules = [
    (value) => {
        if (value) return true;

        return "E-mail is requred.";
    },
    (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return "E-mail must be valid.";
    },
];

const users = ref([]);
const confirmed = ref(false);

onMounted(() => {
    usersForm.get("/api/users", {
        onSuccess: (response) => {
            users.value = response.data.data;
        },
    });
});

const deleteUser = (id) => {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }
    delForm.delete(`/api/users/${id}`, {
        onSuccess: () => {
            users.value = users.value.filter((user) => user.id !== id);
        },
    });
};

const editUser = (user) => {
    updateUserForm.setValues(user);
    updateUserForm.put(`/api/users/${user.id}`, {
        onSuccess: () => {
            confirmed.value = true;
            usersForm.get("/api/users", {
                onSuccess: (response) => {
                    users.value = response.data.data;
                },
            });
        },
    });
};
</script>
