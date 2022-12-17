<template>
    <section class="hero hero-normal" id="sidebar">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="hero__categories">
                        <div class="hero__categories__all">
                            <i class="fa fa-bars"></i>
                            <span>Thương hiệu</span>
                        </div>
                        <ul>
                            <li v-for="(brand, index) in brands" :key="brand._id" class="zoomm">
                                <router-link :to="{ name: 'allproducts.bybrand', params: { id: brand.code } }"
                                    href="thuong-hieu"><img style="margin-top:10px;margin-bottom: 10px;"
                                        :src='"http://127.0.0.1:3000/images/brands/" + brand.image' alt="">
                                </router-link>

                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="hero__search">
                        <div class="hero__search__form">
                            <form @submit.prevent="Search">
                                <input type="text" placeholder="Bạn cần tìm sản phẩm nào?" id="search_data"
                                    class="form-control input-lg ui-autocomplete-input" v-model="searchName" required>
                                <button  class="site-btn" ><i
                                        class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div class="hero__search__phone">
                            <div class="hero__search__phone__icon">
                                <i class="fa fa-phone"></i>
                            </div>
                            <div class="hero__search__phone__text">
                                <h5>0939131275</h5>
                                <span>Hỗ trợ 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ClientService from "@/services/client.service";

export default {
    data() {
        return {
            brands: [],
            searchName:'',
        }
    },
    methods: {
        async getAllBrands() {
            try {
                this.brands = await ClientService.getAllBrands();
                console.log(this.brands);
            } catch (error) {
                console.log(error);
            }
        },
        Search(){
            this.$router.push({
                name: 'product.search',
                params: { name: this.searchName }
            });
           this.searchName='';
        }
    },
    mounted() {
        this.getAllBrands();
    }
}
</script>

<style>

</style>