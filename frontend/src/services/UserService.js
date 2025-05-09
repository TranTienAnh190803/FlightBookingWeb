import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

    static async refreshToken(tokenNeedRefresh) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/refresh`, {token: tokenNeedRefresh});
            
            return response.data;
        } catch (error) {
            throw error.response.data;
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
            });

            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async updateProfile(token, updateInfo) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/admin-user/update-profile`, updateInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllUser(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-all-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSelectedUser(token, id) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-selected-user?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getUserAvatarById(token, id) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-user-avatar?id=${id}`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async resetPassword(token, id) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/admin/reset-password?id=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteAccount(token, id) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/admin/delete-account?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async registerAdmin(token, adminInfo) {
        try {
            const response = await axios.post(`${this.BASE_URL}/admin/register-admin`, adminInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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

    static isTokenExpired(token) {
        try {
            const decode = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            return decode.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    static isTokenAlmostExpire(token) {
        try {
            const decode = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            return ((decode.exp - 3600000) < currentTime);
        } catch (error) {
            return false;
        }
    }
}

export default UserService;