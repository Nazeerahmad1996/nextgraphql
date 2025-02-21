import { getAllCustomers } from "../../services/customer.service";

const customerResolver = {
    Query: {
        customers: getAllCustomers
    },
    Mutation: {

    }
}

export default customerResolver;