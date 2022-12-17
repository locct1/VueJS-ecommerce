import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import BrandList from "@/views/admin/brand/list.vue";
import ProductList from "@/views/admin/product/list.vue";
import UserList from "@/views/admin/user/list.vue";
import OrderList from "@/views/admin/order/list.vue";
import AppLayout from "../layouts/App.vue";
import PublicLayout from "../layouts/Public.vue";
import store from "@/store";

const ifAuthenticated = (to, from, next) => {
  if (store.state.authenticated == true) {
    next();
    return;
  }
  next("/admin/login");
};
const routes = [
  {
    path: "/admin",
    component: AppLayout,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        name: "contactbook",
        component: ContactBook,
      },
      {
        path: "contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "contacts/add",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
      },
      // brand
      {
        path: "brand/list",
        name: "brandlist",
        component: BrandList,
      },
      {
        path: "brand/:id",
        name: "brand.edit",
        component: () => import("@/views/admin/brand/edit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "brand/add",
        name: "brand.add",
        component: () => import("@/views/admin/brand/add.vue"),
      },
      // product
      {
        path: "product/list",
        name: "productlist",
        component: ProductList,
      },
      {
        path: "product/:id",
        name: "product.edit",
        component: () => import("@/views/admin/product/edit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "product/add",
        name: "product.add",
        component: () => import("@/views/admin/product/add.vue"),
      },
      // user
      {
        path: "user/list",
        name: "userlist",
        component: UserList,
      },
      {
        path: "user/:id",
        name: "user.edit",
        component: () => import("@/views/admin/user/edit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "user/add",
        name: "user.add",
        component: () => import("@/views/admin/user/add.vue"),
      },
      // order
      {
        path: "order/list",
        name: "orderlist",
        component: OrderList,
      },
      {
        path: "order/:id",
        name: "order.detail",
        component: () => import("@/views/admin/order/orderdetail.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
    ]

  },
  {
    path: "/admin/login",
    name: "admin.login",
    component: () => import("@/views/admin/login.vue"),
  },
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/client/Home.vue"),
      },
      {
        path: "home",
        name: "products",
        component: () => import("@/views/client/Home.vue"),
      },
      {
        path: "product-detail/:id",
        name: "product.detail",
        component: () => import("@/views/client/ProductDetail.vue"),
        props: true,
      },
      {
        path: "product-search/:name",
        name: "product.search",
        component: () => import("@/views/client/ProductSearch.vue"),
        props: true,
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/views/client/Cart.vue"),
      },
      {
        path: "confirm-checkout",
        name: "confirm.checkout",
        component: () => import("@/views/client/ConfirmCheckOut.vue"),
      },
      {
        path: "checkout-success",
        name: "checkout.success",
        component: () => import("@/views/client/CheckOutSuccess.vue"),
      },
      {
        path: "all-products-by-brand/:id",
        name: "allproducts.bybrand",
        component: () => import("@/views/client/AllProductsByBrand.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
      },
      {
        path: "order-detail",
        name: "order.detail.client",
        component: () => import("@/views/client/OrderDetail.vue"),
      },
      {
        path: "/login",
        name: "client.login",
        component: () => import("@/views/client/Login.vue"),
      },
      {
        path: "/register",
        name: "client.register",
        component: () => import("@/views/client/Register.vue"),
      },
      {
        path: "/edit",
        name: "client.edit",
        component: () => import("@/views/client/EditClient.vue"),
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
