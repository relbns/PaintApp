const express = require('express');
const app = express();
const cors = require('cors');
const fileUtil = require('./util.js');

app.use(express.json({ limit: '50mb' }), (err, req, res, next) => {
  if (err) {
    return res.json({
      code: 1,
      msg: 'json max length exceeded',
    });
  }
});

app.use(cors());

const IMAGE_PATH = 'images.json';

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.get('/images', (req, res) => {
  const results = fileUtil.getImagesArrayFromJsonFile(IMAGE_PATH);
  res.status(200).json(results);
});

app.post('/images', (req, res) => {
  const newImage = req.body.image;
  if (!fileUtil.isValidJson(newImage)) {
    console.log(newImage);
    return res.status(400).json({
      code: 2,
      msg: 'The uploaded file is not valid',
    });
  }
  fileUtil.appendImageToJsonFile(newImage, IMAGE_PATH);
  res.status(200).json({
    code: 3,
    msg: 'Image added successfully',
  });
});

app.delete('/images', (req, res) => {
  fileUtil.resetImageJsonFile(IMAGE_PATH);
  res.status(200).json({
    code: 4,
    msg: 'Images removed successfully',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
