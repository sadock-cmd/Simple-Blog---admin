<script setup>
import { computed, onMounted, reactive } from 'vue';
import MainLayout from '../layouts/Main.vue';
import axios from 'axios';
import { blogStore } from '../stores/blogStore'
import { authStore } from '../stores/authStore'

const blogger = blogStore();
const auth = authStore();

const form = reactive({
  title: null,
  content: null,
  image: null,
  category: null,
})
const categories = computed(() => blogger.categories);

const onImageChange = (event) => {
  const file = event.target.files[0];
  form.image = file;
}

const handlePost = async () => {
  const user_id = auth.user.id;

  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('category_id', form.category);
  formData.append('content', form.content);
  formData.append('user_id', user_id);
  formData.append('image', form.image);


  try {
    await axios.post('/api/post', 
      formData
    )
    

    for (const key in form) {
      form[key] = null;
    }

    await blogger.getPosts();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await blogger.getCategories()
})
</script>

<template>
  <MainLayout>

    <div class="flex justify-center items-center min-h-screen">
      <form @submit.prevent="handlePost">
        <h2 class="text-center font-semibold text-2xl">Create Post Form</h2>

        <div class="m-5 max-w-sm">
          <label for="postname" class="mb-2 block text-sm font-medium">Title</label>
          <div class="relative">
            <input v-model="form.title" type="text" id="postname" name="postname"
              class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter Post Title" />
            <div class="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">

            </div>
          </div>
        </div>

        <div class="m-5 max-w-sm">
          <label for="category" class="mb-2 block text-sm font-medium">Category</label>

          <select v-model="form.category"
            class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            aria-label="Default select example">
            <option value="" disabled selected>Select Post category</option>
            <option v-for="category in categories" :value="category.id" :key="category.id"
              class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="m-5 max-w-sm">
          <label for="content" class="mb-2 block text-sm font-medium">Content</label>

          <textarea v-model="form.content" id="myTextarea" name="myTextarea" rows="4" cols="50"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"></textarea>
        </div>

        <div class="m-5 max-w-sm">
          <div class="col-span-full">
            <label for="bio" class="text-sm">Photo</label>

            <div class="relative">
              <input @change="onImageChange" accept="image/*" type="file" id="image" name="image"
                class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
              <div class="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
              </div>
            </div>
          </div>
        </div>

        <div class="text-center max-w-sm">
          <button type="submit" class="bg-gray-900 text-white px-4 py-2 shadow-md rounded-md">Submit</button>
        </div>

      </form>
    </div>

  </MainLayout>
</template>
