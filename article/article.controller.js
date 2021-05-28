const Article = require("./Article");

class ArticleController {
  async createArticle(req, res) {
    const {
      user,
      body: { title, text },
    } = req;

    const article = {
      title: title,
      text: text,
      author: user.name,
    };

    try {
      await Article.create(article);
      res.status(200).json(article);
    } catch (error) {
      res.status(400);
    }
  }

  async removeArticle(req, res) {
    const {
      body: { author, title },
      user: { name },
    } = req;

    if (author === name) {
      try {
        await Article.findOneAndDelete({ title });
        res.status(200).send("Successfuly deleted");
      } catch (error) {
        res.status(400);
      }
    } else {
      return res.status(400).send(`Author is ${author}. But you are ${name}`);
    }
  }

  async getArticles(req, res) {
    const articles = await Article.find();

    return res.send(articles).status(200);
  }
}

module.exports = new ArticleController();
