const { Schema, model } = require("mongoose");

// This model was given in the homework description
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            require: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            require: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',  
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',   
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
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;