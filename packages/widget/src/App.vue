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
          @update="update"
          @remove="remove"
          @hide-message="hideMessage"
          @show-message="showMessage"
        />
      </tbody>
      <CreateIndex
        :content-id="contentId"
        :id="created"
        @create="create"
        @hide-message="hideMessage"
        @show-message="showMessage"
      />
      <tfoot v-if="message" class="search-feedback">
        <tr>
          <td colspan="4">
            {{ message }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import SearchIndex from './components/SearchIndex.vue'
import CreateIndex from './components/CreateIndex.vue'
import FindAll from './graphql/queries/FindAll.gql';
import CreateSearchIndex from './graphql/mutations/CreateSearchIndex.gql';
import UpdateSearchIndex from './graphql/mutations/UpdateSearchIndex.gql';
import DeleteSearchIndex from './graphql/mutations/DeleteSearchIndex.gql';

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
      message: null,
    };
  },
  methods: {
    hideMessage() {
      this.message = null;
    },
    showMessage(msg) {
      this.message = msg;
    },
    async create($event) {
      try {
        this.message = null;
        this.loading = true;
        const input = { ...$event, contentId: this.contentId };
        await this.$apollo.mutate({ mutation: CreateSearchIndex, variables: { input } });
        await this.$apollo.queries.find.refetch();
      } catch (e) {
        this.message = e;
      } finally {
        this.loading = false;
      }
    },
    async update($event) {
      try {
        this.message = null;
        this.loading = true;
        const update = { ...$event, contentId: this.contentId };
        await this.$apollo.mutate({ mutation: UpdateSearchIndex, variables: { update } });
        await this.$apollo.queries.find.refetch();
      } catch (e) {
        this.message = e;
      }
    },
    async remove($event) {
      try {
        this.message = null;
        this.loading = false;
        const id = $event.id;
        await this.$apollo.mutate({ mutation: DeleteSearchIndex, variables: { id } });
        await this.$apollo.queries.find.refetch();
      } catch (e) {
        this.message = e;
      } finally {
        this.loading = false;
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
.search-feedback {
  color: rgb(136, 0, 0);
  text-align: center;
  font-size: small;
}
</style>
