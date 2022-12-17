<template>
    <td>{{ index + 1 }}</td>
    <td>{{ item.product.name }}</td>
    <td><img width="75" :src="'http://localhost:3000/images/products/' + item.product.image" /></td>
    <td>{{ String(item.product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup
            style="text-decoration:underline">đ</sup></td>

    <td>
        <div class="number">
            <input min="0" type="number" v-model="quantity" />
            <button class="btn btn-primary" @click="updateQuantityCart">Cập nhật</button>
        </div>
    </td>
    <td>{{ String(parseInt(item.product.price) * item.quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup
            style="text-decoration:underline">đ</sup></td>
    <td><button class="btn btn-danger" @click="removeFromCart">Xóa</button></td>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    props: { item: { type: Object, required: true }, index: { type: Number } },
    data() {
        return {
            quantity: this.item.quantity
        }
    },
    methods: {
        ...mapActions(['removeProductFromCart', 'updateQuantity']),
        updateQuantityCart() {
            if (this.quantity <= 0) {
                this.removeProductFromCart(this.item.product);
                this.$swal.fire({
                    title: 'Xóa sản phẩm thành công',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                this.updateQuantity({
                    product: this.item.product,
                    quantity: this.quantity
                })
                this.$swal.fire({
                    title: 'Đã cập nhật số lượng sản phẩm',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        },
        removeFromCart() {
            this.removeProductFromCart(this.item.product);
            this.$swal.fire({
                title: 'Xóa sản phẩm thành công',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
</script>

<style scoped>
span {
    cursor: pointer;
}


.minus,
.plus {
    width: 30px;
    height: 30px;
    background: #f2f2f2;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}

input {
    height: 34px;
    width: 80px;
    text-align: center;
    font-size: 26px;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
}
</style>