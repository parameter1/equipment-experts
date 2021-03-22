<template>
  <button
    :class="classes"
    :title="title"
    :type="buttonType"
    @click="$emit('click')"
  >
    <span v-if="text" class="tw-pr-1 tw-text-sm tw-hidden lg:tw-block">{{ text }}</span>
    <component :is="iconComponent" class="tw-h-5 tw-w-5 tw-relative" />
  </button>
</template>

<script>
import IconAdd from './icons/plus-sm.vue';
import IconCancel from './icons/x-circle-sm.vue';
import IconEdit from './icons/pencil-alt-sm.vue';
import IconSave from './icons/save-sm.vue';
import IconTrash from './icons/trash-sm.vue';

export default {
  components: {
    IconAdd,
    IconCancel,
    IconEdit,
    IconSave,
    IconTrash,
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
    buttonType: {
      type: String,
      default: 'button',
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
      'tw-mb-1',
      'tw-bg-base-blue-main',
      'tw--ml-px',
      'tw-inline-flex',
      'tw-items-center',
      'tw-px-3',
      'tw-py-2',
      'tw-rounded-md',
      'tw-border',
      'tw-border-base-blue-border',
      'tw-text-white',
      'hover:tw-bg-base-blue-hover',
      'hover:tw-border-base-blue-border-hover',
      'focus:tw-outline-none',
      'focus:tw-bg-base-blue-active',
      'focus:tw-border-base-blue-border-active',
      'focus:tw-shadow-inner',
      'focus:tw-z-10',
      'tw-flex',
      'tw-flex-row',
      'tw-justify-around',
      'lg:tw-justify-between',
    ],
  }),
};
</script>
