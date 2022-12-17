<template>
    <tr  v-for="(product, index) in products"
      :key="product._id">
        <td>{{index+1}}</td>
        <td>{{product.name}}</td>
        <td><img width="75" :src="'http://localhost:3000/images/products/' + product.image"  /></td>
        <td>{{product.brand[0].name}}</td>
        <td>{{String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'đ'}}</td>
        <td>{{formatDate(product.createAt) }}</td>
        <td>{{formatDate(product.updateAt)}}</td>
        <td>
            <router-link :to="{ name: 'product.edit', params: { id: product._id } }">
                <button  class="btn btn-primary mr-2">
                    <i class="fas fa-edit"></i> Sửa</button>
            </router-link>
           <button    @click="deleteBrand(product)"  class="btn  btn-danger"><i class="fas fa-trash"></i> Xóa</button>
        </td>
    </tr>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data(){
        return{
        }
    },
    emits: ["update:activeIndex"],
    methods: {
        formatDate(value) {
            value = moment(value).format('DD-MM-YYYY HH:mm:ss');
            return value;
        },
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        deleteBrand(product) {
            this.$emit("delete:product", product._id);
        },
    },
};
</script>