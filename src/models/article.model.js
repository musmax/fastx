const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  body: {
    type: String,
    required: true,
    maxlength: 255,
  },
  mediaIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
  categories: {
    type: Array,
    validate: {
      validator(v) {
        return v.length > 0;
      },
      message: 'An article should have at least one category',
    },
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  facets: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        subtopics: {
          type: [
            {
              type: String,
              required: true,
            },
          ],
          required: true,
        },
      },
    ],
  },
  phone: {
    type: String,
    required: false,
    maxlength: 255,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = {
  Article,
};
