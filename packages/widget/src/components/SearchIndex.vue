<template>
  <tr class="search-index">
    <td>
      <Industries v-if="isEditing" :value="industry" @update="updateIndustry" />
      <span v-else>{{ industry }}</span>
    </td>
    <td>
      <Manufacturers v-if="isEditing" :value="manufacturer" @update="updateManufacturer" />
      <span v-else>{{ manufacturer }}</span>
    </td>
    <td>
      <Models v-if="isEditing" :value="model" @update="updateModel"  />
      <span v-else>{{ model }}</span>
    </td>
    <td v-if="isEditing">
      <ActionButton v-on:click.native="isEditing = false">
        <IconCancel />
      </ActionButton>
      <ActionButton v-on:click.native="save" :is-loading="isLoading">
        <IconSave />
      </ActionButton>
      <ActionButton v-on:click.native="remove" :is-loading="isLoading">
        <IconDelete />
      </ActionButton>
    </td>
    <td v-else>
      <ActionButton v-on:click.native="isEditing = true">
        <IconEdit />
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
import IconEdit from './icons/Edit.vue';
import IconCancel from './icons/Cancel.vue';

import CreateSearchIndex from '../graphql/mutations/CreateSearchIndex.gql';
import DeleteSearchIndex from '../graphql/mutations/DeleteSearchIndex.gql';
import UpdateSearchIndex from '../graphql/mutations/UpdateSearchIndex.gql';

export default {
  components: {
    Industries,
    Manufacturers,
    Models,
    ActionButton,
    IconDelete,
    IconSave,
    IconEdit,
    IconCancel,
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
    isLoading: false,
    isEditing: false,
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
        model: values ? values : null,
      });
    },
    async save(doc) {
      if (this.isNew) {
        // Force set the value so save can work. @todo: pass value up further & call save
        Object.keys(doc).forEach((k) => { this[k] = doc[k]; });
        if (this.industry && this.manufacturer) {
          this.isLoading = true;
          // @todo this needs to replace the current item; do at higher level
          const input = { ...doc, contentId: this.contentId };
          const { data } = await this.$apollo.mutate({
            mutation: CreateSearchIndex,
            variables: { input }
          });
          console.log(data);
          this.isLoading = false;
        }
      } else {
        this.isLoading = true;
        const update = { ...doc, id: this.id, contentId: this.contentId };
        const { data } = await this.$apollo.mutate({
          mutation: UpdateSearchIndex,
          variables: { update }
        });
        console.log(data);
        this.isLoading = false;
        // Tell the component it's updated? This should probably be higher too.
      }
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
.search-index td:last-child {
  min-width: calc(3 * 40px);
}
</style>
