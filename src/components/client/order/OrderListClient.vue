<template>
    <tr v-for="(order, index) in orders" :key="order._id">
        <td>{{ index + 1 }}</td>
        <td>
            {{ order.code }}
        </td>
        <td>{{ String(order.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 'đ' }}</td>
        <td v-if="order.status == '0'"><span style="cursor:pointer" class="badge badge-danger">Chờ xác nhận</span></td>
        <td v-if="order.status == '1'"><span style="cursor:pointer" class="badge badge-warning">Đã xác nhận</span></td>
        <td v-if="order.status == '2'"><span style="cursor:pointer" class="badge badge-primary">Đang giao hàng</span>
        </td>
        <td v-if="order.status == '3'"><span style="cursor:pointer" class="badge badge-success">Đã giao hàng</span></td>

        <td>{{ formatDate(order.createAt) }}</td>
        <td>{{ formatDate(order.updateAt) }}</td>
        <td width="14%">
            <button class="btn  btn-primary" @click="checkOrderDetail(order)" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i
                    class="fas fa-eye"></i> Xem chi tiết</button>
        </td>

    </tr>
    <div v-if="orderLocal!=null" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-primary text-light">
                    <h5 class="modal-title text-light" id="exampleModalLabel">Mã đơn hàng: {{orderLocal.code}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body p-4">
                    <div class="card">
                        <div class="card-header text-dark font-weight-bold">
                            Thông tin người nhận hàng
                        </div>
                        <div class="card-body">
                        <p class="card-text"><span class="font-weight-bold">Họ và tên:</span> {{ orderLocal.infoClient.name
                            }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Email:</span> {{ orderLocal.infoClient.email }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Địa chỉ:</span> {{ orderLocal.infoClient.address
                            }}
                        </p>
                        <p class="card-text"><span class="font-weight-bold">Điện thoại:</span> {{ orderLocal.infoClient.phone
                            }}
                        </p>
                        </div>
                    </div>
            <div class="card mt-3">
                <div class="card-header text-dark font-weight-bold">
                    Chi tiết đơn hàng
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
                            <tr v-for="(item, index) in orderLocal.orderdetails" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.product.name }}</td>
                                <td><img width="75" :src="'http://localhost:3000/images/products/' + item.product.image" />
                                </td>
                                <td>{{ String(item.product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                    }}<sup style="text-decoration:underline">đ</sup></td>
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
                                    String(orderLocal.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                                    }}<sup style="text-decoration:underline">đ</sup></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data() {
        return {
            orderLocal:null
        }
    },
    emits: ["update:activeIndex"],
    methods: {
        formatDate(value) {
            value = moment(value).format('DD-MM-YYYY HH:mm:ss');
            return value;
        },
        checkOrderDetail(order){
            this.orderLocal=order;
        }
    },
   
};
</script>
<style>
.modal-lg{
    max-width:60%;
}
</style>