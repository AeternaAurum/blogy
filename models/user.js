const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');

const checkEmailLength = email => {
	if (!email) {
		return false;
	} else {
		if (email.length < 5 || email.length > 50) {
			return false;
		} else {
			return true;
		}
	}
};

const emailValidators = [{
	validator: checkEmailLength,
	message: 'Email must be between 5 and 50 characters.'
}];

const validPassword = (password) => {
	// Check if password exists
	if (!password) {
		return false; // Return error
	} else {
		// Regular Expression to test if password is valid format
		const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
		return regExp.test(password); // Return regular expression test result (true or false)
	}
};

const passwordValidators = [
	// Second password validator
	{
		validator: validPassword,
		message: 'Must have at least one uppercase, lowercase, special character, and number'
	}
];

const Schema = mongoose.Schema;
const userSchema = new Schema({
	email: { type: String, required: true, unique: true, validate: emailValidators },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true , validator: passwordValidators}
});

userSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.hash(this.password, null, null, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = password => {
	if(this.password != null) {
		return bcrypt.compareSync(password, this.password);
	} else {
		return false;
	}
};
module.exports = mongoose.model('User', userSchema);
