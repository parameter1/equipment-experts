const merge = require('lodash.merge');

module.exports = merge({
  /**
   *
   */
  Query: {
    /**
     *
     */
    ping() {
      return 'pong';
    },
    /**
     * Returns a SearchIndex by id
     */
    retrieve(_, { id }, { repo }) {
      return repo.findByObjectId(id);
    },
    /**
     *
     */
  },
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    ping() {
      return 'pong';
    },
  },

  /**
   *
   */
  SearchIndex: {
    id({ _id }) {
      return _id;
    },
  },
});
