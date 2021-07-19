const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
