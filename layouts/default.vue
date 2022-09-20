<template>
  <div class="mx-auto flex h-full w-full max-w-[29rem] flex-col p-4 sm:py-12">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
  import Header from '~/components/Layout/Header'
  import Footer from '@/components/Layout/Footer'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @import '@/assets/scss/custom.scss';
  @import '@/assets/scss/tooltip.scss';
</style>
