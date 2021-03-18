import Vue from 'vue';
import App from './App.vue';
import createProvider from './plugins/apollo-provider';

import './styles/index.css';
import './styles/vue-treeselect.css';

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App, { props: { contentId: 15064118 } }),
}).$mount('#app');
