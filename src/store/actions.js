export const setAuth = async ({ commit }, auth) => {
    commit('SET_AUTH', auth)
}
export const setInfoAdmin = async ({ commit }, infoAdmin) => {
    commit('SET_INFO_ADMIN', infoAdmin)
}
export const setAuthClient = async ({ commit }, auth) => {
    
    commit('SET_AUTH_CLIENT', auth)
}
export const setInfoClient = async ({ commit }, infoClient) => {
    commit('SET_INFO_CLIENT', infoClient)
}
export const addProductToCart = async ({ commit }, { product, quantity }) => {
    commit('ADD_TO_CART', { product, quantity })
}
export const updateQuantity = async ({ commit }, { product, quantity }) => {
    commit('UPDATE_QUANTITY', { product, quantity })
}
export const removeProductFromCart = async ({ commit }, product) => {
    commit('REMOVE_PRODUCT_FROM_CART', product);
   
}
export const clearCartItems = async ({ commit }) => {
    commit('CLEAR_CART_ITEMS');
}