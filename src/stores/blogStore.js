import axios from 'axios'
import { defineStore } from 'pinia'

export const blogStore = defineStore('blog', {
  state: () => ({
    categories: [],
    category: [],
    categoryPosts: [],
    posts: [],
    post: [],
    likes_count: 0,
    loadingSinglePost: false,
    comments: [],
    urlPath: import.meta.env.VITE_URL_PATH

  }),

  getters: {
    // Getter to get the like count for a specific post
    getLikeCount: (state) => (postId) => {
      return state.likes.filter((like) => like.post_id === postId).length
    }
  },

  actions: {
    async getCategories() {
     
        const response = await axios.get('/api/category')
        this.categories = response.data
  
    },

    async getCategory(categoryId) {
     
        const response = await axios.get(`/api/category/${categoryId}`)
        this.category = response.data
  
    },
  
    async getCategoryPosts(categoryId) {
     
        const response = await axios.get(`/api/category/${categoryId}/posts`)
        this.categoryPosts = response.data
  
    },

    async getPosts() {
        const response = await axios.get('/api/posts')
        this.posts = response.data
    },

    async getSinglePost(postId) {
     
        this.loadingSinglePost = true;
        const response = await axios.get(`api/post/${postId}`)
        this.post = response.data
  
    },

    async likePost(blogPost) {
     
       const response = await axios.post(`/api/like`, blogPost)
       this.likes_count = response.data.likes_count
  
    },

    async updateLikesCount(blogPost) {
     
        const response = await axios.get(`/api/posts/${blogPost}/likes-count`)
        this.likes_count = response.data.likes_count
  
    },

    async addComment(comment) {
     
        await axios.post(`/api/comment`, comment)
        await this.getComments(comment.post_id)
        
 
    },

    async getComments(postId) {

     
        const response = await axios.get(`/api/posts/${postId}/comments`)
        this.comments = response.data
  
    },
  }
})
