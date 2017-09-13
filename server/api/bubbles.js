const router = require('express').Router()
const { Bubble } = require('../db/models')
module.exports = router

//get a single bubble /api/bubbles/:bubbleId

router.get('/:bubbleId', (req, res, next) => {
  const bubbleId = req.params.bubbleId
  Bubble.findById(bubbleId)
  .then( (bubble) => {
  	if(req.user){ //AND bubble is not expired -- write this later
      res.json(bubble)
  	}else{
      next(new Error('you must dive in the ocean to blow bubbles'))
  	}
  })
  .catch(next);
})

//delete a bubble ADMIN ONLY 

router.delete('/:bubbleId', (req, res, next) => {
  const bubbleId = req.params.bubbleId
  Bubble.findById(bubbleId)
  .then( (bubble) => {
  	if(req.user.isAdmin){
  	  return bubble.destroy();
  	}else{
  	  next(new Error('only admins can pop a bubble'))
  	}
  })
  .then( (poppedBubble) => {
  	res.json(poppedBubble)
  })
  .catch(next);
})