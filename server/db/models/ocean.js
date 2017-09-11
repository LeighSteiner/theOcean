const Sequelize = require('sequelize')
const db = require('../db')

const Ocean = db.define('ocean', {
  name: {
    type: Sequelize.STRING, 
    unique: true, 
    allowNull: false
  }, 
  description: {
  	type: Sequelize.TEXT, 
  }
  // add potential association for 'parent ocean'
})

module.exports = Ocean