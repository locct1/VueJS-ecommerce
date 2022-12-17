<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Quản lý tài khoản</h6>
        </div>
        <div class="card-body">

            <router-link :to="{name:'user.add'}"> <button class="btn btn-success mb-3"><i class="fas fa-plus"></i> Thêm tài khoản</button>
            </router-link>
            <InputSearch v-model="searchText" />
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th class="bg bg-dark text-light">STT</th>
                            <th class="bg bg-dark text-light">Tên</th>
                            <th class="bg bg-dark text-light">Email</th>
                            <th class="bg bg-dark text-light">Phone</th>
                            <th class="bg bg-dark text-light">Quyền</th>
                            <th class="bg bg-dark text-light">Ngày tạo</th>
                            <th class="bg bg-dark text-light">Ngày cập nhật</th>
                            <th class="bg bg-dark text-light">Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserList v-if="filteredUsersCount > 0" :users="filteredUsers"
                            @delete:user="deleteUser"
                            v-model:activeIndex="activeIndex" />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import UserList from "@/components/admin/user/UserList.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        InputSearch,
        UserList,
    }, // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {

        return { users: [], activeIndex: -1, searchText: "" };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng user thành chuỗi để tiện cho tìm kiếm.
        userStrings() {
            return this.users.map((user) => {
                const { name } = user;
                return [name].join("");
            });
        }, // Trả về các user có chứa thông tin cần tìm kiếm.
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_user, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
        activeUser() {
            if (this.activeIndex < 0) return null;
            return this.filteredUsers[this.activeIndex];
        },
        filteredUsersCount() {
            return this.filteredUsers.length;
        },
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },
        async removeAllUsers() {
            if (confirm("Bạn muốn xóa tất cả Tài khoản?")) {
                try {
                    await UserService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async deleteUser(userId) {
            if (confirm("Bạn muốn xóa Tài khoản này?")) {
                try {
                    await UserService.delete(userId);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>

</style>