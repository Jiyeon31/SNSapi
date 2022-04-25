const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err))
  },
  
  // add a friend to user
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }
    ,{$push: {friends: params.friendId }}, { new: true })
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbFriendData => {
        if (!dbFriendData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbFriendData);
      })
      .catch(err => res.json(err));
  },
  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndDelete(
      {_id: params.id},
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({path: 'friends', select: '-__v'})
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
