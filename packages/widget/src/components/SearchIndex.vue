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
import Industries from './controls/Industries.vue'
import Manufacturers from './controls/Manufacturers.vue'
import Models from './controls/Models.vue'

import Toolbar from './ToolbarUpdate.vue';

import DeleteSearchIndex from '../graphql/mutations/DeleteSearchIndex.gql';
import UpdateSearchIndex from '../graphql/mutations/UpdateSearchIndex.gql';

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
    isModified() {
      return ['industry', 'manufacturer', 'model'].some((v) => this[v] !== this[`_${v}`]);
    },
  },
  methods: {
    async save() {
      const doc = {
        industry: this.$data._industry,
        manufacturer: this.$data._manufacturer,
        model: this.$data._model,
      }
      this.isLoading = true;
      const update = { ...doc, id: this.id, contentId: this.contentId };
      const { data } = await this.$apollo.mutate({
        mutation: UpdateSearchIndex,
        variables: { update }
      });
      console.log(data);
      this.isLoading = false;
      this.isEditing = false;
      // Tell the component it's updated? This should probably be higher too.
    },
    async toggle() {
      this.isEditing = !this.isEditing;
    },
    async remove() {
      this.isLoading = true;
      // @todo this needs to remove the current item; do at higher level?
      const { data } = await this.$apollo.mutate({
        mutation: DeleteSearchIndex,
        variables: { id: this.id }
      });
      console.log(data);
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.search-index td {
  max-width: 30%
}
</style>
