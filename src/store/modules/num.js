export default {
  // namespaced:true,
  state: {
    count: 1
  },
  getters: {
    countStatus(state){
      return state.count>=1
    }
  },
  mutations: {
    setCount (state, num) {
      state.count = num
    }
  },
  actions: {
    setCountFn ({ commit }, num) {
      return new Promise((res, rej) => {
        if (num > 100) {
          rej('值不能大于100')
        } else {
          commit('setCount', num)
          res()
        }
      })
    }
  },
};