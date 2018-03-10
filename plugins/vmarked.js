import Vue from 'vue'
import Marked from 'marked'

Vue.component('v-marked', {
  render: function (createElement) {
    return createElement('div', {
      class: {'v-html': true},
      domProps: {'innerHTML': Marked(this.$slots.default[0].text)}
    })
  }
})
