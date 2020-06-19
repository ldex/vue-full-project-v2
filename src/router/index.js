import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '@/views/Products.vue';
import Error from '@/views/Error.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import ProductInsert from '@/components/ProductInsert.vue';
import Admin from '@/views/Admin.vue';
import Login from '@/views/Login.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/product/insert', // order important! before :id route
    name: 'productInsert',
    component: ProductInsert
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetails,
    props: castRouteParamsId
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'error',
    component: Error
  }
]

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('auth_token')
    if(!loggedIn) {
      next('/login')
    } else next()
  } else next()  
})

export default router
