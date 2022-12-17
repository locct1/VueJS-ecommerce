<template>
    <tr v-for="(order, index) in orders" :key="order._id">
        <td>{{ index + 1 }}</td>
        <td><router-link :to="{ name: 'order.detail', params: { id: order._id } }">{{ order.code }}</router-link></td>
        <td>{{ order.infoClient.name }}</td>
        <td>{{ order.infoClient.email }}</td>
        <td>{{String(order.total).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ'}}</td>
        <td @click="changeStatus(order)" v-if="order.status=='0'"><span style="cursor:pointer" class="badge badge-danger">Chờ xác nhận</span></td>
        <td @click="changeStatus(order)" v-if="order.status=='1'"><span style="cursor:pointer" class="badge badge-warning">Đã xác nhận</span></td>
        <td @click="changeStatus(order)" v-if="order.status=='2'"><span style="cursor:pointer" class="badge badge-primary">Đang giao hàng</span></td>
        <td @click="changeStatus(order)" v-if="order.status=='3'"><span style="cursor:pointer" class="badge badge-success">Đã giao hàng</span></td>

        <td>{{ formatDate(order.createAt) }}</td>
        <td>{{ formatDate(order.updateAt) }}</td>
        <td width="14%">
        <button @click="deleteOrder(order)" class="btn  btn-danger"><i class="fas fa-trash"></i> Xóa</button>
        </td>
    </tr>
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
        }
    },
    emits: ["update:activeIndex"],
    methods: {
        formatDate(value) {
            value = moment(value).format('DD-MM-YYYY HH:mm:ss');
            return value;
        },

        deleteOrder(order) {
            console.log(order)
            this.$emit("delete:order", order._id);
        },
        changeStatus(order){
            this.$emit("changeStatus",order);
        }
    },
};
</script>