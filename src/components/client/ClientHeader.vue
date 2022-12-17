<template>
    <div class="humberger__menu__overlay"></div>
    <div class="humberger__menu__wrapper">
        <div class="humberger__menu__logo">
            <a href="#"><img src="http://127.0.0.1:3000/images/logo5.PNG" alt=""></a>
        </div>
        <div class="humberger__menu__cart">
            <ul>
                <!-- <li><a href="#"><i class="fa fa-heart"></i> <span>1</span></a></li> -->
                <li>
                    <router-link :to="{ name: 'cart' }"><i class="fa fa-shopping-bag"></i></router-link>
                </li>
            </ul>
            <!-- <div class="header__cart__price">item: <span>$150.00</span></div> -->
        </div>
        <div class="humberger__menu__widget">
            <!-- <div class="header__top__right__language">
                    <img src="img/language.png" alt="">
                    <div>English</div>
                    <span class="arrow_carrot-down"></span>
                    <ul>
                        <li><a href="#">Spanis</a></li>
                        <li><a href="#">English</a></li>
                    </ul>
                </div> -->
            <div class="header__top__right__auth">
                <a href="#" style="color: black;"><i class="fa fa-user"></i> Đăng nhập</a>
            </div>
        </div>
        <nav class="humberger__menu__nav mobile-menu">
            <ul>
                <li class="active"><a href="./index.html">Trang chủ</a></li>
                <li><a href="sanpham.html">Sản phẩm</a></li>
                <!-- <li><a href="#">Pages</a>
                        <ul class="header__menu__dropdown">
                            <li><a href="./shop-details.html">Shop Details</a></li>
                            <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                            <li><a href="./checkout.html">Check Out</a></li>
                            <li><a href="./blog-details.html">Blog Details</a></li>
                        </ul>
                    </li> -->
                <li><a href="./blog.html">Liên hệ</a></li>
                <li><a href="./contact.html">Tin tức</a></li>
            </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div class="header__top__right__social">
            <a href="#"><i class="fa fa-facebook" style="color: black;"></i></a>
            <a href="#"><i class="fa fa-twitter" style="color: black;"></i></a>
            <a href="#"><i class="fa fa-linkedin" style="color: black;"></i></a>
            <a href="#"><i class="fa fa-pinterest-p" style="color: black;"></i></a>
        </div>
        <div class="humberger__menu__contact">
            <ul>
                <li><i class="fa fa-envelope"></i>LKSHOP@gmail.com</li>
                <li>Miễn phí vận chuyển cho đơn hàng 5,000,000 đ</li>
            </ul>
        </div>
    </div>
    <!-- Humberger End -->

    <!-- Header Section Begin -->
    <header class="header">
        <div class="header__top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__left">
                            <ul>
                                <li><i class="fa fa-envelope"></i> LKSHOP@gmail.com</li>
                                <li>Miễn phí vận chuyển cho đơn hàng 5,000,000 đ</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__right">
                            <div class="header__top__right__social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-pinterest-p"></i></a>
                            </div>
                            <!-- <div class="header__top__right__language">
                                    <img src="img/language.png" alt="">
                                    <div>English</div>
                                    <span class="arrow_carrot-down"></span>
                                    <ul>
                                        <li><a href="#">Spanis</a></li>
                                        <li><a href="#">English</a></li>
                                    </ul>
                                </div> -->
                                <div v-if="infoClient!==null" class="header__top__right__auth">
                                    <div class="dropdown show">
                                        <a class="dropdown-toggle" style="color:white" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          {{infoClient.name}}
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <router-link :to="{ name: 'client.edit' }">   <span class="dropdown-item" style="cursor:pointer" ><i class="fa fa-edit" style="color:black"></i>Cập nhật
                                                thông tin</span></router-link>
                                            <router-link :to="{ name: 'order.detail.client' }"  style="cursor:pointer;color:black" ><span style="color:black" class="dropdown-item"><i class="fa fa-eye" ></i>Xem đơn hàng</span></router-link>
                                            <span class="dropdown-item" @click="Logout" style="cursor:pointer" ><i class="fa fa-sign-out" style="color:black"></i>    Đăng xuất</span>
                                        </div>
                                    </div>
                                </div>
                            <div v-else class="header__top__right__auth">
                                <router-link :to="{name: 'client.login'}" ><i class="fa fa-user"></i> Đăng nhập</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="header__logo">
                        <router-link :to="{ name: 'home' }"><img src="http://127.0.0.1:3000/images/logo5.PNG" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6">
                    <nav class="header__menu">
                        <ul>
                            <li class="active">
                                <router-link :to="{ name: 'home' }">Trang chủ</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'products' }">Sản phẩm</router-link>
                            </li>
                            <!-- <li><a href="#">Pages</a>
                                    <ul class="header__menu__dropdown">
                                        <li><a href="./shop-details.html">Shop Details</a></li>
                                        <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                        <li><a href="./checkout.html">Check Out</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li> -->
                            <li><a href="./blog.html">Liên hệ</a></li>
                            <li><a href="./contact.html">Tin tức</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-3">
                    <div class="header__cart">
                        <ul>
                            <li>
                                <router-link :to="{ name: 'cart' }" style="color:white"><i
                                        class="fa fa-shopping-cart text-light" style="font-size:18px;"></i> Giỏ hàng
                                    <span id="soluong_giohang">
                                        {{cartItemCount }}
                                    </span></router-link>
                            </li>
                        </ul>
                        <div class="header__cart__price text-light"><span id="tongtien_giohang">

                                Tổng: {{ String(cartTotalPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }}<sup
                                    style="text-decoration:underline">đ</sup>

                            </span></div>
                    </div>
                </div>
            </div>
            <div class="humberger__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ClientService from "@/services/client.service";
export default {
    computed: {
        ...mapState(['cart', 'authenticatedClient', 'infoClient']),
        ...mapGetters(['cartTotalPrice','cartItemCount'])
    },
    methods: {
        async Logout() {
            try {
                await ClientService.logout();
                await this.$store.dispatch("setInfoClient", null); //Add this line to redirect to login route
                await this.$store.dispatch("setAuthClient", false); //Add this line to redirect to login route
                window.scrollTo(0, 0);
                await this.$router.push('/'); // It is important to put this line too, because if you
            } catch (error) {
                console.log(error);
            }
        }
    },

}
</script>

<style>

</style>