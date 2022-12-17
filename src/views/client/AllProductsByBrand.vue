<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="breadcrumb__text">
                        <h2>Sản phẩm thương hiệu</h2>
                        <div class="breadcrumb__option">
                            <a href="trang-chu">Trang chủ</a>
                            <span>Sản phẩm thương hiệu</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="featured spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title">
                        <h2 v-if="brand">Sản phẩm {{ brand.name }}</h2>
                    </div>
                </div>
            </div>
            <div class="row featured__filter" id="MixItUpBBD782">
                <div v-if="products.length > 0" v-for="(product, index) in products" :key="product._id"
                    class="col-lg-3 col-md-4 col-sm-6">
                    <div class="featured__item">
                        <div class="featured__item__pic  zoom"
                            v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/products/' + product.image + ')' }">
                            <ul class="featured__item__pic__hover">
                                <li>
                                    <router-link :to="{ name: 'product.detail', params: { id: product.code } }"><i
                                            class="fa fa-eye"></i></router-link>
                                </li>
                                <li><a style="cursor: pointer;" @click="AddToCart(product)"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6>
                                <router-link :to="{ name: 'product.detail', params: { id: product.code } }"
                                    class="name-product">{{ product.name }}
                                </router-link>
                            </h6>
                            <h5 style="color:#d70018;" class="gia">
                                {{ String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup
                                    style="text-decoration:underline">đ</sup>
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="text-center" v-else>
                    <h3>Hiện chưa có sản phẩm</h3>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";
import { mapActions } from 'vuex';

export default {
    props: { id: { type: String, required: true } },
    data() {
        return {
            products: [],
            brand: {}
        }
    },
    methods: {
        async getAllProducts() {
            console.log(1);
            try {
                this.products = await ClientService.getAllProducts();

            } catch (error) {
                console.log(error);
            }


        },
        async getAllProductsByBrand(id) {
            try {
                this.products = await ClientService.getAllProductsByBrand(id);
                this.brand = await ClientService.getBrand(this.id);

                console.log(this.products)
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
        ...mapActions(['addProductToCart']),
        AddToCart(product) {
            this.addProductToCart({
                product: product,
                quantity: 1
            })
            this.$swal.fire({
                title: 'Đã thêm sản phẩm vào giỏ hàng',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        },
    },
    created() {
        this.getAllProductsByBrand(this.id);
    },
    mounted() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                this.getAllProductsByBrand(this.$route.params.id);

            }
        )
    }
}
</script>



