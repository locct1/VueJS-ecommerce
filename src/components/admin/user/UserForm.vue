<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name" class="font-weight-bold">Tên </label>
            <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email" class="font-weight-bold">Email </label>
            <Field name="email" type="text" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone" class="font-weight-bold">Số điện thoại </label>
            <Field name="phone" type="text" class="form-control" v-model="userLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address" class="font-weight-bold">Địa chỉ</label>
            <Field as="textarea" name="address" type="text" class="form-control" v-model="userLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password" class="font-weight-bold">Mật khẩu </label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group" >
            <label for="brand" class="font-weight-bold">Quyền</label>
            <Field name="brand" v-model="selectedLocal" class="form-control" as="select">
                <option value="" disabled>Chọn quyền</option>
                <option :selected="value && value.includes(1)" :value="1" :key="1">Admin</option>
                <option :selected="value && value.includes(2)" :value="2" :key="2">Thường</option>

            </Field>
            <ErrorMessage name="brand" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary mr-2"><i class="fas fa-floppy-disk"></i> Lưu</button>
            <router-link :to="{ name: 'userlist' }" class="btn btn-dark"><i class="fas fa-arrow-left"></i> Quay lại
            </router-link>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:user", "delete:user"],
    props: { selected: { type: String, default: [] }, brands: { type: Array, default: [] }, user: { type: Object, required: true } },
    data() {
        const userFormSchema = yup.object().shape({
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
            //  userLocal để liên kết với các input trên form
            userLocal: this.user,
            image: 'http://localhost:3000/images/users/' + this.user.image,
            userFormSchema,
            url: 'http://localhost:3000/images/no_image.jpg',
            selectedLocal: this.selected,
        };
    },
    methods: {
        formatPrice() {
            return String(this.userLocal.price).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        submitUser(e) {
            // const file = this.$refs.image.files[0];

            // if (this.userLocal.image instanceof File){
            //     this.userLocal.image = 'http://localhost:3000/images/' + this.userLocal.image;
            // }else{
            //     console.log("no")
            // }
            console.log('dsa',this.userLocal.password)
            this.userLocal.role = this.selectedLocal;
            let data = {
                user: this.userLocal,
                selected: this.selectedLocal
            };
            this.$emit("submit:user", data);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },
    },
};
</script>
<style scoped>
/* @import "@/assets/form.css"; */
</style>