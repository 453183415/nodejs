var dburl = 'mongodb://localhost/mydb'
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var db = mongoose.connect(dburl);

var doubanInfoSchema = new mongoose.Schema({
    ID: String,
    ISBN: String,
    Name: String,
    Author: [],
    Publish_year: String,
    Introduce: String,
    Price: String
}, {
    collection: 'DoubanInfo'
});
var doubanInfoModel = mongoose.model('DoubanInfo', doubanInfoSchema);

var uniResult = {
    Result: false,
    Info: ''
};

function getFromDBbyID(id, callback) {

    doubanInfoModel.findOne({ ID: id }, function(err, result) {
        if (err) {
            uniResult.Result = false;
            uniResult.Info = err;
            callback(uniResult);
            return;
        } else if (!resulth) {

            uniResult.Result = true;
            uniResult.Info = 'null';
            callback(uniResult);
            return;
        } else if (result) {

            uniResult.Result = true;
            uniResult.Info = result;
            callback(uniResult);
            return;
        }
    })
}

function getFromDBbyName(name, callback) {
    doubanInfoModel.find({ 'Name': { $regex: name } }, function(err, result) {
        console.log(result);
        if (err) {
            uniResult.Result = false;
            uniResult.Info = err;
            callback(uniResult);
            return;
        } else if (!result.length) {

            uniResult.Result = true;
            uniResult.Info = 'null';
            callback(uniResult);
            return;
        } else if (result) {

            uniResult.Result = true;
            uniResult.Info = result;
            callback(uniResult);
            return;
        }
    });

}

function writeToDB(info, callback) {
    var newInfo = new doubanInfoModel(info);
    newInfo.save(function(err) {
        if (err) {

            uniResult.Result = false;
            uniResult.Info = 'failes';
            callback(uniResult);
            return;
        } else {

            uniResult.Result = true;
            uniResult.Info = 'succeed';
            callback(uniResult);
            return;
        }

    });
}

function updateDB(id, info, callback) {

    doubanInfoModel.update({ ID: id }, { $set: info[0] }, function(err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.ok) {
                callback("update succeed");
            } else {
                callback("update failed");
            }
        }
    });

}


module.exports.getFromDBbyID = getFromDBbyID;
module.exports.getFromDBbyName = getFromDBbyName;
module.exports.writeToDB = writeToDB;
module.exports.updateDB = updateDB;
