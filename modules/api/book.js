
var search = require('../book/search');
var update = require('../book/update');


function book_name(req,res){
       search.searchByName(req.query,function(result){   
	   if(!result.length ){
	       return res.end('not found the book');
	   }
	   var content = JSON.stringify(result);
	   res.setHeader('content-type','charset= gb1312');
	   res.end(content);
       });          
}

function book_id(req,res){
    search.searchByID(req.query,function(result){
	if(!result.length ){
	    return res.end('not found the book');
	}
	var content = JSON.stringify(result);
        res.setHeader('content-type','charset= gb1312');
	res.end(content);
    });
}

function book_update(req,res){
    update.update(req.body,function(){
	if(result == 'err'){
	    return res.end('failed');
	}
	res.end('succeed');
    });
}
module.exports.bookupdate = book_update;
module.exports.bookid = book_id;
module.exports.bookname = book_name;
