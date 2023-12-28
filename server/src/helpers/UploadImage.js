const axios = require("axios");
const FormData = require("form-data");

const UploadImage = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("key", process.env.IMGBB_KEY);
    formData.append("image", imageData.buffer, {
      filename: imageData.originalname,
    });

    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const imageUrl = response.data.data.url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};

module.exports = UploadImage;
