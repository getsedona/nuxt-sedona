import Vue from 'vue'
<% Object.keys(options.components).forEach((key) => { options.components[key].forEach((item) => {  %>
    import <%=item[0] %> from '@getsedona/vue-components/src/components/<%=key %>/<%=item[1] %>'
  <%  });}); %>

<% Object.keys(options.components).forEach((key) => { options.components[key].forEach((item) => {  %>
  Vue.component('<%=item[0] %>', <%=item[0] %>)
<%  });}); %>
