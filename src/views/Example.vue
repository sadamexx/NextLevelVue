<template>
  <form @submit.prevent="submit">
    <input
      type="text"
      placeholder="What's your email"
      v-model="email"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()"
    />
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <button type="submit" :disabled="$v.$invalid">Submit</button>
    <p class="errorMessage" v-if="$v.$anyError">
      Please fill out the required fills
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        alert('Form Submitted')
      }
    },
  },
}
</script>

<style scoped></style>
