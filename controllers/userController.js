const {User, Thought} = require("../models");

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
    },

    // get one user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate("thoughts")
        .populate("friends")
        .then(user => !user
            ? res.status(404).json({ message: "No User find with that ID!" })
            : res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // create a user
    createUser(req, res) {
        User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: userId},
            {$set: req.body},
            {
                runValidators: true,
                new: true
            }
        )
        .then(user => !user 
            ? res.status(404).json({message: "No user found with this id"}) 
            : res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // delete a user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then(user => {
            if(!user) {
                res.status(404).json({message: "No user found with this id"});
            } else {
                Thought.deleteMany({_id: user.thoughts});
                res.json(user);
            }
        })
        .catch(err => res.status(500).json(err));
    },

    // add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {
                runValidators: true, 
                new: true
            }
        )
        .then(user => !user 
            ? res.status(404).json({message: "No user found with this id"}) 
            : res.json(user))
        .catch(err => res.status(500).json(err));
    },

    // delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {
                runValidators: true,
                new: true
            }
        )
        .then(user => !user 
            ? res.status(404).json({message: "No user found with this id"}) 
            : res.json(user))
        .catch(err => res.status(500).json(err));
    }
}