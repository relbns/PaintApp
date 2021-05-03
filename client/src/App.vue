<template>
  <div id="wrapper">
    <h1>Paint 2.0</h1>
    <Toolbar
      @change-brush-color="updateBrushColor"
      @change-brush-size="updateBrushSize"
      @change-background-color="updateBgColor"
      @change-background-image="updateBgImage"
      @clear-canvas="clearCanvas"
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
      :showImageOnCanvasWatcher="showImage"
    />
    <Statistics :pos="pos" :brushSize="brushSize" :brushColor="brushColor" />
    <LeftImages
      @save-image="saveImageTask"
      @show-on-canvas="showImageTask"
      :savedImageWatcher="savedImage"
    />
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
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#leftImages {
  width: 200px;
  height: 600px;
  position: absolute;
  right: 20px;
  top: 100px;
}

#leftImages #imagesList {
  margin-top: 20px;
  height: 400px;
  overflow: auto;
}

#leftImages img {
  width: 100px;
  border: gainsboro dashed 2px;
  padding: 5px;
  cursor: pointer;
}

#paintCanvas {
  width: 600px;
  height: 400px;
  border: dashed dimgray 3px;
  cursor: crosshair;
}

#statistics span {
  display: inline-block;
  margin-left: 20px;
}
</style>
