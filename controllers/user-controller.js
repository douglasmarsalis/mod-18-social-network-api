const { User, Thoughts } = require("../models");

// Get All User
const userController = {
    async getAllUser(req, res) {
        try{
            const userInfo = await User.find();
            res.json(userInfo);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

// GET Single User by ID
    async getUserById(req, res) {
        try {
            const user = await User.findOne( { _id: req.params.userId } )  
                .select("-__v");    // excludes field
            if (!user) {
                return res.status(404).json({ message: "😡 Sorry, there are no users with this ID!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// CREATE a User
    async createUser(req, res) {
        try {
            const userInfo = await User.create(req.body)
            res.json(userInfo)
        }
        catch (err) {
            res.status(500).json(err);
        }
    }, 

// Update User by ID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "😡 Sorry, there are no users with this ID!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

// DELETE a User
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "😡 Sorry, there are no users with this ID!" });
            }
            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "😎 The user has been deleted!" })
        } catch (err) {
            res.status(500).json(err);
        }
    },

// ADD a Friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendsId } },
                { runVaidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "😡 Sorry, there is no friend with this ID!" });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

// DELETE a Friend
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendsId } } },
                { runVaidators: true, new: true, overwrite: true }
            );
            if (!user) {
                return res.status(404).json({ message: "😡 Sorry, there is no friend with this ID!" });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
