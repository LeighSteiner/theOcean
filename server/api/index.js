const router = require('express').Router()
const { BlockedUsers } = require('../db/models')
module.exports = router
let counter = 0

//puts banned userIDs on the session
router.use((req, res, next) => {
 if(req.user){
   	  BlockedUsers.findAll({where: {blocker: req.user.id }})
      .then((blockMatches) => {
  	  let blocks = blockMatches.map((el) => el.dataValues.blockeeId)
  	  req.session.banned = blocks
   })
 }
 next();
})

router.use('/users', require('./users'))
router.use('/oceans', require('./oceans'))
router.use('/bubbles', require('./bubbles'))
router.use('/brooks', require('./brooks'))


//catches wrong URLs
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
