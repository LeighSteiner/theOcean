const router = require('express').Router()
// const { BlockedUsers } = require('../db/models')
module.exports = router
let counter = 0
// router.use((req, res, next) => {
//   console.log('yo', counter++)
//    if(req.user.blocks === undefined){
//    	 BlockedUsers.findAll({where: {blocker: req.user.id}})
//     .then((blockmatches) => {
//       let badIds= []
//        for(let i = 0; i < blockmatches.length; i++){
//          badIds.push(blockmatches[i].dataValues.blockeeId);
//        }
//         req.user.blocks = badIds
//        console.log('badIds', req.user.blocks)
//        next();

//     })
//     .catch(next);
//   }else{
//   	console.log('blocked users')
//   	 next();
//   }
// })

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
