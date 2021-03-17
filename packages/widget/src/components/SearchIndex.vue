<template>
  <tr class="search-index">
    <td>
      <Industries v-if="isEditing" :value="$data._industry" @update="$data._industry = $event" />
      <span v-else>{{ industry }}</span>
    </td>
    <td>
      <Manufacturers
        v-if="isEditing"
        :value="$data._manufacturer"
        @update="$data._manufacturer = $event"
      />
      <span v-else>{{ manufacturer }}</span>
    </td>
    <td>
      <Models v-if="isEditing" :value="$data._model" @update="$data._model = $event"  />
      <span v-else>{{ model }}</span>
    </td>
    <Toolbar
      :is-editing="isEditing"
      :is-loading="isLoading"
      @toggle="toggle"
      @update="save"
      @remove="remove"
    />
  </tr>
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

<style scoped>
.search-index td {
  max-width: 30%
}
</style>
