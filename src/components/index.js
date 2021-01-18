import Vue from 'vue'
import MtcOverlay from './MtcOverlay'

const Components = {
  MtcOverlay
}

Object.keys(Components).forEach((item) => {
  Vue.component(item, Components[item])
})

export default Components
