const { Router } = require("express");
const userController = require("./user.controller");

const router = Router();

router.get("/users", userController.getUsers);
router.post('/users', userController.createUser);

module.exports = router;
