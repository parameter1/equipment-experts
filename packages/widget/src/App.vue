<template>
  <div class="tw-antialiased tw-bg-base-gray-1 tw-mx-auto tw-p-4 sm:tw-p-6 md:tw-p-8 tw-flex
  tw-flex-col tw-my-5 tw-border tw-border-base-gray-9 ee-widget">
    <div class="tw-pb-4">
      <h1 class="tw-text-xl tw-font-semibold tw-m-0">Experts Exchange</h1>
    </div>
    <div class="">
      <div class="tw-flex tw-justify-between tw-items-center">
        <div>
          <span v-if="find">{{ find.length }}</span> search indexes
        </div>
        <action-button
          v-on:click.native="isCreateVisible = true"
          :disabled="isLoading || isCreateVisible"
          label="Add an index"
          icon="add"
        />
      </div>
      <div class="tw-my-5"></div>
      <div v-if="isLoading" class="tw-flex">
        <div class="tw-m-auto tw-flex tw-items-center">
          <h1 class="tw-text-xl tw-font-semibold tw-mr-2">Loading</h1>
          <loading-spinner color="gray-600" :size=5 />
        </div>
      </div>
      <ul v-else class="tw-space-y-5">
        <SearchIndex
          v-for="index in find"
          :key="index.id"
          :id="index.id"
          :content-id="contentId"
          :industry="index.industry"
          :manufacturer="index.manufacturer"
          :model="index.model"
          @refresh="refresh"
          @hide-message="hideMessage"
          @show-message="showMessage"
        />
        <CreateIndex
          v-if="isCreateVisible"
          ref="create"
          :content-id="contentId"
          @refresh="refresh"
          @cancel="cancel"
          @hide-message="hideMessage"
          @show-message="showMessage"
        />
      </ul>
    </div>
    <alert
      v-if="error"
      type="danger"
      class="tw-m-auto tw-max-w-4xl tw-mt-4"
      header="An error occurred"
    >
      {{ error.message }}
    </alert>
  </div>
</template>

<script>
import LoadingSpinner from './components/loading-spinner.vue';
import Alert from './components/alert.vue';
import SearchIndex from './components/search-index-edit.vue';
import CreateIndex from './components/search-index-create.vue';
import ActionButton from './components/action-button.vue';
import FindAll from './graphql/queries/FindAll.gql';
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
      // watch loading here
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
      isCreateVisible: false,
      isCreating: false,
      isDeleting: false,
      isSaving: false,
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
    refresh() {
      return this.$apollo.queries.find.refetch();
    },
    cancel() {
      this.isCreateVisible = false;
      this.hideMessage();
    },
  },
};
</script>
