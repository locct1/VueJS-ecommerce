<template>
  <ClientHeader /><ClientSidebar />
  <router-view></router-view>
  <ClientFooter/>
</template>

<script>

import ClientHeader from "@/components/client/ClientHeader.vue";
import ClientSidebar from "@/components/client/ClientSidebar.vue";
import ClientFooter from "@/components/client/ClientFooter.vue";
import ClientService from "@/services/client.service";

import { mapActions, mapGetters, mapState } from 'vuex';

const scripts = {
  a: 'http://127.0.0.1:3001/src/assets/client/js/jquery-3.3.1.min.js',
  // b: 'http://127.0.0.1:3001/src/assets/client/js/bootstrap.min.js',
  c: 'http://127.0.0.1:3001/src/assets/client/js/jquery.nice-select.min.js',
  d: 'http://127.0.0.1:3001/src/assets/client/js/jquery-ui.min.js',
  e: 'http://127.0.0.1:3001/src/assets/client/js/jquery.slicknav.js',
  f: 'http://127.0.0.1:3001/src/assets/client/js/mixitup.min.js',
  g: 'http://127.0.0.1:3001/src/assets/client/js/owl.carousel.min.js',
  h: 'http://127.0.0.1:3001/src/assets/client/js/main.js',
  j:'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js',
  k:'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
}


export default {
  name: "PublicLayout",
  components: { ClientHeader, ClientSidebar, ClientFooter },
  data() {
    return {
      user: {
      }
    }
  },
  created() {
    this.LoadScript;
  },
  methods: {
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async getInfoClient() {
      try {
        let result = await ClientService.getInfoClient();
        if (result && result.data.errCode === 1) {
          await this.$store.dispatch('setAuthClient', false);
          await this.$router.push("/admin/login");
        }
        if (result && result.data.errCode === 0) {
          this.user = result.data;
          await this.$store.dispatch('setInfoClient', this.user);
          await this.$store.dispatch('setAuthClient', true);
        }
      } catch (error) {
        await this.$store.dispatch('setAuth', false);
        await this.$router.push("/admin/login");
      }
    }
  },
  computed: {
   async LoadScript() {
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
  },
  mounted() {
    
  },
};
</script>
<style>
@import "@/assets/client/css/bootstrap.min.css";
@import "@/assets/client/css/font-awesome.min.css";
@import "@/assets/client/css/elegant-icons.css";
@import "@/assets/client/css/nice-select.css";
@import "@/assets/client/css/jquery-ui.min.css";
@import "@/assets/client/css/owl.carousel.min.css";
@import "@/assets/client/css/slicknav.min.css";
@import "@/assets/client/css/style.css";
 .zoom {
   padding: 50px;
   transition: transform .2s;
   /* Animation */
   width: 200px;
   height: 200px;
   margin: 0 auto;
 }

 .zoom:hover {
   transform: scale(1.1);
   /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
 }
</style>