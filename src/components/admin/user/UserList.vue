<template>
    <tr v-for="(user, index) in users" :key="user._id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td v-if="user.role === '1'">Admin</td>
        <td v-if="user.role === '2'">Thường</td>
        <td>{{ formatDate(user.createAt) }}</td>
        <td>{{ formatDate(user.updateAt) }}</td>
        <td>
            <router-link :to="{ name: 'user.edit', params: { id: user._id } }">
                <button class="btn btn-primary mr-2">
                    <i class="fas fa-edit"></i> Sửa</button>
            </router-link>
            <button @click="deleteUser(user)" class="btn  btn-danger"><i class="fas fa-trash"></i> Xóa</button>
        </td>
    </tr>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        users: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data() {
        return {
        }
    },
    emits: ["update:activeIndex"],
    methods: {
        formatDate(value) {
            value = moment(value).format('DD-MM-YYYY HH:mm:ss');
            return value;
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        deleteUser(user) {
            this.$emit("delete:user", user._id);
        },
    },
};
</script>