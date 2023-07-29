const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Article } = require('../models/article.model');
const { Media } = require('../models/media.model');
const { getUserById } = require('./user.service');
const { Category } = require('../models/category.model');
const cloudinary = require('../utils/cloudinary');

const createMedia = async () => {
  const result = await cloudinary.uploader.upload(image, {
    folder: 'Medias',
    width: 300,
    crop: 'scale',
  });
  // Create the article
  const media = new Media({
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  await media.save();
  return media;
};

module.exports = {
  createMedia,
};
