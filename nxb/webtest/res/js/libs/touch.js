"use strict";!function(e,t){"function"==typeof define&&(define.amd||define.cmd)?define("libs/touch",[],t):e.touch=t()}(this,function(){function e(){var e="mouseup mousedown mousemove mouseout",n="touchstart touchmove touchend touchcancel",r=t.hasTouch?n:e;r.split(" ").forEach(function(e){document.addEventListener(e,C,!1)})}var t={};t.PCevts={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touchcancel:"mouseout"},t.hasTouch="ontouchstart"in window,t.getType=function(e){return Object.prototype.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t.getSelector=function(e){if(e.id)return"#"+e.id;if(e.className){var t=e.className.split(/\s+/);return"."+t.join(".")}return e===document?"body":e.tagName.toLowerCase()},t.matchSelector=function(e,t){return e.webkitMatchesSelector(t)},t.getEventListeners=function(e){return e.listeners},t.getPCevts=function(e){return this.PCevts[e]||e},t.forceReflow=function(){var e="reflowDivBlock",t=document.getElementById(e);t||(t=document.createElement("div"),t.id=e,document.body.appendChild(t));var n=t.parentNode,r=t.nextSibling;n.removeChild(t),n.insertBefore(t,r)},t.simpleClone=function(e){return Object.create(e)},t.getPosOfEvent=function(e){if(this.hasTouch){for(var t=[],n=null,r=0,i=e.touches.length;i>r;r++)n=e.touches[r],t.push({x:n.pageX,y:n.pageY});return t}return[{x:e.pageX,y:e.pageY}]},t.getDistance=function(e,t){var n=t.x-e.x,r=t.y-e.y;return Math.sqrt(n*n+r*r)},t.getFingers=function(e){return e.touches?e.touches.length:1},t.calScale=function(e,t){if(e.length>=2&&t.length>=2){var n=this.getDistance(e[1],e[0]),r=this.getDistance(t[1],t[0]);return r/n}return 1},t.getAngle=function(e,t){return 180*Math.atan2(t.y-e.y,t.x-e.x)/Math.PI},t.getAngle180=function(e,t){var n=Math.atan(-1*(t.y-e.y)/(t.x-e.x))*(180/Math.PI);return 0>n?n+180:n},t.getDirectionFromAngle=function(e){var t={up:-45>e&&e>-135,down:e>=45&&135>e,left:e>=135||-135>=e,right:e>=-45&&45>=e};for(var n in t)if(t[n])return n;return null},t.getXYByElement=function(e){for(var t=0,n=0;e.offsetParent;)t+=e.offsetLeft,n+=e.offsetTop,e=e.offsetParent;return{left:t,top:n}},t.reset=function(){a=c=u=null,d=p=g=l=!1,f=!1,o={},E=!1},t.isTouchMove=function(e){return"touchmove"===e.type||"mousemove"===e.type},t.isTouchEnd=function(e){return"touchend"===e.type||"mouseup"===e.type||"touchcancel"===e.type},t.env=function(){var e={},t=navigator.userAgent,n=t.match(/(Android)[\s\/]+([\d\.]+)/),r=t.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),i=t.match(/(Windows\s+Phone)\s([\d\.]+)/),o=/WebKit\/[\d.]+/i.test(t),s=!!r&&(navigator.standalone?o:/Safari/i.test(t)&&!/CriOS/i.test(t)&&!/MQQBrowser/i.test(t));return n&&(e.android=!0,e.version=n[2]),r&&(e.ios=!0,e.version=r[2].replace(/_/g,"."),e.ios7=/^7/.test(e.version),"iPad"===r[1]?e.ipad=!0:"iPhone"===r[1]?(e.iphone=!0,e.iphone5=568==screen.height):"iPod"===r[1]&&(e.ipod=!0)),i&&(e.wp=!0,e.version=i[2],e.wp8=/^8/.test(e.version)),o&&(e.webkit=!0),s&&(e.safari=!0),e}();var n={proxyid:0,proxies:[],trigger:function(e,t,n){n=n||{};var r,i={bubbles:!0,cancelable:!0,detail:n};try{"undefined"!=typeof CustomEvent?(r=new CustomEvent(t,i),e&&e.dispatchEvent(r)):(r=document.createEvent("CustomEvent"),r.initCustomEvent(t,!0,!0,n),e&&e.dispatchEvent(r))}catch(o){console.warn("Touch.js is not supported by environment.")}},bind:function(e,n,r){e.listeners=e.listeners||{},e.listeners[n]?e.listeners[n].push(r):e.listeners[n]=[r];var i=function(e){t.env.ios7&&t.forceReflow(),e.originEvent=e;for(var n in e.detail)"type"!==n&&(e[n]=e.detail[n]);e.startRotate=function(){E=!0};var i=r.call(e.target,e);"undefined"==typeof i||i||(e.stopPropagation(),e.preventDefault())};r.proxy=r.proxy||{},r.proxy[n]?r.proxy[n].push(this.proxyid++):r.proxy[n]=[this.proxyid++],this.proxies.push(i),e.addEventListener&&e.addEventListener(n,i,!1)},unbind:function(e,t,n){if(n){var r=n.proxy[t];r&&r.length&&r.forEach(function(){e.removeEventListener&&e.removeEventListener(t,this.proxies[this.proxyid],!1)})}else{var i=e.listeners[t];i&&i.length&&i.forEach(function(n){e.removeEventListener(t,n,!1)})}},delegate:function(e,n,r,i){var o=function(n){var o,s;n.originEvent=n;for(var a in n.detail)"type"!==a&&(n[a]=n.detail[a]);n.startRotate=function(){E=!0};var c=t.getSelector(e)+" "+r,u=t.matchSelector(n.target,c),g=t.matchSelector(n.target,c+" "+n.target.nodeName);if(!u&&g){for(t.env.ios7&&t.forceReflow(),o=n.target;!t.matchSelector(o,c);)o=o.parentNode;s=i.call(n.target,n),"undefined"==typeof s||s||(n.stopPropagation(),n.preventDefault())}else t.env.ios7&&t.forceReflow(),(u||g)&&(s=i.call(n.target,n),"undefined"==typeof s||s||(n.stopPropagation(),n.preventDefault()))};i.proxy=i.proxy||{},i.proxy[n]?i.proxy[n].push(this.proxyid++):i.proxy[n]=[this.proxyid++],this.proxies.push(o),e.listeners=e.listeners||{},e.listeners[n]?e.listeners[n].push(o):e.listeners[n]=[o],e.addEventListener&&e.addEventListener(n,o,!1)},undelegate:function(e,t,n,r){if(r){var i=r.proxy[t];i.length&&i.forEach(function(){e.removeEventListener&&e.removeEventListener(t,this.proxies[this.proxyid],!1)})}else{var o=e.listeners[t];o.forEach(function(n){e.removeEventListener(t,n,!1)})}}},r={tap:!0,doubleTap:!0,tapMaxDistance:10,hold:!0,tapTime:200,holdTime:650,maxDoubleTapInterval:300,swipe:!0,swipeTime:300,swipeMinDistance:18,swipeFactor:5,drag:!0,pinch:!0,minScaleRate:0,minRotationAngle:0},i={TOUCH_START:"touchstart",TOUCH_MOVE:"touchmove",TOUCH_END:"touchend",TOUCH_CANCEL:"touchcancel",MOUSE_DOWN:"mousedown",MOUSE_MOVE:"mousemove",MOUSE_UP:"mouseup",CLICK:"click",PINCH_START:"pinchstart",PINCH_END:"pinchend",PINCH:"pinch",PINCH_IN:"pinchin",PINCH_OUT:"pinchout",ROTATION_LEFT:"rotateleft",ROTATION_RIGHT:"rotateright",ROTATION:"rotate",SWIPE_START:"swipestart",SWIPING:"swiping",SWIPE_END:"swipeend",SWIPE_LEFT:"swipeleft",SWIPE_RIGHT:"swiperight",SWIPE_UP:"swipeup",SWIPE_DOWN:"swipedown",SWIPE:"swipe",DRAG:"drag",DRAGSTART:"dragstart",DRAGEND:"dragend",HOLD:"hold",TAP:"tap",DOUBLE_TAP:"doubletap"},o={start:null,move:null,end:null},s=0,a=null,c=null,u=null,g=!1,l=!1,f=!1,h={},p=!1,v=null,d=!1,m=null,T=1,E=!1,y=[],P=0,w=0,S=0,I=null,A={getAngleDiff:function(e){for(var n=parseInt(P-t.getAngle180(e[0],e[1]),10),r=0;Math.abs(n-w)>90&&r++<50;)0>w?n-=180:n+=180;return w=parseInt(n,10)},pinch:function(e){var s=e.target;if(r.pinch){if(!p)return;if(t.getFingers(e)<2&&!t.isTouchEnd(e))return;var a=t.calScale(o.start,o.move),c=this.getAngleDiff(o.move),u={type:"",originEvent:e,scale:a,rotation:c,direction:c>0?"right":"left",fingersCount:t.getFingers(e)};if(l?t.isTouchMove(e)?(u.fingerStatus="move",n.trigger(s,i.PINCH,u)):t.isTouchEnd(e)&&(u.fingerStatus="end",n.trigger(s,i.PINCH_END,u),t.reset()):(l=!0,u.fingerStatus="start",n.trigger(s,i.PINCH_START,u)),Math.abs(1-a)>r.minScaleRate){var g=t.simpleClone(u),f=1e-11;a>T?(T=a-f,n.trigger(s,i.PINCH_OUT,g,!1)):T>a&&(T=a+f,n.trigger(s,i.PINCH_IN,g,!1)),t.isTouchEnd(e)&&(T=1)}if(Math.abs(c)>r.minRotationAngle){var h,v=t.simpleClone(u);h=c>0?i.ROTATION_RIGHT:i.ROTATION_LEFT,n.trigger(s,h,v,!1),n.trigger(s,i.ROTATION,u)}}},rotateSingleFinger:function(e){var r=e.target;if(E&&t.getFingers(e)<2){if(!o.move)return;if(y.length<2){var s=t.getXYByElement(r);y=[{x:s.left+r.offsetWidth/2,y:s.top+r.offsetHeight/2},o.move[0]],P=parseInt(t.getAngle180(y[0],y[1]),10)}var a=[y[0],o.move[0]],c=this.getAngleDiff(a),u={type:"",originEvent:e,rotation:c,direction:c>0?"right":"left",fingersCount:t.getFingers(e)};t.isTouchMove(e)?u.fingerStatus="move":(t.isTouchEnd(e)||"mouseout"===e.type)&&(u.fingerStatus="end",n.trigger(r,i.PINCH_END,u),t.reset());var g=c>0?i.ROTATION_RIGHT:i.ROTATION_LEFT;n.trigger(r,g,u),n.trigger(r,i.ROTATION,u)}},swipe:function(e){var a=e.target;if(p&&o.move&&!(t.getFingers(e)>1)){var c=Date.now(),u=c-s,l=t.getDistance(o.start[0],o.move[0]),v={x:o.move[0].x-h.left,y:o.move[0].y-h.top},d=t.getAngle(o.start[0],o.move[0]),m=t.getDirectionFromAngle(d),T=u/1e3,E=10*(10-r.swipeFactor)*T*T,y={type:i.SWIPE,originEvent:e,position:v,direction:m,distance:l,distanceX:o.move[0].x-o.start[0].x,distanceY:o.move[0].y-o.start[0].y,x:o.move[0].x-o.start[0].x,y:o.move[0].y-o.start[0].y,angle:d,duration:u,fingersCount:t.getFingers(e),factor:E};if(r.swipe){var P=function(){var e=i;switch(m){case"up":n.trigger(a,e.SWIPE_UP,y);break;case"down":n.trigger(a,e.SWIPE_DOWN,y);break;case"left":n.trigger(a,e.SWIPE_LEFT,y);break;case"right":n.trigger(a,e.SWIPE_RIGHT,y)}};g?t.isTouchMove(e)?(y.fingerStatus=y.swipe="move",n.trigger(a,i.SWIPING,y),u>r.swipeTime&&u<r.swipeTime+50&&l>r.swipeMinDistance&&(P(),n.trigger(a,i.SWIPE,y,!1))):(t.isTouchEnd(e)||"mouseout"===e.type)&&(y.fingerStatus=y.swipe="end",n.trigger(a,i.SWIPE_END,y),r.swipeTime>u&&l>r.swipeMinDistance&&(P(),n.trigger(a,i.SWIPE,y,!1))):(y.fingerStatus=y.swipe="start",g=!0,n.trigger(a,i.SWIPE_START,y))}r.drag&&(f?t.isTouchMove(e)?(y.fingerStatus=y.swipe="move",n.trigger(a,i.DRAG,y)):t.isTouchEnd(e)&&(y.fingerStatus=y.swipe="end",n.trigger(a,i.DRAGEND,y)):(y.fingerStatus=y.swipe="start",f=!0,n.trigger(a,i.DRAGSTART,y)))}},tap:function(e){var a=e.target;if(r.tap){var c=Date.now(),u=c-s,g=t.getDistance(o.start[0],o.move?o.move[0]:o.start[0]);clearTimeout(v);var l=function(){if(I&&r.doubleTap&&s-S<r.maxDoubleTapInterval){var e=t.getDistance(I,o.start[0]);if(16>e)return!0}return!1}();if(l)return clearTimeout(m),void n.trigger(a,i.DOUBLE_TAP,{type:i.DOUBLE_TAP,originEvent:e,position:o.start[0]});if(r.tapMaxDistance<g)return;r.holdTime>u&&t.getFingers(e)<=1&&(d=!0,S=c,I=o.start[0],m=setTimeout(function(){n.trigger(a,i.TAP,{type:i.TAP,originEvent:e,fingersCount:t.getFingers(e),position:I})},r.tapTime))}},hold:function(e){var i=e.target;r.hold&&(clearTimeout(v),v=setTimeout(function(){if(o.start){var s=t.getDistance(o.start[0],o.move?o.move[0]:o.start[0]);r.tapMaxDistance<s||d||n.trigger(i,"hold",{type:"hold",originEvent:e,fingersCount:t.getFingers(e),position:o.start[0]})}},r.holdTime))}},C=function(e){var n=e.target;switch(e.type){case"touchstart":case"mousedown":y=[],p=!0,(!o.start||o.start.length<2)&&(o.start=t.getPosOfEvent(e)),t.getFingers(e)>=2&&(P=parseInt(t.getAngle180(o.start[0],o.start[1]),10)),s=Date.now(),a=e,h={};var r=n.getBoundingClientRect(),i=document.documentElement;h={top:r.top+(window.pageYOffset||i.scrollTop)-(i.clientTop||0),left:r.left+(window.pageXOffset||i.scrollLeft)-(i.clientLeft||0)},A.hold(e);break;case"touchmove":case"mousemove":if(!p||!o.start)return;o.move=t.getPosOfEvent(e),t.getFingers(e)>=2?A.pinch(e):E?A.rotateSingleFinger(e):A.swipe(e);break;case"touchend":case"touchcancel":case"mouseup":case"mouseout":if(!p)return;u=e,l?A.pinch(e):E?A.rotateSingleFinger(e):g?A.swipe(e):A.tap(e),t.reset(),P=0,w=0,e.touches&&1===e.touches.length&&(p=!0,E=!0)}},x=function(){function e(e){t.hasTouch||(e=t.getPCevts(e)),u.forEach(function(t){n.delegate(t,e,a,s[e])})}function r(e){t.hasTouch||(e=t.getPCevts(e)),u.forEach(function(t){n.bind(t,e,s[e])})}var i,o,s,a,c=arguments;if(c.length<2||c>4)return console.error("unexpected arguments!");var u="string"===t.getType(c[0])?document.querySelectorAll(c[0]):c[0];if(u=u.length?Array.prototype.slice.call(u):[u],3===c.length&&"string"===t.getType(c[1]))return i=c[1].split(" "),o=c[2],void i.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),u.forEach(function(t){n.bind(t,e,o)})});if(3!==c.length||"object"!==t.getType(c[1]))if(2!==c.length||"object"!==t.getType(c[1])){if(4===c.length&&"object"===t.getType(c[2]))return i=c[1].split(" "),o=c[3],void i.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),u.forEach(function(t){n.bind(t,e,o)})});if(4===c.length){var g=u[0];return i=c[1].split(" "),a=c[2],o=c[3],void i.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),n.delegate(g,e,a,o)})}}else{s=c[1];for(var l in s)r(l)}else{s=c[1],a=c[2];for(var f in s)e(f)}},D=function(){var e,r,i=arguments;if(i.length<1||i.length>4)return console.error("unexpected arguments!");var o="string"===t.getType(i[0])?document.querySelectorAll(i[0]):i[0];if(o=o.length?Array.prototype.slice.call(o):[o],1===i.length||2===i.length)return void o.forEach(function(r){e=i[1]?i[1].split(" "):Object.keys(r.listeners),e.length&&e.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),n.unbind(r,e),n.undelegate(r,e)})});if(3===i.length&&"function"===t.getType(i[2]))return r=i[2],void o.forEach(function(o){e=i[1].split(" "),e.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),n.unbind(o,e,r)})});if(3===i.length&&"string"===t.getType(i[2])){var s=i[2];return void o.forEach(function(r){e=i[1].split(" "),e.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),n.undelegate(r,e,s)})})}return 4===i.length?(r=i[3],void o.forEach(function(o){e=i[1].split(" "),e.forEach(function(e){t.hasTouch||(e=t.getPCevts(e)),n.undelegate(o,e,s,r)})})):void 0},O=function(e,r,i){var o=arguments;t.hasTouch||(r=t.getPCevts(r));var s="string"===t.getType(o[0])?document.querySelectorAll(o[0]):o[0];s=s.length?Array.prototype.call(s):[s],s.forEach(function(e){n.trigger(e,r,i)})};e();var N={};return N.on=N.bind=N.live=x,N.off=N.unbind=N.die=D,N.config=r,N.trigger=O,N});