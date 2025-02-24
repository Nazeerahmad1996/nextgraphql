import { getAllCustomers, getCustomerById } from "../../services/customer.service";

const customerResolver = {
    Query: {
        customers: getAllCustomers,
        getCustomerById: (_parent: any, { id }: { id: number }) => getCustomerById(id)
    },
    Mutation: {

    }
}

export default customerResolver;