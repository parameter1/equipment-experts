<template>
  <tree-select
    :value="value"
    :multiple="false"
    :async="true"
    :load-options="loadOptions"
    @input="update"
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.id }}</div>
  </tree-select>
</template>

<script>
import TreeSelect, { ASYNC_SEARCH } from '@riophae/vue-treeselect';
import FindManufacturers from '../../graphql/queries/FindManufacturers.gql';

export default {
  components: {
    TreeSelect,
  },
  props: {
    value: {
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
        const term = searchQuery || this.value || '';
        const { data } = await this.$apollo.query({
          query: FindManufacturers,
          variables: { query: term }
        });
        const results = data ? data.findManufacturers.results : [];
        const options = results.map(v => ({ id: v, label: v }));
        callback(null, options);
      }
    },
    update(value) {
      this.$emit('update', value);
    }
  }
}
</script>
