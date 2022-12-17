<template>
    <section class="breadcrumb-section"
        v-bind:style="{ backgroundImage: 'url(' + 'http://127.0.0.1:3000/images/breadcrumb.PNG' + ')' }">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="breadcrumb__text">
                    <h2 style="font-size:28px">Bạn đã đặt hàng thành công <i class="fa fa-check"></i> Cảm ơn bạn, chúng tôi
                        sẽ liên hệ với bạn ngay khi nhận được thông báo đơn hàng.</h2>
                    <div>
                        <router-link :to="{ name: 'order.detail.client' }"  style="color:white">Xem đơn hàng của bạn tại đây</router-link>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>

<script>

</script>



