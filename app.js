var later = require('later');
//var cheerio = require('cheerio');
var superagent = require('superagent');
//设置成本地时间
later.date.localTime();
//每格三秒钟执行一次
var sched = later.parse.recur().every(3).second();

later.setInterval(function() {
  /*取得日记ID*/
superagent
    .get('http://www.timepill.net/')
    .set('Cookie', COOKIE.version)
    .end(function (err, Str_one_one){
      if (err) {return err;}

    var Reg = new RegExp(/<a href="\/diary\/(\d{8})">回复<\/a>/g);

    while((tid = Reg.exec(Str_one.text)) !=null){
      superagent
       .post('http://www.timepill.net/comment/add/'+tid[1])
       .send('content=我是谁？')
       .send('recipient_id=0')
       .send('has_cmt=')
       .set('Cookie', COOKIE.version)
       .end(function(err, Str_two){
        //res.send(Str_two);
        console.log(Str_two.status);
           });
       }
  });
},sched);


var COOKIE = {
version:'TP_token=u%3D58888558%40qq.com%26p%3D%24P%24B9w50WdcbIRNHGS157f44MLqN2qrPd1%26e%3D1467604976%26sign%3Da4c3f3f27765de692bae3902d2365ccd; fee_status=true'
}
