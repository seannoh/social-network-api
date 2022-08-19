const router = require("express").Router();
const controller = require("../../controllers/thoughtController");

router.route("/")
    .get(controller.getThoughts)
    .post(controller.createThought);

router.route("/:thoughtId")
    .get(controller.getSingleThought)
    .put(controller.updateThought)
    .delete(controller.deleteThought);

router.route("/:thoughtId/reactions")
    .post(controller.createReaction);

router.route("/:thoughtId/reactions/:reactionId")
    .delete(controller.deleteReaction);

module.exports = router;