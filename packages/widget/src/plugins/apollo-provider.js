import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client';

const { VUE_APP_GRAPHQL_HTTP } = process.env;

Vue.use(VueApollo);

export default (url) => {
  const httpEndpoint = url || VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql';
  const { apolloClient } = createApolloClient({ httpEndpoint, persisting: false, ssr: false });

  return new VueApollo({
    defaultClient: apolloClient,
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message);
    },
  });
};
