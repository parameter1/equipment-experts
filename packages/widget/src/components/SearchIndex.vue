<template>
  <tr class="search-index">
    <td>
      <Industries :value="industry" @update="updateIndustry" />
    </td>
    <td>
      <Manufacturers :value="manufacturer" @update="updateManufacturer" />
    </td>
    <td>
      <Models :value="model" @update="updateModel"  />
    </td>
    <td>
      <ActionButton v-if="isNew" v-on:click.native="save" :is-loading="loading">
        <IconSave />
      </ActionButton>
      <ActionButton v-else v-on:click.native="remove" :is-loading="loading">
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
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    industry: String,
    manufacturer: String,
    model: String,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    isNew() {
      return Number.isInteger(this.id);
    },
  },
  methods: {
    updateIndustry(values) {
      this.save({
        industry: values,
        manufacturer: this.manufacturer,
        model: this.model,
      });
    },
    updateManufacturer(values) {
      this.save({
        industry: this.industry,
        manufacturer: values,
        model: this.model,
      });
    },
    updateModel(values) {
      this.save({
        industry: this.industry,
        manufacturer: this.manufacturer,
        model: values,
      });
    },
    save(doc) {
      if (this.isNew) {
        Object.keys(doc).forEach((k) => {
          this[k] = doc[k];
        });
        if (this.industry && this.manufacturer) {
          // Create new record to replace this one!
        }
      } else {
        // const mutation = UpdateSearchIndex;
        console.log('saving!', doc);
        this.loading = true;
        setTimeout(() => { this.loading = false; }, 3000);
      }
    },
    remove() {
      console.log('removing!');
      this.loading = true;
      setTimeout(() => { this.loading = false; }, 3000);
    }
  },
};
</script>

<style scoped>
.search-index td {
  max-width: 30%
}
</style>
