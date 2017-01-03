/**
 * Created by WUQD on 2016/12/22.
 */
$(function () {
    var utility = Jadann.utility,db = Jadann.DB;

    var data= {
             'Accept':'application/json, text/javascript, */*; q=0.01',
             'Accept-Encoding':'gzip, deflate, sdch',
             'Accept-Language':'zh-CN,zh;q=0.8',
             'Connection':'keep-alive',
             'Cookie':'read_mode=day; default_font=font2; remember_user_token=W1s0MTI4Mjk4XSwiJDJhJDEwJHljQkRNbjdkQ0NVbE9oZGZOc1gwNS4iLCIxNDgyNDYwMDI2LjE2Mjg5NDUiXQ%3D%3D--ea42671fa46bf1dd98bc801e2c56ab46b8c35f1a; _gat=1; CNZZDATA1258679142=1958998654-1482311234-https%253A%252F%252Fwww.baidu.com%252F%7C1482456083; _ga=GA1.2.1967538875.1482315174; _session_id=VlRZU0xjY0ZBdktyY0oxQXJaejYxSTI2Si9lV0RubXhjKzhWaGlNbGZTRFFMNGNITUd5b2J3NGJLZHRBM2dMRjF4YWVmeE9QSG5JQllPQ25ZRlFUaXNyZU1DUzd0WTNCTWlNcTRKNjFEZ20raXdpMU5LdGZSUGhZR0RtTnJzMGdpVWJYV0E2OHdEQk1qRmlLOUNaNjR6SGFYWllVcUFEUFZ3MTBjZWZpbkRkVHdaaTFFK3N6Tmd1Rmp6VktURS9pWUpPUUllWmtrVzhXWXhOM2FHOTY3OGNsREhkZ1RmRXo4UC9kOGJyUHJ4YWkwWWQvczJxUURhMFhvQkhNczU3Z2I2MzhqZFVGQzg0WkY3ZXFtMmsycllaTVlZanQzNE1HZlh3SFRkbk1yYW5FdCtmMzR3SUF0dFdFQlUvN2psR1N1dDNCc1U1RXhoRXpqN1pBMWdOUTh4V1JNRVhuOFFCZm9HaFFiRXdHRGo1OHJLZEZZQnl6SkRTNXhYTGx3Sjh3UC9pbVozSytLQnM2alNGRWc5Q3JQL0hxMTdFOHNtdjZXOHRuQ2xGRTN6Zz0tLUF3a01MRm50Y2ErZ2tSSnc1OFRsYkE9PQ%3D%3D--cf9b47c5a9849c3fddedc74a806198df4aa5809b',
             'Host':'www.jianshu.com',
             'Referer':'http://www.jianshu.com/writer',
             'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
             'X-CSRF-Token':'/QtznuJ14RciUgbHiXckUB8j2ObNahaHYZNES2+2XGe0uoHQmdDD+8rXHcGg8mrHixK78uxRD3mApnhuSIesBQ==',
             'X-Requested-With':'XMLHttpRequest',
             'x-writer-version':7
    };

    function getJianShu(){
        $.ajax({
            data:data,
            type:'get',
            url:'/jianshu/writer/notes',
            success:function (data) {
                console.log(data);
            },
            error:function (e) {
                console.log(e);
            }
        });
    }
    getJianShu();


    db.getArticleList({},function (success,msg,data) {
        if(success){
            var datas = data.data || [],html=[],len = datas.length,i;
            for (i = 0; i < len;i++){
                var article = ['<li class="article">',
                    '<p class="title">${title}</p>',
                    '<p><span class="authod">${authod}</span>',
                    '<span class="authod">${createDate}</span>',
                    '<span class="authod">${articlelabel}</span>',
                    '</p>',
                    '<p class="desc">${desc}<span class="more">>></span></p>',
                    '</li>'];
                html.push(article.join('').replace('${title}',datas[i].title || '--')
                    .replace('${authod}',datas[i].authod || '--')
                    .replace('${articlelabel}',datas[i].articlelabel || '--')
                    .replace('${createDate}',datas[i].createDate || '--')
                    .replace('${desc}',datas[i].desc || '--')
                );
            }

            $("#articleList").html(html);
        }
    });
});