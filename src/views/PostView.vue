<script setup>
import { computed, onMounted, ref, watch, reactive, onBeforeUnmount } from 'vue';
import MainLayout from '../layouts/Main.vue';
import { blogStore } from '../stores/blogStore'
import { authStore } from '../stores/authStore'
import CommentSection from '../components/CommentSection.vue';
import { format } from 'date-fns';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';


const blogger = blogStore();
const URL_PATH = blogger.urlPath;
const auth = authStore();

const route = useRoute()
const router = useRouter()

const post = computed(() => blogger.post);
const postLikes = computed(() => blogger.likes_count);
const categories = computed(() => blogger.categories);

const isLoading = ref(true);

const form = reactive({
  title: null,
  image: null,
  content: null,
  category: null
})

watch(() => blogger.post, (newPost) => {
  form.title = newPost.title;
  form.image = newPost.image;
  form.content = newPost.content;
  form.category = newPost.category;
});


const onImageChange = (event) => {
  const file = event.target.files[0];
  form.image = file;
}

const deletePost = async (postId) => {
  try {
    await axios.delete(`api/post/${postId}`)
    await blogger.getPosts();
    await router.push('/posts')

  } catch (error) {
    console.error(error)
  }
}

// const formatDate = (dateString) => {
//   return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
// };

// console.log('my posts date', postDate);

const handlePost = async () => {
  const user_id = auth.user.id;
  const postId = route.params.id

  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('category_id', form.category);
  formData.append('content', form.content);
  formData.append('user_id', user_id);
  formData.append('image', form.image);


  try {
    await axios.post(`/api/post/${postId}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file uploads
      },
    });


    await blogger.getPosts();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  const postId = route.params.id
  isLoading.value = true;
  await blogger.getSinglePost(postId);
  await blogger.updateLikesCount(postId);
  await blogger.getCategories()
  isLoading.value = false;

})

onBeforeUnmount(() => {
  // form.title = null
  // form.content = null
  // form.image = null

})

// watch(() => blogger.likes_count, (newLikesCount, oldLikesCount) => {
//   console.log('Likes count changed:', newLikesCount);
//   // You can update any other UI elements or perform additional actions here
// });
</script>

<template>
  <MainLayout>

    <template v-if="!isLoading">
      <div class="flex flex-col justify-center items-center min-h-screen">
        <form @submit.prevent="handlePost">
          <h2 class="text-center font-semibold text-2xl">Post Details</h2>


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
            <img :src="URL_PATH + post.image" :alt="post.title"
              class="object-cover w-40 h-40 rounded dark:bg-gray-500">

          </div>
          <div class="m-5 max-w-sm">
            <div class="col-span-full">
              <label for="bio" class="text-sm">Update Photo</label>

              <div class="relative">
                <input @change="onImageChange" accept="image/*" type="file" id="image" name="image"
                  class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
                <div class="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-row gap-2 text-center max-w-sm">
            <button type="submit" class="bg-gray-900 text-white px-4 py-2 shadow-md rounded-md">Update Post</button>
            <button @click.prevent="deletePost(post.id)"
              class="bg-red-600 text-white px-4 py-2 shadow-md rounded-md">Delete Post</button>
          </div>


        </form>


        <div class="mt-4">
          <div class="my-5">
            <h3 class="font-semibold uppercase text-xl text-gray-600">Number of Post Likes: {{ postLikes }}</h3>
            <!-- <h3 class="font-semibold uppercase text-xl text-gray-600">Number of Post Comments: {{ postLikes }}</h3> -->
          </div>
          <CommentSection :post="post" />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center mt-10 text-gray-600">Loading Post Data...</div>

    </template>

  </MainLayout>
</template>
