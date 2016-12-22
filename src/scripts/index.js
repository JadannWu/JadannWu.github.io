/**
 * Created by WUQD on 2016/12/22.
 */
$(function () {
    var utility = Jadann.utility,db = Jadann.DB;
    
    db.getArticleList({},function (success,msg,data) {
        console.log(msg);
    });
});