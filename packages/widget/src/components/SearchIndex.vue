<template>
  <li class="bg-white shadow rounded border-r-6 flex min-h-110px border-green-500 p-3 relative
  grid grid-cols-3 gap-3">
    <div class="flex flex-col">
      <label>Industry</label>
      <Industries v-if="isEditing" :value="$data._industry" @update="$data._industry = $event" />
      <span v-else>{{ industry }}</span>
    </div>
    <div class="flex flex-col">
      <label>Manufacturer</label>
      <Manufacturers
        v-if="isEditing"
        :value="$data._manufacturer"
        @update="$data._manufacturer = $event"
      />
      <span v-else>{{ manufacturer }}</span>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <label>Model</label>
        <Models v-if="isEditing" :value="$data._model" @update="$data._model = $event"  />
        <span v-else>{{ model }}</span>
      </div>
      <Toolbar
        :is-editing="isEditing"
        :is-loading="isLoading"
        @toggle="toggle"
        @update="save"
        @remove="remove"
      />
    </div>
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
    industry: instance.industry,
    manufacturer: instance.manufacturer,
    model: instance.model,
  }),
  methods: {
    save() {
      this.$emit('update', {
        id: this.id,
        industry: this.$data.industry,
        manufacturer: this.$data.manufacturer,
        model: this.$data.model,
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
