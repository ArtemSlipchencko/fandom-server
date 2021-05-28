const { Router } = require("express");
const articleController = require("./article.controller");
const userController = require("../user/user.controller");

const router = Router();

router.post(
  "/create",
  userController.authorization,
  articleController.createArticle,
);
router.delete("/delete", userController.authorization, articleController.removeArticle);
router.get("/posts", articleController.getArticles);

module.exports = router;