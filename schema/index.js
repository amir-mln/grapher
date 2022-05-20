import { gql } from "apollo-server";

export default gql`
  type Query {
    products(filters: ProductsFilters): [Product!]!
    product(id: ID!): Product
    reviews(filters: ProductsFilters): [Review!]!
    review(id: ID!): Review
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
    onSale: Boolean!
    imageUrl: String
    description: String!
    category: Category!
    reviews: [Review!]!
  }

  input ProductsFilters {
    onSale: Boolean
    avgRating: Int
  }

  type Category {
    id: ID!
    name: String!
    products(filters: ProductsFilters): [Product!]!
  }

  type Review {
    id: ID!
    date: String
    title: String
    comment: String
    rating: Int
    product: Product
  }
`;
