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
    /**
     * Updates a SearchIndex
     */
    async update(_, { input }, { repo }) {
      const { id, ...payload } = input;
      const _id = repo.coerceObjectId(id);
      await repo.updateOne({
        query: { _id },
        update: { $set: payload },
        options: { strict: true },
      });
      return repo.findByObjectId({ id: _id, options: { strict: true } });
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
