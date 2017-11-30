const router = require('express').Router()
module.exports = router

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
