<template>
  <div id="app">
    <h1>EE API</h1>
    <div v-for="(index, n) in indexes" :key="`index-${n}`">
      <fieldset>
        <label>
          Industry
          <Industries :selected="index.industry" />
        </label>
        <!-- <Manufacturers :selected="index.manufacturer" />
        <Models :selected="index.model" /> -->
      </fieldset>
    </div>
    <button v-on:click="indexes.push({})">
      Add an index
    </button>
  </div>
</template>

<script>
import Industries from './components/Industries.vue'
// import Manufacturers from './components/Manufacturers.vue'
// import Models from './components/Models.vue'

export default {
  name: 'App',
  components: {
    Industries,
    // Manufacturers,
    // Models,
  },
  data() {
    return {
      contentId: 1234,
      // Load this!
      indexes: [
        {
          industry: 'Agriculture',
          manufacturer: 'John Deere',
          model: null,
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
fieldset {
  margin-bottom: 1rem;
}
</style>
