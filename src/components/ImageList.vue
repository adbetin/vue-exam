<template>
  <div class="max-w-screen-xl text-center content-center m-auto">
    <div class="grid col-gap-8" :class="gridColsClass">
      <div v-for="(imageList, index) in imageMatrix" :key="index">
        <div v-for="image in imageList" :key="image.id" class="pb-4 text-center">
          <div class="max-w-sm rounded overflow-hidden shadow-lg m-auto">
            <img class="w-full" :src="image.urls.small" :alt="image.alt_description" />
            <div v-if="!checkSelected(image)" class="w-full px-2 py-4">
              <button
                v-on:click="selectImage(image)"
                class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >Agregar</button>
            </div>
            <div v-else class="w-full px-2 py-4">
              <button
                class="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
              >Agregado!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  data: function() {
    return {
      winWidth: 0
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.winWidth = window.innerWidth;
    },
    selectImage: function(image) {
      this.$store.dispatch("addImage", image);
    },
    checkSelected: function(image) {
      let listSelectedImages = this.$store.getters.selectedImages;
      return listSelectedImages.some(img => img.id === image.id);
    }
  },
  computed: {
    columns: function() {
      return this.winWidth < 768
        ? 1
        : this.winWidth < 1024
        ? 2
        : this.winWidth < 1280
        ? 3
        : 4;
    },
    gridColsClass: function() {
      return `grid-cols-${this.columns}`;
    },
    imageMatrix: function() {
      var matrix = Array(this.columns)
        .fill()
        .map(() => []);
      let images = this.$store.getters.loadedImages;
      for (var i = 0, k = 0; i < images.length; i++) {
        if (i % this.columns === 0) {
          k = 0;
        }
        matrix[k++].push(images[i]);
      }
      return matrix;
    }
  }
};
</script>

<style scoped></style>
