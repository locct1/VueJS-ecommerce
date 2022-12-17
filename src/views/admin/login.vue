<template>
    <div class="container col-4 container-form">
        <div class="row justify-content-center ">
            <div class="col-lg-6" >
                <div class="card">
                    <div class="card-header text-center font-weight-bold">
                        Đăng nhập vào trang quản trị
                    </div>
                    <div class="card-body">
                        <p style="color:red">{{ this.message }}</p>
                        <form @submit.prevent="submitLogin">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input v-model="userLogin.email" type="email" class="form-control" placeholder="Nhập email">
                            </div>
                            <!-- <span class="mr-2 d-none d-lg-inline text-gray-600 small" v-if="infoAdmin.name">{{ infoAdmin.name}}</span> -->
                            <div class="form-group">
                                <label for="exampleInputPassword1">Mật khẩu</label>
                                <input v-model="userLogin.password" type="password" class="form-control" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Đăng nhập</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>

        
    </div>
</template>
<script>
import UserService from "@/services/user.service";
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            userLogin: {
                email: "",
                password: "",
            },
            message: "",
        };
    },
    computed: {
        ...mapState(['infoAdmin']),
    },
    methods: {
        async submitLogin() {
            try {
                let result = await UserService.login(this.userLogin);
                if(result && result.errCode===1){
                    this.message=result.message;
                }
                if (result && result.errCode === 2) {
                    this.message = result.message;
                }
                if (result && result.errCode === 0){
                    await this.$store.dispatch('setAuth', true);
                    await this.$router.push({ name: "brandlist" });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.container-form {
    margin-top: 130px;
}
</style>