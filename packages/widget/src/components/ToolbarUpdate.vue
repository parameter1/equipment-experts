<template>
  <td v-if="isEditing">
    <ActionButton v-on:click.native="$emit('toggle')">
      <IconCancel />
    </ActionButton>
    <ActionButton v-on:click.native="$emit('update')" :is-loading="isLoading">
      <IconSave />
    </ActionButton>
    <ActionButton v-on:click.native="$emit('remove')" :is-loading="isLoading">
      <IconDelete />
    </ActionButton>
  </td>
  <td v-else>
    <ActionButton v-on:click.native="$emit('toggle')">
      <IconEdit />
    </ActionButton>
  </td>
</template>

<script>
import ActionButton from './ActionButton.vue';
import IconDelete from './icons/Delete.vue';
import IconSave from './icons/Save.vue';
import IconEdit from './icons/Edit.vue';
import IconCancel from './icons/Cancel.vue';

export default {
  components: {
    ActionButton,
    IconDelete,
    IconSave,
    IconEdit,
    IconCancel,
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
