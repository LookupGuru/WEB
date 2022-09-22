export default function ({ route, redirect, store }) {
  if (!route.params.id) return
  if (!/^\d+$/.test(route.params.id)) {
    store.commit('setResult', null)
    store.commit('setLoading', false)
    return redirect('/')
  }
}
