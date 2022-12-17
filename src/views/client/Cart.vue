<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Giỏ hàng</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="container mt-3">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th class="bg bg-dark text-light">STT</th>
                        <th class="bg bg-dark text-light">Tên sản phẩm</th>
                        <th class="bg bg-dark text-light">Hình ảnh</th>
                        <th class="bg bg-dark text-light">Giá</th>
                        <th class="bg bg-dark text-light">Số lượng</th>
                        <th class="bg bg-dark text-light">Thành tiền</th>
                        <th class="bg bg-dark text-light">Quản lý</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cart" :key="item.product.code">
                        <ProductCart :index="index" :item="item" />
                    </tr>
                    <tr>
                        <td colspan="7" class="font-weight-bold">Tổng: {{ String(cartTotalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup style="text-decoration:underline">đ</sup></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section class="container mt-3">
        <router-link :to="{ name: 'home' }"><button class="btn btn-warning mr-2 mb-3">Về trang chủ</button>
        </router-link>
        <button @click="confirmCheckOut" class="btn btn-primary mr-2 mb-3">Xác nhận
            đặt hàng</button>
        <button @click="clearItems" class="btn btn-danger mr-2 mb-3">Xóa tất cả</button>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import { mapGetters, mapState, mapActions } from 'vuex';
import ProductCart from "@/components/client/cart/ProductCart.vue";

export default {
    components: { ProductCart },

    data() {
        return {
            i: 0,

        }
    },
    computed: {
        ...mapState(['cart', 'infoClient', 'authenticatedClient']),
        ...mapGetters(['cartTotalPrice'])
    },
    methods: {
        ...mapActions(['removeProductFromCart', 'clearCartItems', 'getCartItems']),
        confirmCheckOut() {
            if (this.authenticatedClient) {
                window.scrollTo(0, 0);
                this.$router.push("/confirm-checkout");
            }
            else {
                this.$swal.fire({
                    title: 'Vui lòng đăng nhập để thanh toán',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        },
        clearItems() {
            this.clearCartItems();
            this.$swal.fire({
                title: 'Xóa tất cả sản phẩm thành công',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>



