<template>
  <div id="toolbar">
    <div>
      <label for="brush-size">Size </label
      ><input
        id="brush-size"
        type="range"
        min="1"
        max="20"
        v-model="brushSize"
        @change="$emit('change-brush-size', brushSize)"
      />
      <label for="brush-color">Color </label
      ><input
        id="brush-color"
        type="color"
        v-model="brushColor"
        @change="$emit('change-brush-color', brushColor)"
      />
      <label for="background-color">Background </label
      ><input
        id="background-color"
        type="color"
        v-model="backgroundColor"
        @change="$emit('change-background-color', backgroundColor)"
      />
    </div>
    <div>
      <label for="fileLoadBtn">Load image </label>
      <input id="fileLoadBtn" type="file" @change="getBackgroundImage" />
      <button id="clearBtn" @click="$emit('clear-canvas')">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      brushSize: 1,
      brushColor: "#000000",
      backgroundColor: "#FFFFFF",
      backgroundImage: null,
    };
  },
  props: {
    bgImageNameWatcher: Boolean,
  },
  methods: {
    getBackgroundImage(event) {
      const selectedFile = event.target.files[0];
      this.backgroundImage = URL.createObjectURL(selectedFile);
      this.$emit("change-background-image", this.backgroundImage);
    },
  },
  watch: {
    bgImageNameWatcher: function () {
      document.getElementById("fileLoadBtn").value = "";
    },
  },
};
</script>
