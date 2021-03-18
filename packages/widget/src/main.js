import Vue from 'vue';
import App from './App.vue';
import createProvider from './plugins/apollo-provider';

import './styles/index.css';
import './styles/vue-treeselect.css';

Vue.config.productionTip = false;

const EEWidget = ({ url, el, props }) => new Vue({
  el,
  apolloProvider: createProvider(url),
  render: (h) => h(App, { props }),
});

if (Array.isArray(window.EEWidgetQueue)) {
  window.EEWidgetQueue.forEach((args) => EEWidget(...args));
}
window.EEWidget = EEWidget;
