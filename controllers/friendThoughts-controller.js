const { userThoughts, friendThoughts } = require("../models");
const { findOneAndUpdate } = require("../models/friendThoughts");

// GET All Thoughts
const friendThoughtsController = {
    getAllFriendThoughts(req, res) {
        friendThoughts.find({})
            .populate({
                path: "reactions",
                select: "-_v",
            })
            .select("-_v")
            .sort({ _id: -1 })
            .then((dbFriendThoughtsData) => res.json(dbFriendThoughtsData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

// GET Single Thought by ID
    getFriendThoughtsById({ params }, res) {
        friendThoughts.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-_v",
            })
            .select("-_v")
            .then((dbFriendThoughtsData) => {
                if (!dbFriendThoughtsData) {
                    return res.status(404).json({ message: "Sorry, there are no thoughts with this ID!" });
                }
                res.json(dbFriendThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

 // CREATE a Thought
    createFriendThoughts({ params, body }, res) {
        friendThoughts.create(body)
            .then(({ _id }) => {
                return userThoughts.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((dbUserThoughtsData) => {
                if (!dbUserThoughtsData) => {
                    return res
                        .status(404)
                        .json({ message: "A thought was created, but there is no user with this ID!" });
                }
                res.json({ message: "A thought was created successfully!" });
            })
            .catch((err) => res.json(err));
    },

// UPDATE Thought by ID
    updateFriendThoughts({ params, body }, res) {
        friendThoughts.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
            .then((dbFriendThoughtsData) => {
                if (!dbFriendThoughtsData) {
                    res.status(404).json({ message: "There are no thoughts found with this ID!" });
                    return;
                }
                res.json(dbFriendThoughtsData);
            })
            .catch((err) => res.json(err));
    },

// DELETE Thought
    deleteFriendThoughts({ params }, res) {
        friendThoughts.findOneAndDelete({ _id: params.id })
            .then((dbFriendThoughtsData) => {
                if (!dbFriendThoughtsData) {
                    return res.status(404).json({ message: "Sorry, there are no thoughts with this ID!" });
                }
                return userThoughts, findOneAndUpdate(
                    { friendThoughts: params.id },
                    { $pull: { friendThoughts: params.id } }, // Updates operations to removes specific elements from an array within a document
                    { new: true }
                );
            })
            .then((dbUserThoughtsData) => {
                if (!dbUserThoughtsData) {
                    return res.status(404).json({ message: "A thought was created, but there is no user with this ID!" })
                }
                res.json({ message: "A thought was created successfully!" })
            })
            .catch((err) => res.json(err));
    },

// ADD a Reaction
    addFriendReactions({ params, body }, res) {
        friendThoughts.findOneAndUpdate(
            { _id: params.friendThoughtsID },
            { $addToSet: { friendReactions: body } }, // Adds a value to an array unless the value is already present
            { new: true, runVaildators: true }
        )
            .then((dbFriendThoughtsData) => {
                if (!dbFriendThoughtsData) {
                    res.status.json({ message: "Sorry, there are no thoughts with this ID!" });
                    return;
                }
                res.json(dbFriendThoughtsData);
            })
            .catch((err) => res.json(err));
    },

// DELETE a Reaction
    removeFriendReactions({ params }, res) {
        friendThoughts.findOneAndUpdate(
            { _id: params.friendThoughtsId },
            { $pull: { rriendReactions: { friendReactions: params.friendReactionsId } } }, // Updates operations to removes specific elements from an array within a document
            { new: true }
        )
            .then((dbFriendThoughtsData) => res.json(dbFriendThoughtsData))
            .catch((err) => res.json(err));
    },
};


    module.exports = friendThoughtsController;