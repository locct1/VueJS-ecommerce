import createApiClient from "./api.service";
class ClientService {
    constructor(baseUrl = "/api/clients") {
        this.api = createApiClient(baseUrl);
    }
    async getAllBrands() {
        return (await this.api.get("/all-brands")).data;
    }
    async getAllProducts() {
        return (await this.api.get("/all-products")).data;
    }
    async getAllProductsByBrand(id) {
        return (await this.api.get(`/all-products-by-brand/${id}`)).data;
    }
      async getBrand(id) {
          return (await this.api.get(`/get-brand/${id}`)).data;
  }
    async getProduct(id) {
        console.log(id)
        return (await this.api.get(`/get-product/${id}`)).data;
    }
    async createOrder(data) {
        console.log(data);
        return (await this.api.post("/create-order", data)).data;
    }
    // User
    async createUser(data) {
        return (await this.api.post("/user", data)).data;
    }
    async login(data) {
        console.log(data)
        return (await this.api.post("user/login", data)).data;
    }
    async logout() {
        return (await this.api.post("/user/logout")).data;
    }
    async getInfoClient() {

        return (await this.api.get("/user/get-info-client", {
            withCredentials: true
        })).data;
    }
    async updateUser(id, data) {
        return (await this.api.put(`/user/${id}`, data)).data;
    }
    async getOrdersByClient(id) {
        console.log(id);
        return (await this.api.get(`/get-orders-by-client/${id}`)).data;
    }
}
export default new ClientService();
