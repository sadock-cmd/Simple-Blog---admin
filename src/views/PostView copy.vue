<script setup>
import { computed, onMounted, ref, watch, reactive } from 'vue';
import MainLayout from '../layouts/Main.vue';
import { blogStore } from '../stores/blogStore'
import { authStore } from '../stores/authStore'
import CommentSection from '../components/CommentSection.vue';
import { format } from 'date-fns';
import { useRoute } from 'vue-router';

const blogger = blogStore();
const auth = authStore();

const route = useRoute()

const post = computed(() => blogger.post);
const postLikes = computed(() => blogger.likes_count);
const isLoading = ref(true);

const form = reactive({
  title: post.value.title,
  image: post.value.image,
  content: post.value.content,
})
// const postDate = computed((post) => {
//   console.log('can i see', post);
//   return format(new Date(post.created_at), 'yyyy-MM-dd')
// });

const handleLike = async (postId) => {
  try {
    const blogPost = {
      user_id: auth.user.id,
      post_id: postId
    }
    await blogger.likePost(blogPost);
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

const onImageChange = (event) => {
  const file = event.target.files[0];
  form.image = file;
}

// const formatDate = (dateString) => {
//   return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
// };

console.log('my postss', post);
// console.log('my posts date', postDate);


onMounted(async () => {
  const postId = route.params.id
  isLoading.value = true;
  await blogger.getSinglePost(postId);
  await blogger.updateLikesCount(postId);
  isLoading.value = false;

})

// watch(() => blogger.likes_count, (newLikesCount, oldLikesCount) => {
//   console.log('Likes count changed:', newLikesCount);
//   // You can update any other UI elements or perform additional actions here
// });
</script>

<template>
  <MainLayout>

    <div v-if="!isLoading" class="container p-2 mx-auto sm:p-4 text-gray-100">

      <div class="flex items-center justify-center text-gray-900 min-w-full">
        <section class="dark:bg-gray-800 dark:text-gray-100 text-center">
          <div class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <div rel="noopener noreferrer"
              class="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline dark:bg-gray-900 items-center text-center">
              <div class="text-center my-2">
                <h2 class="font-bold text-xl uppercase">Update Post Details</h2>
              </div>
              <img :src="'http://localhost:8018' + post.image" :alt="post.title"
                class="object-cover w-full h-64 rounded sm:h-96 dark:bg-gray-500">
              <div class="w-full space-y-2">

                <div class="max-w-sm">
                  <h2 class="uppercase font-semibold">Post Likes: {{ postLikes }}</h2>
                </div>

                <div class="flex flex-row items-center gap-2 justify-between m-5 max-w-sm">
                  <label for="postname" class="mb-2 block text-sm font-medium">Title</label>
                  <div class="relative">
                    <input v-model="form.title" type="text" id="postname" name="postname"
                      class="block w-full rounded-md border border-gray-200 py-3 px-4 pr-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter Post Title" />
                    <div class="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-4">

                    </div>
                  </div>
                </div>

                <div class="flex flex-row items-center justify-between gap-2 m-5 max-w-sm">
                  <label for="content" class="mb-2 block text-sm font-medium">Content</label>

                  <textarea v-model="form.content" id="myTextarea" name="myTextarea" rows="4" cols="50"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"></textarea>
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





                <div class="mt-4">
                  <CommentSection :post="post" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <div v-else class="text-center">Loading Post Data...</div>
  </MainLayout>
</template>
