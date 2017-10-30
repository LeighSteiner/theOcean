const router = require('express').Router()
const { Bubble } = require('../db/models')
module.exports = router

//get a single bubble /api/bubbles/:bubbleId

router.get('/:bubbleId', (req, res, next) => {
  const bubbleId = req.params.bubbleId;
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


//update a bubble

router.put('/:bubbleId', (req, res, next) => {
  const bubbleId = req.params.bubbleId;

  Bubble.findById(bubbleId)
  .then( (bubble) => {
    return bubble.update(req.body)
  })
  .then((updatedBubble) => {
    res.json(updatedBubble)
  })
  .catch(next);
})
// post a new first bubble

router.post('/new-bubble', (req, res, next) => {
  Bubble.create(req.body)
  .then(bubble => {
    if(req.user && bubble.userId === req.user.id){
      res.json(bubble) 
    }else{
      next(new Error('you must sign in to blow a bubble'))
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

//get all unHooked bubbles associated with a bubble

router.get('/:bubbleId/suitors', (req, res, next) => {

  const bubbleId = req.params.bubbleId
  Bubble.findAll({where: {
    isHooked: false, 
    headId: bubbleId  //headId association
  }})
  .then(( suitors ) => { //add security back in when you unfuck your database

  // if (suitors[0].headId == req.user.id){ //this is a bad test -- how to access users who should see this
       res.json(suitors)
     // }else{
      // next(new Error('this is not your dating pool'))
     // }
  })
  .catch(next);
})

//brook stuff -- now see brooks.js

// router.get('/:bubbleId/brook', (req, res, next) => {
//   const bubbleId = req.params.bubbleId;
//    Bubble.findById(bubbleId)
//    .then((bubble) => {
//     if (bubble.brookId){
//       return Bubble.findAll({
//         where: { brookId: bubble.brookId}
//       })
//     }else{
//       next(new Error('there is no brook here'))
//     }
//    })
//    .then((bubbles) => {
//      res.json(bubbles)
//    })
//    .catch(next);

// })





