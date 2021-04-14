const User = require("./User");

class UserController {
  async getUsers(req, res) {
    const users = await User.find();
    console.log(users);
    res.json(users);
  }

  async createUser(req, res) {
    try {
      const { body } = req;

      const user = await User.create(body);
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new UserController();
