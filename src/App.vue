<template>
  <div class="app max-w-[26rem] w-full p-4 sm:py-12 h-screen flex flex-col">
    <router-view/>
    <div class="mt-auto text-center text-sm"><a href="https://github.com/LookupGuru/WEB" class="font-bold hover:underline" target="_blank">Berk Altıok</a> - Not affiliated with Discord, Inc.</div>
  </div>
</template>

<script>
  import Header from "@/components/Layout/Header";

  export default {
    data() {
      return {
        scrollTop: 0,
        bars: false,
        layoutBase: {
          header: false,
          footer: false
        },
        layout: {}
      }
    },
    created() {
      let that = this;

      // Set Layout Elements
      this.layout = { ...this.layoutBase }

      // Set Screen Size
      that.screenSize();
      window.addEventListener('resize', function () {
        that.screenSize();
      });

      // Detect iPhone Bars
      let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream
      let aspect = window.screen.width / window.screen.height
      if (iPhone && aspect.toFixed(3) === "0.462") {
        that.bars = true;
      }
    },
    components: {
      Header
    },
    methods: {
      screenSize() {
        document.documentElement.style.setProperty('--app-height', `${document.documentElement.clientHeight}px`)
        document.documentElement.style.setProperty('--app-width', `${document.documentElement.clientWidth}px`)
      }
    }
  }
</script>

<style lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    background: #f3f4f6;
    min-height: var(--app-height, 100vh);

    @apply h-full flex flex-col justify-center items-center text-gray-800;
  }
</style>
