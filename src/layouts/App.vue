<template>

  <div id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <AppHeader />
          <div class="container-fluid">
            <router-view />
          </div>

        </div>
        <AppFooter />
      </div>
    </div>
  </div>

  <LogoutModal />
</template>

<script>

import AppHeader from "@/components/admin/AppHeader.vue";
import LogoutModal from "@/components/admin/LogoutModal.vue";
import SideBar from "@/components/admin/SideBar.vue";
import AppFooter from "@/components/admin/AppFooter.vue";
const scripts = {
  a: 'http://127.0.0.1:3001/src/assets/admin/vendor/jquery/jquery.min.js',
  b: 'http://127.0.0.1:3001/src/assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js',
  c: 'http://127.0.0.1:3001/src/assets/admin/vendor/jquery-easing/jquery.easing.min.js',
  d: 'http://127.0.0.1:3001/src/assets/admin/js/sb-admin-2.min.js',
  // e:'http://127.0.0.1:3001/src/assets/admin/vendor/datatables/jquery.dataTables.min.js',
  // g:'http://127.0.0.1:3001/src/assets/admin/js/demo/datatables-demo.js',
  // f:'http://127.0.0.1:3001/src/assets/admin/vendor/datatables/dataTables.bootstrap4.min.js',
}
import UserService from "@/services/user.service";
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "app",
  components: { AppHeader, LogoutModal, AppFooter, SideBar },

  data() {
    return {
      user:{
      }
     
    }
  },
  methods: {
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async getInfoAdmin() {
      try {
        let result = await UserService.getInfoAdmin();
        if (result && result.data.errCode===1) {
          await this.$store.dispatch('setAuth', false);
          await this.$router.push("/admin/login");
        }
        if (result && result.data.errCode === 0) {
          this.user = result.data;
          await this.$store.dispatch('setInfoAdmin', this.user);
          await this.$store.dispatch('setAuth', true);
        }
      } catch (error) {
        await this.$store.dispatch('setAuth', false);
        await this.$router.push("/admin/login");
      }
    }
  },
  mounted() {
    this.getInfoAdmin();
  },
  created() {
    this.LoadScript;
  },
  computed: {
      ...mapState(['infoAdmin']),
 async  LoadScript() {
      let url = document.querySelectorAll(`script[src="${scripts['a']}"]`).length;
      if (url) {
        return;
      }
      for (let key in scripts) {
        const src = scripts[key];
        const script = document.createElement('script')
        script.setAttribute('src', src)
        script.setAttribute("type", "text/javascript");
        script.setAttribute("defer", "defer");
        document.body.appendChild(script);
        await this.timeout(50);
      }
    }
  }
};
</script>

<style >
/* @import "@/assets/admin/vendor/fontawesome-free/css/all.min.css"; */
@import "@/assets/admin/css/sb-admin-2.min.css";
@import "@/assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";

</style>

