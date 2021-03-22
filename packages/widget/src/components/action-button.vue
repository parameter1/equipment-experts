<template>
  <button
    :type="buttonType"
    :class="buttonClasses"
    :title="buttonLabel"
    :aria-label="buttonLabel"
    :disabled="disabled"
    :tabindex="tabindex"
    @click="promptConfirmAndEmit"
    @keydown="blurOnEscape"
    @blur="clearConfirmPrompt"
  >
    <span v-if="showLabel" class="tw-pr-1 tw-text-sm tw-hidden lg:tw-block">{{ buttonLabel }}</span>
    <div v-if="showIcons" class="tw-h-5 tw-w-5 tw-relative">
      <loading-spinner v-if="isLoading" size="small" />
      <icon-alert v-else-if="isConfirming" />
      <component v-else :is="iconComponent" />
    </div>
  </button>
</template>

<script>
import LoadingSpinner from './loading-spinner.vue';
import IconAlert from './icons/exclamation-sm.vue';
import IconAdd from './icons/plus-sm.vue';
import IconCancel from './icons/x-circle-sm.vue';
import IconEdit from './icons/pencil-alt-sm.vue';
import IconSave from './icons/save-sm.vue';
import IconTrash from './icons/trash-sm.vue';

export default {
  components: {
    LoadingSpinner,
    IconAlert,
    IconAdd,
    IconCancel,
    IconEdit,
    IconSave,
    IconTrash,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      validator(value) {
        return ['add', 'cancel', 'edit', 'save', 'trash', 'x'].includes(value);
      },
    },
    buttonType: {
      type: String,
      default: 'button',
    },
    confirmLabel: {
      type: String,
      default: 'Sure?',
    },
    loadingLabel: {
      type: String,
      default: 'Loading...',
    },
    buttonClass: {
      type: String,
      default: null,
    },
    mustConfirm: {
      type: Boolean,
      default: false,
    },
    confirmTimeout: {
      type: Number,
      default: 2500,
    },
    showIcons: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconComponent() {
      return `icon-${this.icon}`;
    },

    buttonLabel() {
      if (this.isLoading) return this.loadingLabel;
      if (this.promptConfirm) return this.confirmLabel;
      return this.label;
    },

    isConfirming() {
      return this.mustConfirm && this.promptConfirm;
    },
  },

  data: () => ({
    promptConfirm: false,
    buttonClasses: [
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

  /**
   *
   */
  methods: {
    /**
     *
     */
    promptConfirmAndEmit() {
      if (this.mustConfirm) {
        if (!this.promptConfirm) {
          this.promptConfirm = true;
          setTimeout(() => {
            this.promptConfirm = false;
            this.$el.blur();
          }, this.confirmTimeout);
        } else {
          this.$emit('click');
          this.promptConfirm = false;
        }
      } else {
        this.$emit('click');
      }
    },

    /**
     *
     */
    blurOnEscape(event) {
      if (event.key === 'Escape') {
        this.$el.blur();
      }
    },

    /**
     *
     */
    clearConfirmPrompt() {
      this.promptConfirm = false;
    },
  },
};
</script>
