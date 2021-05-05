const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./User");

class UserController {
  async registerValidation(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      subscription: Joi.string(),
      token: Joi.string(),
    });

    const validationResult = validationRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }

  async createUser(req, res) {
    const verificationToken = uuidv4();

    try {
      const { body } = req;
      const hashedPass = await bcrypt.hash(body.password, 14);
      const user = await User.create({
        ...body,
        password: hashedPass,
        verificationToken: `${verificationToken}`,
      });

      res.status(201);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async userLogin(req, res) {
    const {
      body: { name, password },
    } = req;

    const user = await User.findOne({ name });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Name or password is wrong");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
    );

    user.token = token;

    console.log(user.subscription);

    const userLogged = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    return res.json({
      token,
      user: {
        name,
        subscription: user.subscription,
      },
    });
  }

  async authorization(req, res, next) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401).send("User is unauthorized");
    }
    const token = authHeader.replace("Bearer ", "");

    try {
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = payload;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).send("User is unauthorized");
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send(error);
    }
  }

  async userLogout(req, res) {
    const user = req.user;
    user.token = "";

    try {
      await User.findByIdAndUpdate(user._id, user);
      res.status(204).send("No content");
    } catch (error) {
      res.status(401).send("Not authorized");
    }
  }

  async currentUser(req, res) {
    const { name, subscription } = req.user;

    res
      .json({
        name,
        subscription,
      })
      .status(200);
  }
}

module.exports = new UserController();
