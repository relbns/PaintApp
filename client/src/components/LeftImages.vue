<template>
  <div id="leftImages">
    <h3>Server</h3>
    <button @click="$emit('save-image')">Save image</button>
    <button @click="clearAllImages">Delete All</button>
    <div id="imagesList">
      <img
        :key="image"
        v-for="image in images"
        :src="image.src"
        @click="$emit('show-on-canvas', $event.srcElement.currentSrc)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftImages",
  data() {
    return {
      images: [],
    };
  },
  props: {
    savedImageWatcher: String,
  },
  methods: {
    async getAllImages() {
      const res = await fetch("http://localhost:3000/images");
      const data = await res.json();
      return data;
    },
    async deleteAllImages() {
      const res = await fetch("http://localhost:3000/images", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
    clearImagesDiv() {
      const parent = document.getElementById("imagesList");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    },
    clearAllImages() {
      this.deleteAllImages();
      this.clearImagesDiv();
    },
  },
  watch: {
    savedImageWatcher: function (image) {
      this.images.push(JSON.parse(image).image);
    },
  },
  async created() {
    this.images = await this.getAllImages();
  },
};
</script>
