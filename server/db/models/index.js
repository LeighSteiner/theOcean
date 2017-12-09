const User = require('./user');
const Ocean = require('./ocean');
const Bubble = require('./bubble');
const Brook = require('./brook');
const BlockedUsers = require('./BlockedUsers');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Bubble.belongsTo(User);

 Bubble.belongsTo(Bubble, {as: 'head'})
 // ^^ this is for "suitor" bubbles --> they are associated with a head message before they've been chosen, once they're chosen a brook is created
 Bubble.belongsTo(Ocean);
 Bubble.belongsTo(Brook);

 Brook.belongsTo(User, {as: 'sourceUser'})
 Brook.belongsTo(User, {as: 'hookedUser'})
 Brook.hasMany(Bubble);

 Ocean.belongsTo(User)  //user who made ocean, can edit it, CANT DELETE IT

//block tables

User.belongsToMany(User, {
	through: 'BlockedUsers', 
	as: 'blockee', 
	foreignKey: 'blocker'
}) 
// requires two queries -- who you've blocked vs who's blocked you. 
//message.find(include user(include(blocked users -- Op.ne (array of blocked users))))Op.n
//Block Behavior --> Add a field to the blockedUsers model that is an "auto create" boolean and then generate two block matches for every block
 
//
User.belongsToMany(User, {
	through: 'Matches', 
	as: 'userOne', 
	foreignKey: 'userTwo'
})
//add ocean to ocean association for "sub sea"s?

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Brook, Ocean, Bubble, BlockedUsers
}
