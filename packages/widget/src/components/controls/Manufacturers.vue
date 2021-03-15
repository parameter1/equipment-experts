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
import Manufacturers from '../../graphql/Manufacturers.gql';

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
          query: Manufacturers,
          variables: { query: term }
        });
        const results = data ? data.findManufacturers.results : [];
        const options = results.map(v => ({ id: v, label: v }));
        callback(null, options);
      }
    },
  }
}
</script>
