import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const { VUE_APP_GRAPHQL_HTTP } = process.env;
Vue.use(VueApollo);

export default (url) => {
  const uri = url || VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql';
  return new VueApollo({
    defaultClient: new ApolloClient({ uri, cache: new InMemoryCache() }),
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
    },
  });
};
