import axios from "axios";

class UserService{

    static BASE_URL = "http://localhost:8080";

    static async login(username, password) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/login`, {username, password});
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/register`, userData);

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getProfile(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin-user/get-profile`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        } catch (error) {
            throw error
        }
    }

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    // Authenticate and Authorize
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        if (token === null)
            return false;
        return true;
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        if (role === "ADMIN" && this.isAuthenticated())
            return true;
        return false;
    }

    static isUser() {
        const role = localStorage.getItem("role");
        if (role === "USER" && this.isAuthenticated())
            return true;
        return false;
    }
}

export default UserService;