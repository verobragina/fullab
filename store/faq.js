export const state = () => ({
  data: null,
})

export const mutations = {
  SET_DATA: (state, data) => {
    state.data = data
  },
}

export const actions = {
  async getData({ commit }) {
    const response = await this.$axios.$get('/assets/data/faq.json')
    commit('SET_DATA', response)
  },
}
