const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.get(getAllThought)


// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getThoughtById)
.delete(removeThought)

// /api/thoughts/:userId
router
.route('/:userId')
.post(addThought)
.put(updateThought)

router
.route('/:userId/:thoughtId')
.delete(removeThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)  

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;
