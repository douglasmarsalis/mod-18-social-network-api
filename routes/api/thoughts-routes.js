const router = require("express").Router();

// Variables found in thoughts-controller.js
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReactions,
    removeReactions,
} = require("../../controllers/thoughts-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThoughts);

// /api/thoughts/:id
router
    .route("/:id")
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/:thoughtsId/reactions
router.route("/:thoughtsId/reactions").post(addReactions);

// /api/thoughts/:thoughtsId/reactions/:reactionsId
router.route("/:thoughtsId/reactions/:reactionsId").delete(removeReactions);

module.exports = router;

