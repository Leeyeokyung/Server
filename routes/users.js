//users.js

var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
    'host' : 'aws-rds-mysql.ccqdb9a8zbqf.us-west-2.rds.amazonaws.com:3306',
    'user' : 'user',
    'password' : 'my_password',
    'database' : 'tookey',
});


router.get('/:uuid/cards', function(req, res, next) {
    //내가 y/n한 카드 리스트
    if(req.query.type=="select")
    {
        connection.query('select c.question, cs.answer, c.count_yes, c.count_no, c.count_comment from cards as c, cards_sel as cs where cs.id_user=? and cs.id_card=c.id;',
                         [req.params.uuid], function (error, cursor) {
            res.json(cursor);
        });
    }
    //내가 작성한 카드
    else if(req.query.type=="write")
    {
        connection.query('select question, count_yes, count_no, count_comment from cards where id=?;',
                    [req.params.uuid], function (error, cursor) {
            res.json(cursor);
        });
    }
    //내가 댓글단  카드
    else if(req.query.type=="comment")
    {
        connection.query('select c.question, cs.answer, c.count_yes, c.count_no, c.count_comment from cards as c, cards_sel as cs where cs.id_user=?  and cs.comment!="";',
                    [req.params.uuid], function (error, cursor) {
            res.json(cursor);
        });
    }    
});





//카드에 대한 정보 받아오기(alarm)
router.get('/:uuid/alarm', function(req, res, next) {
     connection.query('select uuid, cs.answer, cs.comment, c.questio, cs.regdate from cards_sel cs, cards c where id_users=?   order by regdate desc;',
 [req.params.uuid], function (error, cursor) {
;
       });
});







module.exports = router;



