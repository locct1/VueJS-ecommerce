<template>
    <tr  v-for="(brand, index) in brands"
      :key="brand._id">
        <td>{{index+1}}</td>
        <td>{{brand.name}}</td>
        <td><img width="75" :src="'http://localhost:3000/images/brands/' + brand.image"  /></td>
        <td>{{formatDate(brand.createAt) }}</td>
        <td>{{formatDate(brand.updateAt)}}</td>
        <td>
            <router-link :to="{ name: 'brand.edit', params: { id: brand._id } }">
                <button  class="btn btn-primary mr-2">
                    <i class="fas fa-edit"></i> Sửa</button>
            </router-link>
           <button    @click="deleteBrand(brand)"  class="btn  btn-danger"><i class="fas fa-trash"></i> Xóa</button>
        </td>
    </tr>
</template>
<script>
import moment from 'moment';
export default {
    props: {
        brands: { type: Array, default: [] },
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
        deleteBrand(brand) {
            console.log(brand)
            this.$emit("delete:brand", brand._id);
        },
    },
};
</script>