<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">

        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Cập Nhật Thông Tin</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Cập nhật thông tin</span>
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
                    <ClientForm :user="user" @submit:user="updateUser" @delete:user="deleteUser" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import ClientForm from "@/components/client/ClientForm.vue";
import { mapGetters, mapState, mapActions } from 'vuex';

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
    computed: {
        ...mapState(['authenticatedClient', 'infoClient']),

    },
    methods: {
        async updateUser(data) {
            console.log(data.user._id);
            try {
                await ClientService.updateUser(data.user._id, data.user);
                let result = await ClientService.getInfoClient();
                this.$store.dispatch('setInfoClient', result.data);
                window.scrollTo(0, 0);
                this.message = "Tài khoản được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.user = this.infoClient;
        this.message = "";
    },
    mounted() {
    }
}
</script>

<style>

</style>
