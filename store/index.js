export const state = () => ({
  base: null,
})

export const mutations = {
  SET_BASE: (state, data) => {
    state.base = data
  },
}

export const actions = {
  async getBase({ commit }) {
    const response = await this.$axios.$get('/assets/data/base.json')
    commit('SET_BASE', response)
  },

  async sendCallback({commit}, data) {
    return new Promise((resolve, reject) => {
      // this.$axios.$post('/api/app/form/callback', data)
      //   .then(response => {
      //     resolve(response.data)
      //   })
      //   .catch(e => reject(e))
    })
  },
}
