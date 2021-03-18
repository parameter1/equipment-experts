<template>
  <li class="bg-white shadow rounded border-r-6 min-h-110px border-yellow-500 p-3 relative
  grid grid-rows-2 gap-1">
    <div class="grid grid-cols-7 gap-3">
      <label class="font-semibold col-span-2">Industry</label>
      <label class="font-semibold col-span-2">Manufacturer</label>
      <label class="font-semibold col-span-2">Model</label>
      <div class="flex flex-col justify-around">
        <ActionButton v-on:click.native="create" text="Save" icon="save" type="submit" />
      </div>
    </div>
    <div class="grid grid-cols-7 gap-3">
      <div class="col-span-2">
        <Industries
          :value="$data.industry"
          @update="$data.industry = $event"
        />
      </div>
      <div class="col-span-2">
        <Manufacturers
          :value="$data.manufacturer"
          @update="$data.manufacturer = $event"
        />
      </div>
      <div class="col-span-2">
        <Models
          :value="$data.model"
          @update="$data.model = $event"
        />
      </div>
      <div class="flex flex-col justify-around">
        <ActionButton
          v-on:click.native="$emit('cancel')"
          text="Cancel"
          icon="cancel"
        />
      </div>
    </div>
  </li>
</template>

<script>
import Industries from './controls/Industries.vue';
import Manufacturers from './controls/Manufacturers.vue';
import Models from './controls/Models.vue';

import ActionButton from './ActionButton.vue';

export default {
  components: {
    Industries,
    Manufacturers,
    Models,
    ActionButton,
  },
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    isLoading: false,
    isEditing: false,
    industry: null,
    manufacturer: null,
    model: null,
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
    async toggle() {
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
