<template>
    <div v-if="user" class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Sửa tài khoản</h6>
        </div>
        <div class="card-body">
            <UserForm :selected="selected"  :user="user" @submit:user="updateUser"
                @delete:user="deleteUser" />
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
        return { user: null, message: "",  selected: '' };

    },
    methods: {
        async getUser(id) {
            try {
                this.user = await UserService.get(id);
                this.selected = this.user.role;
            } catch (error) {
                console.log(error); // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateUser(data) {
            try {
                data.user.role=data.selected;
                await UserService.update(this.user._id, data.user);
                if (this.$store.state.infoAdmin._id === this.user._id){
                    let result = await UserService.getInfoAdmin();
                  
                    this.$store.dispatch('setInfoAdmin',result.data);
                }
                this.message = "Tài khoản được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getUser(this.id);

        this.message = "";
    },
    mounted() {



    }
};
</script>