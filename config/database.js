const crypto = require('crypto');
const secret = crypto.randomBytes(256).toString('hex');


module.exports = {
	uri: 'mongodb://localhost:27017/blogy',
	secret: secret,
	db: 'blogy'
};