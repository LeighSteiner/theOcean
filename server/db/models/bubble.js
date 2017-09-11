const Sequelize = require('sequelize')
const db = require('../db')

const Bubble = db.define('bubble', {
 message: {
   type: Sequelize.TEXT
 }, 
 creationDate: {
   type: Sequelize.DATE, 
   defaultValue: Sequelize.NOW,
   //x time after creation, bubbles no longer show up in their oceans
 }, 
  isHead: {
 	type: Sequelize.BOOLEAN, 
 	defaultValue: false, 
 }, 
 isHooked: {  //is "accepted" as a second message -- all heads, and subsequent messages are hooked
 	type: Sequelize.BOOLEAN, 
 	defaultValue: false,
 }, 

 //sender id association
// brook id assocation
//ocean id association
//nextBubble id association
})

module.exports = Bubble