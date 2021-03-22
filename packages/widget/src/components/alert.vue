<template>
  <div
    :class="containerClasses"
    role="alert"
  >
    <div class="tw-flex">
      <div class="tw-flex-shrink-0">
        <component
          :is="icon"
          :class="iconClasses"
        />
      </div>
      <div class="tw-ml-3">
        <slot name="header">
          <h3
            v-if="header"
            :class="headerClasses"
          >
            {{ header }}
          </h3>
        </slot>
        <div :class="bodyClasses">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCheckCircleSm from './icons/check-circle-sm.vue';
import IconInfoCircleSm from './icons/information-circle-sm.vue';
import IconXCircleSm from './icons/x-circle-sm.vue';

export default {
  props: {
    header: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'danger'].includes(value),
    },
  },
  computed: {
    icon() {
      switch (this.type) {
        case 'success':
          return IconCheckCircleSm;
        case 'danger':
          return IconXCircleSm;
        default:
          return IconInfoCircleSm;
      }
    },
    containerClasses() {
      const core = [
        'tw-p-4',
        'tw-border-l-4',
        'tw-shadow-sm',
        'tw-rounded',
      ];
      const types = {
        primary: ['tw-bg-blue-50', 'tw-border-blue-400'],
        success: ['tw-bg-green-50', 'tw-border-green-400'],
        danger: ['tw-bg-red-50', 'tw-border-red-400'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    iconClasses() {
      const core = ['tw-h-5', 'tw-w-5'];
      const types = {
        primary: ['tw-text-blue-400'],
        success: ['tw-text-green-400'],
        danger: ['tw-text-red-400'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    headerClasses() {
      const core = ['tw-text-sm', 'tw-leading-5', 'tw-font-semibold'];
      const types = {
        primary: ['tw-text-blue-800'],
        success: ['tw-text-green-800'],
        danger: ['tw-text-red-800'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    bodyClasses() {
      const core = ['tw-text-sm', 'tw-leading-5'];
      if (this.header) core.push('tw-mt-2');
      const types = {
        primary: ['tw-text-blue-700'],
        success: ['tw-text-green-700'],
        danger: ['tw-text-red-700'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
  },
};
</script>
