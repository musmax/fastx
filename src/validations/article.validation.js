const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArticle = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
    mediaIds: Joi.array().items(Joi.string()).required(),
    facets: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          subtopics: Joi.array().items(Joi.string()).required(),
        })
      )
      .required(),
  }),
};

const getArticles = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getArticle = {
  params: Joi.object().keys({
    articleId: Joi.string().required(),
  }),
};

const updateArticle = {
  params: Joi.object().keys({
    articleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      body: Joi.string(),
      categories: Joi.array().items(Joi.string()),
      facets: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          subtopics: Joi.array().items(Joi.string()),
        })
      ),
    })
    .min(1),
};

const deleteArticle = {
  params: Joi.object().keys({
    articleId: Joi.string().custom(objectId).required(),
  }),
};

const authorArticles = {
  params: Joi.object().keys({
    authorId: Joi.string().required(),
  }),
};

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  authorArticles,
};
