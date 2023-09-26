const { User } = require("../models/User");
const { Thoughts } = require("../models/Thoughts");

// GET All Thoughts
const thoughtsController = {
    async getAllThoughts(req, res) {
            try {
                const thoughts = await Thoughts.find();
                res.json(thoughts);
            }
            catch (err) {
                res.status(500).json(err);
            }
        },

    // GET Single Thought by ID
    async getThoughtsById(req, res) {
        try {
            const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })

            if (!thoughts) {
                return res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // CREATE a Thought
    async createThoughts(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body)

            let user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thoughts._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "😡 A thought was created, but there is no user with this ID!" })
            }
            res.json({ message: '😎 A thought was created successfully!' });
        }
        catch (err) {
            res.json(err);
        }
    },

    // UPDATE Thought by ID
    async updateThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thoughts) {
                return res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // DELETE Thought
    async deleteThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });

            if (!thoughts) {
                return res.status(404).json({ message: "😡 Sorry, there are no thoughts with this ID!" });
            }
            const user = await User.findOneAndUpdate(
                { username: thoughts.username },
                { $pull: { thoughts: req.params.thoughtsId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "😡 A thought was created, but there is no user with this ID!" });
            }
            res.json({ message: "😎 The thought was deleted successfully!" });
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // ADD a Reaction
    async addReactions(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $addToSet: { reactions: req.body } },
                { runVaidators: true, new: true }
            );
            if (!thoughts) {
                return res.status(404).json({ message: "😡 Sorry, there are no reactions with this ID!" });
            }
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE a Reaction
    async removeReactions(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtsId },
                { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
                { runVaidators: true, new: true }
            );
            if (!thoughts) {
                return res.status(404).json({ message: "😡 Sorry, there are no reactions with this ID!" });
            }
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};


module.exports = thoughtsController;