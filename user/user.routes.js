const { Router } = require("express");
const userController = require("./user.controller");

const router = Router();

router.get("/users", userController.getUsers);
router.post(
  "/users",
  userController.registerValidation,
  userController.createUser,
);
router.patch("/users", userController.userLogin);
router.patch("/logout", userController.authorization, userController.userLogout);

module.exports = router;
