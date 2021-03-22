<template>
  <svg
    v-show="show"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    title="Loading..."
    aria-label="Loading..."
  >
    <circle
      class="tw-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <!-- eslint-disable-next-line -->
    <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'gray-600',
      validator: (color) => ['blue-700', 'white', 'gray-600'].includes(color),
    },
    size: {
      type: Number,
      default: 5,
      validator: (size) => [5, 8, 10].includes(size),
    },
  },
  computed: {
    classes() {
      const { color, size } = this;
      const classes = ['tw-animate-spin-fast'];
      if (color === 'blue-700') classes.push('tw-text-blue-700');
      if (color === 'white') classes.push('tw-text-white');
      if (color === 'gray-600') classes.push('tw-text-gray-600');
      if (size === 5) classes.push('tw-w-5', 'tw-h-5');
      if (size === 8) classes.push('tw-w-8', 'tw-h-8');
      if (size === 10) classes.push('tw-w-10', 'tw-h-10');
      return classes;
    },
  },
};
</script>
