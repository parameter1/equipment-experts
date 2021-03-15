<template>
  <tree-select
    v-model="selected"
    :multiple="false"
    :options="options"
  >
    <div slot="value-label" slot-scope="{ node }">{{ node.id }}</div>
  </tree-select>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect';
import Industries from '../../graphql/Industries.gql';

export default {
  apollo: {
    findIndustries: Industries,
  },
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
      findIndustries: null,
      error: null,
    };
  },
  computed: {
    options() {
      const results = this.findIndustries ? this.findIndustries.results : [];
      return results.map(v => ({ id: v, label: v }));
    },
  },
  methods: {
  }
}
</script>
