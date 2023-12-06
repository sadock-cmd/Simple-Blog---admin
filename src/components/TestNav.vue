<script setup>

</script>

<template>
  <!-- <div class="flex items-center p-2 mt-12 space-x-4 justify-self-end">
      <img src="https://source.unsplash.com/100x100/?portrait" alt="" class="w-12 h-12 rounded-lg dark:bg-gray-500">
      <div>
        <h2 class="text-lg font-semibold">Leroy Jenkins</h2>
        <span class="flex items-center space-x-1">
          <a rel="noopener noreferrer" href="#" class="text-xs hover:underline dark:text-gray-400">View profile</a>
        </span>
      </div>
    </div> -->
  <div class="flex h-screen">
    <div class="flex flex-col h-full p-3 w-20 md:w-60 bg-gray-900 text-white">
      <div class="space-y-3">


        <div class="flex-1">
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li class="rounded-sm">
              <router-link to="/dashboard" rel="noopener noreferrer" class="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                  class="w-5 h-5 fill-current dark:text-gray-400">
                  <path
                    d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z">
                  </path>
                </svg>
                <span class="hidden md:inline">Home</span>
              </router-link>
            </li>
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
              <a rel="noopener noreferrer" href="#" class="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                  class="w-5 h-5 fill-current dark:text-gray-400">
                  <path
                    d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z">
                  </path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span class="hidden md:inline">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="flex-1 p-3">
      <h1>Hello User</h1>
      <p class="text-center text-xl text-blue-800">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, at commodi? Ratione ducimus
        aspernatur reiciendis exercitationem
        officiis quisquam quia quos voluptate, explicabo ab repellat cupiditate laudantium voluptas eveniet saepe laborum.
      </p>
    </div>
  </div>
</template>

