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
import ActionButton from './ActionButton.vue';
import IconDelete from './icons/Delete.vue';
import IconSave from './icons/Save.vue';

import CreateSearchIndex from '../graphql/mutations/CreateSearchIndex.gql';

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
    contentId: {
      type: Number,
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
    async save(doc) {
      if (this.isNew) {
        // Force set the value so save can work. @todo: pass value up further & call save
        Object.keys(doc).forEach((k) => { this[k] = doc[k]; });
        if (this.industry && this.manufacturer) {
          this.loading = true;
          // @todo this needs to replace the current item; do at higher level
          const input = { ...doc, contentId: this.contentId };
          const { data } = await this.$apollo.mutate({
            mutation: CreateSearchIndex,
            variables: { input }
          });
          console.log(data);
          this.loading = false;
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
