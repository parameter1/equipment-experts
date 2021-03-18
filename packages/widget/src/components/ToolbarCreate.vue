<template>
  <td v-if="isEditing">
    <ActionButton v-on:click.native="$emit('toggle')">
      <IconUndo />
    </ActionButton>
    <ActionButton v-on:click.native="$emit('create')" :is-loading="isLoading">
      <IconSave />
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
import IconSave from './icons/Save.vue';
import IconEdit from './icons/Add.vue';
import IconUndo from './icons/Undo.vue';

export default {
  components: {
    ActionButton,
    IconSave,
    IconEdit,
    IconUndo,
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
