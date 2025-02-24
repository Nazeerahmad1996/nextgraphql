import { geteAllReviews, getReviewById } from "../../services/review.service";

const reviewResolver = {
    Query: {
        reviews: geteAllReviews,
        getReviewById: (_parent: any, { id }: { id: number }) => getReviewById(id)
    },
    Mutation: {

    }
}

export default reviewResolver;