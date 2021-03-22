<template>
  <li class="tw-bg-white tw-shadow tw-rounded tw-min-h-110px
  tw-p-3 tw-relative tw-grid tw-grid-rows-2 tw-gap-1">
    <div class="tw-grid tw-grid-cols-7 tw-gap-3">
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Industry</label>
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Manufacturer</label>
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Model</label>
      <div class="tw-flex tw-flex-col tw-justify-around">
        <action-button
          v-on:click.native="create"
          label="Save"
          icon="save"
          button-type="submit"
          loading-label="Creating"
          :is-loading="isCreating"
          :disabled="isCreating"
        />
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-7 tw-gap-3">
      <div class="tw-col-span-2">
        <industries
          :value="$data.industry"
          @update="$data.industry = $event"
        />
      </div>
      <div class="tw-col-span-2">
        <manufacturers
          :value="$data.manufacturer"
          @update="$data.manufacturer = $event"
        />
      </div>
      <div class="tw-col-span-2">
        <models
          :value="$data.model"
          @update="$data.model = $event"
        />
      </div>
      <div class="tw-flex tw-flex-col tw-justify-around">
        <action-button
          v-on:click.native="$emit('cancel')"
          label="Cancel"
          icon="cancel"
          :disabled="isCreating"
        />
      </div>
    </div>
    <alert
      v-if="error"
      type="danger"
      class="tw-m-auto tw-max-w-4xl tw-mt-4"
      header="An error occurred"
    >
      {{ error.message }}
    </alert>
  </li>
</template>

<script>
import Industries from './fields/industries.vue';
import Manufacturers from './fields/manufacturers.vue';
import Models from './fields/models.vue';
import ActionButton from './action-button.vue';
import Alert from './alert.vue';
import CreateSearchIndex from '../graphql/mutations/CreateSearchIndex.gql';

export default {
  components: {
    Alert,
    Industries,
    Manufacturers,
    Models,
    ActionButton,
  },
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    isCreating: false,
    industry: null,
    manufacturer: null,
    model: null,
    error: null,
  }),
  mounted() {
    this.$el.scrollIntoView({ behavior: 'smooth' });
  },
  methods: {
    async create() {
      if (!this.$data.industry || !this.$data.manufacturer) {
        this.error = new Error('Industry and manufacturer are required!');
        return;
      }
      try {
        this.isCreating = true;
        this.error = null;
        const input = {
          industry: this.$data.industry,
          manufacturer: this.$data.manufacturer,
          model: this.$data.model,
          contentId: this.contentId,
        };
        if (!this.$data.industry || !this.$data.manufacturer) {
          throw new Error('Industry and manufacturer are required!');
        }

        await this.$apollo.mutate({ mutation: CreateSearchIndex, variables: { input } });
        this.$emit('refresh');
        this.$emit('cancel');
      } catch (e) {
        this.error = e;
      } finally {
        this.$data.industry = this.$props.industry;
        this.$data.manufacturer = this.$props.manufacturer;
        this.$data.model = this.$props.model;
        this.isCreating = false;
        this.$emit('refresh');
      }
    },
  },
};
</script>
