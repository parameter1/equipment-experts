<template>
  <div id="app">
    <h1 class="control-label">
      Equipment Experts Search Indexes
    </h1>
    <hr>

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
          v-for="index in find"
          :key="index.id"
          :id="index.id"
          :content-id="contentId"
          :industry="index.industry"
          :manufacturer="index.manufacturer"
          :model="index.model"
        />
      </tbody>
      <CreateIndex
        :content-id="contentId"
        :id="created"
        @create="create"
      />
    </table>
  </div>
</template>

<script>
import SearchIndex from './components/SearchIndex.vue'
import CreateIndex from './components/CreateIndex.vue'
import FindAll from './graphql/queries/FindAll.gql';
import CreateSearchIndex from './graphql/mutations/CreateSearchIndex.gql';

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
    CreateIndex,
  },
  data() {
    return {
      contentId: 15064118,
      isCreating: false,
      created: 0,
    };
  },
  methods: {
    async create($event) {
      console.log('create', $event);
      try {
        const input = { ...$event, contentId: this.contentId };
        const { data } = await this.$apollo.mutate({
          mutation: CreateSearchIndex,
          variables: { input }
        });
        console.log(data);
        this.created += 1;
        this.isCreating = false;
      } catch (e) {
        console.log(e);
      } finally {
        console.log('done!');
        // Refresh queries?
      }
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
