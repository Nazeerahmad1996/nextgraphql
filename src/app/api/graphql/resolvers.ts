import customerResolvers from './resolvers/customer.resolver';
import roomResolvers from './resolvers/room.resolver';
import bookingResolvers from './resolvers/booking.resolvers';
import paymentResolvers from './resolvers/payment.resolvers';
import reviewResolvers from './resolvers/review.resolvers';

const resolvers = {
  Query: {
    ...customerResolvers.Query,
    ...roomResolvers.Query,
    ...bookingResolvers.Query,
    ...paymentResolvers.Query,
    ...reviewResolvers.Query
  },
  Mutation: {
    ...customerResolvers.Mutation,
    ...roomResolvers.Mutation,
    ...bookingResolvers.Mutation,
    ...paymentResolvers.Mutation,
    ...reviewResolvers.Mutation,
  },
};

export default resolvers;
