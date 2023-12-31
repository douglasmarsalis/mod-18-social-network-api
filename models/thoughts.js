const { Schema, model, Types } = require("mongoose");
const reactionSchema = require('./Reaction');
// This schema was given in the homework description
// This will not be a model, but will be used as the reaction
// field`s subdocument schema in the Thought model.

// This information was given in the homework description
const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toDateString(), 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual called reactionCount that retrieves the length of the friend thought's reactions array field on query.
thoughtsSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports =  Thoughts;