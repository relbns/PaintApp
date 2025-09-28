<template>
  <div id="statistics">
    <span id="mouse-pos">Pos: {{ pos.xPos }},{{ pos.yPos }}</span>
    <span id="brush-size">Brush Size: {{ brushSize }}</span>
    <span id="brush-color">Brush Color: {{ brushColor }}</span>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  props: {
    pos: Object,
    brushSize: {
      type: Number,
      default: 1,
    },
    brushColor: {
      type: String,
      default: "#000000",
    },
  },
};
</script>

<style scoped>
#statistics span {
  display: inline-block;
  margin-left: 20px;
}
</style>
