export default function ({ route, redirect, store }) {
  if (!route.params.id) return
  if (!/^\d+$/.test(route.params.id) && route.params.id.length < 23 && route.params.id.length > 14) {
    store.commit('setResult', null)
    store.commit('setLoading', false)
    return redirect('/')
  }
}
