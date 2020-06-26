import Vue from 'vue'
import Vuex from 'vuex'

import ImageSearchService from "@/services/ImageSearchService";
let imageSearchService = new ImageSearchService();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    images: [],
    selectedImages: []
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    FETCH_IMAGES(state, images) {
      state.images = images
    },
    ADD_SELECTED_IMAGES(state, image) {
      state.selectedImages.push(image);
    },
    CLEAR_SELECTED_IMAGES(state) {
      state.selectedImages = [];
    }
  },
  actions: {
    getImages(context, params) {
      context.commit('SET_LOADING', true);
      imageSearchService
        .getImages(params.query, params.page, params.perPage)
        .then(response => {
          context.commit('FETCH_IMAGES', response.results);
          context.commit('SET_LOADING', false);
        })
        .catch(() => {
          context.commit('FETCH_IMAGES', []);
          context.commit('SET_LOADING', false);
        });
    },
    clearSelectedImages(context){
      context.commit('CLEAR_SELECTED_IMAGES');
    },
    addImage(context, image){
      context.commit('ADD_SELECTED_IMAGES', image);
    }
  },
  getters: {
    loadedImages(state) {
      return state.images;
    },
    loadingStatus(state) {
      return state.loading;
    },
    selectedCount(state) {
      return state.selectedImages.length;
    },
    selectedImages(state) {
      return state.selectedImages;
    },
    linkList(state) {
      return state.selectedImages.map(s => s.urls.small);
    }
  },
  modules: {
  }
})

