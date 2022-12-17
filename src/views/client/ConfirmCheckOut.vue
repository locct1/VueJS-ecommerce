<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Xác nhận đơn hàng</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Xác nhận đơn hàng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="container mt-3">
        <div class="card">
            <div class="card-header font-weight-bold">
                Thông tin người nhận hàng
            </div>
            <div class="card-body">

                <p class="card-text"><span class="font-weight-bold">Họ và tên:</span> {{ infoClient.name }}</p>
                <p class="card-text"><span class="font-weight-bold">Email:</span> {{ infoClient.email }}</p>
                <p class="card-text"><span class="font-weight-bold">Địa chỉ:</span> {{ infoClient.address }}</p>
                <p class="card-text"><span class="font-weight-bold">Điện thoại:</span> {{ infoClient.phone }}</p>
                <router-link :to="{ name: 'client.edit' }" class="btn btn-primary">Cập nhật thông tin</router-link>
            </div>
        </div>
    </section>
    <section class="container mt-3 mb-3">
        <div class="card">
            <div class="card-header font-weight-bold">
                <h5 class="font-weight-bold">Chi tiết đơn hàng</h5>
            </div>
            <div class="card-body">
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cart" :key="item.product.code">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.product.name }}</td>
                                <td><img width="75"
                                        :src="'http://localhost:3000/images/products/' + item.product.image" /></td>
                                <td>{{ String(item.product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup
                                        style="text-decoration:underline">đ</sup></td>
                                <td>
                                    {{ item.quantity }}
                                </td>
                                <td>{{ String(parseInt(item.product.price) *
                                        item.quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                            "$1,")
                                }}<sup style="text-decoration:underline">đ</sup></td>
                            </tr>
                            <tr>
                                <td colspan="6" class="font-weight-bold">Tổng: {{
                                        String(cartTotalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                }}<sup style="text-decoration:underline">đ</sup></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <section class="container mb-3">
        <div class="row justify-content-center">
            <button @click="createOrder" class="btn btn-success pl-5 pr-5">Xác nhận đặt hàng</button>
        </div>
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
      async  createOrder(){
        let data={
            infoClient:this.infoClient,
            cart:this.cart,
            total:this.cartTotalPrice.toString()
        }
          await ClientService.createOrder(data);
          window.scrollTo(0, 0);
          this.$router.push("/checkout-success");
          this.clearCartItems();
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>



