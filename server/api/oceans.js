const router = require('express').Router()
const { Ocean, Bubble } = require('../db/models')
module.exports = router

//get all oceans at /api/oceans
router.get('/', (req, res, next) => {
  Ocean.findAll({})
    .then( (oceans) => {
	  if(req.user){
        res.json(oceans)
	  }else{
         next(new Error('you have to sign in to see the oceans'))
      }
	})
	.catch(next);
})

//get the specific ocean name and description
router.get('/ocean/:oceanId', (req, res, next) => {
  const oceanId = req.params.oceanId;
  Ocean.findById(oceanId)
  .then( (ocean) => {
    if(req.user){
      res.json(ocean)
	}else{
      next(new Error('you have to sign in to see this ocean'))
	}
  })
  .catch(next);
})

//edit an existing ocean  can only do if you made the ocean or if you're an admin
router.put('/ocean/:oceanId', (req, res, next) => {
  const oceanId = req.params.oceanId;
  Ocean.findById(oceanId)
  .then( (ocean) => {
  	if(req.user && (req.user.id === ocean.userId || req.user.isAdmin)){
  	  return ocean.update(req.body)
  	}else{
      next(new Error('you cannot edit this ocean'))
  	}
  })
  .then( (updatedOcean) => {
  	res.json(updatedOcean);
  })
  .catch(next);
})

//delete an ocean, ADMIN ONLY
router.delete('/ocean/:oceanId', (req, res, next) => {
  const oceanId = req.params.oceanId;
  Ocean.findById(oceanId)
  .then((ocean) => {
  	if(req.user.isAdmin){
      return ocean.destroy();
  	}else{
  	  next(new Error('only admins can drain an ocean'))
  	}
  })
  .then( (deadOcean) => {
  	res.json(deadOcean)
  })
  .catch(next);
})

//get all bubbles in an ocean
router.get('/ocean/:oceanId/bubbles', (req, res, next) => {
  const oceanId = req.params.oceanId;
  Bubble.findAll({ where: { oceanId }})
  .then( (bubbles) => {
    if(req.user){
     res.json(bubbles)
    }else{
     next(new Error('you have to sign in to see the bubbles'))
    }
  })
  .catch(next);
})

//post a new ocean
router.post('/new-ocean', (req, res, next) => {
  Ocean.create(req.body)
  .then((ocean) => {
  	if(req.user){
  	  return Ocean.findById(ocean.id)
  	}else{
      next(new Error('you have to sign in to make oceans'))
  	}
  })
  .then( (freshOcean) => res.json(freshOcean))
  .catch(next);
})






