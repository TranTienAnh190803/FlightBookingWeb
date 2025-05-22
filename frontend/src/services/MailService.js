import axios from "axios";

class MailService {
    static BASE_URL = "http://localhost:8080";

    static async sendMail(mailForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/public/send-mail`, mailForm);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllMail(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-all-mail`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSelectedMail(token, mailId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-selected-mail?mailId=${mailId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteMail(token, mailId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/admin/delete-mail?mailId=${mailId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async readMail(token, mailId) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/admin/read-mail?mailId=${mailId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default MailService;