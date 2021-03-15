<template>
  <button :title="title">
    <IconRefresh v-if="isLoading" />
    <slot v-else />
  </button>
</template>

<script>
import IconRefresh from './icons/Refresh.vue';

export default {
  components: {
    IconRefresh,
  },
  props: {
    title: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped>
button {
  margin: .25rem;
  padding: .25rem;
  cursor: pointer;
}
</style>
