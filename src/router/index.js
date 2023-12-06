import { createRouter, createWebHistory } from 'vue-router'
// import SideNav from '../layouts/Main.vue';
import HomeView from '../views/HomeView.vue'
import PostsListView from '../views/PostsListView.vue'
import PostView from '../views/PostView.vue'
import AddPost from '../views/AddPost.vue'
import CategoriesView from '../views/CategoriesView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import { authStore } from '../stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sidenav',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: PostsListView
        },

        {
          path: 'posts',
          name: 'posts',
          component: PostsListView
        },
        {
          path: 'posts/:id',
          name: 'posts/:id',
          component: PostView
        },
        {
          path: 'add-post',
          name: 'add-post',
          component: AddPost
        },
        {
          path: 'categories',
          name: 'categories',
          component: CategoriesView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/:not-found(.*)',
      name: 'not-found',
      component: PageNotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user } = authStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    // Redirect to login if trying to access a protected route without authentication
    next('/login')
  } else {
    next()
  }
})

export default router
