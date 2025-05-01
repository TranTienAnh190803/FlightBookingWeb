import axios from "axios";

export default class FlightService {
    static BASE_URL = "http://localhost:8080";

    static async addFlight(token, flightInfo) {
        try {
            const response = await axios.post(`${this.BASE_URL}/admin/add-flight`, flightInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllFlight() {
        try {
            const response = await axios.get(`${this.BASE_URL}/public/get-all-flight`);
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}