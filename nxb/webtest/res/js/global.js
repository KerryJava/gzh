define("global",["libs/touch"],function(n,e,i){n("libs/touch"),$.User={},$.Func={TAP:"ontouchstart"in window?"tap":"click",getParam:function(n){for(var e=location.search.substring(1),i=e.split("&"),o=0,t=i.length;o<t;o++){var a=i[o].split("=");if(a[0]==n)return a[1]}},ajax:function(n,e){var i="http://app.api.gupiaoxianji.com/test";$.ajax({url:i,type:"POST",contentType:"application/json",dataType:"json",data:JSON.stringify(n),success:function(n){$.isFunction(e)&&e(n)},error:function(n){console.log(n)}})},pop:function(n,e){n&&($("#line").html(n),$("#layer").addClass("show"),$.isFunction(e)&&e())},showLayer:function(n){$(n).addClass("show")},hideLayer:function(n){$(n).removeClass("show")},formatDate:function(n,e){var i,o,t,a=new Date(n);if("Invalid Date"==a){var s=new RegExp(/(\d+)-(\d+)-(\d+)\s.+/),c=n.toString().match(s);i=+c[1],o=+c[2],t=+c[3]}else i=a.getFullYear(),o=a.getMonth()+1,t=a.getDate();return"year"===e?i-=1:"mon"===e&&(o<4?(i-=1,o=12+o-3):o-=3),i=i.toString(),o=o.toString(),t=t.toString(),1===o.length&&(o="0"+o),1===t.length&&(t="0"+t),i+o+t},getUserInfo:function(){$.User={wxapp:parseInt($.Func.cookie.getCookie("WXAppBind")),wxgzh:parseInt($.Func.cookie.getCookie("WXGzhBind")),openid:$.Func.cookie.getCookie("openid"),unionid:$.Func.cookie.getCookie("unionid"),userid:$.Func.cookie.getCookie("userid")}},bindGZH:function(n,e,i){var o={jsonrpc:"2.0",method:"User.BindGzhNxb",id:54321,params:{openid:e,userid:n}};$.Func.ajax(o,function(n){$.isFunction(i)&&i(n)})},bindWeixin:function(n,e,i){var o={jsonrpc:"2.0",method:"User.BindWeixin",id:54321,params:{unionid:e,userid:n}};$.Func.ajax(o,function(n){$.isFunction(i)&&i(n)})},cookie:{setCookie:function(n,e){var i=30,o=new Date;o.setTime(o.getTime()+24*i*60*60*1e3),document.cookie=n+"="+escape(e)+";path=/;expires="+o.toGMTString()},getCookie:function(n){var e,i=new RegExp("(^| )"+n+"=([^;]*)(;|$)");return(e=document.cookie.match(i))?unescape(e[2]):null},delCookie:function(n){var e=new Date;e.setTime(e.getTime()-1);var i=getCookie(n);null!==i&&(document.cookie=n+"="+i+";expires="+e.toGMTString())}},getJSAPI:function(){var n=location.href.split("#")[0];$.ajax({url:"http://wx.gupiaoxianji.com/gzh/nxb/signtest/",contentType:"application/json",data:JSON.stringify({url:n}),type:"POST",success:function(n,e){"success"===e&&wx.config({appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","chooseWXPay"]})}})}}});