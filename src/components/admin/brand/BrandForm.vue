<template>
    <Form @submit="submitBrand" :validation-schema="brandFormSchema">
        <div class="form-group">
            <label for="name" class="font-weight-bold">Tên thương hiệu</label>
            <Field name="name" type="text" class="form-control" v-model="brandLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div v-if="brandLocal._id">
            <div>
                <div for="image" class="font-weight-bold">Hình ảnh hiện tại</div>
                <img style="width:25%" :src="image" />
            </div>
            <div>
                <div for="image" class="font-weight-bold">Hình ảnh cập nhật</div>
                <img style="width:25%" :src="url" />
            </div>
        </div>
        <div v-else> 
                <div for="image" class="font-weight-bold">Hình ảnh</div>
            <img style="width:25%" :src="url" />
        </div>
        <div class="form-group">
            <label for="image" class="font-weight-bold">Chọn hình ảnh</label>
            <Field @change="onFileChange" name="image" type="file" class="form-control" v-model="brandLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary mr-2"><i class="fas fa-floppy-disk"></i> Lưu</button>
            <router-link :to="{ name: 'brandlist' }" class="btn btn-dark"><i class="fas fa-arrow-left"></i> Quay lại
            </router-link>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:brand", "delete:brand"],
    props: { brand: { type: Object, required: true } },
    data() {

        const brandFormSchema = yup.object().shape({
            // name: yup
            //     .string()
            //     .required("Tên phải có giá trị.")
            //     .min(2, "Tên phải ít nhất 2 ký tự.")
            //     .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .email("E-mail không đúng.")
            //     .max(50, "E-mail tối đa 50 ký tự."),
            // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            // phone: yup
            //     .string()
            //     .matches(
            //         /((09|03|07|08|05)+([0-9]{8})\b)/g,
            //         "Số điện thoại không hợp lệ."
            //     ),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  brandLocal để liên kết với các input trên form
            brandLocal: this.brand,
            image: 'http://localhost:3000/images/brands/' + this.brand.image,
            brandFormSchema,
            url: 'http://localhost:3000/images/no_image.jpg',
        };
    },
    methods: {
        submitBrand(e) {
            // const file = this.$refs.image.files[0];
          
            // if (this.brandLocal.image instanceof File){
            //     this.brandLocal.image = 'http://localhost:3000/images/' + this.brandLocal.image;
            // }else{
            //     console.log("no")
            // }
            this.$emit("submit:brand", this.brandLocal);
        },
        deleteBrand() {
            this.$emit("delete:brand", this.brandLocal.id);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        }
    },
};
</script>
<style scoped>
/* @import "@/assets/form.css"; */
</style>