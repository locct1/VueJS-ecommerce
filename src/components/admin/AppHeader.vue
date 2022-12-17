<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
        <!-- Sidebar Toggle (Topbar) -->
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>
        <!-- Topbar Search -->
        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">
    
            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
    
            <div class="topbar-divider d-none d-sm-block"></div>
    
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small" v-if="infoAdmin.name">{{ infoAdmin.name}}</span>
                    <img class="img-profile rounded-circle" src="http://127.0.0.1:3001/src/assets/logo.svg">
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="Logout" style="cursor:pointer"  >
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
            </li>
    
        </ul>
    
    </nav>
    
</template>

<script>
import UserService from "@/services/user.service";
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data(){
        return{
          
        };
    },
    computed:{
        ...mapState(['infoAdmin']),
    },
    methods: {
        async Logout() {
            try {
                await UserService.logout();
                await this.$store.dispatch("setAuth", false); //Add this line to redirect to login route
                await this.$router.push('/admin/login'); // It is important to put this line too, because if you
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>

</style>