<template>
  <div id="wrapper">
    <main>
      <h1>Paint 2.0</h1>
      <Toolbar
        @change-brush-color="updateBrushColor"
        @change-brush-size="updateBrushSize"
        @change-background-color="updateBgColor"
        @change-background-image="updateBgImage"
        @clear-canvas="clearCanvas"
        @download-image="downloadImageTask"
        :bgImageNameWatcher="bgFileName"
      />
      <PaintCanvas
        @mouse-pos="updateMousePos"
        @clear-bg-filename="clearBGfileName"
        @update-image-list="updateImageList"
        :clearCanvasWatcher="isCanvasClear"
        :imageBgWatcher="bgImage"
        :colorBgWatcher="bgColor"
        :brushSize="brushSize"
        :brushColor="brushColor"
        :saveImageWatcher="saveImage"
        :downloadImageWatcher="downloadImage"
        :showImageOnCanvasWatcher="showImage"
      />
      <Statistics :pos="pos" :brushSize="brushSize" :brushColor="brushColor" />
    </main>
    <aside>
      <LeftImages
        @save-image="saveImageTask"
        @show-on-canvas="showImageTask"
        :savedImageWatcher="savedImage"
      />
    </aside>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import PaintCanvas from "./components/PaintCanvas.vue";
import Statistics from "./components/Statistics.vue";
import LeftImages from "./components/LeftImages.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    PaintCanvas,
    Statistics,
    LeftImages,
  },
  data() {
    return {
      pos: {},
      brushColor: "#000000",
      brushSize: 1,
      bgColor: "#ffffff",
      bgImage: "",
      showImage: "",
      isCanvasClear: false,
      bgFileName: false,
      saveImage: false,
      downloadImage: false,
      savedImage: "",
    };
  },
  methods: {
    updateMousePos(newMousePos) {
      this.pos = newMousePos;
    },
    updateBrushColor(color) {
      this.brushColor = color;
    },
    updateBrushSize(size) {
      this.brushSize = parseInt(size);
    },
    updateBgColor(color) {
      this.bgColor = color;
    },
    updateBgImage(image) {
      this.bgImage = image;
    },
    clearCanvas() {
      this.isCanvasClear = !this.isCanvasClear;
    },
    clearBGfileName() {
      this.bgFileName = !this.bgFileName;
    },
    saveImageTask() {
      this.saveImage = !this.saveImage;
    },
    downloadImageTask() {
      this.downloadImage = !this.downloadImage;
      setTimeout(() => {
        this.downloadImage = !this.downloadImage;
      }, 100);
    },
    showImageTask(image) {
      this.showImage = image;
    },
    updateImageList(image) {
      this.savedImage = image;
    },
  },
};
</script>

<style>
#wrapper {
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  align-items: flex-start;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

aside {
  margin-top: 50px;
}
</style>
