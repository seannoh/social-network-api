const router = require("express").Router();

const controller = require("../../controllers/userController");

router.route("/")
    .get(controller.getUsers)
    .post(controller.createUser);

router.route("/:userId")
    .get(controller.getSingleUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

router.route("/:userId/friends/:friendId")
    .post(controller.addFriend)
    .delete(controller.deleteFriend);

module.exports = router;