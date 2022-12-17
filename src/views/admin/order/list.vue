<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý đơn hàng</h6>
        </div>
        <div class="card-body">
            <InputSearch v-model="searchText" />
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="bg bg-dark text-light">STT</th>
                            <th class="bg bg-dark text-light">Mã đơn hàng</th>
                            <th class="bg bg-dark text-light">Tên</th>
                            <th class="bg bg-dark text-light">Email</th>
                            <th class="bg bg-dark text-light">Tổng tiền</th>
                            <th class="bg bg-dark text-light">Trạng thái</th>
                            <th class="bg bg-dark text-light">Ngày tạo</th>
                            <th class="bg bg-dark text-light">Ngày cập nhật</th>
                            <th class="bg bg-dark text-light">Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderList @changeStatus="handleChangeStatus" v-if="filteredOrdersCount > 0"
                            :orders="filteredOrders" @delete:order="deleteOrder" v-model:activeIndex="activeIndex" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import OrderList from "@/components/admin/order/OrderList.vue";
import OrderService from "@/services/order.service";
export default {
    components: {
        InputSearch,
        OrderList,
    }, // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {

        return { orders: [], activeIndex: -1, searchText: "" };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng order thành chuỗi để tiện cho tìm kiếm.
        orderStrings() {
            return this.orders.map((order) => {
                const { code } = order;
                return [code].join("");
            });
        }, // Trả về các order có chứa thông tin cần tìm kiếm.
        filteredOrders() {
            if (!this.searchText) return this.orders;
            return this.orders.filter((_order, index) =>
                this.orderStrings[index].includes(this.searchText)
            );
        },
        activeOrder() {
            if (this.activeIndex < 0) return null;
            return this.filteredOrders[this.activeIndex];
        },
        filteredOrdersCount() {
            return this.filteredOrders.length;
        },
    },
    methods: {
        async retrieveOrders() {
            try {
                this.orders = await OrderService.getAll();
                this.orders.reverse();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
        },
        async removeAllOrders() {
            if (confirm("Bạn muốn xóa tất cả đơn hàng?")) {
                try {
                    await OrderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteOrder(orderId) {
            if (confirm("Bạn muốn xóa đơn hàng này?")) {
                try {
                    
                    await OrderService.delete(orderId);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async handleChangeStatus(order) {
            if (order.status == '0') {
                order.status = '1';
            }
            else if (order.status == '1') {
                order.status = '2';
            }
            else if (order.status == '2') {
                order.status = '3';
            }
            else if (order.status == '3') {
                order.status = '0';
            }
            await OrderService.changeStatus(order);
            this.refreshList();
        }
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>

</style>