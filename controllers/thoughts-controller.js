const { user, thoughts } = require("../models");
const { findOneAndUpdate } = require("../models/thoughts");

// GET All Thoughts
const thoughtsController = {
    getAllThoughts(req, res) {
        thoughts.find({}) // finds this data
            .populate({
                path: "reactions", // populates reactions field
                select: "-_v", // excludes field
            })
            .select("-_v")      // excludes field
            .sort({ _id: -1 }) // sorts by id
            .then((dbThoughtsData) => res.json(dbThoughtsData)) // sends data
            .catch((err) => {       // or sends error
                console.log(err);
                res.sendStatus(400);
            });
    },

    // GET Single Thought by ID
    getThoughtsById({ params }, res) {
        thoughts.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-_v",
            })
            .select("-_v")
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // CREATE a Thought
    createThoughts({ params, body }, res) {
        thoughts.create(body)
            .then(({ _id }) => {
                return user.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } }, // Adds an element to an array field within a document
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "😡 A thought was created, but there is no user with this ID!" });
                }
                res.json({ message: "😎 A thought was created successfully!" });
            })
            .catch((err) => res.json(err));
    },

    // UPDATE Thought by ID
    updateThoughts({ params, body }, res) {
        thoughts.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,    // runs validation checks on the data when update document
        })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "😡 There are no thoughts found with this ID!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    // DELETE Thought
    deleteThoughts({ params }, res) {
        thoughts.findOneAndDelete({ _id: params.id })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    return res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
                }
                return user, findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id } }, // Updates operations to removes specific elements from an array within a document
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "😡 A thought was created, but there is no user with this ID!" })
                }
                res.json({ message: "😎 A thought was created successfully!" })
            })
            .catch((err) => res.json(err));
    },

    // ADD a Reaction
    addReactions({ params, body }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtsID },
            { $addToSet: { reactions: body } }, // Adds a value to an array unless the value is already present
            { new: true, runVaildators: true }  // runs validation checks on the data when update document
        )
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.json(err));
    },

    // DELETE a Reaction
    removeReactions({ params }, res) {
        thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactions: params.reactionsId } } }, // Updates operations to removes specific elements from an array within a document
            { new: true }
        )
            .then((dbThoughtsData) => res.json(dbThoughtsData))
            .catch((err) => res.json(err));
    },
};


module.exports = thoughtsController;