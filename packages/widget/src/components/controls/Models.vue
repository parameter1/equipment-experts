<template>
  <tree-select
    v-model="selected"
    :multiple="false"
    :async="true"
    :load-options="loadOptions"
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.id }}</div>
  </tree-select>
</template>

<script>
import TreeSelect, { ASYNC_SEARCH } from '@riophae/vue-treeselect';
import Models from '../../graphql/Models.gql';

export default {
  components: {
    TreeSelect,
  },
  props: {
    selected: {
      type: String,
      required: false,
    },
  },
  data () {
    return {
      error: null,
    };
  },
  methods: {
    async loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        const term = searchQuery || this.selected || '';
        const  { data } = await this.$apollo.query({
          query: Models,
          variables: { query: term }
        });
        const results = data ? data.findModels.results : [];
        const options = results.map(v => ({ id: v, label: v }));
        callback(null, options);
      }
    },
  }
}
</script>
