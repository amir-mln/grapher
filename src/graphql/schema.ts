import { gql } from "apollo-server";

export default gql`
  type Query {
    user: User
    profile(userId: ID!): Profile
    post(postId: ID!): Post
    posts(authorId: ID!): [Post!]!
  }

  type Mutation {
    postCreate(newPost: NewPost!): PostPayload!
    postUpdate(postId: ID!, updatedPost: NewPost!): PostPayload!
    postDelete(postId: ID!): PostPayload!
  }

  type User {
    id: ID!
    name: String
    email: String
    createdAt: String
    profile: Profile
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String
    createdAt: String
    user: User!
  }

  type Post {
    id: ID!
    title: String
    content: String
    published: Boolean
    user: User!
  }

  type Error {
    message: String
  }

  type PostPayload {
    userErrors: [Error!]!
    post: Post
  }

  input NewPost {
    title: String
    content: String
    published: Boolean
  }
`;
