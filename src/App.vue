<script setup>
import { onMounted } from 'vue'
import { authStore } from './stores/authStore'
// import Login from './views/Login.vue';

const auth = authStore();

onMounted(async() => {
  await auth.checkAuthentication()
})

</script>

<template>

    <RouterView />

</template>
