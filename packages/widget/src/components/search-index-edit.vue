<template>
  <li class="tw-bg-white tw-shadow tw-rounded tw-min-h-110px
    tw-p-3 tw-relative tw-grid tw-grid-rows-2 tw-gap-1">
    <div class="tw-grid tw-grid-cols-7 tw-gap-3">
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Industry</label>
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Manufacturer</label>
      <label class="tw-font-semibold tw-col-span-2 tw-text-base">Model</label>
      <div class="tw-flex tw-flex-col tw-justify-around">
        <action-button
          v-if="isFormVisible"
          v-on:click.native="save"
          label="Save"
          icon="save"
          :is-loading="isSaving"
          :disabled="isSaving"
        />
        <action-button
          v-else
          v-on:click.native="isEditing = true"
          label="Edit"
          icon="edit"
        />
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-7 tw-gap-3">
      <div class="tw-col-span-2">
        <industries
          v-if="isFormVisible"
          :value="$data.lIndustry"
          @update="$data.lIndustry = $event"
        />
        <span v-else>{{ industry }}</span>
      </div>
      <div class="tw-col-span-2">
        <manufacturers
          v-if="isFormVisible"
          :value="$data.lManufacturer"
          @update="$data.lManufacturer = $event"
        />
        <span v-else>{{ manufacturer }}</span>
      </div>
      <div class="tw-col-span-2">
        <models
          v-if="isFormVisible"
          :value="$data.lModel"
          @update="$data.lModel = $event"
        />
        <span v-else>{{ model }}</span>
      </div>
      <div class="tw-flex tw-flex-col tw-justify-around">
        <action-button
          v-if="isFormVisible"
          v-on:click.native="isEditing = false"
          label="Cancel"
          icon="cancel"
          :disabled="isLoading || isSaving"
        />
        <action-button
          v-else
          v-on:click="remove"
          :must-confirm=true
          label="Delete"
          icon="trash"
          :is-loading="isDeleting"
          :disabled="isDeleting"
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
    id: {
      type: [String, Number],
      required: true,
    },
    contentId: {
      type: Number,
      required: true,
    },
    industry: String,
    manufacturer: String,
    model: String,
    isLoading: {
      type: Boolean,
      required: true,
    },
    isDeleting: {
      type: Boolean,
      required: true,
    },
    isSaving: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isFormVisible() {
      return this.isLoading || this.isSaving || this.isEditing;
    },
  },
  data: (instance) => ({
    isEditing: false,
    lIndustry: instance.industry,
    lManufacturer: instance.manufacturer,
    lModel: instance.model,
  }),
  methods: {
    save() {
      this.$emit('update', {
        id: this.id,
        industry: this.$data.lIndustry,
        manufacturer: this.$data.lManufacturer,
        model: this.$data.lModel,
      });
      this.isEditing = false;
    },
    async toggle() {
      this.isEditing = !this.isEditing;
    },
    async remove() {
      this.$emit('remove', { id: this.id });
      this.isEditing = false;
    },
  },
};
</script>
