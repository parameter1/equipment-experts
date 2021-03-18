<template>
  <div class="flex flex-col justify-around" v-if="isEditing">
    <ActionButton v-on:click.native="$emit('update')" text="Save" icon="save" />
    <ActionButton v-on:click.native="$emit('toggle')" text="Cancel" icon="cancel" />
  </div>
  <div class="flex flex-col justify-around" v-else>
    <ActionButton v-on:click.native="$emit('toggle')" text="Edit" icon="edit" />
    <ActionButton v-on:click.native="$emit('remove')" text="Delete" icon="trash" />
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue';

export default {
  components: {
    ActionButton,
  },
  props: {
    isEditing: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
