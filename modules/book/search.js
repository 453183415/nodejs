var request = require("request");
var mongo = require('../mongodb/datebase');
var get = require("../mongodb/operateDB");
var thenjs = require('thenjs');

function searchByName(params,callback) {
    thenjs(function(cont){
	get.getFromDBbyName(mongo.db, params.name,function(result){
	    if (!result) {
		cont('err');
	    } 
	    if (result) {
		// 如果数据库里没有查询到相关信息，则从豆瓣获取信息，存入数据库并返回
		if (result == 'null') {
		    thenjs(function(cont){
			request({
			    uri: 'https://api.douban.com/v2/book/search?q=' + encodeURI(params.Info) + '&count=3'
			},function(err,res,body){
			    if (body.indexOf('Not Found') != -1) {
				console.log('Not Found');
				return cont('error');
			    }
			    var doubandata = JSON.parse(body);
			    var books = doubandata.books;
			    var book = [];
			    for (i in books) {
				id = books[i].id;
				isbn = books[i].isbn13;
				name = books[i].title;
				author = books[i].author;
				publish_year = books[i].pubdate;
				introduce = books[i].summary;
				price = books[i].price;
				book.push({ ID: id, ISBN: isbn, Name: name, Author: author, Introduce: introduce, Price: price });
				//将豆瓣上的信息存入数据库
				get.writeToDB({ ID: id, ISBN: isbn, Name: name, Author: author, Introduce: introduce, Price: price });
			    }
			    return cont(err,book);
			});
		    }).then(function(err,book) {
			return cont(book);
		    },function(cont,err){
			return cont('error');
		    });
		}
		return  cont(null,result);
	    }
	});
    }).then(function(cont,result) {
	if(result)
	    return callback(result);
    },function(cont,err){return callback('error');});
}

function searchByID(params, callback) {
    get.getFromDBbyID(mongo.db, params.id, function(result) {
	if (!result) {
	    callback('err');
	} else {
	    callback(result);
	}
    });
}

module.exports.searchByID = searchByID;
module.exports.searchByName = searchByName;
