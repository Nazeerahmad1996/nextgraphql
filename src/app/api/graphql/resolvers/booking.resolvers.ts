import { getAllBookings, getBookingById } from "../../services/booking.service";

const customerResolver = {
    Query: {
        bookings: getAllBookings,
        getBookingById: (_parent: any, { id }: { id: number }) => getBookingById(id)
    },
    Mutation: {

    }
}

export default customerResolver;