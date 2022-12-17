<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Xem đơn hàng</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Xem đơn hàng</span>
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
                <th class="bg bg-dark text-light">Mã đơn hàng</th>
                <th class="bg bg-dark text-light">Tổng tiền</th>
                <th class="bg bg-dark text-light">Trạng thái</th>
                <th class="bg bg-dark text-light">Ngày tạo</th>
                <th class="bg bg-dark text-light">Ngày cập nhật</th>
                <th class="bg bg-dark text-light">Quản lý</th>
            </tr>
        </thead>
        <tbody>
            <OrderListClient  :orders="orders"
                 v-model:activeIndex="activeIndex" />
        </tbody>
    </table>
</div>
    </section>
  
</template>

<script>
import ClientService from "@/services/client.service";
import OrderListClient from "@/components/client/order/OrderListClient.vue";
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    components: {
        OrderListClient,
    },
    data() {
        return {
            orders: [],
        }
    },
    computed: {
        ...mapState(['cart', 'infoClient', 'authenticatedClient']),
        ...mapGetters(['cartTotalPrice'])
    },
    methods: {
        async getOrdersByClient() {
            try {
                this.orders = await ClientService.getOrdersByClient(this.infoClient.code);
                this.orders.reverse();
                console.log('check',this.orders);
            } catch (error) {
                console.log(error); // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
            }
        },
        
    },
    created() {
        this.getOrdersByClient();
    },
    mounted() {
      
    }
}
</script>



