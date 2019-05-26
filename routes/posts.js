const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('file-system');

// Configure Multer
const storage = multer.diskStorage({
	destination:
		function(req, file, cb){
		cb(null, './uploads');
	},

	filename:
	function(req, file, cb){
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const upload = multer({
	dest: '/uploads/',
	// limits: {filesize: 1024 * 1024 * 5},
	storage: storage,
});

// Import Post schema/model
const Post = require('../models/post');

//<-----------GETs------------->
router.get('/', (req, res, next) => {
	Post.find()
	.select(
		'headline postImage postDate month day year category trending author paragraphOne linkOne imageOne paragraphTwo linkTwo imageTwo paragraphThree linkThree imageThree paragraphFour linkFour imageFour paragraphFive linkFive imageFive paragraphSix linkSix imageSix tagOne tagTwo tagThree tagFour tagFive tagSix tagSeven tagEight'
	)
	.exec()
	.then(docs => {
		console.log(docs);
		const allPosts = {
		totalPosts: docs.length,
		blogPosts: docs.map(doc => {
			return {
				_id: doc._id,
				headline: doc.headline,
				postImage: doc.postImage,
				postDate: doc.postDate,
				month: doc.month,
				day: doc.day,
				year: doc.year,
				category: doc.category,
				trending: doc.trending,
				author: doc.author,
				paragraphOne: doc.paragraphOne,
				imageLinkOne: doc.imageOne,
				linkOne: doc.linkOne,
				paragraphTwo: doc.paragraphTwo,
				imageTwo: doc.imageTwo,
				linkTwo: doc.linkTwo,
				paragraphThree: doc.paragraphThree,
				imageLinkThree: doc.imageLinkThree,
				linkThree: doc.linkThree,
				paragraphFour: doc.paragraphFour,
				imageLinkFour: doc.imageLinkFour,
				linkFour: doc.linkFour,
				paragraphFive: doc.paragraphFive,
				imageLinkFive: doc.imageLinkFive,
				linkFive: doc.linkFive,
				paragraphSix: doc.paragraphSix,
				imageLinkSix: doc.imageLinkSix,
				linkSix: doc.linkSix,
			}
		})
	};
	//Must use dot notation to call which key:value
	res.status(200).json(allPosts.blogPosts);
})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	})
});

//SINGLE POST GET

// router.get('/:postId', (req, res, next) => {
// 	res.status(200).json({
// 		message: 'GET ID from API single posts route request is functioning',
// 		_id: 'Tomato'
// 	});
// });



//SINGLE POST ID FOR
router.get('/:postId', (req, res, next) => {
	const id = req.params.postId;
	const linkOne = req.params.linkOne;
	console.log(id);
	Post.findById(id)
	.select('_id headline subLine postImage postDate month day year category author paragraphOne imageOne linkOne paragraphTwo linkTwo imageTwo paragraphThree linkThree imageThree paragraphFour linkFour imageFour paragraphFive linkFive imageFive paragraphSix linkSix imageSix tagOne tagTwo tagThree tagFour tagFive tagSix tagSeven tagEight'
)
	.exec()
	.then( doc => {
		console.log("from API db: " + doc);

		if(doc){
			res.status(200).json(doc);
	} else {
		res.status(404).json({ message: "No valid entry for provided ID"});
	}
	})
});


router.get('/search-results/:searchQuery', (req, res, next) => {
	const mySearch = req.params.searchQuery;
	console.log(mySearch);
	mySearch.toLowerCase();

	let filter = {tagOne: mySearch};
	Post.find(filter)

	.select('_id headline postImage postDate month day year category author paragraphOne imageOne linkOne paragraphTwo linkTwo imageTwo paragraphThree linkThree imageThree paragraphFour linkFour imageFour paragraphFive linkFive imageFive paragraphSix linkSix imageSix tagOne tagTwo tagThree tagFive tagSix tagSeven tagEight')
	.exec()
	.then(
		docs => {
		console.log(docs);
		const allPosts = {
		totalPosts: docs.length,
		blogPosts: docs.map(doc => {
			return {
				_id: doc._id,
				headline: doc.headline,
				subLine: doc.subLine,
				postImage: doc.postImage,
				postDate: doc.postDate,
				month: doc.month,
				day: doc.day,
				year: doc.year,
				category: doc.category,
				author: doc.author,
				paragraphOne: doc.paragraphOne,
				imageOne: doc.imageOne,
				linkOne: doc.linkOne,
				paragraphTwo: doc.paragraphTwo,
				imageTwo: doc.imageTwo,
				linkTwo: doc.linkTwo,
				paragraphThree: doc.paragraphThree,
				imageThree: doc.imageThree,
				linkThree: doc.linkThree,
				paragraphFour: doc.paragraphFour,
				imageFour: doc.imageFour,
				linkFour: doc.linkFour,
				paragraphFive: doc.paragraphFive,
				imageFive: doc.imageFive,
				linkFive: doc.linkFive,
				paragraphSix: doc.paragraphSix,
				imageSix: doc.imageSix,
				linkSix: doc.linkSix,
				tagOne: doc.tagOne,
				tagTwo: doc.tagTwo,
				tagThree: doc.tagThree,
				tagFour: doc.tagFour,
				tagFive: doc.tagFive,
				tagSix: doc.tagSix,
				tagSeven: doc.tagSeven,
				tagEight: doc.tagEight
			}

		})
	};



	if(allPosts.blogPosts){
		res.status(200).json(allPosts.blogPosts);
	}else {
		res.status(404).json({ message: "No valid entry for provided search query"})
	}
})
});



//<-----------POSTs------------>
router.post('/', upload.single('postImage'), (req, res, next) => {
	console.log(req.file);
	//Define how a POST should look
	const post = new Post({
		_id: new mongoose.Types.ObjectId,
		headline: req.body.headline,
		subLine: req.body.subLine,
		postDate: req.body.postDate,
		month: req.body.month,
		day: req.body.day,
		year: req.body.year,
		category: req.body.category,
		trending: req.body.trending,
		author: req.body.author,
		postImage: req.body.postImage,
		paragraphOne: req.body.paragraphOne,
		imageOne: req.body.imageOne,
		linkOne: req.body.linkOne,
		paragraphTwo: req.body.paragraphTwo,
		imageTwo: req.body.imageTwo,
		linkTwo: req.body.linkTwo,
		paragraphThree: req.body.paragraphThree,
		imageThree: req.body.imageThree,
		linkThree: req.body.linkThree,
		paragraphFour: req.body.paragraphFour,
		imageFour: req.body.imageFour,
		linkFour: req.body.linkFour,
		paragraphFive: req.body.paragraphFive,
		imageFive: req.body.imageFive,
		linkFive: req.body.linkFive,
		paragraphSix: req.body.paragraphSix,
		imageSix: req.body.imageSix,
		linkSix: req.body.linkSix,
		tagOne: req.body.tagOne,
		tagTwo: req.body.tagTwo,
		tagThree: req.body.tagThree,
		tagFour: req.body.tagFour,
		tagFive: req.body.tagFive,
		tagSix: req.body.tagSix,
		tagSeven: req.body.tagSeven,
		tagEight: req.body.tagEight
	});


//BOILER PLATE CODE FOR BINARY IMAGE UPLOAD DECIPHERING
	// post.postImage.data = fs.readFileSync(req.file.path);
  // post.postImage.contentType = 'image/png';

	post.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
		message: "New post created successfully!",
		createdPost: {
			_id: result._id,
			headline: result.headline,
			subLine: result.subLine,
			postImage: result.postImage,
			postDate: result.postDate,
			month: result.month,
			day: result.day,
			year: result.year,
			category: result.category,
			trending: result.trending,
			author: result.author,
			paragraphOne: result.paragraphOne,
			imageOne: result.imageOne,
			linkOne: result.linkOne,

			paragraphTwo: result.paragraphTwo,
			imageTwo: result.imageTwo,
			linkTwo: result.linkTwo,

			paragraphThree: result.paragraphThree,
			imageThree: result.imageThree,
			linkThree: result.linkThree,

			paragraphFour: result.paragraphFour,
			imageFour: result.imageFour,
			linkFour: result.linkFour,

			paragraphFive: result.paragraphFive,
			imageFive: result.imageFive,
			linkFive: result.linkFive,

			paragraphSix: result.paragraphSix,
			imageSix: result.imageSix,
			linkSix: result.linkSix,

			tagOne: result.tagOne,
			tagTwo: result.tagTwo,
			tagThree: result.tagThree,
			tagFour: result.tagFour,
			tagFive: result.tagFive,
			tagSix: result.tagSix,
			tagSeven: result.tagSeven,
			tagEight: result.tagEight
		  }
	  });
	})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	});
});

module.exports = router;
