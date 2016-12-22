/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */
(function(n,t){typeof module=="object"&&typeof module.exports=="object"?module.exports=n.document?t(n,!0):function(n){if(!n.document)throw new Error("jQuery requires a window with a document");return t(n)}:t(n)})(typeof window!="undefined"?window:this,function(n,t){function ri(n){var t="length"in n&&n.length,r=i.type(n);return r==="function"||i.isWindow(n)?!1:n.nodeType===1&&t?!0:r==="array"||t===0||typeof t=="number"&&t>0&&t-1 in n}function ui(n,t,r){if(i.isFunction(t))return i.grep(n,function(n,i){return!!t.call(n,i,n)!==r});if(t.nodeType)return i.grep(n,function(n){return n===t!==r});if(typeof t=="string"){if(re.test(t))return i.filter(t,n,r);t=i.filter(t,n)}return i.grep(n,function(n){return i.inArray(n,t)>=0!==r})}function hr(n,t){do n=n[t];while(n&&n.nodeType!==1);return n}function ee(n){var t=fi[n]={};return i.each(n.match(h)||[],function(n,i){t[i]=!0}),t}function cr(){u.addEventListener?(u.removeEventListener("DOMContentLoaded",a,!1),n.removeEventListener("load",a,!1)):(u.detachEvent("onreadystatechange",a),n.detachEvent("onload",a))}function a(){(u.addEventListener||event.type==="load"||u.readyState==="complete")&&(cr(),i.ready())}function yr(n,t,r){if(r===undefined&&n.nodeType===1){var u="data-"+t.replace(vr,"-$1").toLowerCase();if(r=n.getAttribute(u),typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:ar.test(r)?i.parseJSON(r):r}catch(f){}i.data(n,t,r)}else r=undefined}return r}function ei(n){for(var t in n)if((t!=="data"||!i.isEmptyObject(n[t]))&&t!=="toJSON")return!1;return!0}function pr(n,t,r,u){if(i.acceptData(n)){var s,e,h=i.expando,l=n.nodeType,o=l?i.cache:n,f=l?n[h]:n[h]&&h;if(f&&o[f]&&(u||o[f].data)||r!==undefined||typeof t!="string")return f||(f=l?n[h]=c.pop()||i.guid++:h),o[f]||(o[f]=l?{}:{toJSON:i.noop}),(typeof t=="object"||typeof t=="function")&&(u?o[f]=i.extend(o[f],t):o[f].data=i.extend(o[f].data,t)),e=o[f],u||(e.data||(e.data={}),e=e.data),r!==undefined&&(e[i.camelCase(t)]=r),typeof t=="string"?(s=e[t],s==null&&(s=e[i.camelCase(t)])):s=e,s}}function wr(n,t,u){if(i.acceptData(n)){var e,s,h=n.nodeType,f=h?i.cache:n,o=h?n[i.expando]:i.expando;if(f[o]){if(t&&(e=u?f[o]:f[o].data,e)){for(i.isArray(t)?t=t.concat(i.map(t,i.camelCase)):(t in e)?t=[t]:(t=i.camelCase(t),t=t in e?[t]:t.split(" ")),s=t.length;s--;)delete e[t[s]];if(u?!ei(e):!i.isEmptyObject(e))return}(u||(delete f[o].data,ei(f[o])))&&(h?i.cleanData([n],!0):r.deleteExpando||f!=f.window?delete f[o]:f[o]=null)}}}function vt(){return!0}function it(){return!1}function dr(){try{return u.activeElement}catch(n){}}function gr(n){var i=nu.split("|"),t=n.createDocumentFragment();if(t.createElement)while(i.length)t.createElement(i.pop());return t}function f(n,t){var e,u,s=0,r=typeof n.getElementsByTagName!==o?n.getElementsByTagName(t||"*"):typeof n.querySelectorAll!==o?n.querySelectorAll(t||"*"):undefined;if(!r)for(r=[],e=n.childNodes||n;(u=e[s])!=null;s++)!t||i.nodeName(u,t)?r.push(u):i.merge(r,f(u,t));return t===undefined||t&&i.nodeName(n,t)?i.merge([n],r):r}function we(n){oi.test(n.type)&&(n.defaultChecked=n.checked)}function eu(n,t){return i.nodeName(n,"table")&&i.nodeName(t.nodeType!==11?t:t.firstChild,"tr")?n.getElementsByTagName("tbody")[0]||n.appendChild(n.ownerDocument.createElement("tbody")):n}function ou(n){return n.type=(i.find.attr(n,"type")!==null)+"/"+n.type,n}function su(n){var t=ve.exec(n.type);return t?n.type=t[1]:n.removeAttribute("type"),n}function li(n,t){for(var u,r=0;(u=n[r])!=null;r++)i._data(u,"globalEval",!t||i._data(t[r],"globalEval"))}function hu(n,t){if(t.nodeType===1&&i.hasData(n)){var u,f,o,s=i._data(n),r=i._data(t,s),e=s.events;if(e){delete r.handle;r.events={};for(u in e)for(f=0,o=e[u].length;f<o;f++)i.event.add(t,u,e[u][f])}r.data&&(r.data=i.extend({},r.data))}}function be(n,t){var u,e,f;if(t.nodeType===1){if(u=t.nodeName.toLowerCase(),!r.noCloneEvent&&t[i.expando]){f=i._data(t);for(e in f.events)i.removeEvent(t,e,f.handle);t.removeAttribute(i.expando)}u==="script"&&t.text!==n.text?(ou(t).text=n.text,su(t)):u==="object"?(t.parentNode&&(t.outerHTML=n.outerHTML),r.html5Clone&&n.innerHTML&&!i.trim(t.innerHTML)&&(t.innerHTML=n.innerHTML)):u==="input"&&oi.test(n.type)?(t.defaultChecked=t.checked=n.checked,t.value!==n.value&&(t.value=n.value)):u==="option"?t.defaultSelected=t.selected=n.defaultSelected:(u==="input"||u==="textarea")&&(t.defaultValue=n.defaultValue)}}function cu(t,r){var f,u=i(r.createElement(t)).appendTo(r.body),e=n.getDefaultComputedStyle&&(f=n.getDefaultComputedStyle(u[0]))?f.display:i.css(u[0],"display");return u.detach(),e}function yt(n){var r=u,t=ai[n];return t||(t=cu(n,r),t!=="none"&&t||(ot=(ot||i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement),r=(ot[0].contentWindow||ot[0].contentDocument).document,r.write(),r.close(),t=cu(n,r),ot.detach()),ai[n]=t),t}function au(n,t){return{get:function(){var i=n();if(i!=null){if(i){delete this.get;return}return(this.get=t).apply(this,arguments)}}}}function pu(n,t){if(t in n)return t;for(var r=t.charAt(0).toUpperCase()+t.slice(1),u=t,i=yu.length;i--;)if(t=yu[i]+r,t in n)return t;return u}function wu(n,t){for(var f,r,o,e=[],u=0,s=n.length;u<s;u++)(r=n[u],r.style)&&(e[u]=i._data(r,"olddisplay"),f=r.style.display,t?(e[u]||f!=="none"||(r.style.display=""),r.style.display===""&&et(r)&&(e[u]=i._data(r,"olddisplay",yt(r.nodeName)))):(o=et(r),(f&&f!=="none"||!o)&&i._data(r,"olddisplay",o?f:i.css(r,"display"))));for(u=0;u<s;u++)(r=n[u],r.style)&&(t&&r.style.display!=="none"&&r.style.display!==""||(r.style.display=t?e[u]||"":"none"));return n}function bu(n,t,i){var r=no.exec(t);return r?Math.max(0,r[1]-(i||0))+(r[2]||"px"):t}function ku(n,t,r,u,f){for(var e=r===(u?"border":"content")?4:t==="width"?1:0,o=0;e<4;e+=2)r==="margin"&&(o+=i.css(n,r+w[e],!0,f)),u?(r==="content"&&(o-=i.css(n,"padding"+w[e],!0,f)),r!=="margin"&&(o-=i.css(n,"border"+w[e]+"Width",!0,f))):(o+=i.css(n,"padding"+w[e],!0,f),r!=="padding"&&(o+=i.css(n,"border"+w[e]+"Width",!0,f)));return o}function du(n,t,u){var o=!0,f=t==="width"?n.offsetWidth:n.offsetHeight,e=k(n),s=r.boxSizing&&i.css(n,"boxSizing",!1,e)==="border-box";if(f<=0||f==null){if(f=d(n,t,e),(f<0||f==null)&&(f=n.style[t]),pt.test(f))return f;o=s&&(r.boxSizingReliable()||f===n.style[t]);f=parseFloat(f)||0}return f+ku(n,t,u||(s?"border":"content"),o,e)+"px"}function e(n,t,i,r,u){return new e.prototype.init(n,t,i,r,u)}function nf(){return setTimeout(function(){rt=undefined}),rt=i.now()}function kt(n,t){var r,i={height:n},u=0;for(t=t?1:0;u<4;u+=2-t)r=w[u],i["margin"+r]=i["padding"+r]=n;return t&&(i.opacity=i.width=n),i}function tf(n,t,i){for(var u,f=(st[t]||[]).concat(st["*"]),r=0,e=f.length;r<e;r++)if(u=f[r].call(i,t,n))return u}function fo(n,t,u){var f,a,p,v,s,w,h,b,l=this,y={},o=n.style,c=n.nodeType&&et(n),e=i._data(n,"fxshow");u.queue||(s=i._queueHooks(n,"fx"),s.unqueued==null&&(s.unqueued=0,w=s.empty.fire,s.empty.fire=function(){s.unqueued||w()}),s.unqueued++,l.always(function(){l.always(function(){s.unqueued--;i.queue(n,"fx").length||s.empty.fire()})}));n.nodeType===1&&("height"in t||"width"in t)&&(u.overflow=[o.overflow,o.overflowX,o.overflowY],h=i.css(n,"display"),b=h==="none"?i._data(n,"olddisplay")||yt(n.nodeName):h,b==="inline"&&i.css(n,"float")==="none"&&(r.inlineBlockNeedsLayout&&yt(n.nodeName)!=="inline"?o.zoom=1:o.display="inline-block"));u.overflow&&(o.overflow="hidden",r.shrinkWrapBlocks()||l.always(function(){o.overflow=u.overflow[0];o.overflowX=u.overflow[1];o.overflowY=u.overflow[2]}));for(f in t)if(a=t[f],ro.exec(a)){if(delete t[f],p=p||a==="toggle",a===(c?"hide":"show"))if(a==="show"&&e&&e[f]!==undefined)c=!0;else continue;y[f]=e&&e[f]||i.style(n,f)}else h=undefined;if(i.isEmptyObject(y))(h==="none"?yt(n.nodeName):h)==="inline"&&(o.display=h);else{e?"hidden"in e&&(c=e.hidden):e=i._data(n,"fxshow",{});p&&(e.hidden=!c);c?i(n).show():l.done(function(){i(n).hide()});l.done(function(){var t;i._removeData(n,"fxshow");for(t in y)i.style(n,t,y[t])});for(f in y)v=tf(c?e[f]:0,f,l),f in e||(e[f]=v.start,c&&(v.end=v.start,v.start=f==="width"||f==="height"?1:0))}}function eo(n,t){var r,f,e,u,o;for(r in n)if(f=i.camelCase(r),e=t[f],u=n[r],i.isArray(u)&&(e=u[1],u=n[r]=u[0]),r!==f&&(n[f]=u,delete n[r]),o=i.cssHooks[f],o&&"expand"in o){u=o.expand(u);delete n[f];for(r in u)r in n||(n[r]=u[r],t[r]=e)}else t[f]=e}function rf(n,t,r){var e,o,s=0,l=bt.length,f=i.Deferred().always(function(){delete c.elem}),c=function(){if(o)return!1;for(var s=rt||nf(),t=Math.max(0,u.startTime+u.duration-s),h=t/u.duration||0,i=1-h,r=0,e=u.tweens.length;r<e;r++)u.tweens[r].run(i);return f.notifyWith(n,[u,i,t]),i<1&&e?t:(f.resolveWith(n,[u]),!1)},u=f.promise({elem:n,props:i.extend({},t),opts:i.extend(!0,{specialEasing:{}},r),originalProperties:t,originalOptions:r,startTime:rt||nf(),duration:r.duration,tweens:[],createTween:function(t,r){var f=i.Tween(n,u.opts,t,r,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(f),f},stop:function(t){var i=0,r=t?u.tweens.length:0;if(o)return this;for(o=!0;i<r;i++)u.tweens[i].run(1);return t?f.resolveWith(n,[u,t]):f.rejectWith(n,[u,t]),this}}),h=u.props;for(eo(h,u.opts.specialEasing);s<l;s++)if(e=bt[s].call(u,n,h,u.opts),e)return e;return i.map(h,tf,u),i.isFunction(u.opts.start)&&u.opts.start.call(n,u),i.fx.timer(i.extend(c,{elem:n,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function af(n){return function(t,r){typeof t!="string"&&(r=t,t="*");var u,f=0,e=t.toLowerCase().match(h)||[];if(i.isFunction(r))while(u=e[f++])u.charAt(0)==="+"?(u=u.slice(1)||"*",(n[u]=n[u]||[]).unshift(r)):(n[u]=n[u]||[]).push(r)}}function vf(n,t,r,u){function e(s){var h;return f[s]=!0,i.each(n[s]||[],function(n,i){var s=i(t,r,u);if(typeof s!="string"||o||f[s]){if(o)return!(h=s)}else return t.dataTypes.unshift(s),e(s),!1}),h}var f={},o=n===bi;return e(t.dataTypes[0])||!f["*"]&&e("*")}function ki(n,t){var u,r,f=i.ajaxSettings.flatOptions||{};for(r in t)t[r]!==undefined&&((f[r]?n:u||(u={}))[r]=t[r]);return u&&i.extend(!0,n,u),n}function ao(n,t,i){for(var o,e,u,f,s=n.contents,r=n.dataTypes;r[0]==="*";)r.shift(),e===undefined&&(e=n.mimeType||t.getResponseHeader("Content-Type"));if(e)for(f in s)if(s[f]&&s[f].test(e)){r.unshift(f);break}if(r[0]in i)u=r[0];else{for(f in i){if(!r[0]||n.converters[f+" "+r[0]]){u=f;break}o||(o=f)}u=u||o}if(u)return u!==r[0]&&r.unshift(u),i[u]}function vo(n,t,i,r){var h,u,f,s,e,o={},c=n.dataTypes.slice();if(c[1])for(f in n.converters)o[f.toLowerCase()]=n.converters[f];for(u=c.shift();u;)if(n.responseFields[u]&&(i[n.responseFields[u]]=t),!e&&r&&n.dataFilter&&(t=n.dataFilter(t,n.dataType)),e=u,u=c.shift(),u)if(u==="*")u=e;else if(e!=="*"&&e!==u){if(f=o[e+" "+u]||o["* "+u],!f)for(h in o)if(s=h.split(" "),s[1]===u&&(f=o[e+" "+s[0]]||o["* "+s[0]],f)){f===!0?f=o[h]:o[h]!==!0&&(u=s[0],c.unshift(s[1]));break}if(f!==!0)if(f&&n.throws)t=f(t);else try{t=f(t)}catch(l){return{state:"parsererror",error:f?l:"No conversion from "+e+" to "+u}}}return{state:"success",data:t}}function di(n,t,r,u){var f;if(i.isArray(t))i.each(t,function(t,i){r||po.test(n)?u(n,i):di(n+"["+(typeof i=="object"?t:"")+"]",i,r,u)});else if(r||i.type(t)!=="object")u(n,t);else for(f in t)di(n+"["+f+"]",t[f],r,u)}function pf(){try{return new n.XMLHttpRequest}catch(t){}}function go(){try{return new n.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function wf(n){return i.isWindow(n)?n:n.nodeType===9?n.defaultView||n.parentWindow:!1}var c=[],l=c.slice,ir=c.concat,ii=c.push,rr=c.indexOf,ct={},df=ct.toString,tt=ct.hasOwnProperty,r={},ur="1.11.3",i=function(n,t){return new i.fn.init(n,t)},gf=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ne=/^-ms-/,te=/-([\da-z])/gi,ie=function(n,t){return t.toUpperCase()},p,or,sr,h,fi,lt,o,lr,ar,vr,ot,ai,uf,ef,of,gt,gi,ti,nr,tr,bf,kf;i.fn=i.prototype={jquery:ur,constructor:i,selector:"",length:0,toArray:function(){return l.call(this)},get:function(n){return n!=null?n<0?this[n+this.length]:this[n]:l.call(this)},pushStack:function(n){var t=i.merge(this.constructor(),n);return t.prevObject=this,t.context=this.context,t},each:function(n,t){return i.each(this,n,t)},map:function(n){return this.pushStack(i.map(this,function(t,i){return n.call(t,i,t)}))},slice:function(){return this.pushStack(l.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(n){var i=this.length,t=+n+(n<0?i:0);return this.pushStack(t>=0&&t<i?[this[t]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:ii,sort:c.sort,splice:c.splice};i.extend=i.fn.extend=function(){var r,e,t,f,o,s,n=arguments[0]||{},u=1,c=arguments.length,h=!1;for(typeof n=="boolean"&&(h=n,n=arguments[u]||{},u++),typeof n=="object"||i.isFunction(n)||(n={}),u===c&&(n=this,u--);u<c;u++)if((o=arguments[u])!=null)for(f in o)(r=n[f],t=o[f],n!==t)&&(h&&t&&(i.isPlainObject(t)||(e=i.isArray(t)))?(e?(e=!1,s=r&&i.isArray(r)?r:[]):s=r&&i.isPlainObject(r)?r:{},n[f]=i.extend(h,s,t)):t!==undefined&&(n[f]=t));return n};i.extend({expando:"jQuery"+(ur+Math.random()).replace(/\D/g,""),isReady:!0,error:function(n){throw new Error(n);},noop:function(){},isFunction:function(n){return i.type(n)==="function"},isArray:Array.isArray||function(n){return i.type(n)==="array"},isWindow:function(n){return n!=null&&n==n.window},isNumeric:function(n){return!i.isArray(n)&&n-parseFloat(n)+1>=0},isEmptyObject:function(n){for(var t in n)return!1;return!0},isPlainObject:function(n){var t;if(!n||i.type(n)!=="object"||n.nodeType||i.isWindow(n))return!1;try{if(n.constructor&&!tt.call(n,"constructor")&&!tt.call(n.constructor.prototype,"isPrototypeOf"))return!1}catch(u){return!1}if(r.ownLast)for(t in n)return tt.call(n,t);for(t in n);return t===undefined||tt.call(n,t)},type:function(n){return n==null?n+"":typeof n=="object"||typeof n=="function"?ct[df.call(n)]||"object":typeof n},globalEval:function(t){t&&i.trim(t)&&(n.execScript||function(t){n.eval.call(n,t)})(t)},camelCase:function(n){return n.replace(ne,"ms-").replace(te,ie)},nodeName:function(n,t){return n.nodeName&&n.nodeName.toLowerCase()===t.toLowerCase()},each:function(n,t,i){var u,r=0,f=n.length,e=ri(n);if(i){if(e){for(;r<f;r++)if(u=t.apply(n[r],i),u===!1)break}else for(r in n)if(u=t.apply(n[r],i),u===!1)break}else if(e){for(;r<f;r++)if(u=t.call(n[r],r,n[r]),u===!1)break}else for(r in n)if(u=t.call(n[r],r,n[r]),u===!1)break;return n},trim:function(n){return n==null?"":(n+"").replace(gf,"")},makeArray:function(n,t){var r=t||[];return n!=null&&(ri(Object(n))?i.merge(r,typeof n=="string"?[n]:n):ii.call(r,n)),r},inArray:function(n,t,i){var r;if(t){if(rr)return rr.call(t,n,i);for(r=t.length,i=i?i<0?Math.max(0,r+i):i:0;i<r;i++)if(i in t&&t[i]===n)return i}return-1},merge:function(n,t){for(var r=+t.length,i=0,u=n.length;i<r;)n[u++]=t[i++];if(r!==r)while(t[i]!==undefined)n[u++]=t[i++];return n.length=u,n},grep:function(n,t,i){for(var u,f=[],r=0,e=n.length,o=!i;r<e;r++)u=!t(n[r],r),u!==o&&f.push(n[r]);return f},map:function(n,t,i){var u,r=0,e=n.length,o=ri(n),f=[];if(o)for(;r<e;r++)u=t(n[r],r,i),u!=null&&f.push(u);else for(r in n)u=t(n[r],r,i),u!=null&&f.push(u);return ir.apply([],f)},guid:1,proxy:function(n,t){var u,r,f;return(typeof t=="string"&&(f=n[t],t=n,n=f),!i.isFunction(n))?undefined:(u=l.call(arguments,2),r=function(){return n.apply(t||this,u.concat(l.call(arguments)))},r.guid=n.guid=n.guid||i.guid++,r)},now:function(){return+new Date},support:r});i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(n,t){ct["[object "+t+"]"]=t.toLowerCase()});p=function(n){function r(n,t,i,r){var p,s,a,c,w,y,d,v,nt,g;if((t?t.ownerDocument||t:h)!==o&&k(t),t=t||o,i=i||[],c=t.nodeType,typeof n!="string"||!n||c!==1&&c!==9&&c!==11)return i;if(!r&&l){if(c!==11&&(p=hr.exec(n)))if(a=p[1]){if(c===9)if(s=t.getElementById(a),s&&s.parentNode){if(s.id===a)return i.push(s),i}else return i;else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&et(t,s)&&s.id===a)return i.push(s),i}else{if(p[2])return b.apply(i,t.getElementsByTagName(n)),i;if((a=p[3])&&u.getElementsByClassName)return b.apply(i,t.getElementsByClassName(a)),i}if(u.qsa&&(!e||!e.test(n))){if(v=d=f,nt=t,g=c!==1&&n,c===1&&t.nodeName.toLowerCase()!=="object"){for(y=ft(n),(d=t.getAttribute("id"))?v=d.replace(cr,"\\$&"):t.setAttribute("id",v),v="[id='"+v+"'] ",w=y.length;w--;)y[w]=v+vt(y[w]);nt=dt.test(n)&&ti(t.parentNode)||t;g=y.join(",")}if(g)try{return b.apply(i,nt.querySelectorAll(g)),i}catch(tt){}finally{d||t.removeAttribute("id")}}}return oi(n.replace(lt,"$1"),t,i,r)}function gt(){function n(r,u){return i.push(r+" ")>t.cacheLength&&delete n[i.shift()],n[r+" "]=u}var i=[];return n}function c(n){return n[f]=!0,n}function v(n){var t=o.createElement("div");try{return!!n(t)}catch(i){return!1}finally{t.parentNode&&t.parentNode.removeChild(t);t=null}}function ni(n,i){for(var u=n.split("|"),r=n.length;r--;)t.attrHandle[u[r]]=i}function wi(n,t){var i=t&&n,r=i&&n.nodeType===1&&t.nodeType===1&&(~t.sourceIndex||li)-(~n.sourceIndex||li);if(r)return r;if(i)while(i=i.nextSibling)if(i===t)return-1;return n?1:-1}function lr(n){return function(t){var i=t.nodeName.toLowerCase();return i==="input"&&t.type===n}}function ar(n){return function(t){var i=t.nodeName.toLowerCase();return(i==="input"||i==="button")&&t.type===n}}function tt(n){return c(function(t){return t=+t,c(function(i,r){for(var u,f=n([],i.length,t),e=f.length;e--;)i[u=f[e]]&&(i[u]=!(r[u]=i[u]))})})}function ti(n){return n&&typeof n.getElementsByTagName!="undefined"&&n}function bi(){}function vt(n){for(var t=0,r=n.length,i="";t<r;t++)i+=n[t].value;return i}function ii(n,t,i){var r=t.dir,u=i&&r==="parentNode",e=ki++;return t.first?function(t,i,f){while(t=t[r])if(t.nodeType===1||u)return n(t,i,f)}:function(t,i,o){var s,h,c=[a,e];if(o){while(t=t[r])if((t.nodeType===1||u)&&n(t,i,o))return!0}else while(t=t[r])if(t.nodeType===1||u){if(h=t[f]||(t[f]={}),(s=h[r])&&s[0]===a&&s[1]===e)return c[2]=s[2];if(h[r]=c,c[2]=n(t,i,o))return!0}}}function ri(n){return n.length>1?function(t,i,r){for(var u=n.length;u--;)if(!n[u](t,i,r))return!1;return!0}:n[0]}function vr(n,t,i){for(var u=0,f=t.length;u<f;u++)r(n,t[u],i);return i}function yt(n,t,i,r,u){for(var e,o=[],f=0,s=n.length,h=t!=null;f<s;f++)(e=n[f])&&(!i||i(e,r,u))&&(o.push(e),h&&t.push(f));return o}function ui(n,t,i,r,u,e){return r&&!r[f]&&(r=ui(r)),u&&!u[f]&&(u=ui(u,e)),c(function(f,e,o,s){var l,c,a,p=[],y=[],w=e.length,k=f||vr(t||"*",o.nodeType?[o]:o,[]),v=n&&(f||!t)?yt(k,p,n,o,s):k,h=i?u||(f?n:w||r)?[]:e:v;if(i&&i(v,h,o,s),r)for(l=yt(h,y),r(l,[],o,s),c=l.length;c--;)(a=l[c])&&(h[y[c]]=!(v[y[c]]=a));if(f){if(u||n){if(u){for(l=[],c=h.length;c--;)(a=h[c])&&l.push(v[c]=a);u(null,h=[],l,s)}for(c=h.length;c--;)(a=h[c])&&(l=u?nt(f,a):p[c])>-1&&(f[l]=!(e[l]=a))}}else h=yt(h===e?h.splice(w,h.length):h),u?u(null,e,h,s):b.apply(e,h)})}function fi(n){for(var o,u,r,s=n.length,h=t.relative[n[0].type],c=h||t.relative[" "],i=h?1:0,l=ii(function(n){return n===o},c,!0),a=ii(function(n){return nt(o,n)>-1},c,!0),e=[function(n,t,i){var r=!h&&(i||t!==ht)||((o=t).nodeType?l(n,t,i):a(n,t,i));return o=null,r}];i<s;i++)if(u=t.relative[n[i].type])e=[ii(ri(e),u)];else{if(u=t.filter[n[i].type].apply(null,n[i].matches),u[f]){for(r=++i;r<s;r++)if(t.relative[n[r].type])break;return ui(i>1&&ri(e),i>1&&vt(n.slice(0,i-1).concat({value:n[i-2].type===" "?"*":""})).replace(lt,"$1"),u,i<r&&fi(n.slice(i,r)),r<s&&fi(n=n.slice(r)),r<s&&vt(n))}e.push(u)}return ri(e)}function yr(n,i){var u=i.length>0,f=n.length>0,e=function(e,s,h,c,l){var y,d,w,k=0,v="0",g=e&&[],p=[],nt=ht,tt=e||f&&t.find.TAG("*",l),it=a+=nt==null?1:Math.random()||.1,rt=tt.length;for(l&&(ht=s!==o&&s);v!==rt&&(y=tt[v])!=null;v++){if(f&&y){for(d=0;w=n[d++];)if(w(y,s,h)){c.push(y);break}l&&(a=it)}u&&((y=!w&&y)&&k--,e&&g.push(y))}if(k+=v,u&&v!==k){for(d=0;w=i[d++];)w(g,p,s,h);if(e){if(k>0)while(v--)g[v]||p[v]||(p[v]=gi.call(c));p=yt(p)}b.apply(c,p);l&&!e&&p.length>0&&k+i.length>1&&r.uniqueSort(c)}return l&&(a=it,ht=nt),g};return u?c(e):e}var it,u,t,st,ei,ft,pt,oi,ht,w,rt,k,o,s,l,e,d,ct,et,f="sizzle"+1*new Date,h=n.document,a=0,ki=0,si=gt(),hi=gt(),ci=gt(),wt=function(n,t){return n===t&&(rt=!0),0},li=-2147483648,di={}.hasOwnProperty,g=[],gi=g.pop,nr=g.push,b=g.push,ai=g.slice,nt=function(n,t){for(var i=0,r=n.length;i<r;i++)if(n[i]===t)return i;return-1},bt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",i="[\\x20\\t\\r\\n\\f]",ut="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",vi=ut.replace("w","w#"),yi="\\["+i+"*("+ut+")(?:"+i+"*([*^$|!~]?=)"+i+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+vi+"))|)"+i+"*\\]",kt=":("+ut+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+yi+")*)|.*)\\)|)",tr=new RegExp(i+"+","g"),lt=new RegExp("^"+i+"+|((?:^|[^\\\\])(?:\\\\.)*)"+i+"+$","g"),ir=new RegExp("^"+i+"*,"+i+"*"),rr=new RegExp("^"+i+"*([>+~]|"+i+")"+i+"*"),ur=new RegExp("="+i+"*([^\\]'\"]*?)"+i+"*\\]","g"),fr=new RegExp(kt),er=new RegExp("^"+vi+"$"),at={ID:new RegExp("^#("+ut+")"),CLASS:new RegExp("^\\.("+ut+")"),TAG:new RegExp("^("+ut.replace("w","w*")+")"),ATTR:new RegExp("^"+yi),PSEUDO:new RegExp("^"+kt),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+i+"*(even|odd|(([+-]|)(\\d*)n|)"+i+"*(?:([+-]|)"+i+"*(\\d+)|))"+i+"*\\)|)","i"),bool:new RegExp("^(?:"+bt+")$","i"),needsContext:new RegExp("^"+i+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+i+"*((?:-\\d)?\\d*)"+i+"*\\)|)(?=[^-]|$)","i")},or=/^(?:input|select|textarea|button)$/i,sr=/^h\d$/i,ot=/^[^{]+\{\s*\[native \w/,hr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,dt=/[+~]/,cr=/'|\\/g,y=new RegExp("\\\\([\\da-f]{1,6}"+i+"?|("+i+")|.)","ig"),p=function(n,t,i){var r="0x"+t-65536;return r!==r||i?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,r&1023|56320)},pi=function(){k()};try{b.apply(g=ai.call(h.childNodes),h.childNodes);g[h.childNodes.length].nodeType}catch(pr){b={apply:g.length?function(n,t){nr.apply(n,ai.call(t))}:function(n,t){for(var i=n.length,r=0;n[i++]=t[r++];);n.length=i-1}}}u=r.support={};ei=r.isXML=function(n){var t=n&&(n.ownerDocument||n).documentElement;return t?t.nodeName!=="HTML":!1};k=r.setDocument=function(n){var a,c,r=n?n.ownerDocument||n:h;return r===o||r.nodeType!==9||!r.documentElement?o:(o=r,s=r.documentElement,c=r.defaultView,c&&c!==c.top&&(c.addEventListener?c.addEventListener("unload",pi,!1):c.attachEvent&&c.attachEvent("onunload",pi)),l=!ei(r),u.attributes=v(function(n){return n.className="i",!n.getAttribute("className")}),u.getElementsByTagName=v(function(n){return n.appendChild(r.createComment("")),!n.getElementsByTagName("*").length}),u.getElementsByClassName=ot.test(r.getElementsByClassName),u.getById=v(function(n){return s.appendChild(n).id=f,!r.getElementsByName||!r.getElementsByName(f).length}),u.getById?(t.find.ID=function(n,t){if(typeof t.getElementById!="undefined"&&l){var i=t.getElementById(n);return i&&i.parentNode?[i]:[]}},t.filter.ID=function(n){var t=n.replace(y,p);return function(n){return n.getAttribute("id")===t}}):(delete t.find.ID,t.filter.ID=function(n){var t=n.replace(y,p);return function(n){var i=typeof n.getAttributeNode!="undefined"&&n.getAttributeNode("id");return i&&i.value===t}}),t.find.TAG=u.getElementsByTagName?function(n,t){return typeof t.getElementsByTagName!="undefined"?t.getElementsByTagName(n):u.qsa?t.querySelectorAll(n):void 0}:function(n,t){var i,r=[],f=0,u=t.getElementsByTagName(n);if(n==="*"){while(i=u[f++])i.nodeType===1&&r.push(i);return r}return u},t.find.CLASS=u.getElementsByClassName&&function(n,t){if(l)return t.getElementsByClassName(n)},d=[],e=[],(u.qsa=ot.test(r.querySelectorAll))&&(v(function(n){s.appendChild(n).innerHTML="<a id='"+f+"'><\/a><select id='"+f+"-\f]' msallowcapture=''><option selected=''><\/option><\/select>";n.querySelectorAll("[msallowcapture^='']").length&&e.push("[*^$]="+i+"*(?:''|\"\")");n.querySelectorAll("[selected]").length||e.push("\\["+i+"*(?:value|"+bt+")");n.querySelectorAll("[id~="+f+"-]").length||e.push("~=");n.querySelectorAll(":checked").length||e.push(":checked");n.querySelectorAll("a#"+f+"+*").length||e.push(".#.+[+~]")}),v(function(n){var t=r.createElement("input");t.setAttribute("type","hidden");n.appendChild(t).setAttribute("name","D");n.querySelectorAll("[name=d]").length&&e.push("name"+i+"*[*^$|!~]?=");n.querySelectorAll(":enabled").length||e.push(":enabled",":disabled");n.querySelectorAll("*,:x");e.push(",.*:")})),(u.matchesSelector=ot.test(ct=s.matches||s.webkitMatchesSelector||s.mozMatchesSelector||s.oMatchesSelector||s.msMatchesSelector))&&v(function(n){u.disconnectedMatch=ct.call(n,"div");ct.call(n,"[s!='']:x");d.push("!=",kt)}),e=e.length&&new RegExp(e.join("|")),d=d.length&&new RegExp(d.join("|")),a=ot.test(s.compareDocumentPosition),et=a||ot.test(s.contains)?function(n,t){var r=n.nodeType===9?n.documentElement:n,i=t&&t.parentNode;return n===i||!!(i&&i.nodeType===1&&(r.contains?r.contains(i):n.compareDocumentPosition&&n.compareDocumentPosition(i)&16))}:function(n,t){if(t)while(t=t.parentNode)if(t===n)return!0;return!1},wt=a?function(n,t){if(n===t)return rt=!0,0;var i=!n.compareDocumentPosition-!t.compareDocumentPosition;return i?i:(i=(n.ownerDocument||n)===(t.ownerDocument||t)?n.compareDocumentPosition(t):1,i&1||!u.sortDetached&&t.compareDocumentPosition(n)===i)?n===r||n.ownerDocument===h&&et(h,n)?-1:t===r||t.ownerDocument===h&&et(h,t)?1:w?nt(w,n)-nt(w,t):0:i&4?-1:1}:function(n,t){if(n===t)return rt=!0,0;var i,u=0,o=n.parentNode,s=t.parentNode,f=[n],e=[t];if(o&&s){if(o===s)return wi(n,t)}else return n===r?-1:t===r?1:o?-1:s?1:w?nt(w,n)-nt(w,t):0;for(i=n;i=i.parentNode;)f.unshift(i);for(i=t;i=i.parentNode;)e.unshift(i);while(f[u]===e[u])u++;return u?wi(f[u],e[u]):f[u]===h?-1:e[u]===h?1:0},r)};r.matches=function(n,t){return r(n,null,null,t)};r.matchesSelector=function(n,t){if((n.ownerDocument||n)!==o&&k(n),t=t.replace(ur,"='$1']"),u.matchesSelector&&l&&(!d||!d.test(t))&&(!e||!e.test(t)))try{var i=ct.call(n,t);if(i||u.disconnectedMatch||n.document&&n.document.nodeType!==11)return i}catch(f){}return r(t,o,null,[n]).length>0};r.contains=function(n,t){return(n.ownerDocument||n)!==o&&k(n),et(n,t)};r.attr=function(n,i){(n.ownerDocument||n)!==o&&k(n);var f=t.attrHandle[i.toLowerCase()],r=f&&di.call(t.attrHandle,i.toLowerCase())?f(n,i,!l):undefined;return r!==undefined?r:u.attributes||!l?n.getAttribute(i):(r=n.getAttributeNode(i))&&r.specified?r.value:null};r.error=function(n){throw new Error("Syntax error, unrecognized expression: "+n);};r.uniqueSort=function(n){var r,f=[],t=0,i=0;if(rt=!u.detectDuplicates,w=!u.sortStable&&n.slice(0),n.sort(wt),rt){while(r=n[i++])r===n[i]&&(t=f.push(i));while(t--)n.splice(f[t],1)}return w=null,n};st=r.getText=function(n){var r,i="",u=0,t=n.nodeType;if(t){if(t===1||t===9||t===11){if(typeof n.textContent=="string")return n.textContent;for(n=n.firstChild;n;n=n.nextSibling)i+=st(n)}else if(t===3||t===4)return n.nodeValue}else while(r=n[u++])i+=st(r);return i};t=r.selectors={cacheLength:50,createPseudo:c,match:at,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(n){return n[1]=n[1].replace(y,p),n[3]=(n[3]||n[4]||n[5]||"").replace(y,p),n[2]==="~="&&(n[3]=" "+n[3]+" "),n.slice(0,4)},CHILD:function(n){return n[1]=n[1].toLowerCase(),n[1].slice(0,3)==="nth"?(n[3]||r.error(n[0]),n[4]=+(n[4]?n[5]+(n[6]||1):2*(n[3]==="even"||n[3]==="odd")),n[5]=+(n[7]+n[8]||n[3]==="odd")):n[3]&&r.error(n[0]),n},PSEUDO:function(n){var i,t=!n[6]&&n[2];return at.CHILD.test(n[0])?null:(n[3]?n[2]=n[4]||n[5]||"":t&&fr.test(t)&&(i=ft(t,!0))&&(i=t.indexOf(")",t.length-i)-t.length)&&(n[0]=n[0].slice(0,i),n[2]=t.slice(0,i)),n.slice(0,3))}},filter:{TAG:function(n){var t=n.replace(y,p).toLowerCase();return n==="*"?function(){return!0}:function(n){return n.nodeName&&n.nodeName.toLowerCase()===t}},CLASS:function(n){var t=si[n+" "];return t||(t=new RegExp("(^|"+i+")"+n+"("+i+"|$)"))&&si(n,function(n){return t.test(typeof n.className=="string"&&n.className||typeof n.getAttribute!="undefined"&&n.getAttribute("class")||"")})},ATTR:function(n,t,i){return function(u){var f=r.attr(u,n);return f==null?t==="!=":t?(f+="",t==="="?f===i:t==="!="?f!==i:t==="^="?i&&f.indexOf(i)===0:t==="*="?i&&f.indexOf(i)>-1:t==="$="?i&&f.slice(-i.length)===i:t==="~="?(" "+f.replace(tr," ")+" ").indexOf(i)>-1:t==="|="?f===i||f.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(n,t,i,r,u){var s=n.slice(0,3)!=="nth",o=n.slice(-4)!=="last",e=t==="of-type";return r===1&&u===0?function(n){return!!n.parentNode}:function(t,i,h){var v,k,c,l,y,w,b=s!==o?"nextSibling":"previousSibling",p=t.parentNode,g=e&&t.nodeName.toLowerCase(),d=!h&&!e;if(p){if(s){while(b){for(c=t;c=c[b];)if(e?c.nodeName.toLowerCase()===g:c.nodeType===1)return!1;w=b=n==="only"&&!w&&"nextSibling"}return!0}if(w=[o?p.firstChild:p.lastChild],o&&d){for(k=p[f]||(p[f]={}),v=k[n]||[],y=v[0]===a&&v[1],l=v[0]===a&&v[2],c=y&&p.childNodes[y];c=++y&&c&&c[b]||(l=y=0)||w.pop();)if(c.nodeType===1&&++l&&c===t){k[n]=[a,y,l];break}}else if(d&&(v=(t[f]||(t[f]={}))[n])&&v[0]===a)l=v[1];else while(c=++y&&c&&c[b]||(l=y=0)||w.pop())if((e?c.nodeName.toLowerCase()===g:c.nodeType===1)&&++l&&(d&&((c[f]||(c[f]={}))[n]=[a,l]),c===t))break;return l-=u,l===r||l%r==0&&l/r>=0}}},PSEUDO:function(n,i){var e,u=t.pseudos[n]||t.setFilters[n.toLowerCase()]||r.error("unsupported pseudo: "+n);return u[f]?u(i):u.length>1?(e=[n,n,"",i],t.setFilters.hasOwnProperty(n.toLowerCase())?c(function(n,t){for(var r,f=u(n,i),e=f.length;e--;)r=nt(n,f[e]),n[r]=!(t[r]=f[e])}):function(n){return u(n,0,e)}):u}},pseudos:{not:c(function(n){var t=[],r=[],i=pt(n.replace(lt,"$1"));return i[f]?c(function(n,t,r,u){for(var e,o=i(n,null,u,[]),f=n.length;f--;)(e=o[f])&&(n[f]=!(t[f]=e))}):function(n,u,f){return t[0]=n,i(t,null,f,r),t[0]=null,!r.pop()}}),has:c(function(n){return function(t){return r(n,t).length>0}}),contains:c(function(n){return n=n.replace(y,p),function(t){return(t.textContent||t.innerText||st(t)).indexOf(n)>-1}}),lang:c(function(n){return er.test(n||"")||r.error("unsupported lang: "+n),n=n.replace(y,p).toLowerCase(),function(t){var i;do if(i=l?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return i=i.toLowerCase(),i===n||i.indexOf(n+"-")===0;while((t=t.parentNode)&&t.nodeType===1);return!1}}),target:function(t){var i=n.location&&n.location.hash;return i&&i.slice(1)===t.id},root:function(n){return n===s},focus:function(n){return n===o.activeElement&&(!o.hasFocus||o.hasFocus())&&!!(n.type||n.href||~n.tabIndex)},enabled:function(n){return n.disabled===!1},disabled:function(n){return n.disabled===!0},checked:function(n){var t=n.nodeName.toLowerCase();return t==="input"&&!!n.checked||t==="option"&&!!n.selected},selected:function(n){return n.parentNode&&n.parentNode.selectedIndex,n.selected===!0},empty:function(n){for(n=n.firstChild;n;n=n.nextSibling)if(n.nodeType<6)return!1;return!0},parent:function(n){return!t.pseudos.empty(n)},header:function(n){return sr.test(n.nodeName)},input:function(n){return or.test(n.nodeName)},button:function(n){var t=n.nodeName.toLowerCase();return t==="input"&&n.type==="button"||t==="button"},text:function(n){var t;return n.nodeName.toLowerCase()==="input"&&n.type==="text"&&((t=n.getAttribute("type"))==null||t.toLowerCase()==="text")},first:tt(function(){return[0]}),last:tt(function(n,t){return[t-1]}),eq:tt(function(n,t,i){return[i<0?i+t:i]}),even:tt(function(n,t){for(var i=0;i<t;i+=2)n.push(i);return n}),odd:tt(function(n,t){for(var i=1;i<t;i+=2)n.push(i);return n}),lt:tt(function(n,t,i){for(var r=i<0?i+t:i;--r>=0;)n.push(r);return n}),gt:tt(function(n,t,i){for(var r=i<0?i+t:i;++r<t;)n.push(r);return n})}};t.pseudos.nth=t.pseudos.eq;for(it in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})t.pseudos[it]=lr(it);for(it in{submit:!0,reset:!0})t.pseudos[it]=ar(it);return bi.prototype=t.filters=t.pseudos,t.setFilters=new bi,ft=r.tokenize=function(n,i){var e,f,s,o,u,h,c,l=hi[n+" "];if(l)return i?0:l.slice(0);for(u=n,h=[],c=t.preFilter;u;){(!e||(f=ir.exec(u)))&&(f&&(u=u.slice(f[0].length)||u),h.push(s=[]));e=!1;(f=rr.exec(u))&&(e=f.shift(),s.push({value:e,type:f[0].replace(lt," ")}),u=u.slice(e.length));for(o in t.filter)(f=at[o].exec(u))&&(!c[o]||(f=c[o](f)))&&(e=f.shift(),s.push({value:e,type:o,matches:f}),u=u.slice(e.length));if(!e)break}return i?u.length:u?r.error(n):hi(n,h).slice(0)},pt=r.compile=function(n,t){var r,u=[],e=[],i=ci[n+" "];if(!i){for(t||(t=ft(n)),r=t.length;r--;)i=fi(t[r]),i[f]?u.push(i):e.push(i);i=ci(n,yr(e,u));i.selector=n}return i},oi=r.select=function(n,i,r,f){var s,e,o,a,v,c=typeof n=="function"&&n,h=!f&&ft(n=c.selector||n);if(r=r||[],h.length===1){if(e=h[0]=h[0].slice(0),e.length>2&&(o=e[0]).type==="ID"&&u.getById&&i.nodeType===9&&l&&t.relative[e[1].type]){if(i=(t.find.ID(o.matches[0].replace(y,p),i)||[])[0],i)c&&(i=i.parentNode);else return r;n=n.slice(e.shift().value.length)}for(s=at.needsContext.test(n)?0:e.length;s--;){if(o=e[s],t.relative[a=o.type])break;if((v=t.find[a])&&(f=v(o.matches[0].replace(y,p),dt.test(e[0].type)&&ti(i.parentNode)||i))){if(e.splice(s,1),n=f.length&&vt(e),!n)return b.apply(r,f),r;break}}}return(c||pt(n,h))(f,i,!l,r,dt.test(n)&&ti(i.parentNode)||i),r},u.sortStable=f.split("").sort(wt).join("")===f,u.detectDuplicates=!!rt,k(),u.sortDetached=v(function(n){return n.compareDocumentPosition(o.createElement("div"))&1}),v(function(n){return n.innerHTML="<a href='#'><\/a>",n.firstChild.getAttribute("href")==="#"})||ni("type|href|height|width",function(n,t,i){if(!i)return n.getAttribute(t,t.toLowerCase()==="type"?1:2)}),u.attributes&&v(function(n){return n.innerHTML="<input/>",n.firstChild.setAttribute("value",""),n.firstChild.getAttribute("value")===""})||ni("value",function(n,t,i){if(!i&&n.nodeName.toLowerCase()==="input")return n.defaultValue}),v(function(n){return n.getAttribute("disabled")==null})||ni(bt,function(n,t,i){var r;if(!i)return n[t]===!0?t.toLowerCase():(r=n.getAttributeNode(t))&&r.specified?r.value:null}),r}(n);i.find=p;i.expr=p.selectors;i.expr[":"]=i.expr.pseudos;i.unique=p.uniqueSort;i.text=p.getText;i.isXMLDoc=p.isXML;i.contains=p.contains;var fr=i.expr.match.needsContext,er=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,re=/^.[^:#\[\.,]*$/;i.filter=function(n,t,r){var u=t[0];return r&&(n=":not("+n+")"),t.length===1&&u.nodeType===1?i.find.matchesSelector(u,n)?[u]:[]:i.find.matches(n,i.grep(t,function(n){return n.nodeType===1}))};i.fn.extend({find:function(n){var t,r=[],u=this,f=u.length;if(typeof n!="string")return this.pushStack(i(n).filter(function(){for(t=0;t<f;t++)if(i.contains(u[t],this))return!0}));for(t=0;t<f;t++)i.find(n,u[t],r);return r=this.pushStack(f>1?i.unique(r):r),r.selector=this.selector?this.selector+" "+n:n,r},filter:function(n){return this.pushStack(ui(this,n||[],!1))},not:function(n){return this.pushStack(ui(this,n||[],!0))},is:function(n){return!!ui(this,typeof n=="string"&&fr.test(n)?i(n):n||[],!1).length}});var ft,u=n.document,ue=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,fe=i.fn.init=function(n,t){var r,f;if(!n)return this;if(typeof n=="string"){if(r=n.charAt(0)==="<"&&n.charAt(n.length-1)===">"&&n.length>=3?[null,n,null]:ue.exec(n),r&&(r[1]||!t)){if(r[1]){if(t=t instanceof i?t[0]:t,i.merge(this,i.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:u,!0)),er.test(r[1])&&i.isPlainObject(t))for(r in t)i.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}if(f=u.getElementById(r[2]),f&&f.parentNode){if(f.id!==r[2])return ft.find(n);this.length=1;this[0]=f}return this.context=u,this.selector=n,this}return!t||t.jquery?(t||ft).find(n):this.constructor(t).find(n)}return n.nodeType?(this.context=this[0]=n,this.length=1,this):i.isFunction(n)?typeof ft.ready!="undefined"?ft.ready(n):n(i):(n.selector!==undefined&&(this.selector=n.selector,this.context=n.context),i.makeArray(n,this))};fe.prototype=i.fn;ft=i(u);or=/^(?:parents|prev(?:Until|All))/;sr={children:!0,contents:!0,next:!0,prev:!0};i.extend({dir:function(n,t,r){for(var f=[],u=n[t];u&&u.nodeType!==9&&(r===undefined||u.nodeType!==1||!i(u).is(r));)u.nodeType===1&&f.push(u),u=u[t];return f},sibling:function(n,t){for(var i=[];n;n=n.nextSibling)n.nodeType===1&&n!==t&&i.push(n);return i}});i.fn.extend({has:function(n){var t,r=i(n,this),u=r.length;return this.filter(function(){for(t=0;t<u;t++)if(i.contains(this,r[t]))return!0})},closest:function(n,t){for(var r,f=0,o=this.length,u=[],e=fr.test(n)||typeof n!="string"?i(n,t||this.context):0;f<o;f++)for(r=this[f];r&&r!==t;r=r.parentNode)if(r.nodeType<11&&(e?e.index(r)>-1:r.nodeType===1&&i.find.matchesSelector(r,n))){u.push(r);break}return this.pushStack(u.length>1?i.unique(u):u)},index:function(n){return n?typeof n=="string"?i.inArray(this[0],i(n)):i.inArray(n.jquery?n[0]:n,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(n,t){return this.pushStack(i.unique(i.merge(this.get(),i(n,t))))},addBack:function(n){return this.add(n==null?this.prevObject:this.prevObject.filter(n))}});i.each({parent:function(n){var t=n.parentNode;return t&&t.nodeType!==11?t:null},parents:function(n){return i.dir(n,"parentNode")},parentsUntil:function(n,t,r){return i.dir(n,"parentNode",r)},next:function(n){return hr(n,"nextSibling")},prev:function(n){return hr(n,"previousSibling")},nextAll:function(n){return i.dir(n,"nextSibling")},prevAll:function(n){return i.dir(n,"previousSibling")},nextUntil:function(n,t,r){return i.dir(n,"nextSibling",r)},prevUntil:function(n,t,r){return i.dir(n,"previousSibling",r)},siblings:function(n){return i.sibling((n.parentNode||{}).firstChild,n)},children:function(n){return i.sibling(n.firstChild)},contents:function(n){return i.nodeName(n,"iframe")?n.contentDocument||n.contentWindow.document:i.merge([],n.childNodes)}},function(n,t){i.fn[n]=function(r,u){var f=i.map(this,t,r);return n.slice(-5)!=="Until"&&(u=r),u&&typeof u=="string"&&(f=i.filter(u,f)),this.length>1&&(sr[n]||(f=i.unique(f)),or.test(n)&&(f=f.reverse())),this.pushStack(f)}});h=/\S+/g;fi={};i.Callbacks=function(n){n=typeof n=="string"?fi[n]||ee(n):i.extend({},n);var o,u,h,f,e,c,t=[],r=!n.once&&[],l=function(i){for(u=n.memory&&i,h=!0,e=c||0,c=0,f=t.length,o=!0;t&&e<f;e++)if(t[e].apply(i[0],i[1])===!1&&n.stopOnFalse){u=!1;break}o=!1;t&&(r?r.length&&l(r.shift()):u?t=[]:s.disable())},s={add:function(){if(t){var r=t.length;(function e(r){i.each(r,function(r,u){var f=i.type(u);f==="function"?n.unique&&s.has(u)||t.push(u):u&&u.length&&f!=="string"&&e(u)})})(arguments);o?f=t.length:u&&(c=r,l(u))}return this},remove:function(){return t&&i.each(arguments,function(n,r){for(var u;(u=i.inArray(r,t,u))>-1;)t.splice(u,1),o&&(u<=f&&f--,u<=e&&e--)}),this},has:function(n){return n?i.inArray(n,t)>-1:!!(t&&t.length)},empty:function(){return t=[],f=0,this},disable:function(){return t=r=u=undefined,this},disabled:function(){return!t},lock:function(){return r=undefined,u||s.disable(),this},locked:function(){return!r},fireWith:function(n,i){return t&&(!h||r)&&(i=i||[],i=[n,i.slice?i.slice():i],o?r.push(i):l(i)),this},fire:function(){return s.fireWith(this,arguments),this},fired:function(){return!!h}};return s};i.extend({Deferred:function(n){var u=[["resolve","done",i.Callbacks("once memory"),"resolved"],["reject","fail",i.Callbacks("once memory"),"rejected"],["notify","progress",i.Callbacks("memory")]],f="pending",r={state:function(){return f},always:function(){return t.done(arguments).fail(arguments),this},then:function(){var n=arguments;return i.Deferred(function(f){i.each(u,function(u,e){var o=i.isFunction(n[u])&&n[u];t[e[1]](function(){var n=o&&o.apply(this,arguments);n&&i.isFunction(n.promise)?n.promise().done(f.resolve).fail(f.reject).progress(f.notify):f[e[0]+"With"](this===r?f.promise():this,o?[n]:arguments)})});n=null}).promise()},promise:function(n){return n!=null?i.extend(n,r):r}},t={};return r.pipe=r.then,i.each(u,function(n,i){var e=i[2],o=i[3];r[i[1]]=e.add;o&&e.add(function(){f=o},u[n^1][2].disable,u[2][2].lock);t[i[0]]=function(){return t[i[0]+"With"](this===t?r:this,arguments),this};t[i[0]+"With"]=e.fireWith}),r.promise(t),n&&n.call(t,t),t},when:function(n){var t=0,u=l.call(arguments),r=u.length,e=r!==1||n&&i.isFunction(n.promise)?r:0,f=e===1?n:i.Deferred(),h=function(n,t,i){return function(r){t[n]=this;i[n]=arguments.length>1?l.call(arguments):r;i===o?f.notifyWith(t,i):--e||f.resolveWith(t,i)}},o,c,s;if(r>1)for(o=new Array(r),c=new Array(r),s=new Array(r);t<r;t++)u[t]&&i.isFunction(u[t].promise)?u[t].promise().done(h(t,s,u)).fail(f.reject).progress(h(t,c,o)):--e;return e||f.resolveWith(s,u),f.promise()}});i.fn.ready=function(n){return i.ready.promise().done(n),this};i.extend({isReady:!1,readyWait:1,holdReady:function(n){n?i.readyWait++:i.ready(!0)},ready:function(n){if(n===!0?!--i.readyWait:!i.isReady){if(!u.body)return setTimeout(i.ready);(i.isReady=!0,n!==!0&&--i.readyWait>0)||(lt.resolveWith(u,[i]),i.fn.triggerHandler&&(i(u).triggerHandler("ready"),i(u).off("ready")))}}});i.ready.promise=function(t){if(!lt)if(lt=i.Deferred(),u.readyState==="complete")setTimeout(i.ready);else if(u.addEventListener)u.addEventListener("DOMContentLoaded",a,!1),n.addEventListener("load",a,!1);else{u.attachEvent("onreadystatechange",a);n.attachEvent("onload",a);var r=!1;try{r=n.frameElement==null&&u.documentElement}catch(e){}r&&r.doScroll&&function f(){if(!i.isReady){try{r.doScroll("left")}catch(n){return setTimeout(f,50)}cr();i.ready()}}()}return lt.promise(t)};o=typeof undefined;for(lr in i(r))break;r.ownLast=lr!=="0";r.inlineBlockNeedsLayout=!1;i(function(){var f,t,n,i;(n=u.getElementsByTagName("body")[0],n&&n.style)&&(t=u.createElement("div"),i=u.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(t),typeof t.style.zoom!==o&&(t.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",r.inlineBlockNeedsLayout=f=t.offsetWidth===3,f&&(n.style.zoom=1)),n.removeChild(i))}),function(){var n=u.createElement("div");if(r.deleteExpando==null){r.deleteExpando=!0;try{delete n.test}catch(t){r.deleteExpando=!1}}n=null}();i.acceptData=function(n){var t=i.noData[(n.nodeName+" ").toLowerCase()],r=+n.nodeType||1;return r!==1&&r!==9?!1:!t||t!==!0&&n.getAttribute("classid")===t};ar=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;vr=/([A-Z])/g;i.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(n){return n=n.nodeType?i.cache[n[i.expando]]:n[i.expando],!!n&&!ei(n)},data:function(n,t,i){return pr(n,t,i)},removeData:function(n,t){return wr(n,t)},_data:function(n,t,i){return pr(n,t,i,!0)},_removeData:function(n,t){return wr(n,t,!0)}});i.fn.extend({data:function(n,t){var f,u,e,r=this[0],o=r&&r.attributes;if(n===undefined){if(this.length&&(e=i.data(r),r.nodeType===1&&!i._data(r,"parsedAttrs"))){for(f=o.length;f--;)o[f]&&(u=o[f].name,u.indexOf("data-")===0&&(u=i.camelCase(u.slice(5)),yr(r,u,e[u])));i._data(r,"parsedAttrs",!0)}return e}return typeof n=="object"?this.each(function(){i.data(this,n)}):arguments.length>1?this.each(function(){i.data(this,n,t)}):r?yr(r,n,i.data(r,n)):undefined},removeData:function(n){return this.each(function(){i.removeData(this,n)})}});i.extend({queue:function(n,t,r){var u;if(n)return t=(t||"fx")+"queue",u=i._data(n,t),r&&(!u||i.isArray(r)?u=i._data(n,t,i.makeArray(r)):u.push(r)),u||[]},dequeue:function(n,t){t=t||"fx";var r=i.queue(n,t),e=r.length,u=r.shift(),f=i._queueHooks(n,t),o=function(){i.dequeue(n,t)};u==="inprogress"&&(u=r.shift(),e--);u&&(t==="fx"&&r.unshift("inprogress"),delete f.stop,u.call(n,o,f));!e&&f&&f.empty.fire()},_queueHooks:function(n,t){var r=t+"queueHooks";return i._data(n,r)||i._data(n,r,{empty:i.Callbacks("once memory").add(function(){i._removeData(n,t+"queue");i._removeData(n,r)})})}});i.fn.extend({queue:function(n,t){var r=2;return(typeof n!="string"&&(t=n,n="fx",r--),arguments.length<r)?i.queue(this[0],n):t===undefined?this:this.each(function(){var r=i.queue(this,n,t);i._queueHooks(this,n);n==="fx"&&r[0]!=="inprogress"&&i.dequeue(this,n)})},dequeue:function(n){return this.each(function(){i.dequeue(this,n)})},clearQueue:function(n){return this.queue(n||"fx",[])},promise:function(n,t){var r,f=1,e=i.Deferred(),u=this,o=this.length,s=function(){--f||e.resolveWith(u,[u])};for(typeof n!="string"&&(t=n,n=undefined),n=n||"fx";o--;)r=i._data(u[o],n+"queueHooks"),r&&r.empty&&(f++,r.empty.add(s));return s(),e.promise(t)}});var at=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=["Top","Right","Bottom","Left"],et=function(n,t){return n=t||n,i.css(n,"display")==="none"||!i.contains(n.ownerDocument,n)},b=i.access=function(n,t,r,u,f,e,o){var s=0,c=n.length,h=r==null;if(i.type(r)==="object"){f=!0;for(s in r)i.access(n,t,s,r[s],!0,e,o)}else if(u!==undefined&&(f=!0,i.isFunction(u)||(o=!0),h&&(o?(t.call(n,u),t=null):(h=t,t=function(n,t,r){return h.call(i(n),r)})),t))for(;s<c;s++)t(n[s],r,o?u:u.call(n[s],s,t(n[s],r)));return f?n:h?t.call(n):c?t(n[0],r):e},oi=/^(?:checkbox|radio)$/i;(function(){var t=u.createElement("input"),n=u.createElement("div"),i=u.createDocumentFragment();if(n.innerHTML="  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>",r.leadingWhitespace=n.firstChild.nodeType===3,r.tbody=!n.getElementsByTagName("tbody").length,r.htmlSerialize=!!n.getElementsByTagName("link").length,r.html5Clone=u.createElement("nav").cloneNode(!0).outerHTML!=="<:nav><\/:nav>",t.type="checkbox",t.checked=!0,i.appendChild(t),r.appendChecked=t.checked,n.innerHTML="<textarea>x<\/textarea>",r.noCloneChecked=!!n.cloneNode(!0).lastChild.defaultValue,i.appendChild(n),n.innerHTML="<input type='radio' checked='checked' name='t'/>",r.checkClone=n.cloneNode(!0).cloneNode(!0).lastChild.checked,r.noCloneEvent=!0,n.attachEvent&&(n.attachEvent("onclick",function(){r.noCloneEvent=!1}),n.cloneNode(!0).click()),r.deleteExpando==null){r.deleteExpando=!0;try{delete n.test}catch(f){r.deleteExpando=!1}}})(),function(){var t,i,f=u.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})i="on"+t,(r[t+"Bubbles"]=i in n)||(f.setAttribute(i,"t"),r[t+"Bubbles"]=f.attributes[i].expando===!1);f=null}();var si=/^(?:input|select|textarea)$/i,oe=/^key/,se=/^(?:mouse|pointer|contextmenu)|click/,br=/^(?:focusinfocus|focusoutblur)$/,kr=/^([^.]*)(?:\.(.+)|)$/;i.event={global:{},add:function(n,t,r,u,f){var w,y,b,p,s,c,l,a,e,k,d,v=i._data(n);if(v){for(r.handler&&(p=r,r=p.handler,f=p.selector),r.guid||(r.guid=i.guid++),(y=v.events)||(y=v.events={}),(c=v.handle)||(c=v.handle=function(n){return typeof i!==o&&(!n||i.event.triggered!==n.type)?i.event.dispatch.apply(c.elem,arguments):undefined},c.elem=n),t=(t||"").match(h)||[""],b=t.length;b--;)(w=kr.exec(t[b])||[],e=d=w[1],k=(w[2]||"").split(".").sort(),e)&&(s=i.event.special[e]||{},e=(f?s.delegateType:s.bindType)||e,s=i.event.special[e]||{},l=i.extend({type:e,origType:d,data:u,handler:r,guid:r.guid,selector:f,needsContext:f&&i.expr.match.needsContext.test(f),namespace:k.join(".")},p),(a=y[e])||(a=y[e]=[],a.delegateCount=0,s.setup&&s.setup.call(n,u,k,c)!==!1||(n.addEventListener?n.addEventListener(e,c,!1):n.attachEvent&&n.attachEvent("on"+e,c))),s.add&&(s.add.call(n,l),l.handler.guid||(l.handler.guid=r.guid)),f?a.splice(a.delegateCount++,0,l):a.push(l),i.event.global[e]=!0);n=null}},remove:function(n,t,r,u,f){var y,o,s,b,p,a,c,l,e,w,k,v=i.hasData(n)&&i._data(n);if(v&&(a=v.events)){for(t=(t||"").match(h)||[""],p=t.length;p--;){if(s=kr.exec(t[p])||[],e=k=s[1],w=(s[2]||"").split(".").sort(),!e){for(e in a)i.event.remove(n,e+t[p],r,u,!0);continue}for(c=i.event.special[e]||{},e=(u?c.delegateType:c.bindType)||e,l=a[e]||[],s=s[2]&&new RegExp("(^|\\.)"+w.join("\\.(?:.*\\.|)")+"(\\.|$)"),b=y=l.length;y--;)o=l[y],(f||k===o.origType)&&(!r||r.guid===o.guid)&&(!s||s.test(o.namespace))&&(!u||u===o.selector||u==="**"&&o.selector)&&(l.splice(y,1),o.selector&&l.delegateCount--,c.remove&&c.remove.call(n,o));b&&!l.length&&(c.teardown&&c.teardown.call(n,w,v.handle)!==!1||i.removeEvent(n,e,v.handle),delete a[e])}i.isEmptyObject(a)&&(delete v.handle,i._removeData(n,"events"))}},trigger:function(t,r,f,e){var l,a,o,p,c,h,w,y=[f||u],s=tt.call(t,"type")?t.type:t,v=tt.call(t,"namespace")?t.namespace.split("."):[];if((o=h=f=f||u,f.nodeType!==3&&f.nodeType!==8)&&!br.test(s+i.event.triggered)&&(s.indexOf(".")>=0&&(v=s.split("."),s=v.shift(),v.sort()),a=s.indexOf(":")<0&&"on"+s,t=t[i.expando]?t:new i.Event(s,typeof t=="object"&&t),t.isTrigger=e?2:3,t.namespace=v.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=f),r=r==null?[t]:i.makeArray(r,[t]),c=i.event.special[s]||{},e||!c.trigger||c.trigger.apply(f,r)!==!1)){if(!e&&!c.noBubble&&!i.isWindow(f)){for(p=c.delegateType||s,br.test(p+s)||(o=o.parentNode);o;o=o.parentNode)y.push(o),h=o;h===(f.ownerDocument||u)&&y.push(h.defaultView||h.parentWindow||n)}for(w=0;(o=y[w++])&&!t.isPropagationStopped();)t.type=w>1?p:c.bindType||s,l=(i._data(o,"events")||{})[t.type]&&i._data(o,"handle"),l&&l.apply(o,r),l=a&&o[a],l&&l.apply&&i.acceptData(o)&&(t.result=l.apply(o,r),t.result===!1&&t.preventDefault());if(t.type=s,!e&&!t.isDefaultPrevented()&&(!c._default||c._default.apply(y.pop(),r)===!1)&&i.acceptData(f)&&a&&f[s]&&!i.isWindow(f)){h=f[a];h&&(f[a]=null);i.event.triggered=s;try{f[s]()}catch(b){}i.event.triggered=undefined;h&&(f[a]=h)}return t.result}},dispatch:function(n){n=i.event.fix(n);var e,f,t,r,o,s=[],h=l.call(arguments),c=(i._data(this,"events")||{})[n.type]||[],u=i.event.special[n.type]||{};if(h[0]=n,n.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,n)!==!1){for(s=i.event.handlers.call(this,n,c),e=0;(r=s[e++])&&!n.isPropagationStopped();)for(n.currentTarget=r.elem,o=0;(t=r.handlers[o++])&&!n.isImmediatePropagationStopped();)(!n.namespace_re||n.namespace_re.test(t.namespace))&&(n.handleObj=t,n.data=t.data,f=((i.event.special[t.origType]||{}).handle||t.handler).apply(r.elem,h),f!==undefined&&(n.result=f)===!1&&(n.preventDefault(),n.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,n),n.result}},handlers:function(n,t){var f,e,u,o,h=[],s=t.delegateCount,r=n.target;if(s&&r.nodeType&&(!n.button||n.type!=="click"))for(;r!=this;r=r.parentNode||this)if(r.nodeType===1&&(r.disabled!==!0||n.type!=="click")){for(u=[],o=0;o<s;o++)e=t[o],f=e.selector+" ",u[f]===undefined&&(u[f]=e.needsContext?i(f,this).index(r)>=0:i.find(f,this,null,[r]).length),u[f]&&u.push(e);u.length&&h.push({elem:r,handlers:u})}return s<t.length&&h.push({elem:this,handlers:t.slice(s)}),h},fix:function(n){if(n[i.expando])return n;var e,o,s,r=n.type,f=n,t=this.fixHooks[r];for(t||(this.fixHooks[r]=t=se.test(r)?this.mouseHooks:oe.test(r)?this.keyHooks:{}),s=t.props?this.props.concat(t.props):this.props,n=new i.Event(f),e=s.length;e--;)o=s[e],n[o]=f[o];return n.target||(n.target=f.srcElement||u),n.target.nodeType===3&&(n.target=n.target.parentNode),n.metaKey=!!n.metaKey,t.filter?t.filter(n,f):n},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(n,t){return n.which==null&&(n.which=t.charCode!=null?t.charCode:t.keyCode),n}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(n,t){var i,e,r,f=t.button,o=t.fromElement;return n.pageX==null&&t.clientX!=null&&(e=n.target.ownerDocument||u,r=e.documentElement,i=e.body,n.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),n.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),!n.relatedTarget&&o&&(n.relatedTarget=o===n.target?t.toElement:o),n.which||f===undefined||(n.which=f&1?1:f&2?3:f&4?2:0),n}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==dr()&&this.focus)try{return this.focus(),!1}catch(n){}},delegateType:"focusin"},blur:{trigger:function(){if(this===dr()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if(i.nodeName(this,"input")&&this.type==="checkbox"&&this.click)return this.click(),!1},_default:function(n){return i.nodeName(n.target,"a")}},beforeunload:{postDispatch:function(n){n.result!==undefined&&n.originalEvent&&(n.originalEvent.returnValue=n.result)}}},simulate:function(n,t,r,u){var f=i.extend(new i.Event,r,{type:n,isSimulated:!0,originalEvent:{}});u?i.event.trigger(f,null,t):i.event.dispatch.call(t,f);f.isDefaultPrevented()&&r.preventDefault()}};i.removeEvent=u.removeEventListener?function(n,t,i){n.removeEventListener&&n.removeEventListener(t,i,!1)}:function(n,t,i){var r="on"+t;n.detachEvent&&(typeof n[r]===o&&(n[r]=null),n.detachEvent(r,i))};i.Event=function(n,t){if(!(this instanceof i.Event))return new i.Event(n,t);n&&n.type?(this.originalEvent=n,this.type=n.type,this.isDefaultPrevented=n.defaultPrevented||n.defaultPrevented===undefined&&n.returnValue===!1?vt:it):this.type=n;t&&i.extend(this,t);this.timeStamp=n&&n.timeStamp||i.now();this[i.expando]=!0};i.Event.prototype={isDefaultPrevented:it,isPropagationStopped:it,isImmediatePropagationStopped:it,preventDefault:function(){var n=this.originalEvent;(this.isDefaultPrevented=vt,n)&&(n.preventDefault?n.preventDefault():n.returnValue=!1)},stopPropagation:function(){var n=this.originalEvent;(this.isPropagationStopped=vt,n)&&(n.stopPropagation&&n.stopPropagation(),n.cancelBubble=!0)},stopImmediatePropagation:function(){var n=this.originalEvent;this.isImmediatePropagationStopped=vt;n&&n.stopImmediatePropagation&&n.stopImmediatePropagation();this.stopPropagation()}};i.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(n,t){i.event.special[n]={delegateType:t,bindType:t,handle:function(n){var u,f=this,r=n.relatedTarget,e=n.handleObj;return r&&(r===f||i.contains(f,r))||(n.type=e.origType,u=e.handler.apply(this,arguments),n.type=t),u}}});r.submitBubbles||(i.event.special.submit={setup:function(){if(i.nodeName(this,"form"))return!1;i.event.add(this,"click._submit keypress._submit",function(n){var r=n.target,t=i.nodeName(r,"input")||i.nodeName(r,"button")?r.form:undefined;t&&!i._data(t,"submitBubbles")&&(i.event.add(t,"submit._submit",function(n){n._submit_bubble=!0}),i._data(t,"submitBubbles",!0))})},postDispatch:function(n){n._submit_bubble&&(delete n._submit_bubble,this.parentNode&&!n.isTrigger&&i.event.simulate("submit",this.parentNode,n,!0))},teardown:function(){if(i.nodeName(this,"form"))return!1;i.event.remove(this,"._submit")}});r.changeBubbles||(i.event.special.change={setup:function(){if(si.test(this.nodeName))return(this.type==="checkbox"||this.type==="radio")&&(i.event.add(this,"propertychange._change",function(n){n.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),i.event.add(this,"click._change",function(n){this._just_changed&&!n.isTrigger&&(this._just_changed=!1);i.event.simulate("change",this,n,!0)})),!1;i.event.add(this,"beforeactivate._change",function(n){var t=n.target;si.test(t.nodeName)&&!i._data(t,"changeBubbles")&&(i.event.add(t,"change._change",function(n){!this.parentNode||n.isSimulated||n.isTrigger||i.event.simulate("change",this.parentNode,n,!0)}),i._data(t,"changeBubbles",!0))})},handle:function(n){var t=n.target;if(this!==t||n.isSimulated||n.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return n.handleObj.handler.apply(this,arguments)},teardown:function(){return i.event.remove(this,"._change"),!si.test(this.nodeName)}});r.focusinBubbles||i.each({focus:"focusin",blur:"focusout"},function(n,t){var r=function(n){i.event.simulate(t,n.target,i.event.fix(n),!0)};i.event.special[t]={setup:function(){var u=this.ownerDocument||this,f=i._data(u,t);f||u.addEventListener(n,r,!0);i._data(u,t,(f||0)+1)},teardown:function(){var u=this.ownerDocument||this,f=i._data(u,t)-1;f?i._data(u,t,f):(u.removeEventListener(n,r,!0),i._removeData(u,t))}}});i.fn.extend({on:function(n,t,r,u,f){var o,e;if(typeof n=="object"){typeof t!="string"&&(r=r||t,t=undefined);for(o in n)this.on(o,t,r,n[o],f);return this}if(r==null&&u==null?(u=t,r=t=undefined):u==null&&(typeof t=="string"?(u=r,r=undefined):(u=r,r=t,t=undefined)),u===!1)u=it;else if(!u)return this;return f===1&&(e=u,u=function(n){return i().off(n),e.apply(this,arguments)},u.guid=e.guid||(e.guid=i.guid++)),this.each(function(){i.event.add(this,n,u,r,t)})},one:function(n,t,i,r){return this.on(n,t,i,r,1)},off:function(n,t,r){var u,f;if(n&&n.preventDefault&&n.handleObj)return u=n.handleObj,i(n.delegateTarget).off(u.namespace?u.origType+"."+u.namespace:u.origType,u.selector,u.handler),this;if(typeof n=="object"){for(f in n)this.off(f,t,n[f]);return this}return(t===!1||typeof t=="function")&&(r=t,t=undefined),r===!1&&(r=it),this.each(function(){i.event.remove(this,n,r,t)})},trigger:function(n,t){return this.each(function(){i.event.trigger(n,t,this)})},triggerHandler:function(n,t){var r=this[0];if(r)return i.event.trigger(n,t,r,!0)}});var nu="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",he=/ jQuery\d+="(?:null|\d+)"/g,tu=new RegExp("<(?:"+nu+")[\\s/>]","i"),hi=/^\s+/,iu=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ru=/<([\w:]+)/,uu=/<tbody/i,ce=/<|&#?\w+;/,le=/<(?:script|style|link)/i,ae=/checked\s*(?:[^=]|=\s*.checked.)/i,fu=/^$|\/(?:java|ecma)script/i,ve=/^true\/(.*)/,ye=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,s={option:[1,"<select multiple='multiple'>","<\/select>"],legend:[1,"<fieldset>","<\/fieldset>"],area:[1,"<map>","<\/map>"],param:[1,"<object>","<\/object>"],thead:[1,"<table>","<\/table>"],tr:[2,"<table><tbody>","<\/tbody><\/table>"],col:[2,"<table><tbody><\/tbody><colgroup>","<\/colgroup><\/table>"],td:[3,"<table><tbody><tr>","<\/tr><\/tbody><\/table>"],_default:r.htmlSerialize?[0,"",""]:[1,"X<div>","<\/div>"]},pe=gr(u),ci=pe.appendChild(u.createElement("div"));s.optgroup=s.option;s.tbody=s.tfoot=s.colgroup=s.caption=s.thead;s.th=s.td;i.extend({clone:function(n,t,u){var e,c,s,o,h,l=i.contains(n.ownerDocument,n);if(r.html5Clone||i.isXMLDoc(n)||!tu.test("<"+n.nodeName+">")?s=n.cloneNode(!0):(ci.innerHTML=n.outerHTML,ci.removeChild(s=ci.firstChild)),(!r.noCloneEvent||!r.noCloneChecked)&&(n.nodeType===1||n.nodeType===11)&&!i.isXMLDoc(n))for(e=f(s),h=f(n),o=0;(c=h[o])!=null;++o)e[o]&&be(c,e[o]);if(t)if(u)for(h=h||f(n),e=e||f(s),o=0;(c=h[o])!=null;o++)hu(c,e[o]);else hu(n,s);return e=f(s,"script"),e.length>0&&li(e,!l&&f(n,"script")),e=h=c=null,s},buildFragment:function(n,t,u,e){for(var c,o,b,h,p,w,a,k=n.length,v=gr(t),l=[],y=0;y<k;y++)if(o=n[y],o||o===0)if(i.type(o)==="object")i.merge(l,o.nodeType?[o]:o);else if(ce.test(o)){for(h=h||v.appendChild(t.createElement("div")),p=(ru.exec(o)||["",""])[1].toLowerCase(),a=s[p]||s._default,h.innerHTML=a[1]+o.replace(iu,"<$1><\/$2>")+a[2],c=a[0];c--;)h=h.lastChild;if(!r.leadingWhitespace&&hi.test(o)&&l.push(t.createTextNode(hi.exec(o)[0])),!r.tbody)for(o=p==="table"&&!uu.test(o)?h.firstChild:a[1]==="<table>"&&!uu.test(o)?h:0,c=o&&o.childNodes.length;c--;)i.nodeName(w=o.childNodes[c],"tbody")&&!w.childNodes.length&&o.removeChild(w);for(i.merge(l,h.childNodes),h.textContent="";h.firstChild;)h.removeChild(h.firstChild);h=v.lastChild}else l.push(t.createTextNode(o));for(h&&v.removeChild(h),r.appendChecked||i.grep(f(l,"input"),we),y=0;o=l[y++];)if((!e||i.inArray(o,e)===-1)&&(b=i.contains(o.ownerDocument,o),h=f(v.appendChild(o),"script"),b&&li(h),u))for(c=0;o=h[c++];)fu.test(o.type||"")&&u.push(o);return h=null,v},cleanData:function(n,t){for(var u,s,f,e,a=0,h=i.expando,l=i.cache,v=r.deleteExpando,y=i.event.special;(u=n[a])!=null;a++)if((t||i.acceptData(u))&&(f=u[h],e=f&&l[f],e)){if(e.events)for(s in e.events)y[s]?i.event.remove(u,s):i.removeEvent(u,s,e.handle);l[f]&&(delete l[f],v?delete u[h]:typeof u.removeAttribute!==o?u.removeAttribute(h):u[h]=null,c.push(f))}}});i.fn.extend({text:function(n){return b(this,function(n){return n===undefined?i.text(this):this.empty().append((this[0]&&this[0].ownerDocument||u).createTextNode(n))},null,n,arguments.length)},append:function(){return this.domManip(arguments,function(n){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var t=eu(this,n);t.appendChild(n)}})},prepend:function(){return this.domManip(arguments,function(n){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var t=eu(this,n);t.insertBefore(n,t.firstChild)}})},before:function(){return this.domManip(arguments,function(n){this.parentNode&&this.parentNode.insertBefore(n,this)})},after:function(){return this.domManip(arguments,function(n){this.parentNode&&this.parentNode.insertBefore(n,this.nextSibling)})},remove:function(n,t){for(var r,e=n?i.filter(n,this):this,u=0;(r=e[u])!=null;u++)t||r.nodeType!==1||i.cleanData(f(r)),r.parentNode&&(t&&i.contains(r.ownerDocument,r)&&li(f(r,"script")),r.parentNode.removeChild(r));return this},empty:function(){for(var n,t=0;(n=this[t])!=null;t++){for(n.nodeType===1&&i.cleanData(f(n,!1));n.firstChild;)n.removeChild(n.firstChild);n.options&&i.nodeName(n,"select")&&(n.options.length=0)}return this},clone:function(n,t){return n=n==null?!1:n,t=t==null?n:t,this.map(function(){return i.clone(this,n,t)})},html:function(n){return b(this,function(n){var t=this[0]||{},u=0,e=this.length;if(n===undefined)return t.nodeType===1?t.innerHTML.replace(he,""):undefined;if(typeof n=="string"&&!le.test(n)&&(r.htmlSerialize||!tu.test(n))&&(r.leadingWhitespace||!hi.test(n))&&!s[(ru.exec(n)||["",""])[1].toLowerCase()]){n=n.replace(iu,"<$1><\/$2>");try{for(;u<e;u++)t=this[u]||{},t.nodeType===1&&(i.cleanData(f(t,!1)),t.innerHTML=n);t=0}catch(o){}}t&&this.empty().append(n)},null,n,arguments.length)},replaceWith:function(){var n=arguments[0];return this.domManip(arguments,function(t){n=this.parentNode;i.cleanData(f(this));n&&n.replaceChild(t,this)}),n&&(n.length||n.nodeType)?this:this.remove()},detach:function(n){return this.remove(n,!0)},domManip:function(n,t){n=ir.apply([],n);var h,u,c,o,v,s,e=0,l=this.length,p=this,w=l-1,a=n[0],y=i.isFunction(a);if(y||l>1&&typeof a=="string"&&!r.checkClone&&ae.test(a))return this.each(function(i){var r=p.eq(i);y&&(n[0]=a.call(this,i,r.html()));r.domManip(n,t)});if(l&&(s=i.buildFragment(n,this[0].ownerDocument,!1,this),h=s.firstChild,s.childNodes.length===1&&(s=h),h)){for(o=i.map(f(s,"script"),ou),c=o.length;e<l;e++)u=s,e!==w&&(u=i.clone(u,!0,!0),c&&i.merge(o,f(u,"script"))),t.call(this[e],u,e);if(c)for(v=o[o.length-1].ownerDocument,i.map(o,su),e=0;e<c;e++)u=o[e],fu.test(u.type||"")&&!i._data(u,"globalEval")&&i.contains(v,u)&&(u.src?i._evalUrl&&i._evalUrl(u.src):i.globalEval((u.text||u.textContent||u.innerHTML||"").replace(ye,"")));s=h=null}return this}});i.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(n,t){i.fn[n]=function(n){for(var u,r=0,f=[],e=i(n),o=e.length-1;r<=o;r++)u=r===o?this:this.clone(!0),i(e[r])[t](u),ii.apply(f,u.get());return this.pushStack(f)}});ai={},function(){var n;r.shrinkWrapBlocks=function(){if(n!=null)return n;n=!1;var t,i,r;if(i=u.getElementsByTagName("body")[0],i&&i.style)return t=u.createElement("div"),r=u.createElement("div"),r.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(r).appendChild(t),typeof t.style.zoom!==o&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(u.createElement("div")).style.width="5px",n=t.offsetWidth!==3),i.removeChild(r),n}}();var lu=/^margin/,pt=new RegExp("^("+at+")(?!px)[a-z%]+$","i"),k,d,ke=/^(top|right|bottom|left)$/;n.getComputedStyle?(k=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):n.getComputedStyle(t,null)},d=function(n,t,r){var e,o,s,u,f=n.style;return r=r||k(n),u=r?r.getPropertyValue(t)||r[t]:undefined,r&&(u!==""||i.contains(n.ownerDocument,n)||(u=i.style(n,t)),pt.test(u)&&lu.test(t)&&(e=f.width,o=f.minWidth,s=f.maxWidth,f.minWidth=f.maxWidth=f.width=u,u=r.width,f.width=e,f.minWidth=o,f.maxWidth=s)),u===undefined?u:u+""}):u.documentElement.currentStyle&&(k=function(n){return n.currentStyle},d=function(n,t,i){var o,f,e,r,u=n.style;return i=i||k(n),r=i?i[t]:undefined,r==null&&u&&u[t]&&(r=u[t]),pt.test(r)&&!ke.test(t)&&(o=u.left,f=n.runtimeStyle,e=f&&f.left,e&&(f.left=n.currentStyle.left),u.left=t==="fontSize"?"1em":r,r=u.pixelLeft+"px",u.left=o,e&&(f.left=e)),r===undefined?r:r+""||"auto"}),function(){function c(){var i,r,f,t;(r=u.getElementsByTagName("body")[0],r&&r.style)&&(i=u.createElement("div"),f=u.createElement("div"),f.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",r.appendChild(f).appendChild(i),i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",o=s=!1,h=!0,n.getComputedStyle&&(o=(n.getComputedStyle(i,null)||{}).top!=="1%",s=(n.getComputedStyle(i,null)||{width:"4px"}).width==="4px",t=i.appendChild(u.createElement("div")),t.style.cssText=i.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",t.style.marginRight=t.style.width="0",i.style.width="1px",h=!parseFloat((n.getComputedStyle(t,null)||{}).marginRight),i.removeChild(t)),i.innerHTML="<table><tr><td><\/td><td>t<\/td><\/tr><\/table>",t=i.getElementsByTagName("td"),t[0].style.cssText="margin:0;border:0;padding:0;display:none",e=t[0].offsetHeight===0,e&&(t[0].style.display="",t[1].style.display="none",e=t[0].offsetHeight===0),r.removeChild(f))}var f,t,l,o,s,e,h;(f=u.createElement("div"),f.innerHTML="  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>",l=f.getElementsByTagName("a")[0],t=l&&l.style,t)&&(t.cssText="float:left;opacity:.5",r.opacity=t.opacity==="0.5",r.cssFloat=!!t.cssFloat,f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",r.clearCloneStyle=f.style.backgroundClip==="content-box",r.boxSizing=t.boxSizing===""||t.MozBoxSizing===""||t.WebkitBoxSizing==="",i.extend(r,{reliableHiddenOffsets:function(){return e==null&&c(),e},boxSizingReliable:function(){return s==null&&c(),s},pixelPosition:function(){return o==null&&c(),o},reliableMarginRight:function(){return h==null&&c(),h}}))}();i.swap=function(n,t,i,r){var f,u,e={};for(u in t)e[u]=n.style[u],n.style[u]=t[u];f=i.apply(n,r||[]);for(u in t)n.style[u]=e[u];return f};var vi=/alpha\([^)]*\)/i,de=/opacity\s*=\s*([^)]*)/,ge=/^(none|table(?!-c[ea]).+)/,no=new RegExp("^("+at+")(.*)$","i"),to=new RegExp("^([+-])=("+at+")","i"),io={position:"absolute",visibility:"hidden",display:"block"},vu={letterSpacing:"0",fontWeight:"400"},yu=["Webkit","O","Moz","ms"];i.extend({cssHooks:{opacity:{get:function(n,t){if(t){var i=d(n,"opacity");return i===""?"1":i}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:r.cssFloat?"cssFloat":"styleFloat"},style:function(n,t,u,f){if(n&&n.nodeType!==3&&n.nodeType!==8&&n.style){var o,h,e,s=i.camelCase(t),c=n.style;if(t=i.cssProps[s]||(i.cssProps[s]=pu(c,s)),e=i.cssHooks[t]||i.cssHooks[s],u!==undefined){if(h=typeof u,h==="string"&&(o=to.exec(u))&&(u=(o[1]+1)*o[2]+parseFloat(i.css(n,t)),h="number"),u==null||u!==u)return;if(h!=="number"||i.cssNumber[s]||(u+="px"),r.clearCloneStyle||u!==""||t.indexOf("background")!==0||(c[t]="inherit"),!e||!("set"in e)||(u=e.set(n,u,f))!==undefined)try{c[t]=u}catch(l){}}else return e&&"get"in e&&(o=e.get(n,!1,f))!==undefined?o:c[t]}},css:function(n,t,r,u){var s,f,e,o=i.camelCase(t);return(t=i.cssProps[o]||(i.cssProps[o]=pu(n.style,o)),e=i.cssHooks[t]||i.cssHooks[o],e&&"get"in e&&(f=e.get(n,!0,r)),f===undefined&&(f=d(n,t,u)),f==="normal"&&t in vu&&(f=vu[t]),r===""||r)?(s=parseFloat(f),r===!0||i.isNumeric(s)?s||0:f):f}});i.each(["height","width"],function(n,t){i.cssHooks[t]={get:function(n,r,u){if(r)return ge.test(i.css(n,"display"))&&n.offsetWidth===0?i.swap(n,io,function(){return du(n,t,u)}):du(n,t,u)},set:function(n,u,f){var e=f&&k(n);return bu(n,u,f?ku(n,t,f,r.boxSizing&&i.css(n,"boxSizing",!1,e)==="border-box",e):0)}}});r.opacity||(i.cssHooks.opacity={get:function(n,t){return de.test((t&&n.currentStyle?n.currentStyle.filter:n.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(n,t){var r=n.style,u=n.currentStyle,e=i.isNumeric(t)?"alpha(opacity="+t*100+")":"",f=u&&u.filter||r.filter||"";(r.zoom=1,(t>=1||t==="")&&i.trim(f.replace(vi,""))===""&&r.removeAttribute&&(r.removeAttribute("filter"),t===""||u&&!u.filter))||(r.filter=vi.test(f)?f.replace(vi,e):f+" "+e)}});i.cssHooks.marginRight=au(r.reliableMarginRight,function(n,t){if(t)return i.swap(n,{display:"inline-block"},d,[n,"marginRight"])});i.each({margin:"",padding:"",border:"Width"},function(n,t){i.cssHooks[n+t]={expand:function(i){for(var r=0,f={},u=typeof i=="string"?i.split(" "):[i];r<4;r++)f[n+w[r]+t]=u[r]||u[r-2]||u[0];return f}};lu.test(n)||(i.cssHooks[n+t].set=bu)});i.fn.extend({css:function(n,t){return b(this,function(n,t,r){var f,e,o={},u=0;if(i.isArray(t)){for(f=k(n),e=t.length;u<e;u++)o[t[u]]=i.css(n,t[u],!1,f);return o}return r!==undefined?i.style(n,t,r):i.css(n,t)},n,t,arguments.length>1)},show:function(){return wu(this,!0)},hide:function(){return wu(this)},toggle:function(n){return typeof n=="boolean"?n?this.show():this.hide():this.each(function(){et(this)?i(this).show():i(this).hide()})}});i.Tween=e;e.prototype={constructor:e,init:function(n,t,r,u,f,e){this.elem=n;this.prop=r;this.easing=f||"swing";this.options=t;this.start=this.now=this.cur();this.end=u;this.unit=e||(i.cssNumber[r]?"":"px")},cur:function(){var n=e.propHooks[this.prop];return n&&n.get?n.get(this):e.propHooks._default.get(this)},run:function(n){var t,r=e.propHooks[this.prop];return this.pos=this.options.duration?t=i.easing[this.easing](n,this.options.duration*n,0,1,this.options.duration):t=n,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),r&&r.set?r.set(this):e.propHooks._default.set(this),this}};e.prototype.init.prototype=e.prototype;e.propHooks={_default:{get:function(n){var t;return n.elem[n.prop]!=null&&(!n.elem.style||n.elem.style[n.prop]==null)?n.elem[n.prop]:(t=i.css(n.elem,n.prop,""),!t||t==="auto"?0:t)},set:function(n){i.fx.step[n.prop]?i.fx.step[n.prop](n):n.elem.style&&(n.elem.style[i.cssProps[n.prop]]!=null||i.cssHooks[n.prop])?i.style(n.elem,n.prop,n.now+n.unit):n.elem[n.prop]=n.now}}};e.propHooks.scrollTop=e.propHooks.scrollLeft={set:function(n){n.elem.nodeType&&n.elem.parentNode&&(n.elem[n.prop]=n.now)}};i.easing={linear:function(n){return n},swing:function(n){return.5-Math.cos(n*Math.PI)/2}};i.fx=e.prototype.init;i.fx.step={};var rt,wt,ro=/^(?:toggle|show|hide)$/,gu=new RegExp("^(?:([+-])=|)("+at+")([a-z%]*)$","i"),uo=/queueHooks$/,bt=[fo],st={"*":[function(n,t){var f=this.createTween(n,t),s=f.cur(),u=gu.exec(t),e=u&&u[3]||(i.cssNumber[n]?"":"px"),r=(i.cssNumber[n]||e!=="px"&&+s)&&gu.exec(i.css(f.elem,n)),o=1,h=20;if(r&&r[3]!==e){e=e||r[3];u=u||[];r=+s||1;do o=o||".5",r=r/o,i.style(f.elem,n,r+e);while(o!==(o=f.cur()/s)&&o!==1&&--h)}return u&&(r=f.start=+r||+s||0,f.unit=e,f.end=u[1]?r+(u[1]+1)*u[2]:+u[2]),f}]};i.Animation=i.extend(rf,{tweener:function(n,t){i.isFunction(n)?(t=n,n=["*"]):n=n.split(" ");for(var r,u=0,f=n.length;u<f;u++)r=n[u],st[r]=st[r]||[],st[r].unshift(t)},prefilter:function(n,t){t?bt.unshift(n):bt.push(n)}});i.speed=function(n,t,r){var u=n&&typeof n=="object"?i.extend({},n):{complete:r||!r&&t||i.isFunction(n)&&n,duration:n,easing:r&&t||t&&!i.isFunction(t)&&t};return u.duration=i.fx.off?0:typeof u.duration=="number"?u.duration:u.duration in i.fx.speeds?i.fx.speeds[u.duration]:i.fx.speeds._default,(u.queue==null||u.queue===!0)&&(u.queue="fx"),u.old=u.complete,u.complete=function(){i.isFunction(u.old)&&u.old.call(this);u.queue&&i.dequeue(this,u.queue)},u};i.fn.extend({fadeTo:function(n,t,i,r){return this.filter(et).css("opacity",0).show().end().animate({opacity:t},n,i,r)},animate:function(n,t,r,u){var o=i.isEmptyObject(n),e=i.speed(t,r,u),f=function(){var t=rf(this,i.extend({},n),e);(o||i._data(this,"finish"))&&t.stop(!0)};return f.finish=f,o||e.queue===!1?this.each(f):this.queue(e.queue,f)},stop:function(n,t,r){var u=function(n){var t=n.stop;delete n.stop;t(r)};return typeof n!="string"&&(r=t,t=n,n=undefined),t&&n!==!1&&this.queue(n||"fx",[]),this.each(function(){var o=!0,t=n!=null&&n+"queueHooks",e=i.timers,f=i._data(this);if(t)f[t]&&f[t].stop&&u(f[t]);else for(t in f)f[t]&&f[t].stop&&uo.test(t)&&u(f[t]);for(t=e.length;t--;)e[t].elem===this&&(n==null||e[t].queue===n)&&(e[t].anim.stop(r),o=!1,e.splice(t,1));(o||!r)&&i.dequeue(this,n)})},finish:function(n){return n!==!1&&(n=n||"fx"),this.each(function(){var t,f=i._data(this),r=f[n+"queue"],e=f[n+"queueHooks"],u=i.timers,o=r?r.length:0;for(f.finish=!0,i.queue(this,n,[]),e&&e.stop&&e.stop.call(this,!0),t=u.length;t--;)u[t].elem===this&&u[t].queue===n&&(u[t].anim.stop(!0),u.splice(t,1));for(t=0;t<o;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete f.finish})}});i.each(["toggle","show","hide"],function(n,t){var r=i.fn[t];i.fn[t]=function(n,i,u){return n==null||typeof n=="boolean"?r.apply(this,arguments):this.animate(kt(t,!0),n,i,u)}});i.each({slideDown:kt("show"),slideUp:kt("hide"),slideToggle:kt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(n,t){i.fn[n]=function(n,i,r){return this.animate(t,n,i,r)}});i.timers=[];i.fx.tick=function(){var r,n=i.timers,t=0;for(rt=i.now();t<n.length;t++)r=n[t],r()||n[t]!==r||n.splice(t--,1);n.length||i.fx.stop();rt=undefined};i.fx.timer=function(n){i.timers.push(n);n()?i.fx.start():i.timers.pop()};i.fx.interval=13;i.fx.start=function(){wt||(wt=setInterval(i.fx.tick,i.fx.interval))};i.fx.stop=function(){clearInterval(wt);wt=null};i.fx.speeds={slow:600,fast:200,_default:400};i.fn.delay=function(n,t){return n=i.fx?i.fx.speeds[n]||n:n,t=t||"fx",this.queue(t,function(t,i){var r=setTimeout(t,n);i.stop=function(){clearTimeout(r)}})},function(){var n,t,f,i,e;t=u.createElement("div");t.setAttribute("className","t");t.innerHTML="  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>";i=t.getElementsByTagName("a")[0];f=u.createElement("select");e=f.appendChild(u.createElement("option"));n=t.getElementsByTagName("input")[0];i.style.cssText="top:1px";r.getSetAttribute=t.className!=="t";r.style=/top/.test(i.getAttribute("style"));r.hrefNormalized=i.getAttribute("href")==="/a";r.checkOn=!!n.value;r.optSelected=e.selected;r.enctype=!!u.createElement("form").enctype;f.disabled=!0;r.optDisabled=!e.disabled;n=u.createElement("input");n.setAttribute("value","");r.input=n.getAttribute("value")==="";n.value="t";n.setAttribute("type","radio");r.radioValue=n.value==="t"}();uf=/\r/g;i.fn.extend({val:function(n){var t,r,f,u=this[0];return arguments.length?(f=i.isFunction(n),this.each(function(r){var u;this.nodeType===1&&(u=f?n.call(this,r,i(this).val()):n,u==null?u="":typeof u=="number"?u+="":i.isArray(u)&&(u=i.map(u,function(n){return n==null?"":n+""})),t=i.valHooks[this.type]||i.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,u,"value")!==undefined||(this.value=u))})):u?(t=i.valHooks[u.type]||i.valHooks[u.nodeName.toLowerCase()],t&&"get"in t&&(r=t.get(u,"value"))!==undefined)?r:(r=u.value,typeof r=="string"?r.replace(uf,""):r==null?"":r):void 0}});i.extend({valHooks:{option:{get:function(n){var t=i.find.attr(n,"value");return t!=null?t:i.trim(i.text(n))}},select:{get:function(n){for(var o,t,s=n.options,u=n.selectedIndex,f=n.type==="select-one"||u<0,h=f?null:[],c=f?u+1:s.length,e=u<0?c:f?u:0;e<c;e++)if(t=s[e],(t.selected||e===u)&&(r.optDisabled?!t.disabled:t.getAttribute("disabled")===null)&&(!t.parentNode.disabled||!i.nodeName(t.parentNode,"optgroup"))){if(o=i(t).val(),f)return o;h.push(o)}return h},set:function(n,t){for(var f,r,u=n.options,o=i.makeArray(t),e=u.length;e--;)if(r=u[e],i.inArray(i.valHooks.option.get(r),o)>=0)try{r.selected=f=!0}catch(s){r.scrollHeight}else r.selected=!1;return f||(n.selectedIndex=-1),u}}}});i.each(["radio","checkbox"],function(){i.valHooks[this]={set:function(n,t){if(i.isArray(t))return n.checked=i.inArray(i(n).val(),t)>=0}};r.checkOn||(i.valHooks[this].get=function(n){return n.getAttribute("value")===null?"on":n.value})});var ut,ff,v=i.expr.attrHandle,yi=/^(?:checked|selected)$/i,g=r.getSetAttribute,dt=r.input;i.fn.extend({attr:function(n,t){return b(this,i.attr,n,t,arguments.length>1)},removeAttr:function(n){return this.each(function(){i.removeAttr(this,n)})}});i.extend({attr:function(n,t,r){var u,f,e=n.nodeType;if(n&&e!==3&&e!==8&&e!==2){if(typeof n.getAttribute===o)return i.prop(n,t,r);if(e===1&&i.isXMLDoc(n)||(t=t.toLowerCase(),u=i.attrHooks[t]||(i.expr.match.bool.test(t)?ff:ut)),r!==undefined)if(r===null)i.removeAttr(n,t);else return u&&"set"in u&&(f=u.set(n,r,t))!==undefined?f:(n.setAttribute(t,r+""),r);else return u&&"get"in u&&(f=u.get(n,t))!==null?f:(f=i.find.attr(n,t),f==null?undefined:f)}},removeAttr:function(n,t){var r,u,e=0,f=t&&t.match(h);if(f&&n.nodeType===1)while(r=f[e++])u=i.propFix[r]||r,i.expr.match.bool.test(r)?dt&&g||!yi.test(r)?n[u]=!1:n[i.camelCase("default-"+r)]=n[u]=!1:i.attr(n,r,""),n.removeAttribute(g?r:u)},attrHooks:{type:{set:function(n,t){if(!r.radioValue&&t==="radio"&&i.nodeName(n,"input")){var u=n.value;return n.setAttribute("type",t),u&&(n.value=u),t}}}}});ff={set:function(n,t,r){return t===!1?i.removeAttr(n,r):dt&&g||!yi.test(r)?n.setAttribute(!g&&i.propFix[r]||r,r):n[i.camelCase("default-"+r)]=n[r]=!0,r}};i.each(i.expr.match.bool.source.match(/\w+/g),function(n,t){var r=v[t]||i.find.attr;v[t]=dt&&g||!yi.test(t)?function(n,t,i){var u,f;return i||(f=v[t],v[t]=u,u=r(n,t,i)!=null?t.toLowerCase():null,v[t]=f),u}:function(n,t,r){if(!r)return n[i.camelCase("default-"+t)]?t.toLowerCase():null}});dt&&g||(i.attrHooks.value={set:function(n,t,r){if(i.nodeName(n,"input"))n.defaultValue=t;else return ut&&ut.set(n,t,r)}});g||(ut={set:function(n,t,i){var r=n.getAttributeNode(i);return r||n.setAttributeNode(r=n.ownerDocument.createAttribute(i)),r.value=t+="",i==="value"||t===n.getAttribute(i)?t:void 0}},v.id=v.name=v.coords=function(n,t,i){var r;if(!i)return(r=n.getAttributeNode(t))&&r.value!==""?r.value:null},i.valHooks.button={get:function(n,t){var i=n.getAttributeNode(t);if(i&&i.specified)return i.value},set:ut.set},i.attrHooks.contenteditable={set:function(n,t,i){ut.set(n,t===""?!1:t,i)}},i.each(["width","height"],function(n,t){i.attrHooks[t]={set:function(n,i){if(i==="")return n.setAttribute(t,"auto"),i}}}));r.style||(i.attrHooks.style={get:function(n){return n.style.cssText||undefined},set:function(n,t){return n.style.cssText=t+""}});ef=/^(?:input|select|textarea|button|object)$/i;of=/^(?:a|area)$/i;i.fn.extend({prop:function(n,t){return b(this,i.prop,n,t,arguments.length>1)},removeProp:function(n){return n=i.propFix[n]||n,this.each(function(){try{this[n]=undefined;delete this[n]}catch(t){}})}});i.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(n,t,r){var f,u,o,e=n.nodeType;if(n&&e!==3&&e!==8&&e!==2)return o=e!==1||!i.isXMLDoc(n),o&&(t=i.propFix[t]||t,u=i.propHooks[t]),r!==undefined?u&&"set"in u&&(f=u.set(n,r,t))!==undefined?f:n[t]=r:u&&"get"in u&&(f=u.get(n,t))!==null?f:n[t]},propHooks:{tabIndex:{get:function(n){var t=i.find.attr(n,"tabindex");return t?parseInt(t,10):ef.test(n.nodeName)||of.test(n.nodeName)&&n.href?0:-1}}}});r.hrefNormalized||i.each(["href","src"],function(n,t){i.propHooks[t]={get:function(n){return n.getAttribute(t,4)}}});r.optSelected||(i.propHooks.selected={get:function(n){var t=n.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}});i.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){i.propFix[this.toLowerCase()]=this});r.enctype||(i.propFix.enctype="encoding");gt=/[\t\r\n\f]/g;i.fn.extend({addClass:function(n){var o,t,r,u,s,f,e=0,c=this.length,l=typeof n=="string"&&n;if(i.isFunction(n))return this.each(function(t){i(this).addClass(n.call(this,t,this.className))});if(l)for(o=(n||"").match(h)||[];e<c;e++)if(t=this[e],r=t.nodeType===1&&(t.className?(" "+t.className+" ").replace(gt," "):" "),r){for(s=0;u=o[s++];)r.indexOf(" "+u+" ")<0&&(r+=u+" ");f=i.trim(r);t.className!==f&&(t.className=f)}return this},removeClass:function(n){var o,t,r,u,s,f,e=0,c=this.length,l=arguments.length===0||typeof n=="string"&&n;if(i.isFunction(n))return this.each(function(t){i(this).removeClass(n.call(this,t,this.className))});if(l)for(o=(n||"").match(h)||[];e<c;e++)if(t=this[e],r=t.nodeType===1&&(t.className?(" "+t.className+" ").replace(gt," "):""),r){for(s=0;u=o[s++];)while(r.indexOf(" "+u+" ")>=0)r=r.replace(" "+u+" "," ");f=n?i.trim(r):"";t.className!==f&&(t.className=f)}return this},toggleClass:function(n,t){var r=typeof n;return typeof t=="boolean"&&r==="string"?t?this.addClass(n):this.removeClass(n):i.isFunction(n)?this.each(function(r){i(this).toggleClass(n.call(this,r,this.className,t),t)}):this.each(function(){if(r==="string")for(var t,f=0,u=i(this),e=n.match(h)||[];t=e[f++];)u.hasClass(t)?u.removeClass(t):u.addClass(t);else(r===o||r==="boolean")&&(this.className&&i._data(this,"__className__",this.className),this.className=this.className||n===!1?"":i._data(this,"__className__")||"")})},hasClass:function(n){for(var i=" "+n+" ",t=0,r=this.length;t<r;t++)if(this[t].nodeType===1&&(" "+this[t].className+" ").replace(gt," ").indexOf(i)>=0)return!0;return!1}});i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(n,t){i.fn[t]=function(n,i){return arguments.length>0?this.on(t,null,n,i):this.trigger(t)}});i.fn.extend({hover:function(n,t){return this.mouseenter(n).mouseleave(t||n)},bind:function(n,t,i){return this.on(n,null,t,i)},unbind:function(n,t){return this.off(n,null,t)},delegate:function(n,t,i,r){return this.on(t,n,i,r)},undelegate:function(n,t,i){return arguments.length===1?this.off(n,"**"):this.off(t,n||"**",i)}});var pi=i.now(),wi=/\?/,oo=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;i.parseJSON=function(t){if(n.JSON&&n.JSON.parse)return n.JSON.parse(t+"");var f,r=null,u=i.trim(t+"");return u&&!i.trim(u.replace(oo,function(n,t,i,u){return(f&&t&&(r=0),r===0)?n:(f=i||t,r+=!u-!i,"")}))?Function("return "+u)():i.error("Invalid JSON: "+t)};i.parseXML=function(t){var r,u;if(!t||typeof t!="string")return null;try{n.DOMParser?(u=new DOMParser,r=u.parseFromString(t,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(t))}catch(f){r=undefined}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||i.error("Invalid XML: "+t),r};var nt,y,so=/#.*$/,sf=/([?&])_=[^&]*/,ho=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,co=/^(?:GET|HEAD)$/,lo=/^\/\//,hf=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,cf={},bi={},lf="*/".concat("*");try{y=location.href}catch(ns){y=u.createElement("a");y.href="";y=y.href}nt=hf.exec(y.toLowerCase())||[];i.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:y,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(nt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":lf,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":i.parseJSON,"text xml":i.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(n,t){return t?ki(ki(n,i.ajaxSettings),t):ki(i.ajaxSettings,n)},ajaxPrefilter:af(cf),ajaxTransport:af(bi),ajax:function(n,t){function w(n,t,s,h){var v,it,nt,y,w,c=t;e!==2&&(e=2,k&&clearTimeout(k),l=undefined,b=h||"",u.readyState=n>0?4:0,v=n>=200&&n<300||n===304,s&&(y=ao(r,u,s)),y=vo(r,y,u,v),v?(r.ifModified&&(w=u.getResponseHeader("Last-Modified"),w&&(i.lastModified[f]=w),w=u.getResponseHeader("etag"),w&&(i.etag[f]=w)),n===204||r.type==="HEAD"?c="nocontent":n===304?c="notmodified":(c=y.state,it=y.data,nt=y.error,v=!nt)):(nt=c,(n||!c)&&(c="error",n<0&&(n=0))),u.status=n,u.statusText=(t||c)+"",v?g.resolveWith(o,[it,c,u]):g.rejectWith(o,[u,c,nt]),u.statusCode(p),p=undefined,a&&d.trigger(v?"ajaxSuccess":"ajaxError",[u,r,v?it:nt]),tt.fireWith(o,[u,c]),a&&(d.trigger("ajaxComplete",[u,r]),--i.active||i.event.trigger("ajaxStop")))}typeof n=="object"&&(t=n,n=undefined);t=t||{};var s,c,f,b,k,a,l,v,r=i.ajaxSetup({},t),o=r.context||r,d=r.context&&(o.nodeType||o.jquery)?i(o):i.event,g=i.Deferred(),tt=i.Callbacks("once memory"),p=r.statusCode||{},it={},rt={},e=0,ut="canceled",u={readyState:0,getResponseHeader:function(n){var t;if(e===2){if(!v)for(v={};t=ho.exec(b);)v[t[1].toLowerCase()]=t[2];t=v[n.toLowerCase()]}return t==null?null:t},getAllResponseHeaders:function(){return e===2?b:null},setRequestHeader:function(n,t){var i=n.toLowerCase();return e||(n=rt[i]=rt[i]||n,it[n]=t),this},overrideMimeType:function(n){return e||(r.mimeType=n),this},statusCode:function(n){var t;if(n)if(e<2)for(t in n)p[t]=[p[t],n[t]];else u.always(n[u.status]);return this},abort:function(n){var t=n||ut;return l&&l.abort(t),w(0,t),this}};if(g.promise(u).complete=tt.add,u.success=u.done,u.error=u.fail,r.url=((n||r.url||y)+"").replace(so,"").replace(lo,nt[1]+"//"),r.type=t.method||t.type||r.method||r.type,r.dataTypes=i.trim(r.dataType||"*").toLowerCase().match(h)||[""],r.crossDomain==null&&(s=hf.exec(r.url.toLowerCase()),r.crossDomain=!!(s&&(s[1]!==nt[1]||s[2]!==nt[2]||(s[3]||(s[1]==="http:"?"80":"443"))!==(nt[3]||(nt[1]==="http:"?"80":"443"))))),r.data&&r.processData&&typeof r.data!="string"&&(r.data=i.param(r.data,r.traditional)),vf(cf,r,t,u),e===2)return u;a=i.event&&r.global;a&&i.active++==0&&i.event.trigger("ajaxStart");r.type=r.type.toUpperCase();r.hasContent=!co.test(r.type);f=r.url;r.hasContent||(r.data&&(f=r.url+=(wi.test(f)?"&":"?")+r.data,delete r.data),r.cache===!1&&(r.url=sf.test(f)?f.replace(sf,"$1_="+pi++):f+(wi.test(f)?"&":"?")+"_="+pi++));r.ifModified&&(i.lastModified[f]&&u.setRequestHeader("If-Modified-Since",i.lastModified[f]),i.etag[f]&&u.setRequestHeader("If-None-Match",i.etag[f]));(r.data&&r.hasContent&&r.contentType!==!1||t.contentType)&&u.setRequestHeader("Content-Type",r.contentType);u.setRequestHeader("Accept",r.dataTypes[0]&&r.accepts[r.dataTypes[0]]?r.accepts[r.dataTypes[0]]+(r.dataTypes[0]!=="*"?", "+lf+"; q=0.01":""):r.accepts["*"]);for(c in r.headers)u.setRequestHeader(c,r.headers[c]);if(r.beforeSend&&(r.beforeSend.call(o,u,r)===!1||e===2))return u.abort();ut="abort";for(c in{success:1,error:1,complete:1})u[c](r[c]);if(l=vf(bi,r,t,u),l){u.readyState=1;a&&d.trigger("ajaxSend",[u,r]);r.async&&r.timeout>0&&(k=setTimeout(function(){u.abort("timeout")},r.timeout));try{e=1;l.send(it,w)}catch(ft){if(e<2)w(-1,ft);else throw ft;}}else w(-1,"No Transport");return u},getJSON:function(n,t,r){return i.get(n,t,r,"json")},getScript:function(n,t){return i.get(n,undefined,t,"script")}});i.each(["get","post"],function(n,t){i[t]=function(n,r,u,f){return i.isFunction(r)&&(f=f||u,u=r,r=undefined),i.ajax({url:n,type:t,dataType:f,data:r,success:u})}});i._evalUrl=function(n){return i.ajax({url:n,type:"GET",dataType:"script",async:!1,global:!1,throws:!0})};i.fn.extend({wrapAll:function(n){if(i.isFunction(n))return this.each(function(t){i(this).wrapAll(n.call(this,t))});if(this[0]){var t=i(n,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]);t.map(function(){for(var n=this;n.firstChild&&n.firstChild.nodeType===1;)n=n.firstChild;return n}).append(this)}return this},wrapInner:function(n){return i.isFunction(n)?this.each(function(t){i(this).wrapInner(n.call(this,t))}):this.each(function(){var t=i(this),r=t.contents();r.length?r.wrapAll(n):t.append(n)})},wrap:function(n){var t=i.isFunction(n);return this.each(function(r){i(this).wrapAll(t?n.call(this,r):n)})},unwrap:function(){return this.parent().each(function(){i.nodeName(this,"body")||i(this).replaceWith(this.childNodes)}).end()}});i.expr.filters.hidden=function(n){return n.offsetWidth<=0&&n.offsetHeight<=0||!r.reliableHiddenOffsets()&&(n.style&&n.style.display||i.css(n,"display"))==="none"};i.expr.filters.visible=function(n){return!i.expr.filters.hidden(n)};var yo=/%20/g,po=/\[\]$/,yf=/\r?\n/g,wo=/^(?:submit|button|image|reset|file)$/i,bo=/^(?:input|select|textarea|keygen)/i;i.param=function(n,t){var r,u=[],f=function(n,t){t=i.isFunction(t)?t():t==null?"":t;u[u.length]=encodeURIComponent(n)+"="+encodeURIComponent(t)};if(t===undefined&&(t=i.ajaxSettings&&i.ajaxSettings.traditional),i.isArray(n)||n.jquery&&!i.isPlainObject(n))i.each(n,function(){f(this.name,this.value)});else for(r in n)di(r,n[r],t,f);return u.join("&").replace(yo,"+")};i.fn.extend({serialize:function(){return i.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var n=i.prop(this,"elements");return n?i.makeArray(n):this}).filter(function(){var n=this.type;return this.name&&!i(this).is(":disabled")&&bo.test(this.nodeName)&&!wo.test(n)&&(this.checked||!oi.test(n))}).map(function(n,t){var r=i(this).val();return r==null?null:i.isArray(r)?i.map(r,function(n){return{name:t.name,value:n.replace(yf,"\r\n")}}):{name:t.name,value:r.replace(yf,"\r\n")}}).get()}});i.ajaxSettings.xhr=n.ActiveXObject!==undefined?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&pf()||go()}:pf;var ko=0,ni={},ht=i.ajaxSettings.xhr();return n.attachEvent&&n.attachEvent("onunload",function(){for(var n in ni)ni[n](undefined,!0)}),r.cors=!!ht&&"withCredentials"in ht,ht=r.ajax=!!ht,ht&&i.ajaxTransport(function(n){if(!n.crossDomain||r.cors){var t;return{send:function(r,u){var e,f=n.xhr(),o=++ko;if(f.open(n.type,n.url,n.async,n.username,n.password),n.xhrFields)for(e in n.xhrFields)f[e]=n.xhrFields[e];n.mimeType&&f.overrideMimeType&&f.overrideMimeType(n.mimeType);n.crossDomain||r["X-Requested-With"]||(r["X-Requested-With"]="XMLHttpRequest");for(e in r)r[e]!==undefined&&f.setRequestHeader(e,r[e]+"");f.send(n.hasContent&&n.data||null);t=function(r,e){var s,c,h;if(t&&(e||f.readyState===4))if(delete ni[o],t=undefined,f.onreadystatechange=i.noop,e)f.readyState!==4&&f.abort();else{h={};s=f.status;typeof f.responseText=="string"&&(h.text=f.responseText);try{c=f.statusText}catch(l){c=""}s||!n.isLocal||n.crossDomain?s===1223&&(s=204):s=h.text?200:404}h&&u(s,c,h,f.getAllResponseHeaders())};n.async?f.readyState===4?setTimeout(t):f.onreadystatechange=ni[o]=t:t()},abort:function(){t&&t(undefined,!0)}}}}),i.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(n){return i.globalEval(n),n}}}),i.ajaxPrefilter("script",function(n){n.cache===undefined&&(n.cache=!1);n.crossDomain&&(n.type="GET",n.global=!1)}),i.ajaxTransport("script",function(n){if(n.crossDomain){var t,r=u.head||i("head")[0]||u.documentElement;return{send:function(i,f){t=u.createElement("script");t.async=!0;n.scriptCharset&&(t.charset=n.scriptCharset);t.src=n.url;t.onload=t.onreadystatechange=function(n,i){(i||!t.readyState||/loaded|complete/.test(t.readyState))&&(t.onload=t.onreadystatechange=null,t.parentNode&&t.parentNode.removeChild(t),t=null,i||f(200,"success"))};r.insertBefore(t,r.firstChild)},abort:function(){if(t)t.onload(undefined,!0)}}}}),gi=[],ti=/(=)\?(?=&|$)|\?\?/,i.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var n=gi.pop()||i.expando+"_"+pi++;return this[n]=!0,n}}),i.ajaxPrefilter("json jsonp",function(t,r,u){var f,o,e,s=t.jsonp!==!1&&(ti.test(t.url)?"url":typeof t.data=="string"&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&ti.test(t.data)&&"data");if(s||t.dataTypes[0]==="jsonp")return f=t.jsonpCallback=i.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(ti,"$1"+f):t.jsonp!==!1&&(t.url+=(wi.test(t.url)?"&":"?")+t.jsonp+"="+f),t.converters["script json"]=function(){return e||i.error(f+" was not called"),e[0]},t.dataTypes[0]="json",o=n[f],n[f]=function(){e=arguments},u.always(function(){n[f]=o;t[f]&&(t.jsonpCallback=r.jsonpCallback,gi.push(f));e&&i.isFunction(o)&&o(e[0]);e=o=undefined}),"script"}),i.parseHTML=function(n,t,r){if(!n||typeof n!="string")return null;typeof t=="boolean"&&(r=t,t=!1);t=t||u;var f=er.exec(n),e=!r&&[];return f?[t.createElement(f[1])]:(f=i.buildFragment([n],t,e),e&&e.length&&i(e).remove(),i.merge([],f.childNodes))},nr=i.fn.load,i.fn.load=function(n,t,r){if(typeof n!="string"&&nr)return nr.apply(this,arguments);var u,o,s,f=this,e=n.indexOf(" ");return e>=0&&(u=i.trim(n.slice(e,n.length)),n=n.slice(0,e)),i.isFunction(t)?(r=t,t=undefined):t&&typeof t=="object"&&(s="POST"),f.length>0&&i.ajax({url:n,type:s,dataType:"html",data:t}).done(function(n){o=arguments;f.html(u?i("<div>").append(i.parseHTML(n)).find(u):n)}).complete(r&&function(n,t){f.each(r,o||[n.responseText,t,n])}),this},i.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(n,t){i.fn[t]=function(n){return this.on(t,n)}}),i.expr.filters.animated=function(n){return i.grep(i.timers,function(t){return n===t.elem}).length},tr=n.document.documentElement,i.offset={setOffset:function(n,t,r){var e,o,s,h,u,c,v,l=i.css(n,"position"),a=i(n),f={};l==="static"&&(n.style.position="relative");u=a.offset();s=i.css(n,"top");c=i.css(n,"left");v=(l==="absolute"||l==="fixed")&&i.inArray("auto",[s,c])>-1;v?(e=a.position(),h=e.top,o=e.left):(h=parseFloat(s)||0,o=parseFloat(c)||0);i.isFunction(t)&&(t=t.call(n,r,u));t.top!=null&&(f.top=t.top-u.top+h);t.left!=null&&(f.left=t.left-u.left+o);"using"in t?t.using.call(n,f):a.css(f)}},i.fn.extend({offset:function(n){if(arguments.length)return n===undefined?this:this.each(function(t){i.offset.setOffset(this,n,t)});var t,f,u={top:0,left:0},r=this[0],e=r&&r.ownerDocument;if(e)return(t=e.documentElement,!i.contains(t,r))?u:(typeof r.getBoundingClientRect!==o&&(u=r.getBoundingClientRect()),f=wf(e),{top:u.top+(f.pageYOffset||t.scrollTop)-(t.clientTop||0),left:u.left+(f.pageXOffset||t.scrollLeft)-(t.clientLeft||0)})},position:function(){if(this[0]){var n,r,t={top:0,left:0},u=this[0];return i.css(u,"position")==="fixed"?r=u.getBoundingClientRect():(n=this.offsetParent(),r=this.offset(),i.nodeName(n[0],"html")||(t=n.offset()),t.top+=i.css(n[0],"borderTopWidth",!0),t.left+=i.css(n[0],"borderLeftWidth",!0)),{top:r.top-t.top-i.css(u,"marginTop",!0),left:r.left-t.left-i.css(u,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var n=this.offsetParent||tr;n&&!i.nodeName(n,"html")&&i.css(n,"position")==="static";)n=n.offsetParent;return n||tr})}}),i.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(n,t){var r=/Y/.test(t);i.fn[n]=function(u){return b(this,function(n,u,f){var e=wf(n);if(f===undefined)return e?t in e?e[t]:e.document.documentElement[u]:n[u];e?e.scrollTo(r?i(e).scrollLeft():f,r?f:i(e).scrollTop()):n[u]=f},n,u,arguments.length,null)}}),i.each(["top","left"],function(n,t){i.cssHooks[t]=au(r.pixelPosition,function(n,r){if(r)return r=d(n,t),pt.test(r)?i(n).position()[t]+"px":r})}),i.each({Height:"height",Width:"width"},function(n,t){i.each({padding:"inner"+n,content:t,"":"outer"+n},function(r,u){i.fn[u]=function(u,f){var e=arguments.length&&(r||typeof u!="boolean"),o=r||(u===!0||f===!0?"margin":"border");return b(this,function(t,r,u){var f;return i.isWindow(t)?t.document.documentElement["client"+n]:t.nodeType===9?(f=t.documentElement,Math.max(t.body["scroll"+n],f["scroll"+n],t.body["offset"+n],f["offset"+n],f["client"+n])):u===undefined?i.css(t,r,o):i.style(t,r,u,o)},t,e?u:undefined,e,null)}})}),i.fn.size=function(){return this.length},i.fn.andSelf=i.fn.addBack,typeof define=="function"&&define.amd&&define("jquery",[],function(){return i}),bf=n.jQuery,kf=n.$,i.noConflict=function(t){return n.$===i&&(n.$=kf),t&&n.jQuery===i&&(n.jQuery=bf),i},typeof t===o&&(n.jQuery=n.$=i),i});
//# sourceMappingURL=jquery-1.11.3.min.js.map


/**
 * @module Jadann
 * @author Jadann
 */
var Jadann = {};
(function (Jadann) {
    /**
     * 顶级命名空间，包含工具类方法（utility)、控件集合（Control)、$doc（document的jquery对象）、
     *  win(window对象)、$win(window的jquery对象）
     * @class Jadann
     * @static
     */
    Jadann = Jadann || {};

    /**
     * 根据字符串获取命名空间对象
     * @method namespace
     * @param namespace {string} 命名空间名称
     * @return {object} 返回指定Jadann属性下的对象或值
     * @example
     *    var utility = Jadann.namespace("utility");
     */
    Jadann.namespace = function (namespace) {
        namespace = namespace || "";

        var names = namespace.split("."), root = Jadann;

        if (names.length === 0) {
            return root;
        }

        for (var i = (names[0] === "Jadann" ? 1 : 0), len = names.length; i < len; i++) {
            root[names[i]] = root[names[i]] || {};

            root = root[names[i]];
        }

        return root;
    };

    /**
     * 扩展Jadann属性方法
     * @method expand
     * @param namespace {string} 指定需要添加属性的命名空间
     * @param obj {object} 属性集合对象，指定添加的属性和方法
     * @param cover {boolean} 是否覆盖已存在的属性，默认不覆盖，需覆盖可传true
     * @static
     * @example 
     *      function dataGrid(){
     * 
     *      }
     *      // 添加DataGrid构造函数到Control下
     *      Jadann.expand("Control", {"DataGrid":dataGrid});
     */
    Jadann.expand = function (namespace, obj, cover) {
        var root = Jadann.namespace(namespace);

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (root.hasOwnProperty(prop) && !cover) {
                    continue;
                }

                root[prop] = obj[prop];
            }
        }
    };

    /**
     * 共用方法类
     * @property utility
     * @type Object
     */
    Jadann.utility = null;

    /**
     * document的jquery对象
     * @property $doc
     * @type jQuery
     * @example
     *    
     *      var $doc = Jadann.$doc;
     */
    Jadann.$doc = $(document);

    /**
     * window对象
     * @property win
     * @type DOM
     */
    Jadann.win = window;

    /**
     * window对象的jQuery对象
     * @property win
     * @type DOM
     */
    Jadann.$win = $(Jadann.win);

    /**
     * 控件类，所有Jadann控件都指定到Jadann.Control下
     * @property Control
     * @type Object
     * @example
     *  
     *      Jadann.expand("Control", {"DataGrid":dataGrid});
     */
    Jadann.Control = {};
    Jadann.params = {
        shopId:'12341'
    }
})(Jadann);

/**
 * 工具类:通用方法
 * @class utility
 * @namespace Jadann
 */
(function (Jadann) {
    var utility = {};

    /**
     * 数字转千分位
     * @method toThousands 
     * @param num {string||number} 需转换的字符串或数字，如果字符串不能转换成数字，返回空字符串
     * @param fixed {number} 保留小数位数，可不传
     * @return String
     * @example
     *   实例1：传字符串
     *   Jadann.utility.toThousands("20000"); //20,000
     *   实例2：传字符串，限定小数位数
     *   Jadann.utility.toThousands("20000", 2); //20,000.00 
     *   实例3：传数字
     *   Jadann.utility.toThousands(20000); //20,000
     *   实例4：传数字，限定小数位数
     *   Jadann.utility.toThousands(20000, 2); //20,000.00 
     */
    utility.toThousands = function (num, fixed) {
        var result = "", decimals, integer, pointIndex, isMinus;
        if (utility.isString(num)) {
            num = num.replace(/,/g, "");
        }

        if (!utility.isNumeric(num)) { return ""; }
        isMinus = parseFloat(num) < 0;
        // 保留小数位
        if (fixed) {
            num = parseFloat(num).toFixed(fixed);
        }
        num = num.toString().replace("-", "");
        pointIndex = num.lastIndexOf('.');
        if (pointIndex !== -1) {
            decimals = num.substring(pointIndex + 1, num.length);
            integer = num.substring(0, pointIndex);
        } else {
            integer = num;
        }

        while (integer.length > 3) {
            result = ',' + integer.slice(-3) + result;
            integer = integer.slice(0, integer.length - 3);
        }

        if (integer) {
            result = integer + result;
        }

        if (pointIndex > 0) {
            result += "." + (decimals || "");
        }

        return (isMinus ? "-" : "") + result;
    };

    /**
     * 转为有效数字，目的是去掉千分位(,)
     * @method toNumber
     * @param num {string} 需转换数字或字符串
     * @return string
     * @throws new Error("数字转换失败")
     * @example
     *   var num = "20,000.00";
     *   num = Jadann.utility.toNumber(num);
     *   console.log(num); // "20000.00"
     */
    utility.toNumber = function (num) {
        try {
            num = num.replace(/,/g, "");

            if (utility.isNumeric(num)) {
                return num;
            }
        } catch (e) {
        }

        throw "数字转换失败";
    };

    /**
     * 字符串转日期 
     * @method parseDate
     * @param strDate {string} 格式为：yyyy-MM-dd hh:mm，不符合规格返回null
     * @return Date || null
     * @example
     *    var date = utility.parseDate("2016-11-30 09:00");
     *    date = utility.parseDate("2016-11-30");
     *    date = utility.parseDate("2016年10月30日09时30分");
     *    date = utility.parseDate("2016年10月30日");
     */
    utility.parseDate = function (strDate) {
        var arr, arrDateInfo, arrTimeInfo;
        if (typeof strDate === "undefined" || strDate === "") { return null; }

        try {
            strDate = strDate.replace("年", "-").replace("月", "-").replace("日", " ")
                    .replace("时", ":").replace("分", "");

            arr = strDate.split(" ");
            arrDateInfo = arr[0].split("-");
                    arrTimeInfo = ((arr.length > 1) && arr[1].split(":")) || [0, 0];

            return new Date(arrDateInfo[0], (arrDateInfo.length > 0 ? parseInt(arrDateInfo[1], 10) - 1 : 0),
                (arrDateInfo.length > 2? (arrDateInfo[2] || 1) : 1), arrTimeInfo[0], arrTimeInfo[1],arrTimeInfo[2] || "");
        } catch (ex) {
            return null;
        }
    };

    /**
     * 日期转换字符串格式
     * @method fomartDateString
     * @param date {Date}
     * @param fmt {string}
     * @return String
     * @example
     *    var dateStr = utility.fomartDateString(new Date(), "yyyy-MM-dd");
     *      dateStr = utility.fomartDateString(new Date(), "yyyy-MM-dd hh:mm");
     */
    utility.fomartDateString = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds()
            // 秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                        : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    /**
     * 获取当前时间
     * @method getNow
     * @return Date
     * @example
     *    var now = utility.getNow();
     */
    utility.getNow = function () {
        return new Date();
    };

    /**
     * 获取两个日期相隔天数
     * @method getDatePeriod
     * @param start {Date}
     * @param end {Date}
     * @return Number
     *    var utility = Jadann.utility;
     *    var date1 = utility.parseDate("2016-11-29");
     *    var date2 = utility.parseDate("2016-11-30");
     *    var period = utility.getDatePeriod(date1, date2); // return 1
     */
    utility.getDatePeriod = function (start, end) {
        return Math.abs(start * 1 - end * 1) / 60 / 60 / 1000 / 24;
    };

    /**
     * 获取相隔几天后的日期
     * @method getDateByDaysApart
     * @param date {Date}
     * @param number {number}
     * @return Date
     * @example
     *   var threeDaysLater = utility.getDateByDaysApart(new Date(), 3);
     */
    utility.getDateByDaysApart = function (date, number) {
        return new Date(date.getTime() + 60 * 60 * 1000 * 24 * number);
    };

    /**
     * 获取某个月得第一天
     * @method getFirstDayInMonth
     * @param date {string||date} 
     * @return Date 
     * @throws "传入参数不正确。"
     * @example 
     *  var currMonthFirstDay = utility.getFirstDayInMonth(new Date());
     */
    utility.getFirstDayInMonth = function (date) {
        if (!utility.isDate(date)) {
            date = utility.parseDate(date);

            if (!date) {
                throw "传入参数不正确。";
            }
        }

        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    /**
     * 获取某个月得第一天
     * @method getLastDayInMonth
     * @param date {string||date} 
     * @return Date 
     * @throws "传入参数不正确。"
     * @example 
     *  var currMonthLastDay = utility.getFirstDayInMonth(new Date());
     */
    utility.getLastDayInMonth = function (date) {
        if (!utility.isDate(date)) {
            date = utility.parseDate(date);

            if (!date) {
                throw "传入参数不正确。";
            }
        }

        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };

    /**
     * 日期转换成季度
     * @method parseQuarter
     * @param date {string||date} 
     * @return string
     * @throws null  
     * @example 
     *  var quarter = utility.parseQuarter("2016-09-30");
     *  console.log(quarter); // 2016年第3季度  
     */
    utility.parseQuarter = function (date) {
        if (utility.isString(date)) {
            date = utility.parseDate(date);
        }

        if (utility.isDate(date)) { return utility.getQuarterText(date); }

        return null;
    };

    /**
     * 获取季度文本名称
     * @method getQuarterText
     * @param date {date} 
     * @return string
     * @throws "utility.getQuarterText传入参数不是日期类型" 
     * @example 
     *  var quarter = utility.getQuarterText(utility.parseDate("2016-09-30"));
     *  console.log(quarter); // 2016年第3季度  
     */
    utility.getQuarterText = function (date) {
        if (!utility.isDate(date)) {
            throw "utility.getQuarterText传入参数不是日期类型";
        }

        var text = date.getFullYear() + "年";

        switch (date.getMonth()) {
            case 0:
            case 1:
            case 2:
                text += "第1季度";
                break;
            case 3:
            case 4:
            case 5:
                text += "第2季度";
                break;
            case 6:
            case 7:
            case 8:
                text += "第3季度";
                break;
            case 9:
            case 10:
            case 11:
                text += "第4季度";
                break;
        }

        return text;
    };

    /**
     * 异步请求
     * @method ajax
     * @param url {string} 请求地址
     * @param date {object} 请求参数
     * @param success {function} 请求成功回调函数
     * @param dataType {string} 请求数据类型，例如，html/json
     * @param type {string} 请求方式， 例如，GET/POST
     * @param beforeSend {function} 请求之前调用函数，可用于添加动态图效果
     * @param error {function} 发生错误执行函数
     * @param complete {funciton} 请求完成函数
     * @param contentType {string} 请求内容的类型：application/json;charset=utf-8
     * @async
     * @example 
     *   utility.ajax("/user/getSessionInfo.do", {}, function(data){
     *       if(data["code"]===200)
     *       {
     *              // 执行成功函数
     *        }
     *   }, "json", "GET");
     */
    utility.ajax = function (url, data, success, dataType, type, beforeSend,
            error, complete, contentType) {
        var defaultEvent = {
            beforeSend: function (xhr) {
            },
            error: function (xhr, textStatus, errorThrown) {
                var status = 0, msg = "";
                switch (xhr.status) {
                    case (500):
                        // TODO 服务器系统内部错误
                        msg = "系统内部错误，请联系网站管理员。";
                        status = 500;
                        break;
                    case (401):
                        // TODO 未登录
                        msg = "请登录。";
                        status = 401;
                        break;
                    case (403):
                        // TODO 无权限执行此操作
                        msg = "无权限执行此操作。";
                        status = 403;
                        break;
                    case (408):
                        // TODO 请求超时
                        msg = "请求超时。";
                        status = 408;
                        break;
                    case (0):
                        // TODO cancel
                        break;
                    default:
                        status = 1;
                        // TODO 未知错误
                }
                if (status > 0) {
                    /*Jadann.basePage && Jadann.basePage.prompt("系统提示",
                                    "请联系网站管理员，错误代码：" + xhr.status, [{
                                        name: "关闭",
                                        click: function () {
                                            Jadann.basePage.closePrompt();
                                            Jadann.basePage.setNextBtnEnable();
                                        }
                                    }]);*/
                }
            },
            complete: function (xhr, textStatus) {
                if (typeof (xhr) !== 'undefined') {
                    var responseText = xhr.getResponseHeader("X-Responded-JSON");
                    if (responseText !== null) {
                        /*Jadann.basePage && Jadann.basePage.prompt("系统提示", "登录超时，请重新登录。", [{
                            name: "关闭",
                            click: function () {
                                Jadann.basePage.closePrompt();
                                Jadann.basePage.setNextBtnEnable();
                            }
                        }]);*/
                    }
                }
            }
        }, options;

        url = url + (url.indexOf("?") === -1 ? "?" : "&") + "_=" + (new Date()).getTime();

        options = {
            url: url,
            dataType: dataType || "json",
            data: data || {},
            success: success,
            type: type || 'POST',
            //contentType: 'application/json;charset=utf-8',
            error: error || defaultEvent.error,
            beforeSend: beforeSend || defaultEvent.beforeSend,
            // cache: false,
            complete: complete || defaultEvent.complete
        };

        //contentType && (options.contentType = contentType);

        $.ajax(options);
    };

    /**
     * 获取登录信息
     * @method getSessionInfo
     * @param callback {function} 请求成功回调函数，默认带入三个参数function(bSuccess, msg, data){}
     * @async
     */
    utility.getSessionInfo = function (callback) {
        utility.ajax("/user/getSessionInfo.do", {}, function (msg, status) {
            callback(msg.code == 200 ? true : false, msg.msg, msg.data, msg.code);
        }, "json", "GET");
    };

    /**
     * 异步获取js脚本
     * @method getScript
     * @param url {string} 请求地址
     * @param success {function} 请求回调成功方法
     * @async
     */
    utility.getScript = function (url, success) {
        this.ajax(url, null, success, "script", "GET");
    };

    /**
     * 异步获取html
     * @method getHtml
     * @param url {string} 请求url
     * @param success {function} 请求成功回调
     * @async
     */
    utility.getHtml = function (url, success) {
        this.ajax(url, null, success, "html", "GET");
    };

    /**
     * post/get请求回发函数
     * @method requestCallback
     * @private
     */
    function requestCallback(data, callback, xhr) {
        if (data.code === 400) {
            // 去验证是否处于登录状态：登录状态说明没权限
            utility.getSessionInfo(function (success, msg, data) {
                if (success) {
                    utility.jumpPage("/unauthorized.html");
                } else {
                    var alert, isThjk = location.pathname.indexOf("/thjk/") !== -1;
                    if (isThjk) {
                        alert = "thjkAlert";
                    } else {
                        alert = "redAlert";
                    }
                    utility[alert]("温馨提示", "当前处于未登录状态，请先登录。", function () {
                        /* utility.jumpPage("/member/login.html?frompage="
                         + encodeURIComponent(window.location.pathname + window.location.search))*/
                        if (isThjk) {
                            utility.jumpPage("/member/login.html?frompage="+ encodeURIComponent(window.location.pathname + window.location.search));
                        }
                        else {
                            $(".login").trigger("click");
                        }
                    });
                }
            });
            return false;
        }

        utility.isFunction(callback) && callback(data.code === 200 ? true : false, data.msg, data.data, xhr);
        return true;
    }

    /**
     * 验证是否登录，处理后端返回400，需确认是否用户是否登录状态，
     * 不是通过utility.post、utility.get请求的异步方法都需加此方法
     * @method verifyLogining
     * @param data {object} 请求返回数据
     * @param callback {function} 回调函数
     * @param xhr {object} xhr请求对象
     * @example 
     * utility.ajax(url, data, function (data, status, xhr) {
                requestCallback(data, callback, xhr);
            });
     */
    utility.verifyLogining = requestCallback;

    /**
     * post异步获取数据
     * @method post
     * @param url {string} 请求地址
     * @param data {object} 请求参数对象
     * @param callback {function} 请求成功回调function(@bSuccess, @msg, @data)
     * @param contentType {boolean} 请求内容类型，默认false，为true时，请求参数需JSON2.stringify()处理
     * @async
     * @throws "调用Jadann.utility.post参数错误";
     */
    utility.post = function (url, data, callback, contentType, type) {
        if (utility.isString(url) && url !== "") {
            utility.ajax(url, data, function (data, status, xhr) {
                requestCallback(data, callback, xhr);
            }, void 0, type ? type : void 0, void 0,
            void 0, void 0, contentType ? 'application/json;charset=utf-8' : void 0);
        }
        else {
            throw "调用Jadann.utility.post参数错误";
        }
    };

   /**
    * get异步获取数据
    * @method get
    * @param url {string} 请求地址
    * @param data {object} 请求参数对象
    * @param callback {function} 请求成功回调function(@bSuccess, @msg, @data)
    * @async
    * @throws "调用Jadann.utility.get参数错误";
    */
    utility.get = function (url, data, callback) {
        if (utility.isString(url) && url !== "" && utility.isFunction(callback)) {
            utility.ajax(url, data, function (data, status, xhr) {
                requestCallback(data, callback, xhr);
            }, void 0, "GET");
        }
        else {
            throw "调用Jadann.utility.get参数错误";
        }
    };

    /**
     * 判断是否数组类型
     * @method isArray 
     * @param data 
     * @return boolean
     */
    utility.isArray = function (data) {
        return Object.prototype.toString.call(data) === "[object Array]";
    };

    /**
     * 判断是否NaN值
     * @method isNaN 
     * @param data 
     * @return boolean
     */
    utility.isNaN = function (data) {
        return data !== data;
    };

    /**
     * 判断是否undefined
     * @method isUndefined 
     * @param data 
     * @return boolean
     */
    utility.isUndefined = function (data) {
        return data === void 0;
    };

    /**
     * 判断是否null值
     * @method isNull 
     * @param data 
     * @return boolean
     */
    utility.isNull = function (data) {
        return data === null;
    };

    /**
     * 判断是否有效数字
     * @method isNumeric 
     * @param data 
     * @return boolean
     */
    utility.isNumeric = function (data) {
        // return !isNaN(parseFloat(data)) && isFinite(data);
        return data - parseFloat(data) >= 0;
    };

    /**
     * 判断是否整数类型
     * @method isInt 
     * @param data 
     * @return boolean
     */
    utility.isInt = function (data) {
        return utility.isNumeric(data) && (String(data).indexOf(".") == -1);
    };

    /**
     * 判断是否正整数类型
     * @method isPositiveInt 
     * @param data 
     * @return boolean
     */
    utility.isPositiveInt = function (data) {
        return utility.isInt(data) && (parseInt(data, 10) > 0);
    };

    /**
     * 判断是否日期类型
     * @method isDate 
     * @param data 
     * @return boolean
     */
    utility.isDate = function (data) {
        return (Object.prototype.toString.call(data) === "[object Date]") && data.toString() !== "Invalid date" && !utility.isNaN(data);
    };

    /**
     * 判断是否字符串类型
     * @method isString 
     * @param data 
     * @return boolean
     */
    utility.isString = function (data) {
        return Object.prototype.toString.call(data) === "[object String]";
    };

    /**
     * 判断是否函数
     * @method isFunction 
     * @param data 
     * @return boolean
     */
    utility.isFunction = function (fun) {
        return typeof fun === "function";
    };

    /**
     * 判断是否boolean类型
     * @method isBoolean 
     * @param data 
     * @return boolean
     */
    utility.isBoolean = function (data) {
        return typeof data === "boolean";
    };

    /**
     * 判断是否对象类型
     * @method isObject 
     * @param data 
     * @return boolean
     */
    utility.isObject = function (data) {
        return typeof data === "object";
    };

    /**
     * 判断是否jquery对象类型
     * @method isjQuery 
     * @param data 
     * @return boolean
     */
    utility.isjQuery = function (data) {
        return data instanceof jQuery;
    };

    /**
     * 当前页跳转
     * @method jumpPage 
     * @param url {string} 跳转地址 
     * @example
     *  utility.jumpPage("/index.html");// 跳转首页
     */
    utility.jumpPage = function (url) {
        window.location.assign(url);
    };

    /**
     * 获取当前页url传参
     * @method getQueryParam 
     * @param name {string} 参数名称 
     * @return string||undefined
     * @example
     *  // 假设当前页地址是 http://www.sapyt.com/index.html?id=1234134
     *  console.lgo(utility.getQueryParam("id"));// 1234134
     *  console.lgo(utility.getQueryParam("name")); // undefined
     */
    utility.getQueryParam = function (name) {
        var param = window.location.search.substr(1);
        if (!param) {
            return void 0;
        }

        return utility.getSearchParam(param, name);
    };

    /**
     * 获取指定url上的传参
     * @method getSearchParam
     * @param url {string} url地址 
     * @param name {string} 参数名称 
     * @throws "utility.getSearchParam参数数据"
     * @return string||undefined
     * @example
     *  // 假设当前页地址是 http://www.sapyt.com/index.html?id=1234134
     *  console.lgo(utility.getSearchParam("index.html?id=1234134", "id"));// 1234134
     *  console.lgo(utility.getQueryParam("index.html?id=1234134", "name")); // undefined
     */
    utility.getSearchParam = function (url, name) {
        if (arguments.length !== 2) {
            throw "utility.getSearchParam参数数据";
        }

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.match(reg);

        if (r !== null) {
            return unescape(r[2]);
        }

        return void 0;
    };

    /**
     * 消息弹出层，仅有一个确认按钮。适用于后端返回错误消息
     * @method alert
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param closeCallback {function} 关闭弹出层执行方法，可不传
     * @param width {string} 弹出层宽度
     * @param className {string} 指定弹出层样式，现有默认样式、"redAlert"、"thjk"三种
     * @requires Jadann.Control.PromptBox
     * @example
     *      utility.alert("温馨提示", "当前处于未登录状态，请登录了再试。");
     *      utility.alert("温馨提示", "当前处于未登录状态，请登录了再试。", function(){ //窗口已关闭 });
     *      utility.alert("温馨提示", "当前处于未登录状态，请登录了再试。", void 0, "400px");
     *      utility.alert("温馨提示", "当前处于未登录状态，请登录了再试。", void 0, "400px", "redAlert");
     */
    utility.alert = function (title, msg, closeCallback, width, className) {
        try {
            Jadann.Control.PromptBox.alert(title, msg, closeCallback, width, className);
        } catch (e) {
            alert(msg);
            //utility.isFunction(closeCallback) && closeCallback();
        }
    };

    /**
     * 门户页消息弹出层（redAlert， 偏红色）
     * @method redAlert
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param closeCallback {function} 关闭弹出层执行方法，可不传
     * @example
     *      utility.redAlert("温馨提示", "当前处于未登录状态，请登录了再试。");
     *      utility.redAlert("温馨提示", "当前处于未登录状态，请登录了再试。", function(){ //窗口已关闭 });
     */
    utility.redAlert = function (title, msg, closeCallback) {
        utility.alert(title, msg, closeCallback, "360px", "redAlert");
    };

    /**
     * 投后监控页消息弹出层（redAlert， 浅蓝灰色）
     * @method thjkAlert
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param closeCallback {function} 关闭弹出层执行方法，可不传
     * @example
     *      utility.thjkAlert("温馨提示", "当前处于未登录状态，请登录了再试。");
     *      utility.thjkAlert("温馨提示", "当前处于未登录状态，请登录了再试。", function(){ //窗口已关闭 });
     */
    utility.thjkAlert = function (title, msg, closeCallback) {
        utility.alert(title, msg, closeCallback, "360px", "thjk");
    };

    /**
     * 确认弹出层，默认有一个【确认】按钮和【取消】按钮
     * @method confirm
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param confirmCallback {function} 点击确认按钮执行方法，有两个参数：function(@closefun, $confirmBtn)
     * @param width {string} 弹出层宽度
     * @param className {string} 指定弹出层样式，现有默认样式、"redAlert"、"thjk"三种
     * @requires Jadann.Control.PromptBox
     * @example
     *      utility.confirm("操作提示", "确认删除当前数据吗？", function(closeFun, $btn){ 
     *           // 防止重复提交
     *           if(utility.btnDisabled($btn))
     *           {
     *              return;
     *           }
     *           utility.btnDisabled($btn, true);
     *           // 执行某些操作
     *           utility.btnDisabled($btn, false);
     *           closeFun();//顺利执行完成，关闭提示框
     *      });
     */
    utility.confirm = function (title, msg, confirmCallback, width, className) {
        try {
            Jadann.Control.PromptBox.confirm(title, msg, confirmCallback, width, className);
        } catch (e) {
            if (confim(msg)) {
                //utility.isFunction(confirmCallback) && confirmCallback();
            }
        }
    };

    /**
     * 门户页确认弹出层
     * @method redConfirm
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param confirmCallback {function} 点击确认按钮执行方法，有两个参数：function(@closefun, $confirmBtn)
     * @requires Jadann.Control.PromptBox
     * @example
     *      utility.redConfirm("操作提示", "确认删除当前数据吗？", function(closeFun, $btn){ 
     *           // 防止重复提交
     *           if(utility.btnDisabled($btn))
     *           {
     *              return;
     *           }
     *           utility.btnDisabled($btn, true);
     *           // 执行某些操作
     *           utility.btnDisabled($btn, false);
     *           closeFun();//顺利执行完成，关闭提示框
     *      });
     */
    utility.redConfirm = function (title, msg, confirmCallback) {
        utility.confirm(title, msg, confirmCallback, "360px", "redAlert");
    };

    /**
     * 投后监控确认弹出层
     * @method redConfirm
     * @param title {string} 提示框标题
     * @param msg {string} 提示内容，可传html
     * @param confirmCallback {function} 点击确认按钮执行方法，有两个参数：function(@closefun, $confirmBtn)
     * @requires Jadann.Control.PromptBox
     * @example
     *      utility.thjkConfirm("操作提示", "确认删除当前数据吗？", function(closeFun, $btn){ 
     *           // 防止重复提交
     *           if(utility.btnDisabled($btn))
     *           {
     *              return;
     *           }
     *           utility.btnDisabled($btn, true);
     *           // 执行某些操作
     *           utility.btnDisabled($btn, false);
     *           closeFun();//顺利执行完成，关闭提示框
     *      });
     */
    utility.thjkConfirm = function (title, msg, confirmCallback) {
        utility.confirm(title, msg, confirmCallback, "360", "thjk");
    };

    /**
     * 等待提示框，需长时间等待时可用
     * @method waiting
     * @param msg {string||boolean} 传string提示消息或者传boolean关闭等待提示框
     * @param fun {function} 间隔调用方法，该方法会默认接受当前的消息内容，返回必须是新消息内容function(@message) {return @newMessage}
     * @requires Jadann.Control.PromptBox
     * @example 
     *      utility.waiting("当前正在导入数据，请稍等。");// 显示提示层
     *      utility.post(url, {}, function(bSuccess, msg,data){
     *          utility.waiting(false);// 关闭提示层
     *      });
     */
    utility.waiting = function (msg, fun) {
        try {
            Jadann.Control.PromptBox.waiting(msg, fun);
        } catch (e) {
        }
    };

    /**
     * 保存cookie方法
     * @property cookie
     * @namespace utility
     * @private
     */
    utility.cookie = {};

    /**
     * 设置cookie
     * @method cookie.set
     * @namespace utility
     * @param name {string} 设置cookie名称
     * @param value {string} 设置cookie值
     * @param expiredays {number} 过期天数
     * @example
     *      utility.cookie.set("userId", "13413413");
     *      utility.cookie.set("userId", "13413413", 1); 
     *      utility.cookie.set("userId", "13413413", -1); // 使cookie失效
     */
    utility.cookie.set = function (name, value, expiredays) {
        var date;

        if (utility.isInt(expiredays)) {
            date = new Date();
            date.setDate(date.getDate() + expiredays);
        }

        document.cookie = name + "=" + escape(value) + (!date ? "" : ";expires=" + date.toGMTString());
    };

    /**
     * 设置cookie
     * @method cookie.get
     * @namespace utility
     * @param name {string} 设置cookie名称
     * @return string
     * @example
     *      utility.cookie.set("userId", "13413413");
     *      console.log(utility.cookie.get("userId")); // "13413413"
     */
    utility.cookie.get = function (name) {
        var arr = document.cookie
                .match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));

        if (arr !== null) { return unescape(arr[2]); }

        return null;
    };

    /**
     * ie文档对象加载完成
     * @method ieContentLoaded
     * @param w {window}
     * @param fn {function} 执行方法
     * @private
     */
    utility.ieContentLoaded = function (w, fn) {
        var d = w.document, done = false, init = function () {
            if (!done) {
                done = true;
                fn();
            }
        };

        (function () {
            try {
                d.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(arguments.callee, 50);
                return;
            }
        })();

        d.onreadystatechange = function () {
            if (d.readState === "complete") {
                d.onreadystatechange = null;
                init();
            }
        };
    };

    /**
     * 获取控件html模板
     * @method htmlTemplate
     * @deprecated
     */
    utility.htmlTemplate = (function () {
        var htmlTemplate = {}, input = {
            "Default": ('<div class="form-wrap{$required}">'+ '{$star}<input class="input" type="text" value="{$value}">'+ '</div>')
        }, button = {
            "Default": '<button class="btn btn-default{$cssClass}"><span>{$text}</span></button>',
            "Add": '<button class="btn btn-icon btn-add"><span>新增</span></button>',
            "AddIcon": '<button class="btn btn-add icon-alone" title="新增"><span>新增</span></button>',
            "AddChildren": '<button class="btn btn-icon btn-index"><span>新增子集</span></button>',
            "AddChildrenIcon": '<button class="btn icon-alone btn-index" title="新增子集"><span>新增子集</span></button>',
            "Edit": '<button class="btn btn-icon btn-edit"><span>编辑</span></button>',
            "EditIcon": '<button class="btn btn-edit icon-alone" title="编辑"><span>编辑</span></button>',
            "Delete": '<button class="btn btn-icon btn-delete"><span>删除</span></button>',
            "DeleteIcon": '<button class="btn btn-delete icon-alone" title="删除"><span>删除</span></button>',
            "Move": '<button class="btn btn-icon btn-move"><span>移动</span></button>',
            "MoveIcon": '<button class="btn icon-alone btn-move" title="移动"><span>移动</span></button>',
            "Data": '<button class="btn btn-icon btn-clouddata"><span>数据</span></button>',
            "DataIcon": '<button class="btn icon-alone btn-clouddata" title="数据"><span>数据</span></button>',
            "UpdateData": '<button class="btn btn-icon btn-updatedata"><span>更新数据</span></button>',
            "UpdateDataIcon": '<button class="btn icon-alone btn-updatedata" title="更新数据"><span>更新数据</span></button>',
            "BatchImport": '<button class="btn btn-icon btn-batchimport"><span>批量导入</span></button>',
            "BatchImportIcon": '<button class="btn icon-alone btn-batchimport" title="批量导入"><span>批量导入</span></button>',
            "Export": '<button class="btn btn-icon btn-export"><span>导出</span></button>',
            "ExportIcon": '<button class="btn icon-alone btn-export" title="导出"><span>导出</span></button>',
            "Import": '<button class="btn btn-icon btn-import"><span>导入</span></button>',
            "ImportIcon": '<button class="btn icon-alone btn-import" title="导入"><span>导入</span></button>',
            "AddField": '<button class="btn btn-icon btn-add-field"><span>新增字段</span></button>',
            "AddFieldIcon": '<button class="btn icon-alone btn-add-field" title="新增字段"><span>新增字段</span></button>',
            // 授权
            "Authorize": '<button class="btn btn-icon btn-authorize"><span>授权</span></button>',
            "AuthorizeIcon": '<button class="btn icon-alone btn-authorize" title="授权"><span>授权</span></button>',
            "DownLoad": '<button class="btn btn-icon btn-authorize"><span>下载</span></button>'
        };

        htmlTemplate.getButton = function (type, text, cssClass) {
            if (utility.isArray(type)) {
                var html = [];

                for (var i = 0, len = type.length; i < len; i++) {
                    html.push(htmlTemplate.getButton(type[i], text, cssClass));
                }

                return html.join("");
            } else if (button[type]) {
                if (type === "Default") {
                    return button[type].replace("{$text}", text || "按钮").replace(
                            "{$cssClass}", cssClass ? (" " + cssClass) : "");
                } else {
                    return button[type];
                }
            }

            return "";
        };

        htmlTemplate.getInput = function (type, value, bRequired) {
            if (input[type]) {
                if (type === "Default") {
                    return input[type].replace("{$value}", value || "").replace(
                            "{$required}", bRequired ? (" required") : "").replace(
                            "{$star}", bRequired ? ('<span class="star">*</span>') : "");
                } else {
                    return button[type];
                }
            }

            return "";
        };

        htmlTemplate.getRadioGroup = function () {

        };

        htmlTemplate.getDropList = function () {
            // <div class="Jadann-droplist droplist-filter mr20">
            // <span class="select-value" kd-value="0"
            // kd-text="请选择更新频率">请选择更新频率</span><span
            // class="del-operator"></span>
            // <ul class="data-list">
            // <li class="text-nowrap droplist-select"
            // kd-value="0"><div>请选择更新频率</div></li>
            // <li class="text-nowrap" kd-value="1"><div>年</div></li>
            // <li class="text-nowrap" kd-value="2"><div>月</div></li>
            // <li class="text-nowrap" kd-value="3"><div>日</div></li>
            // </ul>
            // </div>
        };

        return htmlTemplate;
    })(utility);

    /**
     * 获取jquery日期控件选择配置项
     * @method getDatepickerOption
     * @param selectCallback {function} 日期选择函数，选中日期、今天、清空。
     *      funciton(@strDate, @input)默认参数date字符串和输入框元素对象
     * @param minDate {date||string} 最小日期，不传不限制最小值
     * @param maxDate {date||string} 最大日期，不传不限制最大值
     * @return object
     * @example 
     *   $("#date").datepicker(utility.getDatepickerOption(function(strDate){
     *       console.log(strDate); // 打印选中日期
     *   }));
     */
    utility.getDatepickerOption = function (selectCallback, minDate, maxDate) {
        var defaultOpts = {
            altFormat: "yy-mm-dd",
            changeMonth: true,
            currentText: "今天",
            closeText: "清除",
            showButtonPanel: true,
            nextText: "下一月",
            prevText: "上一月",
            // defaultDate: defaultDate,
            onClose: function (input, dp) {
                input.value = "";
            },
            onSelect: null,
            showOtherMonths: true,
            selectOtherMonths: true,
            selectOtherYears: true,
            changeYear: true,
            defaultDate: null
        };
        // 传入第一个参数是函数
        if (utility.isFunction(selectCallback)) {
            defaultOpts.onSelect = selectCallback;
            defaultOpts.onClear = selectCallback;
        } else if (utility.isObject(selectCallback)) {
            defaultOpts = $.extend(true, defaultOpts, selectCallback);
        }

        //minDate && (defaultOpts.minDate = minDate);
        //maxDate && (defaultOpts.maxDate = maxDate);

        return defaultOpts;
    };

    /**
     * 根据fileId下载文件
     * @method downloadFile
     * @param fileId {string} 
     * @deprecated
     */
    utility.downloadFile = function (fileId) {
        utility.downloadFileBySrc(Jadann.DB.g("downloadFile") + "?mongodbId=" + fileId);
    };

    /**
     * 根据src下载文件
     * @method downloadFileBySrc
     * @param src {string}
     * @example
     * // 下载模板
        Jadann.$doc.on("click", ".link-detail", function () {
            var src = Jadann.DB.g("getProfitPlanExcel") + "?moduleId=" + Jadann.Module.Nav.getModuleId(2);
            utility.downloadFileBySrc(src);
        }); 
     */
    utility.downloadFileBySrc = function (src) {
        var iframe = document.createElement("iframe");
        iframe.src = src + (src.indexOf("?") === -1 ? "?" : "&") + "d=" + new Date().getTime();
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    };

    /**
     * 获取百分比圆环配置
     * @method getPercTorusOption
     * @param val {string} 百分比值
     * @param size {number} 尺寸
     * @deprecated
     */
    utility.getPercTorusOption = function (val, size) {
        var completeColor = "#5bc79d", progressColor = "#fc8d00",
            noProgressColor = "#dddddd", opts = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: '',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 8
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        startAngle: 0,
                        endAngle: 360,
                        size: size || 100,
                        borderWidth: 0,
                        enableMouseTracking: false
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '90%',
                    data: [
                        //{ name: 'Progress', y: 100, color: "#fc8d00" }
                    ]
                }]
            };

        val = parseInt(val, 10) || 0;

        opts.title.text = val + "%";
        val = val > 100 && 100 || val;
        opts.title.style = { color: (val >= 100 ? completeColor : progressColor), fontSize: "24px" };
        opts.series[0].data.push({ name: 'Progress', y: val, color: (val >= 100 ? completeColor : progressColor) });
        opts.series[0].data.push({ name: "NoProgress", y: 100 - val, color: noProgressColor });

        return opts;
    };

    /**
     * 加载模板，通过kd-tpl指定模板路径。主要门户用到
     * @method loadTemplate
     * @param callback {function} 加载完成后回调函数
     * @example
     *    页面html如下： 
     *      <div class="wrapper" kd-tpl="templates/header.html"></div>
     *    js调用
     *    Jadann.utility.loadTemplate(); // 加载模板，对动态添加的元素无效，如需要需再执行一遍
     */
    utility.loadTemplate = function (callback) {
        // 定义模板加载后的回调方法
        var tplsCallback = {
            headerCallback: function (navitem, $data) {
                $data.find("a[data-navitem='" + navitem + "']").addClass("selected");

                //utility.triggerCheckSessionInfo();
                utility.checkLogin();
            },
            footerCallback: function () {
            },
            loginCallback: function (params, $data) {

            }
        };

        $("[kd-tpl]").each(function () {
            var $this = $(this), path = $this.attr("kd-tpl"), cb, params = void 0;

            cb = path.split("?").length > 1 ? path.split("?")[1] : null;

            if (cb && (cb.split(":").length > 1)) {
                params = cb.split(":")[1];
                cb = cb.split(":")[0];
            }

            if (path) {
                $this.removeAttr("kd-tpl");
                utility.ajax(path, {}, function (data) {
                    var $data = $(data);
                    var $prev = $this.prev();

                    if (cb && typeof tplsCallback[cb] === "function") {
                        tplsCallback[cb](params, $data);
                    }

                    if ($prev.length === 0) {
                        if ($this.next().length === 0) {
                            $this.parent().append($data);
                        } else {
                            $this.next().before($data);
                        }
                    } else {
                        $prev.after($data);
                    }

                    if (typeof callback === "function") {
                        callback($data);
                    }

                    $this.remove();
                }, "html", "GET");
            }
        });
    };

    /**
     * 触发确认登录，主要门户页用到。跳转到测试工具时需提前验证是否登录
     * @method triggerCheckSessionInfo
     * @async
     * @deprecated
     */
    utility.triggerCheckSessionInfo = function () {
        utility.getSessionInfo(function (success, msg, data) {
            if (success) {
                Jadann.$doc.data("loginName", data.cName);
                Jadann.userId = data.userId;
            }
            Jadann.$doc.data("bCheckLogin", true);
            Jadann.$doc.data("checkLogin")();
        });
    };

    /**
     * 判断退出方法，触发确认登录，显示登录名称等
     * @method checkLogin
     * @private
     * @deprecated
     */
    utility.checkLogin = function () {
        var $doc = $(document), $win = $(window);

        $doc.data("checkLogin", function () {
            var $login = $(".login"), $loginName = $(".login-name"), $signUp = $(".sign-up");

            if ($login.length > 0 && $loginName.length === 0 && $doc.data("bCheckLogin")) {
                if ($doc.data("loginName")) {
                    $login.before('<li class="move-on login-name mobile">'+ $doc.data("loginName") + '</li>');
                    $login.hide();
                    $signUp.before('<li class="move-on logout">退出</li>');
                    $signUp.hide();
                } else {
                    $(".logout").hide();
                    $(".mobile").remove();
                    $login.attr("href", $login.attr("href")+ "?frompage="+ encodeURIComponent(window.location.pathname+ window.location.search)).show();
                    $(".sign-up").show();
                }
            }
        });

        // 退出
        $doc.on("click", ".logout", function () {
            var $this = $(this);
            utility.redConfirm("操作提示", "确认退出吗？", function () {
                $.ajax({
                    type: "GET",
                    url: "/user/logout.do?v=" + Date.parse(new Date()),
                    contentType: "application/x-www-form-urlencoded",
                    dataType: "json",
                    success: function (data) {
                        if (data.code === 200) {
                            $(".logout").remove();
                            $(".mobile").remove();
                            $(".login").show();
                            $(".sign-up").show();
                            if ($this.data("logout") === "function") {
                                $this.data("logout")();
                            }
                            else {
                                window.location.reload();
                            }
                        }
                    }
                });
            });
        });

        utility.triggerCheckSessionInfo();
    };

    /**
     * 设置或获取按钮禁用状态
     * @method btnDisabled
     * @param $btn {jquery} 按钮jquery对象
     * @param disbaled {boolean} 设置$btn的disabled属性值，同时添加btn-disabled
     * @throws "参数错误"
     * @return boolean||undefined 不传第二个参数时返回
     * @example
     *    // 提交数据到后端
     *    Jadann.$doc.on("click", ".btn-save", function(){
     *        var $this = $(this);
     *        // 判断按钮是否禁用
     *        if(utility.btnDisabled($this))
     *        {
     *            return;
     *        }
     *        utility.btnDisabled($this, true);
     *        utility.post(url, {}, function(bsuccess, msg, data){
     *              // 提交完成
     *              utility.btnDisabled($this, false);
     *        });
     *    }):  
     */
    utility.btnDisabled = function ($btn, disabled) {
        if (!$btn || !($btn instanceof jQuery)) {
            throw "参数错误";
        }

        if (utility.isBoolean(disabled)) {
            //disabled ? $btn.addClass("btn-disabled").prop("disabled", true) : $btn.removeClass("btn-disabled").prop("disabled", false);
        }
        else {
            return $btn.hasClass("btn-disabled");
        }

    };

    /**
     * 验证银行卡号：16位到19位银行卡号，仅验证位数
     * @method checkBankCard
     * @param card {string}
     * @return boolean
     */
    utility.checkBankCard = function (card) {
        var sum = 0, num, lastNum, luhm;

        card = card.replace(/\s/g, "");

        if (!card.match(/^\d*$/g) || card.length < 16 || card.length > 20) {
            return false;
        }
        // 取消Luhm校验
        //return true;

        lastNum = card.substring(card.length - 1);
        card = card.substring(0, card.length - 1);

        for (var i = card.length; i > 0; i--) {
            num = parseInt(card.charAt(i - 1), 10);
            if (i % 2 === 1) {
                sum += num * 2 > 9 ? num * 2 - 9 : num * 2;
            } else {
                sum += num;
            }
        }

        luhm = sum % 10 === 0 ? 0 : 10 - sum % 10;

        return luhm === parseInt(lastNum, 10);
    };

    /**
     * 转换银行卡格式，每4位一个空格
     * @method parseBackCard
     * @param val {string}
     * @return string
     * @example 
     *      utility.parseBackCard("12343567890123456");// "1234 5678 9012 3456"
     */
    utility.parseBackCard = function (val) {
        // 替换掉非数字
        if (val) {
            val = val.replace(/\s/g, '');
            if (val.match(/\D/g)) {
                val = val.replace(/\D/g, "");
            }

            if (val.length > 20) {
                val = val.substring(0, 20);
            }
        }

        // 格式化
        return val.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

    /**
     * 复制字符串
     * @method repeat
     * @param target {string} 复制字符串
     * @param n {number} 复制次数
     * @return string
     * @example
     *     utility.repeat("a", 4); // "aaaa"
     */
    utility.repeat = (function () {
        var join = Array.prototype.join, obj = {};

        return function (target, n) {
            obj.length = n + 1;
            return join.call(obj, target);
        };
    })();

    /**
     * 截流函数
     * @method throttle
     * @param fn 间隔执行函数
     * @param interTimer 间隔时间
     * @return function
     * @example
     *    Jadann.$win.on("scroll", utility.throttle(function(e){
     *          console.log(Jadann.$win.scrollTop()); // 滚动时每隔200毫秒打印文档滚动高度 
     *    }, 200));
     */
    utility.throttle = function (fn, interTimer) {
        var _self = fn, timer, first = true;

        return function () {
            var args = arguments,
                me = this;

            if (first) {
                _self.apply(me, args);
                first = true;
                return false;
            }

            if (!timer) {
                return false;
            }

            timer = window.setTimeout(function () {
                window.clearTimeout(timer);
                _self.apply(me, args);
                timer = null;
            }, interTimer || 500);
        };
    };

    /**
     * 表单验证，验证必填，有一个没通过就返回
     * @method valiForm
     * @param $form {jquery} 
     * @param bPromptWarn {boolean} 是否tip提示
     * @return object
     *  {
     *     form {object} 字段集
     *     vali {boolean} 是否验证通过
     *     $elem {jQuery} 验证没通过的单个元素
     *     msg {string} 错误信息 
     *  }
     * @example
     *      html如下：
     *      <form id="formDemo">
     *          <div class="input-wrap required">
                    <span class="star">*</span>
                    <input type="text" prompt-msg="请输入财务凭证号" name="credentialsNum" />
                </div>
                <div class="required cash-group">
                    <span class="star">*</span>
                    <div name="amountType" kd-required="Y" id="ddlInAmountType" kd-async="Y" kd-url="commonInFormFundType" kd-defaultopt="|请选择" kd-valuefield="value" kd-textfield="text" class="Jadann-droplist inline-block w-p50 float-left">
                        <input type="text" class="select-value" prompt-msg="请选择资金性质" readonly="readonly" value="请选择" />
                        <span class="del-operator"></span>
                    </div>
                    <div class="input-wrap inline-block w-p50 float-left">
                        <input type="text" prompt-msg="请输入金额" data-valuetype="Float" name="amount" />
                    </div>
                </div>
                <div class="required">
                    <span class="star">*</span>
                    <div name="investType" id="inFundType" kd-linkage="inInvestor" kd-async="Y" kd-url="investorType" kd-valuefield="code" kd-textfield="name" kd-defaultopt="|请选择" class="Jadann-droplist">
                        <input type="text" class="select-value" prompt-msg="请选择投资方式" readonly="readonly" value="请选择" />
                        <span class="del-operator"></span>
                    </div>
                </div>
                <div class="input-wrap required">
                    <span class="star">*</span>
                    <input type="text" data-valuetype="BankCard" prompt-msg="请输入付款方账号" name="payNum" />
                </div>
            </from>
            js部分：
            Jadann.$doc.on("click", ".btn-save", function(){
                var result = utility.valiForm($("#formDemo", true));
                //没验证通过
                if(!result.vali){
                    return;
                }

                // result.form返回表单数据提交后端
                db.post(url, result.form, function(){});
            });
     */
    utility.valiForm = function ($form, bPromptWarn) {
        var $fields = $form.find("[name]"),
            i = 0, len = $fields.length, $field, valuetype,
               form = {}, name, $input, vali = true, msg = "";

        for (; i < len; i++) {
            $field = $fields.eq(i);
            name = $field.attr("name");
            valuetype = $field.attr("data-valuetype");

            if (!$field.is(":visible")) {
                continue;
            }

            if ($field.attr("type") === "text" || $field[0].tagName.toLowerCase() === "textarea") {
                if (valuetype === "Float" || valuetype === "Int") {
                    form[name] = $field.val().replace(/,/g, "");
                } else if (valuetype === "BankCard") {
                    form[name] = $field.val().replace(/\s/g, "");
                } else {
                    form[name] = $field.val();
                }
            }
            else if ($field.hasClass("Jadann-droplist")) {
                form[name] = $field.attr("kd-value");
            }

            if ($field.parent().hasClass("required") || $field.parent().parent().hasClass("required")) {
                if ($.trim(form[name]) === "" || utility.isUndefined(form[name])) {
                    vali = false;
                    if ($field.hasClass("Jadann-droplist")) {
                        $input = $field.children(".select-value");
                    }
                    else {
                        $input = $field;
                    }
                    msg = $input.attr("prompt-msg");

                    break;
                }
            }

            if (form[name] && valuetype === "BankCard" && !utility.checkBankCard(form[name])) {
                vali = false;
                msg = "银行卡号不正确。";
                $input = $field;
                break;
            }
        }

        var result = { form: form, vali: vali, $elem: $input, msg: msg };

        if (bPromptWarn && !result.vali) {
            result.$elem.trigger("focus");
            utility.triggerPromptWarn(result.$elem, result.msg);
        }

        return result;
    };

    /**
     * 获取单例对象
     * @method getSingleton
     * @param fn 获取单例对象的函数，其返回值保存到inst中
     * @return function
     * @example 
     *      // 返回弹出层对象
     *      var getBoxImport = utility.getSingleton(function(){
     *          var box = new Jadann.Control.Prompt({});
     *          
     *          return box;
     *      }); 
     * 
     *      var box1 = getBoxImport();
     *      var box2 = getBoxImport();
     *      console.log(box1 === box2); // true
     *      box1.show(); // 显示弹出层
     */
    utility.getSingleton = function (fn) {
        var inst = null,
            self = this;

        return function () {
            return inst || (inst = fn.apply(self, arguments));
        };
    };

    /**
     * 获取输入框光标位置
     * @method getInputCursorPos
     * @param input {element} 输入框元素
     * @return number   
     */
    utility.getInputCursorPos = function (input) {
        var cursurPosition = -1;
        if ("selectionStart" in input) {//非IE浏览器
            cursurPosition = input.selectionStart;
        } else {//IE
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            cursurPosition = range.text.length;
        }

        return cursurPosition;
    };

    /**
     * 设置输入框光标位置
     * @method setInputCursorPos
     * @param input {element} 输入框元素
     * @param i     {number} 设置输入框的位置
     */
    utility.setInputCursorPos = function (input, i) {
        var cursurPosition = -1;

        if ("selectionStart" in input) {//非IE浏览器
            input.setSelectionRange(i, i);
        } else {//IE
            var range = input.createTextRange();
            range.move("character", i);
            range.select();
        }
    };

    /**
     * 监听页面离开事件，弹出提示信息，
     *  与utility.removeBeforeUnload搭配使用
     * @method listenBeforeUnload
     * @param msg {string} 提示消息
     * @example
     *    // 表单数据有变化执行
     *    utility.listenBeforeUnload("存在未保存数据，是否离开"); // 用户试图离开页面时将给出提示信息
     *    // 数据保存成功后
     *    utility.removeBeforeUnload(); // 移除监听事件
     */
    utility.listenBeforeUnload = function (msg) {
        Jadann.$win.unbind("beforeunload");
        Jadann.$win.on("beforeunload", function () {
            return msg;
        });
    };

    /**
     * 移除监听页面离开事件
     * @method removeBeforeUnload
     * @example
     *    // 表单数据有变化执行
     *    utility.listenBeforeUnload("存在未保存数据，是否离开"); // 用户试图离开页面时将给出提示信息
     *    // 数据保存成功后
     *    utility.removeBeforeUnload(); // 移除监听事件
     */
    utility.removeBeforeUnload = function () {
        Jadann.$win.unbind("beforeunload");
    };

    Jadann.utility = utility;
})(Jadann);


(function (Jadann) {
    var $doc = Jadann.$doc, utility = Jadann.utility;

    /**
     * 返回五角星图标
     * @method star
     * @param grade 星级数
     * @param type 图形类型 big/black-small/red-samll
     * @deprecated 
     */
    utility.star = function (grade, type) {
        var starGrade = {
            "0.0": "<div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "0.5": "<div class='star-half-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "1.0": "<div class='star-full-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "1.5": "<div class='star-full-" + type + "'></div><div class='star-half-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "2.0": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "2.5": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-half-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "3.0": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-empty-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "3.5": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-half-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "4.0": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "4.5": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-empty-" + type + "'></div>",
            "5.0": "<div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div><div class='star-full-" + type + "'></div>"
        };

        return starGrade[grade] || starGrade["0.0"];
    };

    /**
   * 初始化poshytip提示
   * @method initPromptWarn
   * @param $elem 元素jquery对象
   * @param msg 提示内容
   * @private
   */
    utility.initPromptWarn = function ($elem, msg) {
        $elem.poshytip({
            className: 'tip-darkgray',
            showOn: 'none',
            showTimeout: 1,
            alignTo: 'target',
            alignX: 'center',
            offsetY: 5,
            timeOnScreen: 1500,
            allowTipHover: true,
            content: msg || ""
        });
    };

    var delayTimer = null;

    /**
     * 触发triggerPromptWarn提示
     * @method triggerPromptWarn
     * @param $elem {jquery} 元素jquery对象
     * @param msg {string}提示内容
     * @param bDelayHide {boolean} 是否延迟隐藏
     * @param bFocus {boolean} 是否立刻让元素获取焦点
     * @example 
     *      var $title = $("title");
     *      if(!$title.val())
     *      {
     *          utility.triggerPromptWarn($title, "标题不能为空", true);
     *          return;
     *      }
     */
    utility.triggerPromptWarn = function ($elem, msg, bDelayHide, bFocus) {
        //!$elem.hasClass("prompt-warn") && $elem.addClass("prompt-warn");
        $elem.data("delayHide", bDelayHide ? true : false);

        msg = msg || $elem.attr("prompt-msg");
        utility.initPromptWarn($elem, msg);
        $elem.poshytip("show");

        //bFocus && $elem.trigger("focus");
        if (delayTimer) {
            window.clearTimeout(delayTimer);
        }
        if (bDelayHide) {
            delayTimer = window.setTimeout(function () {
                $elem.removeClass("prompt-warn").poshytip("disable");
            }, 1500);
        }
    };

    /**
     * 触发showPromptWarn提示
     * @method triggerPromptWarn
     * @param $elem {jquery} 元素jquery对象
     * @param msg {string}提示内容
     * @deprecated
     */
    utility.showPromptWarn = function ($elem, msg) {
        if ($elem.data("poshytip")) {
            $elem.poshytip("update", msg);
            $elem.poshytip('enable');
        } else {
            $elem.poshytip({
                className: 'tip-darkgray',
                showOn: 'hover',
                showTimeout: 1,
                alignTo: 'target',
                alignX: 'center',
                offsetY: 5,
                allowTipHover: true,
                content: msg || ""
            });
        }

        $elem.trigger("mouseover");

        if (delayTimer) {
            window.clearTimeout(delayTimer);
        }
        delayTimer = window.setTimeout(function () {
            $elem.poshytip("disable");
        }, 1500);
    };

    /**
     * 默认的一些绑定事件/全局页面绑定事件：例如：输入框数据类型限定
     * @class CommonEvent
     */

    /**
     * 绑定数据库链接
     * @event jumpDataBase
     * @deprecated 
     */
    $doc.on("click", ".more-database ul li", function () {

        var i = $(this).index(),
            pathname = window.location.pathname.split("/"),
            path = "/" + pathname[1] + "/" + pathname[2];
        switch (i) {
            case 0:
                utility.jumpPage("http://" + config.DB.BaseURL + "/home/index?id=3");
                break;
            case 1:

                break;
            case 2:
                utility.jumpPage("/landAuction/list.html");
                break;
            case 3:
                utility.jumpPage("/landCalculate/list.html");
                break;
            case 4:
                utility.jumpPage("/database/benchmarking/list.html");
                break;
            case 5:
                utility.jumpPage("/database/product/list.html");
                break;
            case 6:

                break;
            case 7:

                break;

        }
    });

    /**
     * 绑定trps链接
     * @event tips
     * @deprecated 
     */
    $doc.on("mouseover mouseout", ".tips", function (e) {
        var $this = $(this),
            pos = $this.offset();

        var $topTips = $(".top-tips");
        if ($topTips.length === 0) {
            $("body").append('<div class="top-tips"><span class="tips-msg"></span><div class="nabla"></div></div>');
            $topTips = $(".top-tips");
        }

        if (e.type === "mouseover") {
            $topTips.find(".tips-msg").text($this.attr("tips")).end().css({
                top: pos.top - 30,
                left: pos.left + $this.outerWidth() / 2 - $topTips.outerWidth() / 2
            }).stop().fadeIn();
        } else {
            $topTips.stop().fadeOut();
        }

    });

    /**
     * 输入框失去焦点事件，限定输入框值类型Float/Int/BankCard
     * @event input[type="text"].blur
     * @example
     *   html如下：
     *      // 浮点数，保留4位有效数字，结果1,000.0000，不是数字时值为空并获得焦点
     *      <input type="text" data-valuetype="Float" data-fixed="4" value="10000"/>
     *      // 整数，不是整数时值为空并获得焦点 
     *      <input type="text" data-valuetype="Int" value=""/> 
     *      // 银行卡格式，结果1234 1341 3413 24
     *      <input type="text" data-valuetype="BankCard" value="12341341341324"/>
     */
    $doc.on("blur", "input[type='text']", function () {
        var $this = $(this), val = $this.val().replace(/,/g, ""),
            valueType = $this.attr("data-valuetype"),
            type = $this.attr("kdtype");

        if (type === "datepicker") {
            return;
        }

        // 处理负号的情况、字段类型验证
        if (val === "-" && valueType === "Float" || $.trim(val) !== "" &&
            (valueType === "Float" && !utility.isNumeric(val)|| valueType === "Int" && !utility.isInt(val))||
            val !== "" && $.trim(val) === "") {
            $this.val("").trigger("focus");
            return;
        }

        if (valueType === "Float" && val) {
            var fixed = parseInt($this.attr("data-fixed"));
            if (fixed) {
                $this.val(utility.toThousands((parseFloat(val) || 0).toFixed(fixed)));
            } else {
                $this.val(utility.toThousands((parseFloat(val) || 0).toFixed(2)));
            }
        } else if (valueType === "BankCard") {
            $this.val(utility.parseBackCard(val));
        }
    });

    /**
     * 键盘输入时限定值类型
     * @event checkValueType
     * @example
     *   html如下：
     *      // 浮点数，只能输入数字、-、.
     *      <input type="text" data-valuetype="Float" value=""/>
     *      // 整数，只能输入数字、-、.
     *      <input type="text" data-valuetype="Int" value=""/> 
     *      // 银行卡格式，只能输入数字
     *      <input type="text" data-valuetype="BankCard" value="12341341341324"/> 
     */
    $doc.on("keyup", "input[type='text'], textarea", checkValueType);

    function checkValueType(event) {
        var $this = $(this), val, oldVal = this.value,
            type = $this.attr("data-valuetype");

        if (type === "Float" || type === "Int") {
            // 上下左右键不处理
            if (36 < event.which && event.which < 41) {
                return;
            }

            val = $.trim($this.val());

            // 第一个为负号不处理
            if (val === "-") {
                return;
            }
            val = val.replace(/,/g, "");
            // 实数验证
            if (type === "Float" && !utility.isNumeric(val)) {
                val = val.substring(0, val.length - 1);
            }
                // 整数验证
            else if (type === "Int" && !utility.isInt(val)) {
                val = val.substring(0, val.length - 1);
            }

            // 判断字数超过极限  
            if (parseFloat(val) > 100000000000000) {
                utility.triggerPromptWarn($this, "数字超过最大长度", true);
                val = val.substring(0, 14);
            }

            val = utility.toThousands(val);
        }
        else if (type === "BankCard") {
            //if (!utility.checkBankCard(val)) {
            //    utility.triggerPromptWarn($this, "银行卡号不正确。", true);
            //}
            // 格式化
            val = utility.parseBackCard(this.value);
        }

        // type为 "Float"、"Int"和"BankCard"的情况
        if (!utility.isUndefined(val)) {
            var startPos = utility.getInputCursorPos(this), endPos;
            if (startPos == oldVal.length) {
                $this.val(val);
            }
            else {
                if (val.length > oldVal.length) {
                    endPos = startPos + (val.length - oldVal.length);
                } else if (val.length < oldVal.length) {
                    endPos = startPos - (oldVal.length - val.length);
                }

                $this.val(val);
                utility.setInputCursorPos(this, endPos || startPos);
            }
        }

        if (!$this.data("delayHide") && $this.hasClass("prompt-warn")) {
            $this.removeClass("prompt-warn").poshytip('disable');
        }
    }

    /**
     * 输入框默认选中文本，除日期控件、只读输入框外
     * @event select
     */
    $doc.on("click", "input[type='text'], textarea", function () {
        var $this = $(this);

        if ($this.attr("kdtype") === "datepicker" || $this.prop("readonly") || $this.hasClass("hasDatepicker")) {
            return;
        }
        this.select();
    });

})(Jadann);

/**
 * Created by WUQD on 2016/12/6.
 */
(function ($, Jadann) {
    var utility = Jadann.utility,
        post = utility.post,
        get = utility.get,
        typeEnum = {
            "G": "GET",
            "P": "POST",
            "S":"STRINGIFY" // post形式，传递data需要JSON2.stringify处理
        }, getDBFun = function (config) {
            var type = typeEnum[config["type"]] || typeEnum["G"],
                fn = type === typeEnum["G"] ? get : post;

            // 最多两位参数：1. 仅有回调；2.传参和回调
            return function () {
                var arg = Array.prototype.slice.call(arguments), len = arguments.length;
                if (len === 0) {
                    throw config["url"] + "参数为空请调整";
                }

                // 取出最后一个回调函数
                var callback = arg.pop();
                if (!utility.isFunction(callback)) {
                    throw config["url"] + "最后一个参数非回调函数";
                }

                // 处理参数
                var data = null;
                // 考虑已调用接口传多个参数情况
                if (utility.isFunction(config["convertData"])) {
                    data = config["convertData"].apply(this, arg);
                } else {
                    data = arg.length === 0 ? {} : arg[0];
                }

                fn.call(this, config["url"], type === typeEnum["S"] ? JSON2.stringify(data) : data, callback,
                    type === typeEnum["S"] ? true : void 0);
            };
        };

    Jadann.DB = Jadann.DB || {};

    /**
     * 注册后端接口
     * { url: "/landDeveloper/getDThjkProjectDetailIn.do", type: "GET/POST/STRINGIFY" }
     * @param bCover {boolean} 是否覆盖，为true会替换掉已存在的接口方法
     */
    utility.registerDBInterface = function (config, bCover) {
        for (var prop in config) {

            if (!config.hasOwnProperty(prop)) {
                continue;
            }

            // 检验url属性值是否存在
            if (!config[prop] || !config[prop]["url"]) {
                return;
            }

            // 已经存在跳过
            if (Jadann.DB[prop] && !bCover) {
                continue;
            }

            Jadann.DB[prop] = getDBFun(config[prop]);
            Jadann.DB[prop]["_config"] = config[prop];
        }
    };

    // 获取url地址
    Jadann.DB.g = function (prop) {
        if (!Jadann.DB[prop]) {
            return;
        }

        return Jadann.DB[prop]["_config"]["url"];
    }
})(jQuery, Jadann);
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
;(function (Jadann)
{
    var defaultConfig = {
        title: "温馨提示",
        message: "请确认当前操作",
        // 默认大尺寸
        size: "m",
        isShowBtn: true,
        isShowTitle: true,
        btns: [],
        alone: true,
        $container: null,
        complete: null,
        beforeShow: null,
        onShow: null,
        hideCallback: null,
        promptBoxClass: ""
    }, utility = Jadann.utility;

    /**
    * 作者：张敏强
    * 日期：2016-01-11
    * 提供两种弹出层：
    * 1.共用的弹出层，用于一般的提示信息：
    * PromptBox.show(@title, @message, @btns[,@width]); 或者 PromptBox.show(@options);
    * 2.非共用的弹出层，例如，新增弹出层、删除弹出层等
    * @param @options           {object}配置信息
    * {
    *       @title              {string} 标题
    *       @message            {string} 提示信息
    *       @btns               {array} 格式例如：[{name:"取消", click:function(){PromptBox.instance.hide();},...] 
    *       @size              {string} 提示框尺寸："l":650px、"m":450px、"s": 320px，默认为"m"
    *       @isShowBtn          {boolean} 是否显示按钮区，默认显示
    *       @isShowTitle        {boolean} 是否显示标题，默认显示
    *       @alone              {boolean} 是否独立的弹出层，默认为true
    *       @$container         {jQuery} 包含提示内容的jQuery对象，需提前在页面上构建html
    *       @complete           {function} 弹出层对象生成后的事件，可以初始化弹出层内的元素事件
    *       @beforeShow         {function} 在显示之前调用方法，可以对弹出层内容进行操作
    *       @onShow             {function} 在显示之后调用方法，可以对元素尽心尺寸操作
    *       @hideCallback       {function} 在弹出层隐藏后对弹出层内容进行操作
    * }
    * PromptBox.hide();  // 隐藏提示框
    **/
    function PromptBox(options)
    {
        options = options || {};

        // 是否初始化
        this._isInit = false;
        // 当前配置
        this._defaultConfig = defaultConfig;
        this._currentConfig = $.extend(true, $.extend(true, {}, this._defaultConfig), options);
        this._currentConfig.$container && this._currentConfig.$container.hide();
        PromptBox.count = PromptBox.count + 1;
        this._promptBoxID = "promptBox_wrap" + PromptBox.count;
        //this._zIndex = 1050 + (PromptBox.count - 1) * 10;
    }

    // 初始化弹出层背景遮罩
    PromptBox._init = function ()
    {
        var backDorpHtml = '<div class="promptBox-backdrop"></div>';

        PromptBox.$contentBox = $("body");
        PromptBox.$contentBox.append(backDorpHtml);
        PromptBox.$backdrop = PromptBox.$contentBox.children("div.promptBox-backdrop");
        PromptBox.isInit = true;

        var $doc = $(document);

        $doc.on("click", ".promptBox-btn-wrap", function (e)
        {
            var $promptBox = $(this).closest(".promptBox-wrap"),
                promptBox = $promptBox.data("promptBox"),
                $target = $(e.target);

            if ($target.attr("type") === "button")
            {
                var $btns = promptBox.$btnsWrap.find("input[type='button']");

                if ($btns.index(e.target) != -1)
                {
                    var btn = promptBox._currentConfig["btns"][$btns.index(e.target)];
                    if (typeof btn["click"] === "function")
                    {
                        btn["click"]($target);
                    }

                    if (typeof btn['autoClose'] === "boolean" && btn['autoClose'])
                    {
                        promptBox.hide();

                    }
                }
            }
        });

        // 隐藏
        $doc.on("click", ".promptBox-title-wrap", function (e)
        {
            var $promptBox = $(this).closest(".promptBox-wrap"),
                promptBox = $promptBox.data("promptBox");

            if ($(e.target).hasClass("close"))
            {
                promptBox.hide.call(promptBox);
            }
        });
    };

    PromptBox.visibleBoxTool = (function ()
    {
        var visibleBox = [], tool = {}, zIndex = 1050;

        tool.indexOf = function (promptBox)
        {
            for (var i = 0, len = visibleBox.length; i < len; i++)
            {
                if (promptBox === visibleBox[i])
                {
                    return i;
                }
            }

            return -1;
        };

        tool.insert = function (promptBox)
        {
            tool.del(promptBox);
            visibleBox.push(promptBox);
        }

        tool.del = function (promptBox)
        {
            var index = tool.indexOf(promptBox);

            index !== -1 && visibleBox.splice(index, 1);
        }

        tool.isEmpty = function ()
        {
            return visibleBox.length === 0;
        }

        tool.getLowerBox = function ()
        {
            return visibleBox.length > 0 ? visibleBox[visibleBox.length - 1] : null;
        }

        tool.hide = function (promptBox)
        {
            promptBox.$promptBox.hide();

            tool.del(promptBox);
            if (tool.isEmpty())
            {
                PromptBox.$backdrop.hide();
            }
            else
            {
                var box = tool.getLowerBox();
                if (box)
                {
                    PromptBox.$backdrop.css({ "z-index": (box.$promptBox.css("z-index") - 1) });
                }
            }

            if(promptBox._currentConfig["promptBoxClass"])
            {
                promptBox.$promptBox.removeClass(promptBox._currentConfig["promptBoxClass"]);
            }
        };

        tool.show = function (promptBox)
        {
            tool.insert(promptBox);
            zIndex = zIndex + 10;
            promptBox.$promptBox.css("z-index", zIndex);
            PromptBox.$backdrop.css({ "z-index": (zIndex - 1), "display": "block" });
            if(promptBox._currentConfig["promptBoxClass"])
            {
                promptBox.$promptBox.addClass(promptBox._currentConfig["promptBoxClass"]);
            }
            promptBox.$promptBox.show();
        };

        return tool;
    })(PromptBox);

    PromptBox.count = 0;

    PromptBox.prototype._init = function ()
    {
        this._isInit = true;
        // 构建html
        this._renderHtml();
        //this.$promptBox.css("z-index", this._zIndex);
        this._afreshRender();

        typeof this._currentConfig.complete === "function"
            && this._currentConfig.complete(this._currentConfig.$container, this);
    }

    PromptBox.prototype._renderHtml = function ()
    {
        var htmlTemplate = {
            promptBoxWrap: '<div id={$promptBoxID} class="promptBox-wrap"><div class="promptBox-message-wrap">{$titleWrap}{$messageWrap}{$btnWrap}'
                    + '</div></div>',
            titleWrap: '<div class="promptBox-title-wrap">'
                    + '<div class="promptBox-close-wrap"><button type="button" title="关闭" class="close"><span>×</span></button><div style="clear:both;"></div></div>'
                    + '<h4 class="promptBox-title"><a class="title-link" href="#"><span class="title-icon"></span></a></h4>'
                    + '</div>',
            messageWrap: '<div class="promptBox-message"></div>',
            btnWrap: '<div class="promptBox-btn-wrap"></div>'
        };

        PromptBox.$contentBox.append($(htmlTemplate["promptBoxWrap"].replace(/\{\$titleWrap\}/g, htmlTemplate["titleWrap"])
            .replace(/\{\$messageWrap\}/g, htmlTemplate["messageWrap"])
            .replace(/\{\$btnWrap\}/g, htmlTemplate["btnWrap"]).replace(/\{\$promptBoxID\}/g, this._promptBoxID)));

        this.$promptBox = $("#" + this._promptBoxID);
        this.$promptBox.data("promptBox", this);
        this.$messageWrap = this.$promptBox.children("div.promptBox-message-wrap");
        this.$titleWrap = this.$promptBox.find("div.promptBox-title-wrap");
        this.$title = this.$titleWrap.find("h4.promptBox-title");
        this.$message = this.$promptBox.find("div.promptBox-message");
        this._currentConfig.$container && this.$message.append(this._currentConfig.$container.show());
        this.$btnsWrap = this.$promptBox.find("div.promptBox-btn-wrap");
    }
    // 显示
    PromptBox.prototype.show = function (options)
    {
        if (!PromptBox.isInit)
        {
            PromptBox._init();
        }

        if (!this._isInit)
        {
            this._init();
        }

        //PromptBox.visibleBoxTool.insert(this);
        options && this._reset.apply(this, Array.prototype.slice.call(arguments, 0));

        typeof this._currentConfig.beforeShow === "function"
            && this._currentConfig.beforeShow(this._currentConfig.$container, this);

        //PromptBox.$backdrop.css({ "z-index": (this.$promptBox.css("z-index") - 1), "display": "block" });
        PromptBox.visibleBoxTool.show(this);
        //this.$promptBox.show();

        this.adjustPos();

        typeof this._currentConfig.onShow === "function"
            && this._currentConfig.onShow(this._currentConfig.$container, this);

        Jadann.$win.trigger("resize");
    }

    PromptBox.prototype.adjustPos = function () {
        var top = (Jadann.$win.height() - this.$messageWrap.height()) / 2;
       
        this.$messageWrap.css({ "margin-top": (top < 50 ? 50 : top) });
    };

    // 重新设置
    PromptBox.prototype._reset = function (options)
    {
        var promptBoxConfig, args= arguments;

        if (typeof options === "object")
        {
            if (!options["reset"] && utility.isArray(options["btns"]))
            {
                this._currentConfig["btns"] = [];
            }

            this._currentConfig = $.extend(true, $.extend(true, {}, (options["reset"] ? this._defaultConfig : this._currentConfig)), options);
        }
        else if (typeof options === "string")
        {
            promptBoxConfig = {};
            typeof args[0] === "string" ? promptBoxConfig["title"] = args[0] : "";
            typeof args[1] === "string" ? promptBoxConfig["message"] = args[1] : "";
            Object.prototype.toString.apply(args[2]) === '[object Array]' ? promptBoxConfig["btns"] = args[2] : "";
            typeof args[3] === "string" ? promptBoxConfig["size"] = args[3] : "";

            this._currentConfig = $.extend(true, $.extend(true, {}, this._defaultConfig), promptBoxConfig);
        }

        // 重新渲染：标题、按钮、内容
        this._afreshRender();
    }

    // 重新渲染：标题、按钮、内容
    PromptBox.prototype._afreshRender = function ()
    {
        var size = {
            "l": 650, // 650px
            "m": 450, // 450px
            "s": 320,// 320px
            "large": 650,
            "small": 320,
            "medium": 450,
        }, currentConfig = this._currentConfig;
        // 设置标题
        this.$title.html(currentConfig["title"]);
        // 设置提示信息
        !currentConfig.$container && this.$message.html(currentConfig["message"]);
        // 设置按钮
        this.$btnsWrap.html(this._generateBtnsHtml(currentConfig["btns"]));

        currentConfig["isShowTitle"] ? this.$titleWrap.show() : this.$titleWrap.hide();
        currentConfig["isShowBtn"] ? this.$btnsWrap.show() : this.$btnsWrap.hide();
        this.$messageWrap.css("width", size[currentConfig["size"]] ? size[currentConfig["size"]] : currentConfig["size"]);
    }

    PromptBox.prototype._generateBtnsHtml = function (btns)
    {
        var htmlTemplate = '<input type="button" class="btn btn-default mr10" data-index="{$index}" value="{$name}" />', btnsHtml = [];
        btns = btns;

        for (i = 0, len = btns.length; i < len; i++)
        {
            btnsHtml.push(htmlTemplate.replace(/\{\$name\}/g, btns[i]["name"]).replace(/\{\$index\}/g, i));
        }

        return btnsHtml.join("");
    }

    // 隐藏
    PromptBox.prototype.hide = function ()
    {
        PromptBox.visibleBoxTool.hide(this);
        //PromptBox.visibleBoxTool.del(this);
        //if (PromptBox.visibleBoxTool.isEmpty())
        //{
        //    PromptBox.$backdrop.hide();
        //}
        //else
        //{
        //    var box = PromptBox.visibleBoxTool.getLowerBox();
        //    if (box)
        //    {
        //        PromptBox.$backdrop.css({ "z-index": (box.$promptBox.css("z-index") - 1) });
        //    }
        //}

        typeof this._currentConfig.hideCallback === "function"
            && this._currentConfig.hideCallback(this._currentConfig.$container, this);
    }

    PromptBox.prototype.setTitle= function(title)
    {
        this.$title.html(title);
    }

    PromptBox.prototype.setBtnsOption = function (btnsOption) {
        if (!utility.isArray(btnsOption))
        {
            throw "弹出层设置按钮配置错误。";
        }

        this._currentConfig["btns"] = btnsOption || [];
    }

    /**
     * 共用的一个模板，隐藏后立马消失
     * @param title 提示框标题
     * @param message 提示信息
     * @param closeCallback 关闭提示框执行方法
     * 例如：    
     *  Jadann.Control.PromptBox.alert("温馨提示", "删除成功");
     */
    PromptBox.alert = function (title, message, closeCallback, width, promptBoxClass)
    {
        if (!PromptBox.commonBox)
        {
            PromptBox.commonBox = new PromptBox();
        }

        //var params = Array.prototype.slice.call(arguments, 0);

        //params[2] = [{ name: "关闭", click: function () { typeof closeCallback === "function" && closeCallback(); Jadann.Control.PromptBox.hide(); } }];

        var options = {
            title: title,
            message: message,
            btns: [{
                name: "关闭", click: function () {
                    typeof closeCallback === "function" && closeCallback();
                    PromptBox.commonBox.hide();
                }
            }]
        };

        width && (options["size"] = width);
        promptBoxClass && (options["promptBoxClass"]= promptBoxClass);
        // 重新设置信息
        PromptBox.commonBox.show.call(PromptBox.commonBox, options);
    };

    // 确认框
    /**
     * @param title  确认标题信息
     * @param message 确认信息
     * @param confirmCallback(hideFun) 确认后执行的方法，自带一个隐藏弹出层的方法，需隐藏时直接调用
     * 例如：
     * Jadann.Control.PromptBox.confirm("请确认操作", "确定删除该信息？删除后不可恢复。", function (boxHide) { alert("确认操作！"); boxHide();//隐藏确认层 });
     */
    PromptBox.confirm = function (title, message, confirmCallback, width, promptBoxClass)
    {
        if (!PromptBox.commonBox)
        {
            PromptBox.commonBox = new PromptBox();
        }

       /* var params = Array.prototype.slice.call(arguments, 0);

        params[2] = [
            { name: "确定", click: function ($btn) { typeof confirmCallback === "function" && confirmCallback(Jadann.Control.PromptBox.hide, $btn); } },
            { name: "取消", click: function () { Jadann.Control.PromptBox.hide(); } }
        ];*/
        var options = {
            title: title,
            message: message,
            btns: [{ name: "确定", click: function ($btn) { typeof confirmCallback === "function" && confirmCallback(function () { Jadann.Control.PromptBox.hide(); }, $btn); }  }, { name: "取消", autoClose: true }]

        };
        width && (options["size"] = width);
        promptBoxClass && (options["promptBoxClass"]= promptBoxClass);
        PromptBox.commonBox.show.call(PromptBox.commonBox, options);
    };

    // 等待框
    /**
     * @param message {string/boolean} 提示信息或者关闭窗口
     * @param intervalFun {function} 间隔调用方法
     */
    PromptBox.waiting = function (message, intervalFun) {
        if (!PromptBox.waitingBox) {
            PromptBox.waitingBox = new PromptBox({
                isShowBtn: false,
                isShowTitle: false,
            });
        }

        function msgInterval()
        {
            clearMsgTimer();

            PromptBox.msgTimer = window.setTimeout(function () {
                message = intervalFun(message);
                PromptBox.waitingBox.show({ message: message });
                msgInterval();
            }, 1000);
        }

        function clearMsgTimer(){
            if (PromptBox.msgTimer) {
                window.clearTimeout(PromptBox.msgTimer);
            }
        }


        if (utility.isFunction(intervalFun)) {
            msgInterval();
        }
        else {
            clearMsgTimer();
        }

        if(utility.isString(message))
        {
            PromptBox.waitingBox.show({ message: "<div class='text-center'>" + message + "</div>" });
        } else if (utility.isBoolean(message))
        {
            message ? PromptBox.waitingBox.show() : PromptBox.waitingBox.hide();
        }
    };

    // 弹出层隐藏
    PromptBox.hide = function ()
    {
        PromptBox.commonBox && PromptBox.commonBox.hide();
    };

    $.fn.promptBox = function (options)
    {
        if (typeof options === "string")
        {
            var args = arguments,
				method = options;

            Array.prototype.shift.call(args);

            return this.each(function ()
            {
                var pbox = $(this).data('promptBox');
                if (pbox && pbox[method])
                    pbox[method].apply(pbox, args);
            });
        }


        return this.each(function ()
        {
            var $this = $(this);

            options = options || {};
            options["$container"] = $this;

            $this.data("promptBox", new PromptBox(options));
        });
    };

    Jadann.expand("Control", { PromptBox: PromptBox });
})(Jadann);