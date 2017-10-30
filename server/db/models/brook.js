const Sequelize = require('sequelize')
const db = require('../db')

const Brook = db.define('brook', {
  //owner id association
  //hooked bubble id association
  //get rid of creation date replace with something else
  // creationDate: {
  // 	type: Sequelize.DATE,
  // 	defaultValue: Sequelize.NOW,
  // }
  numBubbles: {
  	type: Sequelize.INTEGER, 
  	defaultValue: 2
  }
})

module.exports = Brook