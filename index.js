const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./user/user.routes");
const articleRoutes = require("./article/article.routes");

const PORT = process.env.PORT || 8080;

class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.connectToDb();
    this.listen();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
      }),
    );
  }

  initRoutes() {
    this.server.use("/fandom", userRoutes);
    this.server.use("/article", articleRoutes);
  }

  async connectToDb() {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  }
}

const server = new Server();
server.start();
