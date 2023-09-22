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
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "friendThoughts",  
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "userThoughts",   
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

// // Virtual called friendCount that retrieves the length of the user's friends array field on query.
userThoughtsSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const userThoughts = model("userThoughts", userThoughtsSchema);

model.exports = userThoughts;