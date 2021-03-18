<template>
  <div class="antialiased bg-gray-100 mx-auto p-4 sm:p-6 md:p-8">
    <div class="pb-4">
      <h1 class="text-xl font-semibold mr-2">Experts Exchange</h1>
    </div>
    <div class="">
      <div class="flex justify-between items-center">
        <div>
          <span v-if="find">{{ find.length }}</span> search indexes
        </div>
        <ActionButton v-on:click.native="isCreating = true" text="Add an index" icon="add" />
      </div>
      <div class="my-5"></div>
      <div v-if="isLoading" class="flex">
        <div class="m-auto flex items-center">
          <h1 class="text-xl font-semibold mr-2">Loading</h1>
          <loading-spinner color="blue-700" :size=8 />
        </div>
      </div>
      <ul v-else class="space-y-5">
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
        <CreateIndex v-if="isCreating"
          :content-id="contentId"
          @create="create"
          @cancel="isCreating = false"
          @hide-message="hideMessage"
          @show-message="showMessage"
        />
      </ul>
    </div>
    <alert v-if="error" type="danger" class="m-auto max-w-4xl mt-4" header="An error occurred">
      {{ error.message }}
    </alert>
  </div>
</template>

<script>
import LoadingSpinner from './components/loading-spinner.vue';
import Alert from './components/alert.vue';
import SearchIndex from './components/search-index-edit.vue';
import CreateIndex from './components/search-index-create.vue';
import ActionButton from './components/ActionButton.vue';
import FindAll from './graphql/queries/FindAll.gql';
import CreateSearchIndex from './graphql/mutations/CreateSearchIndex.gql';
import UpdateSearchIndex from './graphql/mutations/UpdateSearchIndex.gql';
import DeleteSearchIndex from './graphql/mutations/DeleteSearchIndex.gql';
import GraphQLError from './utils/graphql-error';

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
      error(e) {
        const error = new GraphQLError(e);
        this.error = error;
      },
    },
  },
  components: {
    Alert,
    LoadingSpinner,
    SearchIndex,
    CreateIndex,
    ActionButton,
  },
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      isCreating: false,
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
        this.isCreating = false;
      } catch (e) {
        this.error = e;
      }
    },
    async update($event) {
      try {
        this.error = null;
        const update = { ...$event, contentId: this.contentId };
        // Allow removal of model
        update.model = update.model || null;
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
