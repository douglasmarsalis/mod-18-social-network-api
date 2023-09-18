const { Schema, model } = require("mongoose");

// This model was given in the homework description
const userThoughtsSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            require: "Username is required!",
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            require: "Username is required!",
            match: [/.+@.+\..+/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "friend-thoughts",  // Does this reference the folder or the variable?
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user-thoughts",    // Does this reference the folder or the variable?
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Schema settings
userThoughtsSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const userThoughts = model("userThoughts", userThoughtsSchema);

model.exports = userThoughts;