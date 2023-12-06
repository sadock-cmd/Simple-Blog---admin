<script setup>
import {reactive } from 'vue';

import { authStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const auth = authStore();

const form = reactive({
  name: null,
  email: null,
  password: null,
  loading: false,
  regError: null
})

const handleRegister = async () => {

  try {
    form.loading = true;

    const regData = {
      name: form.name,
      email: form.email,
      password: form.password,

    }
    await auth.userRegister(regData);
    router.push('/login')

  } catch (error) {
    console.error(error);
    form.loginError = "Error On Registering, Please Try Again."
  } finally {
    form.loading = false;
  }
}


</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-900">

    <div class="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100 bg-gray-100">
      <h1 class="text-2xl font-bold text-center">Register</h1>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-1 text-sm">
          <label for="name" class="block dark:text-gray-400">Username</label>
          <input v-model="form.name" type="name" name="name" id="name" placeholder="Enter Username"
            class="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" required>
        </div>
        <div class="space-y-1 text-sm">
          <label for="email" class="block dark:text-gray-400">Email</label>
          <input v-model="form.email" type="email" name="email" id="email" placeholder="Enter Email"
            class="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" required>
        </div>
        <div class="space-y-1 text-sm">
          <label for="password" class="block dark:text-gray-400">Password</label>
          <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"
            class="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" required>
          <!-- <div class="flex justify-end text-xs dark:text-gray-400">
          <a rel="noopener noreferrer" href="#">Forgot Password?</a>
        </div> -->
        </div>
        <div class="space-y-1 text-sm" v-if="form.regError">
          <p class="text-red-500 font-semibold">
            {{ form.regError }}
          </p>
        </div>
        <button type="submit" :disabled="form.loading"
          class="block w-full p-3 text-center rounded-md dark:text-gray-900 bg-gray-800 hover:bg-gray-900 text-gray-100">
          {{ form.loading ? 'Loading ...' : 'Create Account'  }}
        </button>
        <p class="text-xs text-center sm:px-6 dark:text-gray-400">Already Registered?
          <router-link to="/login" rel="noopener noreferrer" class="underline dark:text-gray-100">Sign in</router-link>
        </p>
      </form>



    </div>
  </div>
</template>
