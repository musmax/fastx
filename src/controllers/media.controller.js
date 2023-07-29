const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mediaService } = require('../services');

const createMedia = catchAsync(async (req, res) => {
  const { image } = req.body; // Assuming you're sending the image path or URL in the request body
  const media = await mediaService.createMedia(image);
  res.status(httpStatus.CREATED).send(media);
});

module.exports = {
  createMedia,
};
