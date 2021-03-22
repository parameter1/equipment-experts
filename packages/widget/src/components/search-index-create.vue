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
          loading-label="Saving"
          :is-loading="isLoading || isCreating"
          :disabled="isLoading || isCreating"
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
          :disabled="isLoading || isCreating"
        />
      </div>
    </div>
  </li>
</template>

<script>
import Industries from './fields/industries.vue';
import Manufacturers from './fields/manufacturers.vue';
import Models from './fields/models.vue';

import ActionButton from './action-button.vue';

export default {
  components: {
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
    isLoading: {
      type: Boolean,
      required: true,
    },
    isCreating: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    isEditing: false,
    industry: null,
    manufacturer: null,
    model: null,
  }),
  methods: {
    create() {
      this.$emit('hide-message');
      if (this.$data.industry && this.$data.manufacturer) {
        this.$emit('create', {
          industry: this.$data.industry,
          manufacturer: this.$data.manufacturer,
          model: this.$data.model,
        });
        this.$data.industry = this.$props.industry;
        this.$data.manufacturer = this.$props.manufacturer;
        this.$data.model = this.$props.model;
      } else {
        this.$emit('show-message', 'Industry and Manufacturer must be specified!', 'text-danger');
      }
    },
  },
};
</script>
