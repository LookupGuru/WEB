<template>
  <div>
    <form class="flex flex-col" @submit.prevent="sendForm()">
      <label for="input" class="mb-1.5 flex text-sm font-medium text-gray-700">{{ $t('search.title') }}</label>
      <div class="relative">
        <input
          v-model="input"
          class="block w-full appearance-none rounded-md rounded-md border-gray-300 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          pattern="[0-9]*"
          inputmode="numeric"
          id="input"
          name="input"
          placeholder="Discord ID"
          autocomplete="off"
          ref="search"
          @keyup="filterInput"
        />
        <span class="flex flex-col px-1 pt-1 text-xs text-red-500" v-if="$v.input.$error">
          <span v-if="!$v.input.required">{{ $t('search.input.required') }}</span>
          <span v-if="!$v.input.minLength">{{ $t('search.input.minLength', [$v.input.$params.minLength.min]) }}</span>
          <span v-if="!$v.input.maxLength">{{ $t('search.input.maxLength', [$v.input.$params.maxLength.max]) }}</span>
          <span v-if="!$v.input.numeric">{{ $t('search.input.numeric') }}</span>
        </span>
      </div>
      <div class="mt-3 flex space-x-2">
        <button
          :disabled="loading"
          type="submit"
          class="flex h-[38px] w-full select-none items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500"
          aria-label="Submit Button"
        >
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="30" stroke="fff" stroke-width="10" />
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="30"
              stroke="#fff"
              stroke-width="8"
              stroke-linecap="round"
              transform="rotate(167.288 50 50)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                calcMode="linear"
                values="0 50 50;180 50 50;720 50 50"
                keyTimes="0;0.5;1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dasharray"
                calcMode="linear"
                values="1.8849555921538759 186.6106036232337;90.47786842338603 98.01769079200155;1.8849555921538759 186.6106036232337"
                keyTimes="0;0.5;1"
                dur="1"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <span v-else class="text-center">{{ $t('search.button') }}</span>
        </button>
        <button
          v-if="$route.params.id"
          type="button"
          @click="sendHome"
          class="flex h-[38px] w-[38px] flex-none select-none items-center justify-center rounded-md border border-transparent bg-green-600 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none"
          aria-label="Home Button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  const { validationMixin } = require('vuelidate')
  const { required, minLength, maxLength, numeric } = require('vuelidate/lib/validators')

  export default {
    data() {
      return {
        input: ''
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
      filterInput() {
        this.input = this.input.replace(/\D/g, '')
      },
      sendForm() {
        if (this.$v.$invalid) {
          this.$v.$touch()
        } else {
          if (this.input === this.$route.params.id) return false
          this.$store.commit('setLoading', true)
          this.$store.commit('setResult', null)
          this.$router.push({
            params: {
              id: this.input
            }
          })
        }
      },
      sendHome() {
        this.input = ''
        this.$store.commit('setLoading', false)
        this.$store.commit('setResult', null)
        this.$router.push('/')
      }
    },
    computed: {
      loading() {
        return this.$store.state.loading
      },
      result() {
        return this.$store.state.result
      }
    },
    created() {
      this.input = this.$route?.params?.id ?? ''
    }
  }
</script>
