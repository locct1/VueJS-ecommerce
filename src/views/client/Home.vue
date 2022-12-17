<template>
  <section class="breadcrumb-section" v-bind:style="{ backgroundImage:'url('+ 'http://127.0.0.1:3000/images/breadcrumb.PNG' +')'}">

    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="breadcrumb__text">
            <h2>Sản Phẩm</h2>
            <div class="breadcrumb__option">
              <a href="trang-chu">Trang chủ</a>
              <span>Sản phẩm</span>
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
            <h2>Sản phẩm mới nhất</h2>
          </div>
        </div>
      </div>
      <div class="row featured__filter" id="MixItUpBBD782">

        <div v-for="(product, index) in products" :key="product._id" class="col-lg-3 col-md-4 col-sm-6">
            <div class="featured__item">
            <div class="featured__item__pic  zoom"
              v-bind:style="{ backgroundImage: 'url(' +'http://127.0.0.1:3000/images/products/' + product.image + ')' }">
              <ul class="featured__item__pic__hover">
                <li><router-link :to="{ name: 'product.detail', params: { id: product.code } }"><i class="fa fa-eye"></i></router-link></li>
                <li><a style="cursor: pointer;" @click="AddToCart(product)"><i class="fa fa-shopping-cart"></i></a></li>
              </ul>
              </div>
              <div class="featured__item__text">
                <h6><router-link :to="{ name: 'product.detail', params: { id: product.code } }"  class="name-product">{{product.name}}
                  </router-link ></h6>
                <h5 style="color:#d70018;" class="gia">
                {{String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}<sup style="text-decoration:underline">đ</sup>
                </h5>
              </div>
            </div>
        </div>
       
      </div>
    </div>
  </section>
</template>

<script>
import ClientService from "@/services/client.service";
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      products: []
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
    ...mapActions(['addProductToCart']),
    AddToCart(product) {
      console.log(product);
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
    }
  },
  created() {
    this.getAllProducts();
  }
}
</script>

<style>

</style>



<!-- <template>
  <div class="my-component">
      
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      @change="onFileSelected"
    />
    <button @click="$refs.fileInput.click()">Pick</button>
    <button @click="onUpload">click me</button>
  </div>
</template>

<script>
import axios from "axios";
import ContactService from "@/services/contact.service";
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
   async onUpload() {
    alert(1)
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name);
        await ContactService.image(data);
    },

  },
};
</script>

<style  scoped>
.my-component {
  color: red;
}
</style> -->