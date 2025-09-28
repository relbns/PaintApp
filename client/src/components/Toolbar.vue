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
      <button id="downloadBtn" @click="$emit('download-image')">
        Download
      </button>
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

<style scoped>
#toolbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

#toolbar > div {
  display: flex;
  align-items: center;
  gap: 15px;
}

label {
  font-weight: bold;
}

input[type="range"] {
  width: 150px;
}

input[type="color"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch {
  border-radius: 50%;
  border: 1px solid #ccc;
}
input[type="color"]::-moz-color-swatch {
  border-radius: 50%;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#clearBtn {
  background-color: #f44336;
}

#clearBtn:hover {
  background-color: #da190b;
}

#downloadBtn {
  background-color: #2196f3;
}

#downloadBtn:hover {
  background-color: #0b7dda;
}
</style>
