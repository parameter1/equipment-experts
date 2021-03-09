const { gql } = require('apollo-server-express');

module.exports = gql`

scalar ObjectID

type Query {
  "A generic ping/pong test query."
  ping: String!

  "Retrieves an index by id."
  retrieve(id: ObjectID!): SearchIndex
}

type Mutation {
  "A generic ping/pong test mutation."
  ping: String!
}

type SearchIndex {
  id: ObjectID!
  contentId: Int!
  industry: String!
  manufacturer: String!
  model: String
}
}

`;
