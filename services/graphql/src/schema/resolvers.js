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
      return repo.findByObjectId({ id, options: { strict: true } });
    },
    /**
     *
     */
    async find(_, { contentId }, { repo }) {
      const cursor = await repo.find({ contentId });
      return cursor.toArray();
    },
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
    /**
     * Creates a new SearchIndex
     */
    create(_, { input }, { repo }) {
      return repo.insertOne({ doc: input });
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
