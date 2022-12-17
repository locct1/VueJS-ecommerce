<template>
    <div v-if="order">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Mã đơn hàng: {{order.code}}</h6>
            </div>
            <div class="card-body">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Thông tin người nhận hàng</h6>
                    </div>
                    <div class="card-body">
                        <p class="card-text"><span class="font-weight-bold">Họ và tên:</span> {{ order.infoClient.name
                        }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Email:</span> {{ order.infoClient.email }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Địa chỉ:</span> {{ order.infoClient.address
                        }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Điện thoại:</span> {{ order.infoClient.phone
                        }}
                        </p>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Chi tiết đơn hàng</h6>
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
                                    <tr v-for="(item, index) in order.orderdetails" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.product.name }}</td>
                                        <td><img width="75"
                                                :src="'http://localhost:3000/images/products/' + item.product.image" />
                                        </td>
                                        <td>{{ String(item.product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                        }}<sup style="text-decoration:underline">đ</sup></td>
                                        <td>
                                            {{ item.quantity }}
                                        </td>
                                        <td>{{ String(parseInt(item.product.price) *
                                                item.quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                                    "$1,")
                                                + ' đ'
                                        }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="font-weight-bold">Tổng: {{
                                                String(order.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' đ'
                                        }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <router-link :to="{ name: 'orderlist' }" class="btn btn-dark"><i class="fas fa-arrow-left"></i>
                    Quay
                    lại
                </router-link>
            </div>
        </div>
    </div>

</template>
<script>
import OrderService from "@/services/order.service";
export default {
    props: { id: { type: String, required: true } },
    data() {
        return { order: null };
    },
    methods: {
        async getOrder(id) {
            try {
                console.log(id)
                this.order = await OrderService.get(id);
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

    },
    created() {
        this.getOrder(this.id);
    },
};
</script>