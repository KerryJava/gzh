define("fund/bindphone",[],function(e,n,t){var a={bindEvent:function(){$("body").delegate(".js-tap","click",function(e){var n=$(this).data("handler");a[n]&&a[n].call(this)})},checkPhone:function(){var e=$("#phone").val();e=e.replace(/(^\s+)|(\s+$)/g,"");var n=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;return!!n.test(e)&&e},checkSmsCode:function(e,n){var t=$("#smsCode").val();t&&(t=t.replace(/(^\s+)|(\s+$)/g,""));var a=new RegExp("^\\d{4}$");if(!t||!a.test(t))return $.Func.pop("请输入正确短信验证码！"),!1;var i={jsonrpc:"2.0",method:"Other.VerifyVerificationCode",id:54321,params:{phone:e,code:t}};$.Func.ajax(i,function(e){var t=e.result;t&&(t.status>1?$.Func.pop(t.statusmsg):$.isFunction(n)&&n())})},getSmsCode:function(){var e=this,n=a.checkPhone();if(!n)return $.Func.pop("请输入有效的手机号码！"),!1;var t={jsonrpc:"2.0",method:"Other.SendVerificationCode",id:54321,params:{phone:n}},i=$(e).attr("disabled");i||$.Func.ajax(t,function(n){var t=n.result;if(t){var a=($(e).attr("disabled"),60);$(e).addClass("disabled").attr("disabled","disabled").html(a+"s后重新获取");var i=setInterval(function(){a--,a>0?$(e).html(a+"s后重新获取"):($(e).removeClass("disabled").removeAttr("disabled").html("重新发送"),clearInterval(i))},1e3)}else $.Func.pop(n.error.message)})},returnIndex:function(){location.href="http://wx.gupiaoxianji.com/auth/indexcallbacktest"},closeLayer:function(){$("#layer").removeClass("show")},submit:function(){var e=a.checkPhone();a.checkSmsCode(e,function(){$.User.wxgzh||$.Func.bindGZH(e,$.User.openid,function(e){var n=e.result;n?$.Func.pop(n.statusmsg,function(){1==n.status&&(location.href="http://wx.gupiaoxianji.com/auth/indexcallbacktest")}):$.Func.pop(e.error.message)}),$.User.wxapp||$.Func.bindWeixin(e,$.User.unionid,function(){})})},init:function(){$.Func.getUserInfo(),a.bindEvent()}};t.exports=a});