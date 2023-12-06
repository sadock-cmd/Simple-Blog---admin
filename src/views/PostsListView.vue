<script setup>
import { computed, onMounted } from 'vue';
import MainLayout from '../layouts/Main.vue';
import { blogStore } from '../stores/blogStore'
import { format } from 'date-fns';

const blogger = blogStore();
const URL_PATH = blogger.urlPath;
const allPosts = computed(() => blogger.posts);


const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
};

onMounted(async () => {
  await blogger.getPosts();
})
</script>

<template>
  <MainLayout>

    <div class="container p-2 mx-auto sm:p-4 text-gray-100">

      <div class="flex items-center justify-center gap-10 text-gray-900 min-w-full mb-4">
        <div>
          <h2 class="text-2xl font-semibold leadi uppercas text-white">All Posts</h2>
        </div>
        <div>
          <router-link to="/add-post" class="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">Add Post</router-link>
        </div>
        
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <colgroup>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col class="w-24">
          </colgroup>
          <thead class="bg-gray-700">
            <tr class="text-left">
              <th class="p-3">S/N</th>
              <th class="p-3">Image</th>
              <th class="p-3">Post Name</th>
              <th class="p-3">Date</th>
              <th class="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post,index) in allPosts" :key="post.id"
              class="border-b border-opacity-20 border-gray-700 bg-gray-900">
              <td class="p-3">
                <p>{{ index + 1 }}</p>
              </td>
             
              <td class="p-3">
                <div class="image-fit zoom-in">
                  <img :src="URL_PATH + post.image" :alt="post.title" class="w-10 h-10 rounded-md">

                </div>
              </td>  
              <td class="p-3">
                <p>{{ post.title}}</p>
              </td>

              <td class="p-3">
                <p>{{ formatDate(post.created_at) }}</p>
              </td>
                       
              <td class="p-3">
                <router-link :to="'/posts/' + post.id" class="px-3 py-1 font-semibold rounded-md bg-violet-400 text-white">
                  View
                </router-link>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

  </MainLayout>
</template>
