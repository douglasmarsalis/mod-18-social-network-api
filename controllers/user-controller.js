const { user, thoughts } = require("../models");

// Get All User
const userController = {
    getAllUser(req, res) {
        user.find({}) // finds this data
            .populate({
                path: "friends", // populates friends field
                select: "-_v",  // excludes field
            })
            .select("-_v")  // excludes field
            .sort({ _id: -1 })  // sorts by id
            .then((dbUserData) => res.json(dbUserData)) // sends data
            .catch((err) => {       // or sends error
                console.log(err);
                res.sendStatus(400);
            });
    },

// GET Single User by ID
    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-_v",
            })
            .populate({
                path: "friends",
                select: "-_v",
            })
            .select("-_v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Sorry, there are no users with this ID!" });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

// CREATE a User
    createUser({ body }, res) {
        user.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    }, 

// Update User by ID
    updateUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,    // runs validation checks on the data when update document
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "There are no users found with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

// DELETE a User
    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Sorry, there are no users with this ID!" });
                }
                return thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });  // Used to match documents where a specific field value matches any of the values in provided array
            })
            .then(() => {
                res.json({ message: "The user and thoughts were deleted successfully!" });
            })
            .catch((err) => res.json(err));
    },

// ADD a Friend
    addFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } }, // Adds a value to an array unless the value is already present
            { new: true, runVaildators: true }  // runs validation checks on the data when update document
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Sorry, there are no users with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

// DELETE a Friend
    removeFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } }, // Updates operations to removes specific elements from an array within a document
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Sorry, there are no users with this ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = userController;
