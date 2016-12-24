function getFromDBbyName(db, info, callback) {
	var DoubanInfo = db.collection('DoubanInfo');
        DoubanInfo.find({'Name': { $regex: info }}).toArray( function(err, result) {
            if (err) {
                callback('false');
            }
	    if(!result){
		return callback('not found');
	    }
            return callback(result);
        });
}

function getFromDBbyID(db, info, callback) {
	var DoubanInfo =db.collection('DoubanInfo');
        DoubanInfo.find({ 'ID': info }).toArray( function(err, result) {
            if (err) {
                callback('false');
            }
	    if(!result.length){
		return callback('not fond the book by id');
	    }
            callback(result);
        });
}

function writeToDB(db, info, callback) {
        var DoubanInfo =db.collection('DoubanInfo');
	DoubanInfo.insert(info, function(err, result) {
            if (err) {
                callback('false');
            }
            callback(result);
        });
}

function updateDB(db, id, info, callback) {
        var DoubanInfo = db.collection('DoubanInfo');
	DoubanInfo.update({ ID: id }, { $set: info }, function(err, result) {
            if (err) {
                callback('false');
            }
            callback(result);
        });
}

module.exports.updateDB = updateDB;
module.exports.writeToDB = writeToDB;
module.exports.getFromDBbyID = getFromDBbyID;
module.exports.getFromDBbyName = getFromDBbyName
