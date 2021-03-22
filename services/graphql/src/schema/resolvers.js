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
     * Returns all SearchIndexes for a content id
     */
    async find(_, { contentId }, { repo }) {
      const cursor = await repo.find({ query: { contentId } });
      return cursor.toArray();
    },
    /**
     * Returns third-party data matching the search query (if present)
     */
    findIndustries(_, { query, page }, { client }) {
      return client.findIndustries({ query, page });
    },
    /**
     * Returns third-party data matching the search query (if present)
     */
    findManufacturers(_, { query, page }, { client }) {
      return client.findManufacturers({ query, page });
    },
    /**
     * Returns third-party data matching the search query (if present)
     */
    findModels(_, { query, page }, { client }) {
      return client.findModels({ query, page });
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
    /**
     * Deletes a SearchIndex
     */
    async delete(_, { id }, { repo }) {
      const { result } = await repo.deleteOne({
        query: { _id: repo.coerceObjectId(id) },
        options: { strict: true },
      });
      return Boolean(result.ok);
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
