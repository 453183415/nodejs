var mongodb = require("mongodb");
var server = mongodb.Server;
var db = mongodb.Db;
var server = new server('localhost',27017,{auto_reconnect:true});
var Db = new db('mydb',server);
var mongo = {

    "db" : null,
    "dbUrl" : null,
    conect : function (mongodbUrl,callback){
	var it = this;
	if(!mongodbUrl){
	    return callback('err');
	}
	it.dbUrl = mongodbUrl;
	Db.open(function(err,_db){
	    if(err){
		return;
	    }
	    it.db = _db;
	});
    },
    getInstance : function  (callback){

	var it = this;
	if(!it.db){
	    it.conect(it.dbUrl,function(err,db){
		if(err){
		    return callback(err);
		}
		return callback(null,db);
	    });
	}
	return callback(null,it.db);
    }
};
module.exports = mongo;
