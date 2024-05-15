<template>
    <p v-if="usersForm.processing">Loading users...</p>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Role</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useForm from "../useForm";

const usersForm = useForm({});

const users = ref([]);

onMounted(() => {
    usersForm.get("/api/users", {
        onSuccess: (response) => {
            console.log(response.data.data);
            users.value = response.data.data;
        },
    });
});
</script>
