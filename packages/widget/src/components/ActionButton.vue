<template>
  <button
    :class="classes"
    :title="title"
    :type="type"
    @click="$emit('click')"
  >

    <span v-if="text" class="pr-1 text-sm hidden lg:block">{{ text }}</span>
    <component :is="iconComponent" class="h-5 w-5 relative" />
  </button>
</template>

<script>
import IconCancel from './icons/x-circle-sm.vue';
import IconSave from './icons/save-sm.vue';
import IconEdit from './icons/pencil-alt-sm.vue';
import IconTrash from './icons/trash-sm.vue';
import IconAdd from './icons/plus-sm.vue';

export default {
  components: {
    IconCancel,
    IconSave,
    IconEdit,
    IconTrash,
    IconAdd,
  },
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    icon: {
      type: String,
    },
    type: {
      type: String,
      defaultValue: 'button',
    },
  },
  computed: {
    iconComponent() {
      switch (this.icon) {
        case 'cancel':
          return IconCancel;
        case 'save':
          return IconSave;
        case 'edit':
          return IconEdit;
        case 'trash':
          return IconTrash;
        case 'add':
          return IconAdd;
        default:
          return null;
      }
    },
  },

  data: () => ({
    classes: [
      'mb-1',
      'bg-base-blue-main',
      '-ml-px',
      'inline-flex',
      'items-center',
      'px-3',
      'py-2',
      'rounded-md',
      'border',
      'border-base-blue-border',
      'text-white',
      'hover:bg-base-blue-hover',
      'hover:border-base-blue-border-hover',
      'focus:outline-none',
      'focus:bg-base-blue-active',
      'focus:border-base-blue-border-active',
      'focus:shadow-inner',
      'focus:z-10',
      'flex',
      'flex-row',
      'justify-around',
      'lg:justify-between',
    ],
  }),
};
</script>
