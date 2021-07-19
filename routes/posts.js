const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
//create post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send("Post has been updated");
    } else {
      res.status(400).send("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).send("Post has been deleted");
    } else {
      res.status(400).send("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("Post disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).send("Post not found");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get timeline posts
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
       return Post.find({ userId: friendId });
      }),
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
