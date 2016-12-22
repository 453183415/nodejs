
var db = require('../mongodb/datebase');
var updateDB = require("../mongodb/operateDB");

function update(paramas,callback){
    var id = paramas.id;
    var info = paramas.info;
    updateDB.updateDB(db,id,info,function(result){
	callback(result);
    });

} 

module.exports.update = update;
