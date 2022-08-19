const {User, Thought} = require("../models");

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(500).json(err))
    },

    // get one thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then(thought => !thought
            ? res.status(404).json({message: "No thought found with that id"})
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
    },

    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(thought => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            )
        })
        .then(user => !user
            ? res.status(404).json({message: "No user found with that id"})
            : res.json(user)
        )
        .catch(err => res.status(500).json(err));
    },

    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {
                runValidators: true,
                new: true
            }
        )
        .then(thought => !thought
            ? res.status(404).json({message: "No thought found with that id"})
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
    },

    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(thought => {
            return User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {
                    runValidators: true,
                    new: true
                }
            )
        })
        .then(user => !user 
            ? res.status(404).json({message: "No user with that thought found"})
            : res.json(user)
        )
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    // create a new reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {
                runValidators: true,
                new: true
            }
        )
        .then(thought => !thought 
            ? res.status(404).json({message: "No thought found with that id"})
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
    },

    // delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {
                runValidators: true,
                new: true
            }
        )
        .then(thought => !thought 
            ? res.status(404).json({message: "No thought found with that id"})
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
    }
}