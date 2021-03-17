<template>
  <tr class="search-index">
    <td>
      <Industries v-if="isEditing" :value="$data._industry" @update="$data._industry = $event" />
      <span v-else>{{ industry }}</span>
    </td>
    <td>
      <Manufacturers v-if="isEditing" :value="$data._manufacturer" @update="$data._manufacturer = $event"  />
      <span v-else>{{ manufacturer }}</span>
    </td>
    <td>
      <Models v-if="isEditing" :value="$data._model" @update="$data._model = $event"  />
      <span v-else>{{ model }}</span>
    </td>
    <Toolbar :is-editing="isEditing" :is-loading="isLoading" @create="create" @toggle="toggle" />
  </tr>
</template>

<script>
import Industries from './controls/Industries.vue'
import Manufacturers from './controls/Manufacturers.vue'
import Models from './controls/Models.vue'

import Toolbar from './ToolbarCreate.vue';

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
    _industry: instance.industry,
    _manufacturer: instance.manufacturer,
    _model: instance.model,
  }),
  methods: {
    create() {
      this.$emit('hide-message');
      if (this.$data._industry && this.$data._manufacturer) {
        this.isLoading = true;
        this.$emit('create', {
          industry: this.$data._industry,
          manufacturer: this.$data._manufacturer,
          model: this.$data._model,
        });
        this.toggle();
      } else {
        this.$emit('show-message', 'Industry and Manufacturer must be specified!', 'text-danger');
      }
    },
    toggle() {
      if (this.isEditing) {
        this.$emit('hide-message');
        this.isLoading = false;
        this.$data._industry = this.$props._industry;
        this.$data._manufacturer = this.$props._manufacturer;
        this.$data._model = this.$props._model;
        this.error = null;
      }
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
