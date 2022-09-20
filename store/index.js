export const state = () => ({
  loading: false,
  result: null
})

export const mutations = {
  setResult(state, value) {
    state.result = value || null
  },
  setLoading(state, value) {
    state.loading = value || false
  }
}
