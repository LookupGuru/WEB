<template>
  <div>
    <Search class="overflow-hidden rounded-lg bg-white p-4 pt-3 shadow" />
    <template v-if="$route.params.id">
      <Placeholder v-if="$store.state.loading" />
      <Result v-else />
    </template>
    <client-only v-else>
      <List />
    </client-only>
  </div>
</template>

<script>
  import Search from '@/components/Search'
  import List from '@/components/List'

  import Result from '@/components/Result'
  import Placeholder from '@/components/Placeholder'

  export default {
    components: {
      Search,
      Result,
      List,
      Placeholder
    },
    middleware: 'check',
    async fetch() {
      if (!this.$route.params.id) return false
      await this.$axios
        .$post('/lookup', {
          input: this.$route.params.id
        })
        .then((res) => {
          this.$store.commit('setResult', res.data)
        })
    },
    watch: {
      $route(newValue) {
        if (newValue.params.id) this.fetch()
      },
      '$fetchState.pending'(newValue) {
        if (this.$route.params.id) this.$store.commit('setLoading', newValue)
      }
    }
  }
</script>
