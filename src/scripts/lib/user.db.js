/**
 * Created by WUQD on 2016/12/6.
 */
/**
 * 获取数据接口，获取数据接口统一写在这里
 */
; (function ($, Jadann) {
    var utility = Jadann.utility,path = 'http://localhost/hello';
        dbConfig = {
            getArticleList: { url: path+"/article/getArticleList?pageNum=1"}
        };

    utility.registerDBInterface(dbConfig);
})(jQuery, Jadann);