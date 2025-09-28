<template>
  <div id="leftImages">
    <h3>Saved Images</h3>
    <div class="mode-indicator">
      <span class="mode-badge" :class="currentMode">
        {{ currentMode === 'server' ? 'Server Mode' : 'Local Storage' }}
      </span>
    </div>
    <button @click="$emit('save-image')">Save image</button>
    <button @click="clearAllImages">Delete All</button>
    <div id="imagesList">
      <div
        class="image-container"
        :key="index"
        v-for="(image, index) in images"
      >
        <img
          :src="image.src"
          @click="$emit('show-on-canvas', $event.srcElement.currentSrc)"
        />
        <button class="delete-btn" @click="deleteImage(index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import imageService from '../services/imageService';

export default {
  name: "LeftImages",
  data() {
    return {
      images: [],
      currentMode: 'localStorage',
    };
  },
  props: {
    savedImageWatcher: String,
  },
  methods: {
    async deleteImage(index) {
      this.images = imageService.deleteImage(index);
    },
    async getAllImages() {
      return await imageService.getAllImages();
    },
    async deleteAllImages() {
      await imageService.deleteAllImages();
      this.images = [];
    },
    clearImagesDiv() {
      const parent = document.getElementById("imagesList");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    },
    async clearAllImages() {
      await this.deleteAllImages();
      this.clearImagesDiv();
    },
    updateCurrentMode() {
      this.currentMode = imageService.getCurrentMode();
    },
  },
  watch: {
    savedImageWatcher: function (image) {
      this.images.push(JSON.parse(image).image);
    },
  },
  async created() {
    this.images = await this.getAllImages();
    this.updateCurrentMode();
    
    // Update mode after server check completes
    setTimeout(() => {
      this.updateCurrentMode();
    }, 1000);
  },
};
</script>

<style scoped>
#leftImages {
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

#imagesList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

img {
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

img:hover {
  transform: scale(1.05);
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.image-container {
  position: relative;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 1px;
  background-color: #f44336;
  padding: 2px 5px;
  font-size: 12px;
}

.delete-btn:hover {
  background-color: #da190b;
}

.mode-indicator {
  text-align: center;
  margin-bottom: 5px;
}

.mode-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.mode-badge.server {
  background-color: #4CAF50;
  color: white;
}

.mode-badge.localStorage {
  background-color: #2196F3;
  color: white;
}
</style>
