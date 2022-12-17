<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý tài khoản</h6>
        </div>
        <div class="card-body">
            <UserForm :selected="selected"  :user="user" @submit:user="addUser" @delete:user="deleteUser" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import UserForm from "@/components/admin/user/UserForm.vue";
import UserService from "@/services/user.service";
export default {
    components: { UserForm },
    props: { id: { type: String, required: true } },
    data() {
        return {
            user: {
                name: "",
                email: "",
                address:"",
                phone:"",
                password:"",
            },
            message: "",
            selected: ""
        };
    },
    methods: {
        async addUser(data) {
            data.user.role=data.selected;
            try {
                await UserService.create(data.user);
                this.message = "Tài khoản được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        // this.getUser(this.id);
        this.message = "";
    },
    mounted(){
    }
};
</script>