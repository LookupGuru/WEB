export default function ({ route, redirect, store }) {
  const cancelAction = () => {
    store.commit('setResult', null)
    store.commit('setLoading', false)
    return redirect('/')
  }

  if (!route.params.id) return

  if (!/^\d+$/.test(route.params.id)) return cancelAction()
  if (route.params.id.length > 23) return cancelAction()
  if (route.params.id.length < 14) return cancelAction()
}
