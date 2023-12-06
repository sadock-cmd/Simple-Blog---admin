<script setup>
import { authStore } from '../stores/authStore';
const auth = authStore()
import { useRouter } from 'vue-router'

const router = useRouter();
const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col h-full p-3 w-20 md:w-60 bg-gray-900 text-white">
    <div class="space-y-3">

      <div class="flex-1">
        <ul class="pt-2 pb-4 space-y-1 text-sm">
          
          <li class="rounded-sm">
            <router-link to="/posts" rel="noopener noreferrer" class="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-5 h-5 fill-current dark:text-gray-400">
                <path
                  d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z">
                </path>
              </svg>
              <span class="hidden md:inline">Posts</span>
            </router-link>
          </li>
          <li class="rounded-sm">
            <router-link to="/categories" rel="noopener noreferrer" class="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-5 h-5 fill-current dark:text-gray-400">
                <path
                  d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z">
                </path>
              </svg>
              <span class="hidden md:inline">Categories</span>
            </router-link>
          </li>




          <li class="rounded-sm">
            <Button rel="noopener noreferrer" @click.prevent="handleLogout" class="flex items-center p-2 space-x-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-5 h-5 fill-current dark:text-gray-400">
                <path
                  d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z">
                </path>
                <rect width="32" height="64" x="256" y="232"></rect>
              </svg>
              <span class="hidden md:inline">Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

