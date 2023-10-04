const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        bookCount: Int
        savedBooks: [Book]
    }

    type BookInput {
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        user: User
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!):Auth
        saveBook(input: BookInput!):User
        removeBook(bookId: ID!): User

    }

`;

module.exports = typeDefs;