const { gql } = require('apollo-server-express');

module.exports = gql`

scalar ObjectID

type Query {
  "A generic ping/pong test query."
  ping: String!

  "Retrieves an index by id."
  retrieve(id: ObjectID!): SearchIndex

  "Retrieves indexes for a content id."
  find(contentId: Int!): [SearchIndex!]!
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!

  "Creates a content search index."
  create(input: CreateSearchIndexInput!): SearchIndex!

  "Update a content search index."
  update(input: UpdateSearchIndexInput!): SearchIndex!
}

type SearchIndex {
  id: ObjectID!
  contentId: Int!
  industry: String!
  manufacturer: String!
  model: String
}

input SearchIndexQueryInput {
  contentId: Int!
}

input CreateSearchIndexInput {
  contentId: Int!
  industry: String!
  manufacturer: String!
  model: String
}

input UpdateSearchIndexInput {
  id: ObjectID!
  contentId: Int!
  industry: String!
  manufacturer: String!
  model: String
}

`;
