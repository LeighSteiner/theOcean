const User = require('./user');
const Ocean = require('./ocean');
const Bubble = require('./bubble');
const Brook = require('./brook');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Bubble.belongsTo(User);
 Bubble.belongsTo(Bubble, {as: 'nextBubble'})
 Bubble.belongsTo(Ocean);
 Bubble.belongsTo(Brook);

 Brook.belongsTo(User, {as: 'sourceUser'})
 Brook.belongsTo(User, {as: 'hookedUser'})
 Brook.hasMany(Bubble);


//add ocean to ocean association for "sub sea"s?

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Brook, Ocean, Bubble
}
