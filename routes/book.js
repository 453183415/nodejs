var express = require("express");
var router = express.Router();
var url = require("url");
var bodyParser = require("body-parser");
var qs = require("querystring");



var search = require("../modoules/book/search");
var update = require("../modoules/book/update");

router.use('/search_name/',function(req,res){
    search.searchByName(req.query,function(result){
	if(result == 'err'){
	    res.end('not found the book');//response error 
	}else{
	    var content = JSON.stringify(result);
	    res.setHeader("content-type","charset=gb1312");
	    res.end(content);
	}
    });
});

router.get('/search_id/',function(req,res){
    search.searchByID(req.qurey,function(result){
	if(result == 'err'){
	    res.end('not found the book');//response error 
	}else{
	    var content = JSON.stringify(result);
	    res.setHeader("content-type","charset=gb1312");
	    res.end(content);
	}
    });
});

router.post('/update/',function(req,res){
    update.update(req.body,function(result){
	console.log(result)
    });
    res.end('OK');
});

module.exports = router;
