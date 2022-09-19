<template>
  <div class="mt-4 select-none overflow-auto rounded-md bg-white shadow">
    <div class="flex items-center py-3 px-4">
      <div class="mr-3 block h-[4.3rem] w-[4.3rem] flex-none rounded-full bg-gray-100" data-placeholder />
      <div class="flex flex-1 flex-col">
        <div
          class="text-md inline-block w-[fit-content] rounded-md bg-gray-100 font-semibold text-gray-100 transition-colors"
          data-placeholder
        >
          Discord
          <small class="text-md ml-[2px] font-mono font-normal">#0000</small>
        </div>
        <div class="mt-1.5 flex items-center">
          <div
            v-for="item in 3"
            class="mr-[3px] h-[24px] w-[24px] rounded-md bg-gray-100 transition-colors"
            data-placeholder
          />
        </div>
      </div>
    </div>
    <hr />
    <div class="grid auto-rows-auto gap-3 py-3 px-4 sm:grid-cols-2">
      <div v-for="item in 4">
        <p class="w-28 rounded bg-gray-100 text-sm font-medium text-gray-100" data-placeholder>xxxxxxxx</p>
        <p class="mt-1 w-[fit-content] rounded bg-gray-100 text-sm text-gray-100" data-placeholder>xxxxxxxx</p>
      </div>
    </div>
  </div>
</template>

<style>
  [data-placeholder] {
    position: relative;
    overflow: hidden;
  }
  [data-placeholder]::after {
    content: ' ';
    box-shadow: 0 0 50px 9px #bebebe;
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    animation: load 1s infinite;
  }
  @keyframes load {
    0% {
      left: -200%;
    }
    100% {
      left: 200%;
    }
  }
</style>
