<template>
  <tree-select
    v-model="selected"
    :multiple="false"
    :options="options"
  />
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import Industries from '../graphql/Industries.gql';

export default {
  apollo: {
    findIndustries: Industries,
  },
  components: {
    TreeSelect,
  },
  data () {
    return {
      findIndustries: null,
      selected: null,
      error: null,
    };
  },
  computed: {
    options() {
      const results = this.findIndustries.results || [];
      return results.map(v => ({ id: v, label: v }));
    },
  },
  methods: {
  }
}
</script>

<style scoped>
/* @todo fix this */
@import '../../../../node_modules/@riophae/vue-treeselect/dist/vue-treeselect.css';
</style>
