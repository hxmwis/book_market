var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

/* POST users listing. */

//管理员登录
router.post('/adminLogin', function (req, res, next) {
  var password = req.body.password;

  handler(req, res, "admin", { name: req.body.username }, function (data) {
    if (data.length === 0) {
      res.end('{"err":"抱歉，系统中并无该用户，如有需要，请先注册"}');
    } else if (data[0].password !== password) {
      res.end('{"err":"密码不正确"}');
    } else if (data.length !== 0 && data[0].password === password) {

      req.session.username = req.body.username; //存session
      req.session.password = password;

      res.end('{"success":"true"}');
    }

  });

});

//用户登录
router.post('/login', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  handler(req, res, "user", { name: req.body.username }, function (data) {
    if (data.length === 0) {
      res.end('{"err":"抱歉，系统中并无该用户，如有需要，请先注册"}');
    } else if (data[0].password !== password) {
      res.end('{"err":"密码不正确"}');
    } else if (data.length !== 0 && data[0].password === password) {

      req.session.username = req.body.username; //存session
      req.session.password = password;

      res.end('{"success":"true"}');
    }

  });

});

//用户注册
router.post('/add', function(req, res, next) {
	//console.log(req.body);
	var md5 = crypto.createHash('md5');
	req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "user", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
});  

//销售商登录
router.post('/storeLogin', function (req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  handler(req, res, "store", { name: req.body.username }, function (data) {
    if (data.length === 0) {
      res.end('{"err":"抱歉，系统中并无该用户，如有需要，请先注册"}');
    } else if (data[0].password !== password) {
      res.end('{"err":"密码不正确"}');
    } else if (data.length !== 0 && data[0].password === password) {

      req.session.username = req.body.username; //存session
      req.session.password = password;

      res.end('{"success":"true"}');
    }

  });

});

//销售商注册
router.post('/storeAdd', function(req, res, next) {
	//console.log(req.body);
	var md5 = crypto.createHash('md5');
	req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "store", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
});  

//展示留言
router.post('/showMessage', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "message", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//发送留言
router.post('/messageAdd', function(req, res, next) {
	// console.log(req.body);
	// var md5 = crypto.createHash('md5');
	// req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "message", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
}); 

//删除留言
router.post('/deleteMessage', function(req, res, next) {
	
	handler(req, res, "message", {"_id" : ObjectId(req.body._id)},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});

//展示销售商书籍
router.post('/showSbook', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "book", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//展示所有书籍
router.post('/showBook', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "book", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//发布书籍
router.post('/bookAdd', function(req, res, next) {
	// console.log(req.body);
	// var md5 = crypto.createHash('md5');
	// req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "book", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
}); 

//编辑更新书籍
router.post('/update', function(req, res, next) {
	//console.log(req.body);
	
	var selectors = [
    	{"_id":ObjectId(req.body._id)},
    	{"$set":{
        booknob:req.body.booknob, //图书编号
        bookno:req.body.bookno, //图书号
        bookname:req.body.bookname, //图书名称
        sellprice:req.body.sellprice, //图书售价
        remark:req.body.remark //备注
    		}
    	}
    ];
	handler(req, res, "book", selectors,function(data){
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，修改失败"}');
		}else{
			res.end('{"success":"修改成功"}');
		}
		
	});
	
});

//删除书籍
router.post('/deleteBook', function(req, res, next) {
	
	handler(req, res, "book", {"_id" : ObjectId(req.body._id)},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});

//删除订单
router.post('/deleteOrder', function(req, res, next) {
	
	handler(req, res, "order", {"_id" : req.body._id},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});

//展示用户订单
router.post('/showMyOrder', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "order", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//生成订单
router.post('/orderAdd', function(req, res, next) {
	// console.log(req.body);
	// var md5 = crypto.createHash('md5');
	// req.body.password = md5.update(req.body.password).digest('base64');
	handler(req, res, "order", req.body,function(data){
		
		//console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，添加失败"}');
		}else{
			res.end('{"success":"添加成功"}');
		}
	});
}); 

//展示所有一般用户
router.post('/showGuest', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "user", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//删除用户
router.post('/deleteGuest', function(req, res, next) {
	
	handler(req, res, "user", {"_id" : ObjectId(req.body._id)},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});

//展示所有销售商
router.post('/showStore', function(req, res, next) {
	//console.log(req.body);
	req.route.path = "/page"; //修改path来设定 对 数据库的操作
	var page = req.body.page || 1;
	var rows = req.body.rows || 200;
	handler(req, res, "store", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
		var obj = {
          data:data,
          total:count,
          success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
	});
})

//删除销售商
router.post('/deleteStore', function(req, res, next) {
	
	handler(req, res, "store", {"_id" : ObjectId(req.body._id)},function(data){
		
		console.log(data);
		if(data.length==0){
			res.end('{"err":"抱歉，删除失败"}');
		}else{
			var obj = {
	          success:"删除成功"
	        };
	        var str = JSON.stringify(obj);
	        res.end(str);
		}
		
	});
});

module.exports = router;