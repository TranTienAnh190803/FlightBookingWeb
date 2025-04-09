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

    static async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        if (token === null)
            return false;
        return true;
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        if (role === "ADMIN")
            return true;
        return false;
    }

    static isUser() {
        const role = localStorage.getItem("role");
        if (role === "USER")
            return true;
        return false;
    }
}

export default UserService;