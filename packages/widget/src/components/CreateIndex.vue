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
    <Toolbar :is-editing="isEditing" @create="create" @reset="reset" @toggle="toggle" />
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
  computed: {
    isNew() {
      return Number.isInteger(this.id);
    },
    isModified() {
      return ['industry', 'manufacturer', 'model'].some((v) => this[v] !== this[`_${v}`]);
    },
  },
  methods: {
    async create() {
      this.message = null;
      if (this.$data._industry && this.$data.manufacturer) {
        this.isLoading = true;
        this.$emit('create', {
          industry: this.$data._industry,
          manufacturer: this.$data._manufacturer,
          model: this.$data._model,
        });
        this.isLoading = false;
      } else {
        this.message = 'Industry and Manufacturer must be specified!';
      }
    },
    async reset() {
      this.isLoading = false;
      this.$data._industry = this.$props._industry;
      this.$data._manufacturer = this.$props._manufacturer;
      this.$data._model = this.$props._model;
      this.error = null;
    },
    async toggle() {
      if (this.isEditing) this.reset();
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
