import { geteAllReviews } from "../../services/review.service";

const reviewResolver = {
    Query: {
        reviews: geteAllReviews
    },
    Mutation: {

    }
}

export default reviewResolver;