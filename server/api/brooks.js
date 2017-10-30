const router = require('express').Router()
const { Bubble, Brook } = require('../db/models')
module.exports = router

//make a new brook 
router.post('/new-brook', (req, res, next) => {
  Brook.create()
  .then(brook => res.json(brook))
  .catch(next);
})

//find one brook
router.get('/:brookId', (req, res, next) => {
	Brook.findById(req.params.brookId)
	.then( (brook) => {
      if(req.user.id === brook.sourceUserId || req.user.id === brook.hookedUserId ) {
      	res.json(brook);
      }else{
      	next(new Error('this is not your brook!'))
      }
	})
	.catch(next)
})

//find brook bubbles 
router.get('/:brookId/bubbles', (req, res, next) => {
  Bubble.findAll({
  	where: {brookId: req.params.brookId}
  })
  .then((bubbles) => {
  	res.json(bubbles)
  })
  .catch(next)
})

//update brook -- probably just numBubbles

router.put('/:brookId', (req, res, next) => {
	Brook.update(req.body)
	.then(brook => res.json(brook))
	.catch(next);
})