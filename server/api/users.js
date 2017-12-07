const router = require('express').Router()
const { User, BlockedUsers } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/blockMatch', (req, res, next) => {
  BlockedUsers.create(req.body)
  .then( blockMatch => {
  	if (req.user && blockMatch.blocker === req.user.id){
       res.json(blockMatch)
  	}else {
  	  next(new Error("you can't block me, i quit!"))
  	}
  })
  .catch(next);
  
})

// this is just to debug join table issues 
router.get('/blockMatch', (req, res, next) => {
  BlockedUsers.findAll({})
  .then( blocks => res.json(blocks))
  .catch(next);

})