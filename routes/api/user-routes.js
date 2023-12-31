const router = require("express").Router();

// Variables found in user-controller.js
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/user-controller");

// api/users
router.route("/").get(getAllUser).post(createUser);

// /api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;