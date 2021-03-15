<template>
  <div id="app">
    <label class="control-label">
      Equipment Experts Search Indexes
    </label>
    <p class="help-block">
      Each row will be used to associate this article using Elastic Search. Please use one row per index.<br>
      i.e. The article is about Wheel-loaders and showcases John Deere and Caterpillar<br>
      <pre>Industry: Agriculture,  Manufacturer: DEERE, Model: 440R
  Industry: Construction, Manufacturer: DEERE, Model: 440R
  Industry: Construction, Manufacturer: CAT,   Model: 903D</pre>
    </p>

    <table class="table search-indexes">
      <thead>
        <tr>
          <th>Industry</th>
          <th>Manufacturer</th>
          <th>Model</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <SearchIndex
          v-for="index in indexes"
          :key="index.id"
          :id="index.id"
          :content-id="contentId"
          :industry="index.industry"
          :manufacturer="index.manufacturer"
          :model="index.model"
        />
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" />
          <td>
            <ActionButton v-on:click.native="addIndex" title="Add an index">
              <IconAdd />
            </ActionButton>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import SearchIndex from './components/SearchIndex.vue'
import IconAdd from './components/icons/Add.vue';
import ActionButton from './components/ActionButton.vue';
import FindAll from './graphql/queries/FindAll.gql';

export default {
  name: 'App',
  apollo: {
    find: {
      query: FindAll,
      variables() {
        return {
          contentId: this.contentId,
        };
      },
    },
  },
  components: {
    SearchIndex,
    ActionButton,
    IconAdd,
  },
  data() {
    return {
      contentId: 15064118,
      queue: [],
    };
  },
  computed: {
    indexes() {
      return [
        ...(this.find ? [...this.find] : []),
        ...(this.queue ? [...this.queue] : []),
      ];
    },
  },
  methods: {
    addIndex() {
      this.queue.push({ id: this.indexes.length + 1 });
    },
  },
};
</script>

<style>
/* @todo fix this */
@import '../../../node_modules/@riophae/vue-treeselect/dist/vue-treeselect.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#app thead {
  text-align: left;
}
</style>

<style scoped>
.search-indexes {
  width: 100%;
}
.search-indexes th {
  width: 30%
}
</style>
