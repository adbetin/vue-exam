<template>
  <div class="image-list">
    <h1>Image List</h1>
    <ul id="example-1">
      <li v-for="image in images" :key="image.id">{{ image.id }}
        <p>{{image.urls.thumb}}
      <img :src=image.urls.thumb>
      </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: {
    images: Array
  }
};
</script>

<style scoped>
</style>
