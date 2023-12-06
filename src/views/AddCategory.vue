<script setup>
import { onMounted, reactive } from 'vue';
import MainLayout from '../layouts/Main.vue';
import axios from 'axios';
import { blogStore } from '../stores/blogStore'

const blogger = blogStore();

const form = reactive({
  name: null,
})

const handleCategory = async () => {
  const formData = new FormData();
  formData.append('name', form.name);

  try {
    await axios.post('api/category', 
      formData
    )
    

    for (const key in form) {
      form[key] = null;
    }
    
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await blogger.getCategories()
})
</script>

<template>
  <MainLayout>

    <div class="flex justify-center items-center h-screen">
      <form @submit.prevent="handleCategory">
        <h2 class="text-center font-semibold text-2xl">Create Category Form</h2>

        <div class="m-5 max-w-sm">
          <label for="postname" class="mb-2 block text-sm font-medium">Name</label>
          <div class="relative">
            <input v-model="form.name" type="text" id="postname" name="postname"
              class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter Post Name" />
            <div class="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">

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
