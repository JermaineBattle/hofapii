const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const http = require('http');

const server = http.createServer(app);
const port = process.env.PORT || 4000;





// AUTHENTICATION / CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
		return res.status(200).json({});
	};
	next();
})


// Connect MongoDB through Mongoose
mongoose.connect('mongodb://admin:admin@hofdb-shard-00-00-yox7s.mongodb.net:27017,hofdb-shard-00-01-yox7s.mongodb.net:27017,hofdb-shard-00-02-yox7s.mongodb.net:27017/test?ssl=true&replicaSet=hofDB-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true});

// Import Routes
const postsRoute = require('./routes/posts');
const musicRoute = require('./routes/music');
const cultureRoute = require('./routes/culture');
const videosRoute = require('./routes/videos');
const searchResultsRoute = require('./routes/search-results');
const trendingRoute = require('./routes/trending');
// Instantiate Routes' Middleware
app.use('/posts', postsRoute);
app.use('/music', musicRoute);
app.use('/culture', cultureRoute);
app.use('/videos', videosRoute);
app.use('/search-results', searchResultsRoute);
app.use('/trending', trendingRoute);

mongoose.Promise = global.Promise;

// Initiate Morgan
app.use(morgan('dev'));

//Make Uploads folder publically available
app.use('/uploads', express.static('uploads'));

// Initiate bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

server.listen(port, function(){
  console.log("Database listening on port " + port);
});




module.exports = app;
