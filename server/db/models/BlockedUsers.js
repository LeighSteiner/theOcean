const Sequelize = require('sequelize');
const db = require('../db');

const BlockedUsers = db.define('BlockedUsers', {})

module.exports = BlockedUsers;