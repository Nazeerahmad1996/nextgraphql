import { getAllPayments, getPaymentById } from "../../services/payment.service";

const customerResolver = {
    Query: {
        payments: getAllPayments,
        getPaymentById: (_parent: any, { id }: { id: number }) => getPaymentById(id)
    },
    Mutation: {

    }
}

export default customerResolver;