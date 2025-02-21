import { gql } from 'graphql-tag';

// GraphQL Schema
const typeDefs = gql`
  type Customer {
    id: Int
    name: String
    email: String
    phone: String
  }

  type Room {
    id: Int!
    owner_id: Int!
    owner: Customer!
    title: String!
    description: String!
    location: String!
    price: Float!
    max_guests: Int!
    status: String!
    created_at: String!
  }

  type Booking {
    id: Int!
    customer_id: Int!
    room_id: Int!
    check_in: String!
    check_out: String!
    total_price: Float!
    status: String!
    created_at: String!
    room: Room!
    customer: Customer!
  }

  type Payment {
    id: Int!
    booking_id: Int!
    amount: Float!
    payment_method: String!
    status: String!
    transaction_id: String!
    created_at: String!
    booking: Booking!
  }

  type Review {
    id: Int!
    customer_id: Int!
    room_id: Room!
    rating: Int!
    comment: String
    created_at: String!
    customer: Customer!
    room: Room!
  }

  type Query {
    customers: [Customer]
    rooms: [Room]
    payments: [Payment]
    reviews: [Review]
    bookings: [Booking]
  }

  type Mutation {
    generateMockData: String
  }
`;

export default typeDefs