<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý sản phẩm</h6>
        </div>
        <div class="card-body">

            <router-link :to="{name:'product.add'}"> <button class="btn btn-success mb-3"><i class="fas fa-plus"></i> Thêm sản phẩm</button>
            </router-link>
            <InputSearch v-model="searchText" />
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="bg bg-dark text-light">STT</th>
                            <th class="bg bg-dark text-light">Tên sản phẩm</th>
                            <th class="bg bg-dark text-light">Hình ảnh</th>
                            <th class="bg bg-dark text-light">Thương hiệu</th>
                            <th class="bg bg-dark text-light">Giá</th>
                            <th class="bg bg-dark text-light">Ngày tạo</th>
                            <th class="bg bg-dark text-light">Ngày cập nhật</th>
                            <th class="bg bg-dark text-light">Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                            @delete:product="deleteProduct"
                            v-model:activeIndex="activeIndex" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/admin/product/ProductList.vue";
import ProductService from "@/services/product.service";
export default {
    components: {
        InputSearch,
        ProductList,
    }, // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {

        return { products: [], activeIndex: -1, searchText: "" };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.products.map((product) => {
                const { name } = product;
                return [name].join("");
            });
        }, // Trả về các product có chứa thông tin cần tìm kiếm.
        filteredProducts() {
            if (!this.searchText) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProducts[this.activeIndex];
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
               
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
        async removeAllProducts() {
            if (confirm("Bạn muốn xóa tất cả Sản phẩm?")) {
                try {
                    await ProductService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteProduct(productId) {
            if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                try {
                    await ProductService.delete(productId);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProduct() {
            this.$router.push({ name: "product.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>

</style>