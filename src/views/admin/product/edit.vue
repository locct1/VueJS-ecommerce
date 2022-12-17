<template>
    <div v-if="product" class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Sửa sản phẩm</h6>
        </div>
        <div class="card-body">
            <ProductForm :selected="selected" :brands="brands" :product="product" @submit:product="updateProduct"
                @delete:product="deleteProduct" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import ProductForm from "@/components/admin/product/ProductForm.vue";
import ProductService from "@/services/product.service";
import BrandService from "@/services/brand.service";

export default {
    components: { ProductForm },
    props: { id: { type: String, required: true } },
    data() {
        return { product: null, message: "", brands: [], selected: '' };

    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
                this.selected = this.product.brand_code;
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
        async updateProduct(data) {
            try {
                const formData = new FormData();
                if (data.product.image instanceof File) {
                    formData.append("image", data.product.image);
                    formData.append("name", data.product.name);
                    formData.append("description", data.product.description);
                    formData.append("price", data.product.price);
                    formData.append("brand_code", data.selected);
                    await ProductService.update(this.product._id, formData);
                } else {
                    data.product.brand_code=data.selected;
                    await ProductService.updateNoImage(this.product._id, data.product);
                }
                this.message = "Sản phẩm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async getListBrands() {
            try {
                this.brands = await BrandService.getAll();
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getProduct(this.id);

        this.message = "";
    },
    mounted() {
        this.getListBrands();



    }
};
</script>