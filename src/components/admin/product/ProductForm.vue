<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
        <div class="form-group">
            <label for="name" class="font-weight-bold">Tên sản phẩm</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="brand" class="font-weight-bold">Thương hiệu</label>
            <Field name="brand" v-model="selectedLocal" class="form-control" as="select">
                <option value="" disabled>Chọn thương hiệu</option>
                <option :selected="value && value.includes(brand.code)" v-for="brand in brands" :key="brand.code"
                    :value="brand.code">
                    {{ brand.name }}</option>
            </Field>
            <ErrorMessage name="brand" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price" class="font-weight-bold">Giá</label>
            <Field name="price"  type="text" class="form-control" v-model="productLocal.price" />
            <label for="price" class="font-weight-bold mt-4">Format giá: {{formatPrice() +' đ'}}</label>
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description" class="font-weight-bold">Miêu tả</label>
            <Field  as="textarea" name="description" type="text" class="form-control" v-model="productLocal.description" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div v-if="productLocal._id">
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
            <Field @change="onFileChange" name="image" type="file" class="form-control" v-model="productLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary mr-2"><i class="fas fa-floppy-disk"></i> Lưu</button>
            <router-link :to="{ name: 'productlist' }" class="btn btn-dark"><i class="fas fa-arrow-left"></i> Quay lại
            </router-link>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:product", "delete:product"],
    props: { selected: { type: String, default: [] }, brands: { type: Array, default: [] }, product: { type: Object, required: true } },
    data() {
        const productFormSchema = yup.object().shape({
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
            //  productLocal để liên kết với các input trên form
            productLocal: this.product,
            image: 'http://localhost:3000/images/products/' + this.product.image,
            productFormSchema,
            url: 'http://localhost:3000/images/no_image.jpg',
            selectedLocal: this.selected,
        };
    },
    methods: {
        formatPrice() {
            return String(this.productLocal.price).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
        },
        submitProduct(e) {
            // const file = this.$refs.image.files[0];

            // if (this.productLocal.image instanceof File){
            //     this.productLocal.image = 'http://localhost:3000/images/' + this.productLocal.image;
            // }else{
            //     console.log("no")
            // }
            let data = {
                product: this.productLocal,
                selected: this.selectedLocal
            };
            this.$emit("submit:product", data);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
       
    },
    computed:{
       
    }
};
</script>
<style scoped>
/* @import "@/assets/form.css"; */
</style>