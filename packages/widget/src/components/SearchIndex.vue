<template>
  <tr class="search-index">
    <td>
      <Industries :selected="industry" />
    </td>
    <td>
      <Manufacturers :selected="manufacturer" />
    </td>
    <td>
      <Models :selected="model" />
    </td>
    <td>
      <ActionButton v-if="isNew" v-on:click="save">
        <IconSave />
      </ActionButton>
      <ActionButton v-else v-on:click="remove">
        <IconDelete />
      </ActionButton>
    </td>
  </tr>
</template>

<script>
import Industries from './controls/Industries.vue'
import Manufacturers from './controls/Manufacturers.vue'
import Models from './controls/Models.vue'
import ActionButton from './controls/ActionButton.vue';
import IconDelete from './icons/Delete.vue';
import IconSave from './icons/Save.vue';

export default {
  components: {
    Industries,
    Manufacturers,
    Models,
    ActionButton,
    IconDelete,
    IconSave,
  },
  data: () => ({
    id: 0,
    industry: '',
    manufacturer: '',
    model: '',
  }),
  computed: {
    isNew() {
      return Number.isInteger(this.id);
    },
  },
  methods: {
    save() {
      console.log('saving!');
    },
    remove() {
      console.log('removing!');
    }
  },
};
</script>

<style scoped>
.search-index td {
  max-width: 30%
}
</style>
