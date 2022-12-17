<template>
    <div v-if="brand" class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Sửa thương hiệu</h6>
        </div>
        <div class="card-body">
            <BrandForm :brand="brand" @submit:brand="updateBrand" @delete:brand="deleteBrand" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import BrandForm from "@/components/admin/brand/BrandForm.vue";
import BrandService from "@/services/brand.service";
export default {
    components: { BrandForm },
    props: { id: { type: String, required: true } },
    data() {
        return { brand: null, message: "" };
    },
    methods: {
        async getBrand(id) {
            try {
                this.brand = await BrandService.get(id);
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
        async updateBrand(data) {
            try {
                const formData = new FormData();
                if (data.image instanceof File) {
                    formData.append("image", data.image);
                    formData.append("name", data.name);
                    await BrandService.update(this.brand._id, formData);
                } else {
                    await BrandService.updateNoImage(this.brand._id, data);
                }
                this.message = "Thương hiệu được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getBrand(this.id);
        this.message = "";
    },
};
</script>