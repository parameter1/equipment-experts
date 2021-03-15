<template>
  <button :title="title">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    }
  }
}
</script>

<style scoped>
button {
  margin: .25rem;
  padding: .25rem;
  cursor: pointer;
}
</style>
