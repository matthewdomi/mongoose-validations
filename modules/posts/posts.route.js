const router = require("express").Router;

const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require("./posts.controller");
const { authRequired } = require("../middlewares/authRequired");

const postRouter = router();

postRouter.route("/").all(authRequired).get(getAllPosts).post(createPost);
postRouter
  .route("/:postId")
  .all(authRequired)
  .get(getSinglePost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = postRouter;
