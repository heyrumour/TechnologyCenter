function suggest(){var a=Bmob.Object.extend("Suggest"),c=new a;c.set("name",$("#suggest_name").val()),c.set("content",$("#suggest_content").val()),c.save(null,{success:function(){alert("感谢你的建议")},error:function(a,c){alert("添加失败"+c.message)}})}function leftTimer(a,c,g,v,h,_,b,y,w,$){{var I=new Date(a,c-1,g,v,h,_)-new Date,j=parseInt(I/1e3/60/60/24,10);parseInt(I/1e3/60/60%24,10),parseInt(I/1e3/60%60,10),parseInt(I/1e3%60,10)}if(0>j){var z=$.split("-");leftTimer((new Date).getFullYear()+1,parseInt(z[1]),parseInt(z[2]),0,0,0,b,y,w,$)}else list.push({mName:b,mDate:y,mDay:j,mUrl:w})}function birthday(){var a=Bmob.Object.extend("Birthday"),c=new Bmob.Query(a);c.find({success:function(a){for(var i=0;i<a.length;i++){var c,g,v=a[i];if(v.get("isSolar")){c=v.get("birthday");var h=c.split("-");g=h[1]+"月"+h[2]+"日"}else{var _=v.get("birthday").split("-"),b=(new Date).getFullYear(),y=_[1],w=_[2],I=calendar.lunar2solar(parseInt(b),parseInt(y),parseInt(w));c=I.cYear+"-"+I.cMonth+"-"+I.cDay,g=I.IMonthCn+I.IDayCn}var h=c.split("-");leftTimer((new Date).getFullYear(),parseInt(h[1]),parseInt(h[2]),0,0,0,v.get("name"),g,v.get("url"),c)}for(i=0;i<list.length-1;i++)for(j=0;j<list.length-1-i;j++)if(list[j].mDay>list[j+1].mDay){var z=list[j];list[j]=list[j+1],list[j+1]=z}for(var B="",i=0;i<list.length;i++)B+='<li class="birthday_li"><div><div class="birthday-bg" style="background: url(\''+list[i].mUrl+'\') no-repeat center center;background-size:100% 100%;"></div><div class="birthday_message"><div class="birthday_name">'+list[i].mName+'</div><div class="hr"></div><div class="birthday_date">'+list[i].mDate+'</div><div class="birthday_day">距离生日还有<span>'+list[i].mDay+"</span>天</div></div></li>";$(".birthday_ul").append(B)},error:function(a){alert("查询失败: "+a.code+" "+a.message)}})}function share(){var a=Bmob.Object.extend("Share"),c=new Bmob.Query(a);c.descending("createdAt"),c.find({success:function(a){for(var c="",i=0;i<a.length;i++){var g=a[i],v="";void 0!=g.get("photo")&&(v=g.get("photo")._url),c+='<li class="common_li"><div><img class="common_img lazy" width="370" heigh="227" data-original="'+v+'"/><div class="common_message"><div class="common_title">'+g.get("title")+'</div><div class="common_write">'+g.get("name")+'</div><div class="common_type">技术分享</div></div></li>'}$(".spinner-wrapper").hide(),$(".share_ul").append(c),$("img.lazy").lazyload({effect:"fadeIn"})},error:function(a){alert("查询失败: "+a.code+" "+a.message)}})}function git(){var a=Bmob.Object.extend("Git"),c=new Bmob.Query(a);c.descending("createdAt"),c.find({success:function(a){for(var c="",i=0;i<a.length;i++){var g=a[i],v="";void 0!=g.get("photo")&&(v=g.get("photo")._url);var h="onclick='window.open(\""+g.get("url")+"\")'";c+='<li class="common_li"'+h+'><div><img class="common_img lazy" data-original="'+v+'"/><div class="common_message"><div class="common_title">'+g.get("title")+'</div><div class="common_write">'+g.get("name")+'</div><div class="common_type">开源项目</div></div></li>'}$(".spinner-wrapper").hide(),$(".git_ul").append(c),$("img.lazy").lazyload({effect:"fadeIn"})},error:function(a){alert("查询失败: "+a.code+" "+a.message)}})}function start(){var a=Bmob.Object.extend("Start"),c=new Bmob.Query(a);c.descending("createdAt"),c.find({success:function(a){for(var c="",i=0;i<a.length;i++){var g=a[i],v="";void 0!=g.get("photo")&&(v=g.get("photo")._url),c+='<li class="common_li"><div><img class="common_img lazy" data-original="'+v+'"/><div class="common_message"><div class="common_title">'+g.get("title")+'</div><div class="common_write">'+g.get("name")+'</div><div class="common_type">技术之星</div></div></li>'}$(".spinner-wrapper").hide(),$(".start_ul").append(c),$("img.lazy").lazyload({effect:"fadeIn"})},error:function(a){alert("查询失败: "+a.code+" "+a.message)}})}function blog(a){var c=Bmob.Object.extend("Blog"),g=new Bmob.Query(c);g.equalTo("type",a),g.descending("createdAt"),g.find({success:function(a){for(var c="",i=0;i<a.length;i++){var g=a[i],v="onclick='window.open(\""+g.get("url")+"\")'";c+='<li class="common_li"'+v+'><div><img class="common_img lazy" data-original="'+g.get("img")+'"/><div class="common_message"><div class="common_title">'+g.get("title")+'</div><div class="common_write">'+g.get("name")+'</div><div class="common_type">博客</div></div></li>'}$(".spinner-wrapper").hide(),$(".blog_ul").append(c),$("img.lazy").lazyload({effect:"fadeIn"})},error:function(a){alert("查询失败: "+a.code+" "+a.message)}})}var list=[];!function(){Bmob.initialize("5ce22f81172e110d2fbf4f7b020c1dfe","a619129e6d4b670e21634c27aca81efc")}(),$(".blog-list li").click(function(){$(this).siblings("li").removeClass("active"),$(this).addClass("active"),$(".blog_ul").html(""),$(".spinner-wrapper").show(),blog($(this).attr("data"))});var _pathname=window.location.pathname;_pathname.indexOf("message")>0?$("#suggest_submit").click(function(){return""==$(".message-content").val()?void alert("请输入您的建议"):void suggest()}):_pathname.indexOf("birthday")>0?birthday():_pathname.indexOf("team")>0||(_pathname.indexOf("star")>0?start():_pathname.indexOf("source")>0?git():_pathname.indexOf("share")>0?share():_pathname.indexOf("blog")>0&&blog("Android"));