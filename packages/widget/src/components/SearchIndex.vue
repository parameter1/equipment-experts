<template>
  <li class="bg-white shadow rounded border-r-6 flex min-h-110px border-green-500 p-3 relative
  grid grid-cols-7 gap-3">
    <div class="flex flex-col col-span-2">
      <label class="font-semibold">Industry</label>
      <Industries v-if="isEditing" :value="$data.lIndustry" @update="$data.lIndustry = $event" />
      <span v-else>{{ industry }}</span>
    </div>
    <div class="flex flex-col col-span-2">
      <label class="font-semibold">Manufacturer</label>
      <Manufacturers
        v-if="isEditing"
        :value="$data.lManufacturer"
        @update="$data.lManufacturer = $event"
      />
      <span v-else>{{ manufacturer }}</span>
    </div>
    <div class="flex flex-col col-span-2">
      <label class="font-semibold">Model</label>
      <Models v-if="isEditing" :value="$data.lModel" @update="$data.lModel = $event"  />
      <span v-else>{{ model }}</span>
    </div>
    <Toolbar
      :is-editing="isEditing"
      :is-loading="isLoading"
      @toggle="toggle"
      @update="save"
      @remove="remove"
    />
  </li>
</template>

<script>
import Industries from './controls/Industries.vue';
import Manufacturers from './controls/Manufacturers.vue';
import Models from './controls/Models.vue';

import Toolbar from './ToolbarUpdate.vue';

export default {
  components: {
    Industries,
    Manufacturers,
    Models,
    Toolbar,
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
