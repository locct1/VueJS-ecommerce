<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">

        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Đăng Ký</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Đăng ký</span>
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
                    <p style="color:red">{{ this.message }}</p>
                    <ClientForm :user="user" @submit:user="addUser" @delete:user="deleteUser" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import ClientForm from "@/components/client/ClientForm.vue";
import { mapActions } from 'vuex';

export default {
    components: { ClientForm },
    props: { id: { type: String, required: true } },
    data() {
        return {
            user: {
                name: "",
                email: "",
                address: "",
                phone: "",
                password: "",
            },
            message: "",
        };
    },
    methods: {
        async addUser(data) {
            try {
                console.log('check user', data.user);
                let response = await ClientService.createUser(data.user);
                if (response && response.errCode == 1) {
                    this.message = response.message;
                }
                else if (response && response.errCode == 0) {
                    this.message = response.message;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        // this.getUser(this.id);
        this.message = "";
    },
    mounted() {
    }
}
</script>

<style>

</style>
