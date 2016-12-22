/**
 * Created by WUQD on 2016/12/22.
 */
$(function () {
    var utility = Jadann.utility,db = Jadann.DB;
    
    db.getArticleList({},function (success,msg,data) {
        if(success){
            var datas = data.data || [],html=[],len = datas.length,i;
            for (i = 0; i < len;i++){
                var article = ['<li class="article">',
                    '<span class="title">${title}</span>',
                    '<span class="authod">${authod}</span>',
                    '<span class="creat-date">${createDate}</span>',
                    '<p>${desc}</p>',
                    '</li>'];
                html.push(article.join('').replace('${title}',datas[i].title || '--')
                    .replace('${authod}',datas[i].authod || '--')
                    .replace('${createDate}',datas[i].createDate || '--')
                    .replace('${desc}',datas[i].desc || '--')
                );
            }

            $("#articleList").html(html);
        }
    });
});