import { getAllPayments } from "../../services/payment.service";

const customerResolver = {
    Query: {
        payments: getAllPayments
    },
    Mutation: {

    }
}

export default customerResolver;