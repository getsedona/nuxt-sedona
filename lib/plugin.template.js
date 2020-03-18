import Vue from 'vue'

<% Object.keys(options.components).forEach((key) => {
  options.components[key].forEach((item) => {  %>
Vue.component('<%=item[0] %>', () => import(/* webpackChunkName: "<%= item[0].toLowerCase() %>" */ '@getsedona/vue-components/src/components/<%=key %>/<%=item[1] %>'))<%  });}); %>
