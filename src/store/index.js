import Vue from 'vue'
import Vuex from 'vuex'
import ProductService from '@/services/ProductService.js';
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    product: {},
    token: null
  },
  mutations: {
    SET_LOADING_STATUS(state) {
      state.isLoading = !state.isLoading;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    REMOVE_PRODUCT(state, id) {
      state.products = state.products.filter(product => product.id != id);
    },
    SET_TOKEN(state, payload) {
      state.token = payload
      localStorage.setItem('auth_token', JSON.stringify(payload))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        payload
      }`
    }
  },
  actions: {
    fetchProducts({commit}) {
      commit('SET_LOADING_STATUS');
      return ProductService.getProducts()
        .then(response => {
          commit('SET_PRODUCTS', response.data);
        })
        .finally(() => commit('SET_LOADING_STATUS'));      
    },
    fetchProduct({commit,getters}, id) {
      let p = getters.getProductById(id);
      if(p == null) {
        ProductService.getProduct(id)
          .then(response => {
            commit('SET_PRODUCT', response.data);
          })
      } else {
        commit('SET_PRODUCT', p);
      }
    },
    addProduct({commit}, newProduct) {
      return ProductService.insertProduct(newProduct)
        .then(() => {        
          commit('ADD_PRODUCT', newProduct);
        })
    },
    deleteProduct({ commit }, product) {
      return ProductService.deleteProduct(product).then(() => {
        commit("REMOVE_PRODUCT", product.id);
      });
    },
    login ({ commit }, credentials) {
      return axios
        .post('http://www.mocky.io/v2/5b9149823100002a00939952', credentials) // mocky.io allows us to fake a successful authentication from the server
        .then(({ data }) => {
          commit('SET_TOKEN', data.token)
        })
    },
    setAuthToken({ commit }, token) {
      commit('SET_TOKEN', token)
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    loggedIn(state) {
      return !!state.token
    }
  }
})
