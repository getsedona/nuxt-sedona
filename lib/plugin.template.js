import Vue from 'vue'

<% options.components.forEach(function(item) { %>
Vue.component('<%=item %>', () => import(/* webpackChunkName: "<%= item.toLowerCase() %>" */ '@getsedona/vue-components/src/components/<%=item %>/<%=item %>'))<% });
%>