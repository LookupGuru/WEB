<template>
  <div class="bg-white shadow rounded-md overflow-auto mt-4 select-none">
    <div class="flex items-center py-3 px-4">
      <div class="flex-none mr-3 w-[4.3rem] h-[4.3rem] rounded-full block bg-gray-100"></div>
      <div class="flex-1 flex flex-col">
        <div class="inline-block w-[fit-content] text-md font-semibold bg-gray-100 text-gray-100 rounded-md transition-colors">
          Discord<small class="font-normal text-md font-mono ml-[2px]">#0000</small>
        </div>
        <div class="flex items-center mt-1.5">
          <div v-for="item in 3" class="h-[24px] w-[24px] transition-colors rounded-md mr-[3px] bg-gray-100"></div>
        </div>
      </div>
    </div>
    <hr>
    <div class="grid sm:grid-cols-2 auto-rows-auto py-3 px-4 gap-3">
      <div v-for="item in 4">
        <p class="text-sm font-medium text-gray-100 bg-gray-100 rounded w-28">xxxxxxxx</p>
        <p class="text-sm text-gray-100 bg-gray-100 w-[fit-content] rounded mt-1">xxxxxxxx</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>
