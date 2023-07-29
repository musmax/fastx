const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Article } = require('../models/article.model');
const { getUserById } = require('./user.service');
const { Category } = require('../models/category.model');

const createArticle = async (articleBody, userId) => {
  const user = await getUserById(userId);

  // Convert the article title to lowercase
  const lowerCaseTitle = articleBody.title.toLowerCase();

  // Check if an article with a similar title already exists (case-insensitive)
  const existingArticle = await Article.findOne({ title: { $regex: new RegExp(`^${lowerCaseTitle}$`, 'i') } });

  if (existingArticle) {
    throw new Error('An article with a similar title already exists');
  }

  // Create an array to store the created category documents
  const createdCategories = [];

  // Iterate through the categories and create/update them
  // eslint-disable-next-line no-restricted-syntax
  for (const categoryName of articleBody.categories) {
    // eslint-disable-next-line no-await-in-loop
    let category = await Category.findOne({ name: categoryName });

    if (!category) {
      // If the category doesn't exist, create a new one
      category = new Category({ name: categoryName });
    }

    // Add the article ID to the category's articleIds array
    category.articleIds.push(Article._id);

    // Save the category
    // eslint-disable-next-line no-await-in-loop
    await category.save();

    // Push the created/updated category to the array
    createdCategories.push(category);
  }
  // Create the article
  const article = new Article({
    title: articleBody.title,
    body: articleBody.body,
    categories: createdCategories.map((category) => category._id),
    isPublished: articleBody.isPublished,
    facets: articleBody.facets,
    author: user.name,
    phone: user.phone,
    authorId: user._id,
    mediaIds: articleBody.mediaIds,
  });
  await article.save();
  return article;
};

const getAllArticle = async (page, pageSize) => {
  const totalArticles = await Article.countDocuments();
  const totalPages = Math.ceil(totalArticles / pageSize);
  const skip = pageSize * (page - 1);

  const articles = await Article.find().select('title body categories').sort('-title').skip(skip).limit(pageSize);

  return {
    articles,
    page,
    pageSize,
    totalPages,
    totalArticles,
  };
};

const getArticle = async (articleId) => {
  const article = await Article.findById(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  return article;
};

const updateArticle = async (articleBody, articleId) => {
  const article = await Article.findByIdAndUpdate(articleId, articleBody, { new: true });
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  return article;
};

const deleteArticle = async (articleBody, articleId) => {
  const article = await Article.findByIdAndDelete(articleId);
  if (!article) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  return article;
};

const getArticlesBelongingToAnAuthor = async (authorId, pageSize, page) => {
  const authorExist = await getUserById(authorId);
  if (!authorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Author not found');
  }

  const totalArticles = await Article.countDocuments({ authorId });

  const totalPages = Math.ceil(totalArticles / pageSize);
  const skip = (page - 1) * pageSize;

  const articles = await Article.find({ authorId })
    .select('title body categories')
    .sort('-title')
    .skip(skip)
    .limit(pageSize);

  return {
    articles,
    totalPages,
    currentPage: page,
    pageSize,
  };
};

module.exports = {
  createArticle,
  getAllArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  getArticlesBelongingToAnAuthor,
};
