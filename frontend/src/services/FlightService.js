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

    static async getSelectedFlight(token, flightId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin-user/get-selected-flight?flightId=${flightId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async editFlight(token, flightEdited, flightId) {
        try {
            const response = await axios.put(`${this.BASE_URL}/admin/edit-flight?flightId=${flightId}`, flightEdited, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteFlight(token, flightId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/admin/delete-flight?flightId=${flightId}`, {
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