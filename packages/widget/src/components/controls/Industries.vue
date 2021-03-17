<template>
  <tree-select
    :value="value"
    :multiple="false"
    :options="options"
    :clearable="false"
    @input="update"
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.id }}</div>
  </tree-select>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import FindIndustries from '../../graphql/queries/FindIndustries.gql';

export default {
  apollo: {
    findIndustries: FindIndustries,
  },
  components: {
    TreeSelect,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      findIndustries: null,
      error: null,
    };
  },
  computed: {
    options() {
      const results = this.findIndustries ? this.findIndustries.results : [];
      return results.map((v) => ({ id: v, label: v }));
    },
  },
  methods: {
    update(value) {
      this.$emit('update', value);
    },
  },
};
</script>
