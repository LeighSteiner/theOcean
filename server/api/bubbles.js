const router = require('express').Router()
const { Bubble, BlockedUsers } = require('../db/models')
module.exports = router


//get a user's collection of headBubbles

router.get('/head-bubbles/:userId', (req, res, next) => {
  const userId = req.params.userId
  Bubble.findAll({where: {
    userId: userId, 
    isHead: true,
    isHooked: false
  }})
  .then((bubbles) => {
    if (req.user.id == userId || req.user.isAdmin){
      res.json(bubbles)
    }else{
      next( new Error ('these are not your bubbles'))
    }
  })
  .catch(next)
})

//get a user's collection of brookHead bubbles 

router.get('/brook-heads/:userId', (req, res, next) => {
  const userId = req.params.userId
  Bubble.findAll({where: {
    userId: userId, 
    isHead: true, 
    isHooked: true
  }})
  .then((bubbles) => {
    if (req.user.id == userId || req.user.isAdmin){
      res.json(bubbles)
    }else{
      next(new Error('these are not your brooks'))
    }
  })
})

//get a single bubble /api/bubbles/:bubbleId

router.get('/:bubbleId', (req, res, next) => {
  const bubbleId = req.params.bubbleId;
  Bubble.findById(bubbleId)
  .then( (bubble) => {
  	if(req.user){ //AND bubble is not expired -- write this later
      if(req.session.banned.indexOf(bubble.userId) < 0){
        res.json(bubble)
      }else{
        next(new Error('you arent allowed to see this'))
      }
  	}else{
      next(new Error('you must dive in the ocean to blow bubbles'))
  	}
  })
  .catch(next);
})


//update a bubble is this needed?

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
// post a new bubble

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
  .then(( suitors ) => { 
    let cleanBubbles = []
     for (let i = 0; i < suitors.length; i++) {
      if(req.session.banned.indexOf(bubbles[i].userId) < 0){
        cleanBubbles.push(bubbles[i])
       }
      }
    res.json(cleanBubbles)
   
  })
  .catch(next);
})






