const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { articleService } = require('../services');

const createArticle = catchAsync(async (req, res) => {
  const article = await articleService.createArticle(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(article);
});

const getArticle = catchAsync(async (req, res) => {
  const article = await articleService.getArticle(req.params.articleId);
  res.status(httpStatus.OK).send(article);
});

const getArticles = catchAsync(async (req, res) => {
  const articles = await articleService.getAllArticle(1, 10);
  res.status(httpStatus.OK).send(articles);
});

const updateArticle = catchAsync(async (req, res) => {
  const updatedArticle = await articleService.updateArticle(req.body, req.params.articleId);
  res.status(httpStatus.OK).send(updatedArticle);
});

const deleteArticle = catchAsync(async (req, res) => {
  const article = await articleService.deleteArticle(req.body, req.params.articleId);
  res.status(httpStatus.NO_CONTENT).send(article);
});

const articleByAuthor = catchAsync(async (req, res) => {
  const authorArticle = await articleService.getArticlesBelongingToAnAuthor(req.params.authorId, 10, 1);
  res.status(httpStatus.OK).send(authorArticle);
});

module.exports = {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  articleByAuthor,
};
