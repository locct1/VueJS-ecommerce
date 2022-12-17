export const SET_AUTH = (state, auth) => {
    state.authenticated = auth
}
export const SET_INFO_ADMIN = (state, infoAdmin) => {
    state.infoAdmin = infoAdmin
}
export const SET_AUTH_CLIENT = (state, authClient) => {
    state.authenticatedClient = authClient
    console.log(state.authenticatedClient);
}
export const SET_INFO_CLIENT = (state, infoClient) => {
    state.infoClient = infoClient
    console.log('check', state.infoClient)
}
export const ADD_TO_CART = (state, { product, quantity }) => {
    delete product.brand_code;
    delete product.createAt;
    delete product.updateAt;
    let productInCart = state.cart.find(item => {
        return item.product.code === product.code;
    });
    if (productInCart) {
        productInCart.quantity += quantity;
        return;
    }
    state.cart.push({
        product, quantity
    })
}
export const UPDATE_QUANTITY = (state, { product, quantity }) => {
    console.log(212121212);
    let productInCart = state.cart.find(item => {
        return item.product.code === product.code;
    });
    if (productInCart) {
        productInCart.quantity = quantity;
        return;
    }
    state.cart.push({
        product, quantity
    })
}
export const SET_CART = (state, cartItems) => {
    state.cart = cartItems;
}
export const REMOVE_PRODUCT_FROM_CART = (state, product) => {
    state.cart = state.cart.filter(item => {
        return item.product.code !== product.code
    });
}
export const CLEAR_CART_ITEMS = (state) => {
    state.cart = [];
}