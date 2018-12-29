function suggest() {
	var Suggest = Bmob.Object.extend("Suggest");
	var suggest = new Suggest();
	suggest.set("name", $('#suggest_name').val());
	suggest.set("content", $('#suggest_content').val());
	suggest.save(null, {
		success: function(object) {
			alert('感谢你的建议');
		},
		error: function(model, error) {
			alert("添加失败" + error.message);
		}
	});
}

var list = [];

function leftTimer(year, month, day, hour, minute, second, name, birthday, url, mBirthday) {
	var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数    
	var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数    
	var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时    
	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟    
	var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数    
	var htmldata = ''
	if(days < 0) {
		var data = mBirthday.split("-");
		leftTimer(new Date().getFullYear() + 1, parseInt(data[1]), parseInt(data[2]), 00, 00, 00, name, birthday, url, mBirthday)
	} else {

		list.push({
			mName: name,
			mDate: birthday,
			mDay: days,
			mUrl: url
		})
	}
}

function birthday() {
	var Birthday = Bmob.Object.extend("Birthday");
	var query = new Bmob.Query(Birthday);
	query.find({
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				var mBirthday;
				var birthDate;
				if(!object.get('isSolar')) {
					var time = object.get('birthday').split("-");
					var year = new Date().getFullYear();
					var month = time[1];
					var day = time[2];
					var days = calendar.lunar2solar(parseInt(year), parseInt(month), parseInt(day))
					mBirthday = days.cYear + "-" + days.cMonth + "-" + days.cDay;
					birthDate = days.IMonthCn + days.IDayCn;
				} else {
					mBirthday = object.get('birthday');
					var data = mBirthday.split("-");
					birthDate = data[1] + "月" + data[2] + "日";
				}
				var data = mBirthday.split("-");
				leftTimer(new Date().getFullYear(), parseInt(data[1]), parseInt(data[2]), 00, 00, 00, object.get('name'), birthDate, object.get('url'), mBirthday)
			}
			for(i = 0; i < list.length - 1; i++) {
				for(j = 0; j < list.length - 1 - i; j++) {
					if(list[j].mDay > list[j + 1].mDay) {
						var temp = list[j];
						list[j] = list[j + 1];
						list[j + 1] = temp;
					}
				}
			}
			var htmlText = '';
			for(var i = 0; i < list.length; i++) {
				htmlText += '<li class="birthday_li"><div><div class="birthday-bg lazy" style="background: url(\'' +
					list[i].mUrl + '\') no-repeat center center;background-size:100% 100%;"></div><div class="birthday_message"><div class="birthday_name">' +
					list[i].mName + '</div><div class="hr"></div><div class="birthday_date">' +
					list[i].mDate + '</div><div class="birthday_day">距离生日还有<span>' + 
					list[i].mDay + '</span>天</div></div></li>';
			}
			$(".birthday_ul").append(htmlText);
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function share() {
	var Share = Bmob.Object.extend("Share");
	var query = new Bmob.Query(Share);
	query.descending("createdAt");
	query.find({
		success: function(results) {
			var htmlText = '';
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				var img = '';
				if(object.get("photo") != undefined) {
					img = object.get("photo")._url;
				}
				htmlText += '<li class="common_li"><div><img class="common_img lazy" width="370" heigh="227" data-original="' + 
					img + '"/><div class="common_message">' + '<div class="common_title">' +
					object.get("title") + '</div><div class="common_write">' +
					object.get("name") + '</div><div class="common_type">技术分享</div></div></li>';
			}
			$(".spinner-wrapper").hide();
			$(".share_ul").append(htmlText);
			$("img.lazy").lazyload({
				effect: "fadeIn",
			});
			
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function git() {
	var Git = Bmob.Object.extend("Git");
	var query = new Bmob.Query(Git);
	query.descending("createdAt");
	query.find({
		success: function(results) {
			var htmlText = '';
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				var img = '';
				if(object.get("photo") != undefined) {
					img = object.get("photo")._url;
				}
				var link = 'onclick=\'window.open("' + object.get("url") + '")\'';
				htmlText += '<li class="common_li"' + link + '><div><img class="common_img lazy" data-original="' +
					img + '"/><div class="common_message">' + '<div class="common_title">' +
					object.get("title") + '</div><div class="common_write">' +
					object.get("name") + '</div><div class="common_type">开源项目</div></div></li>';
			}
			$(".spinner-wrapper").hide();
			$(".git_ul").append(htmlText);
			$("img.lazy").lazyload({
				effect: "fadeIn",
			});
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function start() {
	var Start = Bmob.Object.extend("Start");
	var query = new Bmob.Query(Start);
	query.descending("createdAt");
	query.find({
		success: function(results) {
			var htmlText = '';
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				var img = '';
				if(object.get("photo") != undefined) {
					img = object.get("photo")._url;
				}
				htmlText += '<li class="common_li"><div><img class="common_img lazy" data-original="' +
				img + '"/><div class="common_message">' + '<div class="common_title">' +
				object.get("title") + '</div><div class="common_write">' +
				object.get("name") + '</div><div class="common_type">技术之星</div></div></li>';
			}
			$(".spinner-wrapper").hide();
			$(".start_ul").append(htmlText);
			$("img.lazy").lazyload({
				effect: "fadeIn",
			});
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function blog(type) {
	var Blog = Bmob.Object.extend("Blog");
	var query = new Bmob.Query(Blog);
	query.equalTo("type", type);
	query.descending("createdAt");
	query.find({
		success: function(results) {
			var htmlText = '';
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				var link = 'onclick=\'window.open("' + object.get("url") + '")\'';
				htmlText += '<li class="common_li"' + link + '><div><img class="common_img lazy" data-original="' +
					object.get("img") + '"/><div class="common_message">' + '<div class="common_title">' +
					object.get("title") + '</div><div class="common_write">' +
					object.get("name") + '</div><div class="common_type">博客</div></div></li>';
			}
			$('.spinner-wrapper').hide();
			$(".blog_ul").append(htmlText);
			$("img.lazy").lazyload({
				effect: "fadeIn",
			});
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

(function home() {
	Bmob.initialize("5ce22f81172e110d2fbf4f7b020c1dfe", "a619129e6d4b670e21634c27aca81efc");
	// birthday();
	// share();
	// git();
	// start();
	// blog("Android");
})();

// 博客类型切换
$(".blog-list li").click(function(e) {
	$(this).siblings('li').removeClass('active');
	$(this).addClass('active');
	$('.blog_ul').html("");
	$('.spinner-wrapper').show();
    blog($(this).attr("data"));
});

// 按需要加载脚本
var _pathname = window.location.pathname;
if(_pathname.indexOf('message')>0){
    $('#suggest_submit').click(function() {
		if($('.message-content').val() == "") {
			alert('请输入您的建议')
			return;
		}
		suggest();
	});
}else if(_pathname.indexOf('birthday')>0){
    birthday();
}else if(_pathname.indexOf('team')>0){
    //
}else if(_pathname.indexOf('star')>0){
    start()
}else if(_pathname.indexOf('source')>0){
    git();
}else if(_pathname.indexOf('share')>0){
    share();
}else if(_pathname.indexOf('blog')>0){
    blog("Android");
}else{
	//
}


