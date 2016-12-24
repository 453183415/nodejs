var express = require("express");
var router = express.Router();
var url = require("url");
var bodyParser = require("body-parser");

var book = require('../modules/api/book');


router.use('/search_name/', book.bookname);

router.get('/search_id/',book.bookid);

router.post('/update/',book.bookupdate);

module.exports = router;
