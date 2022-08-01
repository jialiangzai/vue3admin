import { createStore } from 'vuex'
import num from './modules/num'
import userinfo from './modules/userinfo'
export default createStore({
  modules: {
    num,
    uInfo:userinfo
  }
})
