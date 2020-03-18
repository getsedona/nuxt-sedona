import Vue from 'vue'

<% Object.keys(options.components).forEach((key) => {
  options.components[key].forEach((item) => {  %>
Vue.component('<%=item %>', () => import(/* webpackChunkName: "<%= item.toLowerCase() %>" */ '@@/node_modules/@getsedona/vue-components/src/components/<%=key %>/<%=item %>'))<%  });}); %>
