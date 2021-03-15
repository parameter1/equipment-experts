<template>
  <div class="apollo-example">
    <!-- Cute tiny form -->
    <div class="form">
      <label for="field-query" class="label">Search</label>
      <input
        v-model="query"
        placeholder="Type here..."
        class="input"
        id="field-query"
      >
    </div>

    <div class="section">
      <h2>Industries</h2>
      <ApolloQuery :query="require('../graphql/Industries.gql')" :variables="{ query }">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <ul v-else-if="data.findIndustries.results" class="result apollo">
            <li v-for="result in data.findIndustries.results" :key="result">{{ result }}</li>
          </ul>
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>

    <div class="section">
      <h2>Manufacturers</h2>
      <ApolloQuery v-if="query" :query="require('../graphql/Manufacturers.gql')" :variables="{ query }">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <ul v-else-if="data.findManufacturers.results" class="result apollo">
            <li v-for="result in data.findManufacturers.results" :key="result">{{ result }}</li>
          </ul>
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
      <span v-else>Input a search term above...</span>
    </div>

    <div class="section">
      <h2>Models</h2>
      <ApolloQuery v-if="query" :query="require('../graphql/Models.gql')" :variables="{ query }">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <ul v-else-if="data.findModels.results" class="result apollo">
            <li v-for="result in data.findModels.results" :key="result">{{ result }}</li>
          </ul>
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
      <span v-else>Input a search term above...</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      query: '',
    }
  },
}
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}

label {
  display: block;
  margin-bottom: 6px;
}

.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}

.error {
  color: red;
}

.images {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 10px;
}

.image-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border-radius: 8px;
}

.image {
  max-width: 100%;
  max-height: 100%;
}

.image-input {
  margin: 20px;
}
</style>
