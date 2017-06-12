var express = require('express');
var router = express.Router();
var url=require('url');
var moment = require('moment');
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://127.0.0.1:27017/myblog';

/* GET home page. */
router.get('/', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('articles');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('index', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});
	
//	res.render('index', {
//		user: req.session.user
//	});
});

//博客登录
router.get('/login', function(req, res, next) {
	res.render('login', {});
});

//博客登录
router.get('/register', function(req, res, next) {
	res.render('register', {});
});


//博客退出登录
router.get('/exit', function(req, res, next) {
	req.session.destroy(function(err) {
		if(!err) {
			res.redirect('back');
		}
	});
});

router.get('/about', function(req, res, next) {
	res.render('about', {user: req.session.user});
});


////评论
//router.get('/review', function(req, res, next) {
//	res.render('review', {});
//});

//第一篇文章
router.get('/article-one', function(req, res, next) {

	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-one', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});
});


//第二篇文章
router.get('/article-two', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-two', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});

//	res.render('article-two', {
//		user: req.session.user
//	});
});

//第三篇文章
router.get('/article-three', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-three', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});

//	res.render('article-three', {
//		user: req.session.user
//	});
});


//第四篇文章
router.get('/article-four', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-four', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});

//	res.render('article-four', {
//		user: req.session.user
//	});
});

//第五篇文章
router.get('/article-five', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-five', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});
//	res.render('article-five', {
//		user: req.session.user
//	});
});

//第六篇文章
router.get('/article-six', function(req, res, next) {
	var urlpath=url.parse(req.url).pathname.replace(/\//,'');
	var findData = function(db, callback) {
		var conn = db.collection('reviews');
		conn.find({}).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			findData(db, function(result) {
				res.render('article-six', {
					user: req.session.user,
					result: result,
					idPath:urlpath
				});
				db.close();
			});
		}
	});
//	res.render('article-six', {
//		user: req.session.user
//	});
});


module.exports = router;