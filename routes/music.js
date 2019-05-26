const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('file-system');

// Configure Multer
const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const upload = multer({
	dest: '/uploads/',
	storage: storage
});

// Import Post schema/model
const Post = require('../models/post');

//<-----------GETs------------->

//MUSIC POSTS
router.get('/', (req, res, next) => {
  var query = {category: "Music"};
	Post.find(query)
	.select('headline postImage postDate month day year category paragraphOne ')
	.exec()
	.then(docs => {
		console.log(docs);
		const allPosts = {
		totalPosts: docs.length,
		musicPosts: docs.map(doc => {
			return {
				_id: doc._id,
				headline: doc.headline,
				postImage: doc.postImage,
				postDate: doc.postDate,
				month: doc.month,
				day: doc.day,
				year: doc.year,
				category: doc.category,
				paragraphOne: doc.paragraphOne,

			}
		})
	};
	//Must use dot notation to call which key:value
	res.status(200).json(allPosts.musicPosts);
})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	})
});



module.exports = router;
