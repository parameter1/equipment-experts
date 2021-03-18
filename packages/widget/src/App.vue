<template>
  <div class="antialiased">
    <div v-if="isLoading" class="h-screen flex">
      <div class="m-auto flex items-center">
        <h1 class="text-xl font-semibold mr-2">Loading Equipment Experts Search Indexes</h1>
        <loading-spinner color="blue-700" :size=8 />
      </div>
    </div>
    <div v-else-if="error" class="h-screen flex">
      <alert type="danger" class="m-auto max-w-4xl" header="An error occurred">
        {{ error.error }}
      </alert>
    </div>
    <div v-else class="h-screen flex overflow-hidden bg-gray-100">
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
        @create="create"
        @hide-message="hideMessage"
        @show-message="showMessage"
      />
      <tfoot v-if="error" class="search-feedback">
        <tr>
          <td colspan="4">
            {{ error }}
          </td>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './components/loading-spinner.vue';
import Alert from './components/alert.vue';
import SearchIndex from './components/SearchIndex.vue';
import CreateIndex from './components/CreateIndex.vue';
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
    Alert,
    LoadingSpinner,
    SearchIndex,
    CreateIndex,
  },
  props: {
    contentId: {
      type: Number,
      required: true,
      default: () => 15064118,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },
  methods: {
    hideMessage() {
      this.error = null;
    },
    showMessage(message) {
      this.error = { message };
    },
    async create($event) {
      try {
        this.error = null;
        const input = { ...$event, contentId: this.contentId };
        await this.$apollo.mutate({ mutation: CreateSearchIndex, variables: { input } });
        await this.$apollo.queries.find.refetch();
      } catch (e) {
        this.error = e;
      }
    },
    async update($event) {
      try {
        this.error = null;
        const update = { ...$event, contentId: this.contentId };
        await this.$apollo.mutate({ mutation: UpdateSearchIndex, variables: { update } });
      } catch (e) {
        this.error = e;
      }
    },
    async remove($event) {
      try {
        this.error = null;
        const { id } = $event;
        await this.$apollo.mutate({ mutation: DeleteSearchIndex, variables: { id } });
        await this.$apollo.queries.find.refetch();
      } catch (e) {
        this.error = e;
      }
    },
  },
};
</script>

<style>
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* @import '@riophae/vue-treeselect'; */
/* @import '../../../node_modules/@riophae/vue-treeselect/dist/vue-treeselect.css'; */

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
