<template>
  <li class="bg-white shadow rounded border-r-6 min-h-110px border-green-500 p-3 relative
  grid grid-rows-2 gap-1">
    <div class="grid grid-cols-7 gap-3">
      <label class="font-semibold col-span-2">Industry</label>
      <label class="font-semibold col-span-2">Manufacturer</label>
      <label class="font-semibold col-span-2">Model</label>
      <div class="flex flex-col justify-around">
        <ActionButton v-if="isEditing" v-on:click.native="save" text="Save" icon="save" />
        <ActionButton v-else v-on:click.native="isEditing = true" text="Edit" icon="edit" />
      </div>
    </div>
    <div class="grid grid-cols-7 gap-3">
      <div class="col-span-2">
        <Industries
          v-if="isEditing"
          :value="$data.lIndustry"
          @update="$data.lIndustry = $event"
        />
        <span v-else>{{ industry }}</span>
      </div>
      <div class="col-span-2">
        <Manufacturers
          v-if="isEditing"
          :value="$data.lManufacturer"
          @update="$data.lManufacturer = $event"
        />
        <span v-else>{{ manufacturer }}</span>
      </div>
      <div class="col-span-2">
        <Models
          v-if="isEditing"
          :value="$data.lModel"
          @update="$data.lModel = $event"
        />
        <span v-else>{{ model }}</span>
      </div>
      <div class="flex flex-col justify-around">
        <ActionButton
          v-if="isEditing"
          v-on:click.native="isEditing = false"
          text="Cancel"
          icon="cancel"
        />
        <ActionButton v-else v-on:click.native="remove" text="Delete" icon="trash" />
      </div>
    </div>
  </li>
</template>

<script>
import Industries from './controls/Industries.vue';
import Manufacturers from './controls/Manufacturers.vue';
import Models from './controls/Models.vue';

import ActionButton from './ActionButton.vue';

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
  },
  data: (instance) => ({
    isLoading: false,
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
