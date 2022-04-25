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



// /api/thoughts/:id
router
.route('/:id')
.get(getThoughtById)
.post(addThought)
.put(updateThought)
.delete(removeThought)

// /api/thoughts/thoughtId/reactions
router
.route('/:id/reactions')
.post(addReaction)

router
.route('/:id/reactions/reactionId')
.delete(removeReaction)

module.exports = router;
