<script setup>
import { onMounted, reactive } from 'vue';

import { authStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter();

const auth = authStore();

const form = reactive({
  email: null,
  password: null,
  loading: false,
  loginError: null
})

const handleLogin = async () => {

  try {
    form.loading = true;

    const loginData = {
      email: form.email,
      password: form.password,
    }

    await auth.userLogin(loginData);
    window.location.reload();
    window.location.href = '/';
    // await router.push('/')
    // console.log('already pushed');

  } catch (error) {
    console.log(error);
    form.loginError = "Error On Signing In, Please Try Again."
  } finally {
    form.loading = false;
  }
}

onMounted(async () => {

})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100 bg-gray-100">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
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
        <div class="space-y-1 text-sm" v-if="form.loginError">
          <p class="text-red-500 font-semibold">
            {{ form.loginError }}
          </p>
        </div>
        <button type="submit" :disabled="form.loading"
          class="block w-full p-3 text-center rounded-md dark:text-gray-900 bg-gray-800 hover:bg-gray-900 text-gray-100">
          {{ form.loading ? 'Signing In...' : 'Sign In' }}
        </button>
        
        <p class="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
          <router-link to="/register" rel="noopener noreferrer" class="underline dark:text-gray-100">Sign up</router-link>
        </p>
      </form>



    </div>
  </div>
</template>
