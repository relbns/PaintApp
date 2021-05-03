const fs = require('fs');

const getImagesArrayFromJsonFile = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return !data ? [] : JSON.parse(data);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const resetImageJsonFile = (path) => {
  try {
    fs.writeFileSync(path, '[]');
  } catch (err) {
    console.error(err);
  }
};

const appendImageToJsonFile = (encodedImageObj, path) => {
  try {
    let dataArray = getImagesArrayFromJsonFile(path);
    dataArray.push(encodedImageObj);
    fs.writeFileSync(path, JSON.stringify(dataArray));
  } catch (err) {
    console.error(err);
  }
};

const isValidJson = (json) => {
  let validJson = false;
  try {
    validJson = JSON.parse(JSON.stringify(json)).hasOwnProperty('src');
  } catch (err) {
    console.error(err);
    return false;
  }
  return validJson;
};

module.exports = {
  getImagesArrayFromJsonFile,
  resetImageJsonFile,
  appendImageToJsonFile,
  isValidJson,
};
