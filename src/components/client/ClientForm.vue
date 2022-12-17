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
        <div class="form-group">
            <label for="passwordConfirm" class="font-weight-bold">Nhập lại mật khẩu </label>
            <Field name="passwordConfirm" type="password" class="form-control" />
            <ErrorMessage name="passwordConfirm" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary mr-2"><i class="fas fa-floppy-disk"></i> Lưu</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: { Form, Field, ErrorMessage },
    emits: ["submit:user", "delete:user"],
    props: {  user: { type: Object, required: true } },
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
            passwordConfirm: yup.string()
                .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            //  userLocal để liên kết với các input trên form
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitUser(e) {
            let data = {
                user: this.userLocal,
            };
            this.$emit("submit:user", data);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>