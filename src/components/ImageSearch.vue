<template>
  <div class="image-search m-8">
    <h1 class="text-left">Andres Betin - Image Search</h1>
    <div class="bg-indigo-900 py-4 lg:px-4">
      <div
        class="p-2 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex h-4"
        role="alert"
      >
        <span
          class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >{{selectedImages}}</span>
        <span class="font-semibold mr-2 text-left flex-auto">Elementos agregados</span>
        <div>
          <div class="inline-flex text-right">
            <button v-on:click="clearSelectedImages()"
              class="bg-gray-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >limpiar</button>
            <button v-on:click="copyImages()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >copiar</button>
          </div>
        </div>
      </div>
    </div>
    <input
      class="appearance-none bg-gray-200 border-none w-full h-10 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 mt-4"
      v-model="query"
      @keyup="search"
      placeholder="Ingresa texto para buscar imagenes"
    />
    <circle-4 v-if="loading" class="align-middle m-auto"></circle-4>
    <div v-if="images.length === 0">
      <h1 class="text-left">No hay imagenes disponibles</h1>
    </div>
    <div v-else>
      <ImageList class="align-middle" />
    </div>
  </div>
</template>

<script>
import ImageList from "./ImageList.vue";
import { Circle4 } from "vue-loading-spinner";
import Vue from 'vue'
import Clipboard from 'v-clipboard'
 
Vue.use(Clipboard)

export default {
  name: "ImageSearch",
  data: function() {
    return {
      query: "",
      page: 1,
      perPage: 20
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loadingStatus;
    },
    images() {
      return this.$store.getters.loadedImages;
    },
    selectedImages() {
      return this.$store.getters.selectedCount;
    }
  },
  components: {
    ImageList,
    Circle4
  },
  methods: {
    search: function() {
      let params = {
        query: this.query,
        page: this.page,
        perPage: this.perPage
      };
      this.$store.dispatch("getImages", params);
    },
    clearSelectedImages: function() {
      this.$store.dispatch("clearSelectedImages");
    },
    copyImages: function() {
      let links =  this.$store.getters.linkList;
      let stringList = links.join("\n")
      this.$clipboard(stringList);
    }
  }
};
</script>

<style scoped></style>
