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

  "Retrieves indexes by content ids."
  findAll(contentIds: [Int!]!): [SearchIndex!]!

  "Retrieves items from the EE Industries API"
  findIndustries(query: String, page: Int = 1): SearchResults!

  "Retrieves items from the EE Manufacturers API"
  findManufacturers(query: String, page: Int = 1): SearchResults!

  "Retrieves items from the EE Models API"
  findModels(query: String, page: Int = 1): SearchResults!
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!

  "Creates a content search index."
  create(input: CreateSearchIndexInput!): SearchIndex!

  "Update a content search index."
  update(input: UpdateSearchIndexInput!): SearchIndex!

  "Delete a content search index."
  delete(id: ObjectID!): Boolean!
}

type SearchIndex {
  id: ObjectID!
  contentId: Int!
  industry: String
  manufacturer: String
  model: String
}

type SearchResults {
  total: Int!
  results: [String!]!
  error: String
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
