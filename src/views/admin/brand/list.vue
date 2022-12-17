<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý thương hiệu</h6>
        </div>
        <div class="card-body">

            <router-link :to="{name:'brand.add'}"> <button class="btn btn-success mb-3"><i class="fas fa-plus"></i> Thêm thương hiệu</button>
            </router-link>
            <InputSearch v-model="searchText" />
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="bg bg-dark text-light">STT</th>
                            <th class="bg bg-dark text-light">Tên thương hiệu</th>
                            <th class="bg bg-dark text-light">Hình ảnh</th>
                            <th class="bg bg-dark text-light">Ngày tạo</th>
                            <th class="bg bg-dark text-light">Ngày cập nhật</th>
                            <th class="bg bg-dark text-light">Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        <BrandList v-if="filteredBrandsCount > 0" :brands="filteredBrands"
                            @delete:brand="deleteBrand"
                            v-model:activeIndex="activeIndex" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import BrandList from "@/components/admin/brand/BrandList.vue";
import BrandService from "@/services/brand.service";
export default {
    components: {
        InputSearch,
        BrandList,
    }, // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {

        return { brands: [], activeIndex: -1, searchText: "" };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng brand thành chuỗi để tiện cho tìm kiếm.
        brandStrings() {
            return this.brands.map((brand) => {
                const { name } = brand;
                return [name].join("");
            });
            
        }, // Trả về các brand có chứa thông tin cần tìm kiếm.
        filteredBrands() {
            if (!this.searchText) return this.brands;
            return this.brands.filter((_brand, index) =>
                this.brandStrings[index].includes(this.searchText)
            );
        },
        activeBrand() {
            if (this.activeIndex < 0) return null;
            return this.filteredBrands[this.activeIndex];
        },
        filteredBrandsCount() {
            return this.filteredBrands.length;
        },
    },
    methods: {
        async retrieveBrands() {
            try {
                this.brands = await BrandService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBrands();
            this.activeIndex = -1;
        },
        async removeAllBrands() {
            if (confirm("Bạn muốn xóa tất cả Thương hiệu?")) {
                try {
                    await BrandService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteBrand(brandId) {
           
            if (confirm("Bạn muốn xóa thương hiệu này?")) {
                try {
                    await BrandService.delete(brandId);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddBrand() {
            this.$router.push({ name: "brand.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>

</style>