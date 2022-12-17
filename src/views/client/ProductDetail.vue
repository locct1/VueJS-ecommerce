<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Chi Tiết Sản Phẩm</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Chi tiết sản phẩm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="product-details spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product__details__pic">
                        <div class="product__details__pic__item">
                            <img style="width: 300px;height: 500px;object-fit: contain;" class="product__details__pic__item--large"
                                :src="'http://127.0.0.1:3000/images/products/' + product.image" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product__details__text">
                        <h3>{{ product.name }}</h3>

                        <div class="product__details__price">{{ String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                "$1,")
                        }}<sup style="text-decoration:underline">đ</sup></div>
                        <div>{{ product.description }}</div>
                        <div class="product__details__quantity">
                            <div class="number">
                                <span class="minus" @click="minusQuantity"><i class="fa fa-minus"></i></span>
                                <input type="text" v-model="quantity" />
                                <span @click="plusQuantity" class="plus"><i class="fa fa-plus"></i></span>
                            </div>
                        </div>
                        <button @click.prevent="AddToCart()" class="primary-btn">Thêm vào giỏ hàng</button>
                        <ul>
                            <li><b>Thương hiệu</b> <span>{{ brand.name }}</span></li>
                            <li><b>Có sẵn</b> <span>Trong kho</span></li>
                            <li><b>Vận chuyển</b> <span>Trong 1 ngày. <samp>Miễn phí cho đơn hàng
                                        5,000,000đ</samp></span></li>
                            <li><b>Share on</b>
                                <div class="share">
                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-instagram"></i></a>
                                    <a href="#"><i class="fa fa-pinterest"></i></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import { mapState, mapActions } from 'vuex';

export default {
    props: { id: { type: String, required: true } },
    data() {
        return {
            product: {},
            quantity: 1,
            brand: {},
        }
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ClientService.getProduct(id);
                this.brand = await ClientService.getBrand(this.product.brand_code);
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
        minusQuantity() {
            this.quantity = this.quantity - 1;
            console.log(this.quantity);
            if (this.quantity < 0) {
                this.quantity = 0;
            }
        },
        plusQuantity() {
            this.quantity = this.quantity + 1;
            console.log(this.quantity);
            if (this.quantity > 10) {
                this.quantity = 10;
            }
        },
        ...mapActions(['addProductToCart']),
        AddToCart() {
            this.addProductToCart({
                product: this.product,
                quantity: this.quantity
            })
            this.$swal.fire({
                title: 'Đã thêm sản phẩm vào giỏ hàng',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            console.log(this.product.description)
            console.log(this.product.price)
        }
    },
    created() {
        this.getProduct(this.id);
    },
    mounted() {
    },
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


