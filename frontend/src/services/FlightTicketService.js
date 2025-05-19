import axios from "axios";

export default class FlightTicketService {
    static BASE_URL = "http://localhost:8080";

    static async bookingFlight(token, flightId, bookingInfo) {
        try {
            const response = await axios.post(`${this.BASE_URL}/user/book-flight?flightId=${flightId}`, bookingInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getContactInfo(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/get-contact-info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getBookingHistory(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/booking-history`, {
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