<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">

        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Đăng Nhập</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Đăng nhập</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="featured spad" style="padding-top:10px">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <p style="color:red">{{this.message}}</p>
                    <form @submit.prevent="submitLogin">
                        <div class="form-group">
                            <label for="exampleInputEmail1" class="font-weight-bold">Email</label>
                            <input v-model="userLogin.email" type="email" class="form-control" placeholder="Nhập email">
                        </div>
                        <!-- <span class="mr-2 d-none d-lg-inline text-gray-600 small" v-if="infoAdmin.name">{{ infoAdmin.name}}</span> -->
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="font-weight-bold">Mật khẩu</label>
                            <input v-model="userLogin.password" type="password" class="form-control" placeholder="Nhập mật khẩu">
                        </div>
                        <button type="submit" class="btn btn-primary">Đăng nhập</button>
                        <p>Bạn chưa có tài khoản đăng nhập? <router-link :to="{name: 'client.register'}" class="btn btn-primary" >Đăng ký tại đây</router-link></p>
                    </form>
                </div>
            </div>
           
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import { mapActions } from 'vuex';

export default {
  data() {
    return {
        userLogin: {
            email: "",
            password: "",
        },
        message: "",
    }
  },
  methods: {
      async submitLogin() {
          try {
              let result = await ClientService.login(this.userLogin);
              if (result && result.errCode === 1) {
                  this.message = result.message;
              }
              if (result && result.errCode === 2) {
                  this.message = result.message;
              }
              if (result && result.errCode === 0) {
                  let res = await ClientService.getInfoClient();
                  if (res && res.data.errCode === 1) {
                      await this.$store.dispatch('setAuthClient', false);
                      await this.$router.push("/home");
                  }
                  if (res && res.data.errCode === 0) {
                      let user = res.data;
                      window.scrollTo(0, 0);
                      await this.$store.dispatch('setInfoClient', user);
                      await this.$store.dispatch('setAuthClient', true);
                      await this.$router.push("/");

                  }
                //   await this.$store.dispatch('setAuth', true);
                //   await this.$router.push({ name: "brandlist" });
              }
          } catch (error) {
              console.log(error);
          }
      }
    
  },
  created() {
  
  }
}
</script>

<style>

</style>
