<template>
  <canvas
    id="paintCanvas"
    :width="canvasWidth"
    :height="canvasHeight"
    @change-brush-color="updateBrushColor"
    @change-brush-size="updateBrushSize"
  >
    Your browser does not support HTML5
  </canvas>
</template>

<script>
export default {
  name: "PaintCanvas",
  data() {
    return {
      xPos: 0,
      yPos: 0,
      canvasWidth: 600,
      canvasHeight: 400,
      canvas: null,
      context: null,
      isDrawing: false,
      insideCanvas: false,
    };
  },
  props: {
    clearCanvasWatcher: Boolean,
    imageBgWatcher: String,
    colorBgWatcher: String,
    brushColor: String,
    brushSize: Number,
    showImageOnCanvasWatcher: String,
    saveImageWatcher: Boolean,
  },
  methods: {
    updateMousePosition(event) {
      const rect = this.canvas.getBoundingClientRect();
      this.xPos = event.clientX - Math.floor(rect.left);
      this.yPos = event.clientY - Math.floor(rect.top);

      const newMousePos = {
        xPos: this.xPos,
        yPos: this.yPos,
      };

      this.$emit("mouse-pos", newMousePos);
    },
    penDown() {
      this.isDrawing = true;
      this.context.beginPath();
      this.context.moveTo(this.xPos, this.yPos);
    },
    draw() {
      this.context.lineTo(this.xPos, this.yPos);
      this.context.strokeStyle = this.brushColor;
      this.context.lineWidth = this.brushSize;
      this.context.stroke();
    },
    penUp() {
      this.isDrawing = false;
    },
    clearCanvas() {
      this.backgroundColor = "#FFFFFF";
      this.backgroundImage = null;
      this.canvas.style.backgroundColor = this.backgroundColor;
      this.canvas.style.backgroundImage = ``;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.$emit("clear-bg-filename");
    },
    setBackgroundColor() {
      this.backgroundImage = null;
      this.$emit("clear-bg-filename");
      this.canvas.style.backgroundImage = ``;
      this.canvas.style.backgroundColor = this.backgroundColor;
    },
    setBackgroundImage(selectedImage) {
      this.backgroundColor = "#FFFFFF";
      this.canvas.style.backgroundColor = this.backgroundColor;
      this.backgroundImage = selectedImage;
      this.canvas.style.backgroundImage = `url('${this.backgroundImage}')`;
    },
    prepareForSave() {
      if (!this.backgroundImage) {
        this.context.fillStyle = this.backgroundColor;
        this.context.globalCompositeOperation = "destination-over";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.globalCompositeOperation = "source-over";
        this.saveImage();
      } else {
        const background = new Image();
        background.src = this.backgroundImage;
        background.onload = () => {
          //keep image original ratio
          const imageRatio = background.width / background.height;
          let newWidth = this.canvas.width;
          let newHeight = newWidth / imageRatio;
          if (newHeight > this.canvas.height) {
            newHeight = this.canvas.height;
            newWidth = newHeight * imageRatio;
          }
          //todo: if image has smaller dimentions and you keep its original ratio consider to center the image in the canvas
          this.context.globalCompositeOperation = "destination-over";
          this.context.drawImage(background, 0, 0, newWidth, newHeight);
          this.context.globalCompositeOperation = "source-over";
          this.saveImage();
        };
      }
    },
    saveImage() {
      // Option to choose file name
      //const fileName = prompt("Enter file name for your image");
      const canvasDataURL = this.canvas.toDataURL();
      const a = document.createElement("a");
      a.href = canvasDataURL;
      a.download = "myDrawing"; //fileName || "myDrawing";
      a.click();
      const payload = JSON.stringify({
        image: { src: canvasDataURL },
      });
      // send to server
      this.sendToServer(payload);
      // update list in LeftImages Component
      this.$emit("update-image-list", payload);

      // clear canvas for next painting
      this.clearCanvas();
    },
    showSelectedOnCanvas(image) {
      this.clearCanvas();
      this.backgroundImage = image;
      this.canvas.style.backgroundImage = `url('${this.backgroundImage}')`;
    },
    async sendToServer(payload) {
      const res = await fetch("http://localhost:3000/images", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: payload,
      });
      const data = await res.json();
      return data;
    },
  },
  watch: {
    clearCanvasWatcher: function () {
      this.clearCanvas();
    },
    imageBgWatcher: function (image) {
      this.setBackgroundImage(image);
    },
    colorBgWatcher: function (color) {
      this.backgroundColor = color;
      this.setBackgroundColor();
    },
    showImageOnCanvasWatcher: function (image) {
      this.showSelectedOnCanvas(image);
    },
    saveImageWatcher: function () {
      this.prepareForSave();
    },
  },
  mounted() {
    this.canvas = document.getElementById("paintCanvas");
    this.context = this.canvas.getContext("2d");

    this.clearCanvas();
    this.canvas.addEventListener("mousedown", () => {
      this.penDown();
    });

    this.canvas.addEventListener("mousemove", (event) => {
      this.updateMousePosition(event);
      if (this.isDrawing && this.insideCanvas) {
        this.draw();
      }
    });

    this.canvas.addEventListener("mouseup", () => {
      this.penUp();
    });

    this.canvas.addEventListener("mouseenter", () => {
      this.insideCanvas = true;
    });

    this.canvas.addEventListener("mouseout", () => {
      this.insideCanvas = false;
      //uncomment if you want to make the drawing stop if you exit the canvas area
      // if (this.isDrawing) {
      //   this.penUp();
      // }
    });
  },
};
</script>
