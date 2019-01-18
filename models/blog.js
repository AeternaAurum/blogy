const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const checkTitleLength = title => {
	if (!title) {
		return false;
	} else {
		if (title.length < 5 || title.length > 50) {
			return false;
		} else {
			return true;
		}
	}
};

const titleValidators = [{
	validator: checkTitleLength,
	message: 'Title must be between 5 and 50 characters.'
}];

const bodyLengthChecker = body => {
	if (!body) {
		return false;
	} else {
		if (body.length < 5 || body.length > 500) {
			return false;
		} else {
			return true;
		}
	}
}

const bodyValidators = [{
	validator: bodyLengthChecker,
	message: 'Body must be between 5 and 500 characters'
}];

const commentLengthChecker = comment => {
	if (!comment[0]) {
		return false;
	} else {
		if (comment[0].length < 1 || comment[0].length > 200) {
			return false;
		} else {
			return true;
		}
	}
};

const commentValidators = [{
	validator: commentLengthChecker,
	message: 'Comment must be between 1 and 200 characters'
}];


const Schema = mongoose.Schema;


const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
		validate: titleValidators
	},
	body: {
		type: String,
		required: true,
		validate: bodyValidators
	},
	createdBy: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	likes: {
		type: Number,
		default: 0
	},
	likedBy: {
		type: Array
	},
	dislikes: {
		type: Number,
		default: 0
	},
	dislikedBy: {
		type: Array
	},
	comments: [{
		comment: {
			type: String,
			validate: commentValidators
		},
		author: {
			type: String
		}
	}]
});
module.exports = mongoose.model('Blog', blogSchema);