<template>
  <tr class="search-index">
    <td>
      <Industries v-if="isEditing" :value="$data.industry" @update="$data.industry = $event" />
      <span v-else>{{ industry }}</span>
    </td>
    <td>
      <Manufacturers
        v-if="isEditing"
        :value="$data.manufacturer"
        @update="$data.manufacturer = $event"
      />
      <span v-else>{{ manufacturer }}</span>
    </td>
    <td>
      <Models v-if="isEditing" :value="$data.model" @update="$data.model = $event"  />
      <span v-else>{{ model }}</span>
    </td>
    <Toolbar :is-editing="isEditing" :is-loading="isLoading" @create="create" @toggle="toggle" />
  </tr>
</template>

<script>
import Industries from './controls/Industries.vue';
import Manufacturers from './controls/Manufacturers.vue';
import Models from './controls/Models.vue';

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
    industry: instance.industry,
    manufacturer: instance.manufacturer,
    model: instance.model,
  }),
  methods: {
    create() {
      this.$emit('hide-message');
      if (this.$data.industry && this.$data.manufacturer) {
        this.isLoading = true;
        this.$emit('create', {
          industry: this.$data.industry,
          manufacturer: this.$data.manufacturer,
          model: this.$data.model,
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
        this.$data.industry = this.$props.industry;
        this.$data.manufacturer = this.$props.manufacturer;
        this.$data.model = this.$props.model;
        this.error = null;
      }
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
