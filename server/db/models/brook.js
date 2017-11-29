const Sequelize = require('sequelize')
const db = require('../db')

const Brook = db.define('brook', {
  numBubbles: {
  	type: Sequelize.INTEGER, 
  	defaultValue: 2
  }
})

module.exports = Brook;