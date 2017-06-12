var express = require('express');
var router = express.Router();
var moment = require('moment');
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://127.0.0.1:27017/myblog';

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//用户注册
router.post('/register', function(req, res, next) {
	var usn = req.body['Username'];
	var psw = req.body['Password'];
	var em = req.body['Email'];
	var isLive = false;
	//添加数据库
	var insertData = function(db, callback) {
		var conn = db.collection('users');
		var data1 = [{
			username: usn,
			password: psw,
			email: em
		}];
		conn.insert(data1, function(error, result) {
			if(error) {
				console.log(error);
			} else {
				callback(result);
			}
		});
	}
	//查询数据库
	var findData = function(db, callback) {
		var conn = db.collection('users');
		var data2 = {
			username: usn
		};
		conn.find(data2).toArray(function(error, result) {
//			console.log(data2);
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('链接数据库成功！');
			findData(db, function(result) {
				if(result.length > 0) {
					res.redirect('/register');
					db.close();
				} else {
					insertData(db, function(result) {
						req.session.user = usn;
						res.redirect('/');
						db.close();
					});
					db.close();
				}
			});
		}
	});
});

//登录验证
router.post('/login', function(req, res, next) {
	var usn = req.body['Username'];
	var psw = req.body['Password'];
	var findData = function(db, callback) {
		var conn = db.collection('users');
		var data = {
			'username': usn,
			'password': psw
		};
		conn.find(data).toArray(function(error, result) {
//			console.log(result);
			callback(result);
		});
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('链接数据库成功！');
			findData(db, function(result) {
				if(result.length > 0) {
					req.session.user = result[0].username;
					res.redirect('/');
					db.close();
				} else {
					res.redirect('/login');
					db.close();
				}
			});
		}
	});
});

//用户评论
router.post('/review', function(req, res, next) {
	var time=moment().format('YYYY-MM-DD HH:mm:ss');
	var tit = req.body['title'];
	var con = req.body['content'];
	var user= req.session.user;
	var insertCon = function(db, callback) {
		var data = [{
			author:user,
			title: tit,
			content: con,
			time:time
		}];
		var conn = db.collection('reviews');
		conn.insert(data, function(error, result) {
			if(error) {
				console.log(error);
			} else {
				callback(result);
			}
		})
	}

	mongodb.connect(db_str, function(error, db) {
		if(error) {
			console.log(error);
		} else {
			console.log('success');
			insertCon(db, function(result) {
				res.redirect('back');
				db.close();
			});
		}
	});

});

module.exports = router;