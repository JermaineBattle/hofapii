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
router.get('/:searchQuery', (req, res, next) => {
  const myQuery = req.getParameter(searchQuery);
	myQuery = myQuery.toLowerCase();
	Post.find(myQuery)
	.select('headline postImage postDate category paragraphOne linkOne imageOne')
	.exec()
	.then(docs => {
		// console.log(docs);
		const allPosts = {
		totalPosts: docs.length,
		searchResults: docs.map(doc => {
			// for(let value of doc){
			// 	if(value.includes(myQuery))

			return {
				_id: doc._id,
				headline: doc.headline,
				postImage: doc.postImage,
				postDate: doc.postDate,
				category: doc.category,
				paragraphOne: doc.paragraphOne,
				imageOne: doc.imageOne,
				linkOne: doc.linkOne
			}
			// }
		})
	};
	//Must use dot notation to call which key:value
	res.status(200).json(allPosts.searchResults);
})
	.catch(error => {
		console.log(error);
		res.status(500).json(error);
	})
});



module.exports = router;
