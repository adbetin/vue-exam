<template>
  <div class="max-w-screen-xl text-center content-center m-auto">
    <div class="grid col-gap-8" :class="gridColsClass">
      <div v-for="(imageList, index) in imageMatrix" :key="index">
        <div v-for="image in imageList" :key="image.id" class="pb-4 text-center">
          <div class="max-w-sm rounded overflow-hidden shadow-lg  m-auto">
            <img class="w-full" :src="image.urls.small" :alt="image.alt_description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: {
    images: Array
  },
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
    }
  },
  computed: {
    columns: function() {
      return this.winWidth < 768 ? 1 : this.winWidth < 1024 ? 2 : (this.winWidth < 1280 ? 3 : 4);
    },
    gridColsClass: function() {
      return `grid-cols-${this.columns}`;
    },
    imageMatrix: function() {
      var matrix = Array(this.columns)
        .fill()
        .map(() => []);
      for (var i = 0, k = 0; i < this.images.length; i++) {
        if (i % this.columns === 0) {
          k = 0;
        }
        matrix[k++].push(this.images[i]);
      }
      return matrix;
    }
  }
};
</script>

<style scoped>
.masonry-brick {
  box-sizing: border-box;
  display: block;
  height: auto;
  line-height: 24px;
  padding-bottom: 40px;
  width: 100%;
}
</style>
