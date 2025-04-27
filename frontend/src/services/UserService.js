import axios from "axios";

class UserService{

    static BASE_URL = "http://localhost:8080";

    static async login(username, password) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/login`, {username, password});
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async register(userData) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/register`, userData);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getProfile(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin-user/get-profile`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async uploadAvatar(token, image) {
        if (!image)
            return;

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post(`${this.BASE_URL}/admin-user/upload-avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAvatar(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin-user/get-avatar`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async updateProfile(token, updateInfo) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/admin-user/update-profile`, updateInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async changePassword(token, passwordInfo) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/admin-user/change-password`, passwordInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error) {
            return error.response.data;
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