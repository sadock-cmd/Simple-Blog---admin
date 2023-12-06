<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import MainLayout from '../layouts/Main.vue';
import axios from 'axios';
import { blogStore } from '../stores/blogStore'

const blogger = blogStore();

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
}

const toggleEditModal = () => {
  isEditModalOpen.value = !isEditModalOpen.value;
}

const form = reactive({
  name: null,
})

const editName = ref(null);
const editId = ref(null);

const categories = computed(() => blogger.categories);

const handleCategory = async () => {

  try {
    const response = await axios.post('/api/category', {
      'name': form.name
    })
    console.log(response.data);

    for (const key in form) {
      form[key] = null;
    }

    await blogger.getCategories();

    isModalOpen.value = false;

  } catch (error) {
    console.log(error);
  }
}

const handleUpdateCategory = async () => {

  try {
    const response = await axios.put(`/api/category/${editId.value}`, {
      'name': editName.value
    })
    console.log(response.data);

    isEditModalOpen.value = false;
    await blogger.getCategories();


  } catch (error) {
    console.log(error);
  }
}


const editCategory = async (data) => {
  isEditModalOpen.value = true;
  const response = await axios.get(`/api/category/${data}`)
  editName.value = response.data.name;
  editId.value = response.data.id;


}

const deleteCategory = async (data) => {
  await axios.delete(`/api/category/${data}`)
  await blogger.getCategories();
}

onMounted(async () => {
  await blogger.getCategories();
})
</script>

<template>
  <MainLayout>

    <div class="container p-2 mx-auto sm:p-4 text-gray-100">

      <div class="flex items-center justify-center mb-4 gap-10 text-gray-900 min-w-full">
        <div>
          <h2 class="text-2xl font-semibold leadi uppercase">Categories</h2>
        </div>
        <div>
          <button @click.prevent="toggleModal()"
            class="px-3 py-1 font-semibold rounded-md bg-violet-400 text-white">Add Category</button>
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
              <th class="p-3">Category Name</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id"
              class="border-b border-opacity-20 border-gray-700 bg-gray-900">
              <td class="p-3">
                <p>{{ index + 1 }}</p>
              </td>
              <td class="p-3">
                <p>{{ category.name }}</p>
              </td>

              <td class="p-3">
                <button @click.prevent="editCategory(category.id)" class="px-3 py-1 mr-2 font-semibold rounded-md bg-violet-500 text-gray-100">
                  Edit
                </button>
                <button @click.prevent="deleteCategory(category.id)" class="px-3 py-1 font-semibold rounded-md bg-red-500 text-gray-100">
                  Delete
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-auto bg-smoke flex items-center justify-center">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <button @click="toggleModal" class="absolute top-0 right-0 p-4">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 class="text-2xl font-semibold">Add Category</h2>
        <hr class="my-4 font-semibold" />
        <form @submit.prevent="handleCategory">
          <div class="mb-4">
            <label for="categoryName" class="block text-sm font-medium text-gray-700">Category Name</label>
            <input v-model="form.name" type="text" id="categoryName" name="categoryName"
              class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="flex justify-between">
            <button @click.prevent="toggleModal()" class="bg-gray-900 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-gray-900 text-white px-4 py-2 rounded-md">Add</button>
          </div>
        </form>
      </div>
    </div>
    
    <div v-if="isEditModalOpen" class="fixed inset-0 z-50 overflow-auto bg-smoke flex items-center justify-center">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <button @click="toggleEditModal" class="absolute top-0 right-0 p-4">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 class="text-2xl font-semibold">Edit Category</h2>
        <hr class="my-4 font-semibold" />
        <form @submit.prevent="handleUpdateCategory">
          <div class="mb-4">
            <label for="categoryName" class="block text-sm font-medium text-gray-700">Category Name</label>
            <input v-model="editName" type="text" id="categoryName" name="categoryName"
              class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="flex justify-between">
            <button @click.prevent="toggleEditModal()" class="bg-gray-900 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-gray-900 text-white px-4 py-2 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>

  </MainLayout>
</template>
