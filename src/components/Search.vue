<template>
  <div>
    <form class="flex flex-col" @submit.prevent="sendForm()">
      <label for="input" class="block text-sm font-medium text-gray-700 mb-1.5">{{ $t("search.title") }}</label>
      <div class="relative">
        <input
          v-model="$v.input.$model"
          class=" rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full px-3 sm:text-sm border-gray-300 rounded-md"
          :class="{ 'form-control-error' : $v.input.$error }"
          type="text"
          pattern="[0-9]*"
          inputmode="numeric"
          id="input"
          name="input"
          placeholder="Discord ID"
          autocomplete="off"
        >
        <span class="flex flex-col text-xs text-red-500 pt-1 px-1" v-if="$v.input.$error">
          <span v-if="!$v.input.required">{{ $t('search.input.required') }}</span>
          <span v-if="!$v.input.minLength">{{ $t('search.input.minLength', [ $v.input.$params.minLength.min ]) }}</span>
          <span v-if="!$v.input.maxLength">{{ $t('search.input.maxLength', [ $v.input.$params.maxLength.max ]) }}</span>
          <span v-if="!$v.input.numeric">{{ $t('search.input.numeric') }}</span>
        </span>
      </div>
      <div class="mt-3 flex space-x-2">
        <button
          :disabled="loading"
          type="submit"
          class="transition-colors w-full flex justify-center items-center h-[38px] px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        >
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="30" stroke="fff" stroke-width="10"></circle>
            <circle cx="50" cy="50" fill="none" r="30" stroke="#fff" stroke-width="8" stroke-linecap="round" transform="rotate(167.288 50 50)">
              <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
              <animate attributeName="stroke-dasharray" calcMode="linear" values="1.8849555921538759 186.6106036232337;90.47786842338603 98.01769079200155;1.8849555921538759 186.6106036232337" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
            </circle>
          </svg>
          <span v-else class="text-center">{{ $t("search.button") }}</span>
        </button>
        <template>
          <a
            v-if="!loading && !result"
            onclick="return false;"
            :href='`javascript:{(function(w,d){let id=prompt("${$t("search.quick")}","");if(id!=null){window.open("https://lookup.guru/"+id,"_blank")}})(window,document)}`'
            class="hidden transition-colors sm:inline-flex justify-center items-center w-[38px] h-[38px] flex-none border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </a>
          <button
            v-else
            type="button"
            @click="goHome"
            class="transition-colors w-[38px] flex-none flex justify-center items-center h-[38px] border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none select-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
  import { Api } from "@/utils/api";

  const { validationMixin } = require('vuelidate')
  const { required, minLength, maxLength, numeric } = require('vuelidate/lib/validators')

  export default {
    data() {
      return {
        loading: false,
        input: "",
        result: null
      }
    },
    mixins: [validationMixin],
    validations: {
      input: {
        required,
        numeric,
        minLength: minLength(15),
        maxLength: maxLength(22)
      }
    },
    methods: {
      sendForm() {
        this.result = null;
        if (this.$v.$invalid) return this.$v.$touch();

        this.loading = true;
        this.$emit("loading", true)

        Api.post('lookup', this.$data).then(({ data: result }) => {
          this.loading = false;
          this.$emit("loading", false)

          if (result.success) {
            this.result = result.data;
            this.$emit("result", result.data)
            this.$router.push({ params: { id: result.data.id } }).catch(() => {})
          }
        });
      },
      goHome() {
        this.input = "";
        this.result = null;
        this.$router.push("/").catch(() => {})
      }
    },
    created() {
      if (this.$route.params.id) {
        this.input = this.$route.params.id;
        this.sendForm();
      }
    },
    watch: {
      $route(to, from) {
        if (this.$route.params.id) {
          this.input = this.$route.params.id;
          this.$emit("result", null)
          this.sendForm();
        }
      }
    }
  }
</script>
