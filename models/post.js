
const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	headline: {type: String },
	subLine: {type: String},
	postDate: {type: Date, default: new Date().toISOString()},
	month: {type: String },
	day: {type: String },
	year: {type: String },
	category: {type: String },
	author: {type: String },
	postImage: {type: String},
	trending: {type: String},


	paragraphOne: {type: String, required: true},
	imageOne: {type: String},
	linkOne: {type: String},

	paragraphTwo: {type: String},
	imageTwo: {type: String},
	linkTwo: {type: String},

	paragraphThree: {type: String},
	imageThree: {type: String},
	linkThree: {type: String},

	paragraphFour: {type: String},
	imageFour: {type: String},
	linkFour: {type: String},

	paragraphFive: {type: String},
	imageFive: {type: String},
	linkFive: {type: String},

	paragraphSix: {type: String},
	imageSix: {type: String},
	linkSix: {type: String},

	tagOne: {type: String},
	tagTwo: {type: String},
	tagThree: {type: String},
	tagFour: {type: String},
	tagFive: {type: String},
	tagSix: {type: String},
	tagSeven: {type: String},
	tagEight: {type: String},


});


module.exports = mongoose.model('Post', postSchema);
