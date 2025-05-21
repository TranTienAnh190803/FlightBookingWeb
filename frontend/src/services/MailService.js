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
}

export default MailService;