const Sequelize = require('sequelize')
const db = require('../db')

const Brook = db.define('brook', {
  //owner id association
  //hooked bubble id association
  creationDate: {
  	type: Sequelize.DATE,
  	defaultValue: Sequelize.NOW,
  }
})

module.exports = Brook