import { getAllBookings } from "../../services/booking.service";

const customerResolver = {
    Query: {
        bookings: getAllBookings
    },
    Mutation: {

    }
}

export default customerResolver;