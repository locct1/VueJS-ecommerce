<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý thương hiệu</h6>
        </div>
        <div class="card-body">
            <BrandForm :brand="brand" @submit:brand="addBrand" @delete:brand="deleteBrand" />
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
        return {
            brand: {
                name: "",
                image: "",
            },

            message: "",
        };
    },
    methods: {
        async addBrand(data) {
            const formData = new FormData();
            formData.append("image", data.image);
            formData.append("name",data.name);
            try {
                await BrandService.create(formData);
                this.message = "Thương hiệu được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.message = "";
    },
};
</script>