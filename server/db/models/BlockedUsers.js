const Sequelize = require('sequelize');
const db = require('../db');

const BlockedUsers = db.define('BlockedUsers', {
	autoCreated: {
		type: Sequelize.BOOLEAN, 
		defaultValue: false,
	}
})

module.exports = BlockedUsers;