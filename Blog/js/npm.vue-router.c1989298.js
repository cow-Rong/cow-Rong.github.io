(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.vue-router"],{"8c4f":function(t,e,r){"use strict";
/*!
  * vue-router v3.5.1
  * (c) 2021 Evan You
  * @license MIT
  */function m(t,e){for(var r in e)t[r]=e[r];return t}function n(t){return"%"+t.charCodeAt(0).toString(16)}var o=/[!'()*]/g,i=/%2C/g,a=function(t){return encodeURIComponent(t).replace(o,n).replace(i,",")};function d(t){try{return decodeURIComponent(t)}catch(t){0}return t}var u=function(t){return null==t||"object"==typeof t?t:String(t)};function c(t){var r={};return(t=t.trim().replace(/^(\?|#|&)/,""))&&t.split("&").forEach(function(t){var e=t.replace(/\+/g," ").split("="),t=d(e.shift()),e=0<e.length?d(e.join("=")):null;void 0===r[t]?r[t]=e:Array.isArray(r[t])?r[t].push(e):r[t]=[r[t],e]}),r}function s(n){var t=n?Object.keys(n).map(function(e){var t=n[e];if(void 0===t)return"";if(null===t)return a(e);if(Array.isArray(t)){var r=[];return t.forEach(function(t){void 0!==t&&(null===t?r.push(a(e)):r.push(a(e)+"="+a(t)))}),r.join("&")}return a(e)+"="+a(t)}).filter(function(t){return 0<t.length}).join("&"):null;return t?"?"+t:""}var p=/\/?$/;function g(t,e,r,n){var o=n&&n.options.stringifyQuery,n=e.query||{};try{n=h(n)}catch(t){}t={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:n,params:e.params||{},fullPath:l(e,o),matched:t?function(t){var e=[];for(;t;)e.unshift(t),t=t.parent;return e}(t):[]};return r&&(t.redirectedFrom=l(r,o)),Object.freeze(t)}function h(t){if(Array.isArray(t))return t.map(h);if(t&&"object"==typeof t){var e,r={};for(e in t)r[e]=h(t[e]);return r}return t}var f=g(null,{path:"/"});function l(t,e){var r=t.path,n=t.query,t=t.hash;return void 0===t&&(t=""),(r||"/")+(e||s)(n=void 0===n?{}:n)+t}function w(t,e,r){return e===f?t===e:!!e&&(t.path&&e.path?t.path.replace(p,"")===e.path.replace(p,"")&&(r||t.hash===e.hash&&y(t.query,e.query)):!(!t.name||!e.name)&&(t.name===e.name&&(r||t.hash===e.hash&&y(t.query,e.query)&&y(t.params,e.params))))}function y(n,o){if(void 0===o&&(o={}),!(n=void 0===n?{}:n)||!o)return n===o;var t=Object.keys(n).sort(),i=Object.keys(o).sort();return t.length===i.length&&t.every(function(t,e){var r=n[t];if(i[e]!==t)return!1;t=o[t];return null==r||null==t?r===t:"object"==typeof r&&"object"==typeof t?y(r,t):String(r)===String(t)})}function b(t,e){return 0===t.path.replace(p,"/").indexOf(e.path.replace(p,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}function v(t){for(var e=0;e<t.matched.length;e++){var r,n=t.matched[e];for(r in n.instances){var o=n.instances[r],i=n.enteredCbs[r];if(o&&i){delete n.enteredCbs[r];for(var a=0;a<i.length;a++)o._isBeingDestroyed||i[a](o)}}}}var x={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,e){var r=e.props,n=e.children,o=e.parent,i=e.data;i.routerView=!0;for(var e=o.$createElement,a=r.name,s=o.$route,r=o._routerViewCache||(o._routerViewCache={}),u=0,c=!1;o&&o._routerRoot!==o;){var p=o.$vnode?o.$vnode.data:{};p.routerView&&u++,p.keepAlive&&o._directInactive&&o._inactive&&(c=!0),o=o.$parent}if(i.routerViewDepth=u,c){var h=r[a],f=h&&h.component;return f?(h.configProps&&R(f,i,h.route,h.configProps),e(f,i,n)):e()}var l=s.matched[u],h=l&&l.components[a];if(!l||!h)return r[a]=null,e();r[a]={component:h},i.registerRouteInstance=function(t,e){var r=l.instances[a];(e&&r!==t||!e&&r===t)&&(l.instances[a]=e)},(i.hook||(i.hook={})).prepatch=function(t,e){l.instances[a]=e.componentInstance},i.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==l.instances[a]&&(l.instances[a]=t.componentInstance),v(s)};f=l.props&&l.props[a];return f&&(m(r[a],{route:s,configProps:f}),R(h,i,s,f)),e(h,i,n)}};function R(t,e,r,n){if(i=e.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0;default:0}}(r,n)){var o,i=e.props=m({},i),a=e.attrs=e.attrs||{};for(o in i)t.props&&o in t.props||(a[o]=i[o],delete i[o])}}function k(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var s=i[a];".."===s?o.pop():"."!==s&&o.push(s)}return""!==o[0]&&o.unshift(""),o.join("/")}function E(t){return t.replace(/\/\//g,"/")}function C(t,e){return $(P(t,e),e)}var A=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},O=M,_=P,j=$,S=I,T=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function P(t,e){for(var r=[],n=0,o=0,i="",a=e&&e.delimiter||"/";null!=(h=T.exec(t));){var s,u,c,p,h,f=h[0],l=h[1],d=h.index;i+=t.slice(o,d),o=d+f.length,l?i+=l[1]:(s=t[o],u=h[2],c=h[3],p=h[4],d=h[5],f=h[6],l=h[7],i&&(r.push(i),i=""),h=h[2]||a,r.push({name:c||n++,prefix:u||"",delimiter:h,optional:"?"===f||"*"===f,repeat:"+"===f||"*"===f,partial:null!=u&&null!=s&&s!==u,asterisk:!!l,pattern:(d=p||d)?d.replace(/([=!:$\/()])/g,"\\$1"):l?".*":"[^"+q(h)+"]+?"}))}return o<t.length&&(i+=t.substr(o)),i&&r.push(i),r}function L(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function $(p,t){for(var h=new Array(p.length),e=0;e<p.length;e++)"object"==typeof p[e]&&(h[e]=new RegExp("^(?:"+p[e].pattern+")$",B(t)));return function(t,e){for(var r="",n=t||{},o=(e||{}).pretty?L:encodeURIComponent,i=0;i<p.length;i++){var a=p[i];if("string"!=typeof a){var s,u=n[a.name];if(null==u){if(a.optional){a.partial&&(r+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be defined')}if(A(u)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var c=0;c<u.length;c++){if(s=o(u[c]),!h[i].test(s))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'", but received `'+JSON.stringify(s)+"`");r+=(0===c?a.prefix:a.delimiter)+s}}else{if(s=a.asterisk?encodeURI(u).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}):o(u),!h[i].test(s))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but received "'+s+'"');r+=a.prefix+s}}else r+=a}return r}}function q(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function U(t,e){return t.keys=e,t}function B(t){return t&&t.sensitive?"":"i"}function I(t,e,r){A(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var s,u,c=t[a];"string"==typeof c?i+=q(c):(s=q(c.prefix),u="(?:"+c.pattern+")",e.push(c),c.repeat&&(u+="(?:"+s+u+")*"),i+=u=c.optional?c.partial?s+"("+u+")?":"(?:"+s+"("+u+"))?":s+"("+u+")")}var p=q(r.delimiter||"/"),h=i.slice(-p.length)===p;return n||(i=(h?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&h?"":"(?="+p+"|$)",U(new RegExp("^"+i,B(r)),e)}function M(t,e,r){return A(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return U(t,e)}(t,e):A(t)?function(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(M(t[o],e,r).source);return U(new RegExp("(?:"+n.join("|")+")",B(r)),e)}(t,e,r):(e=e,I(P(t,r=r),e,r))}O.parse=_,O.compile=C,O.tokensToFunction=j,O.tokensToRegExp=S;var V=Object.create(null);function H(t,e){e=e||{};try{var r=V[t]||(V[t]=O.compile(t));return"string"==typeof e.pathMatch&&(e[0]=e.pathMatch),r(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function N(t,e,r,n){if((o="string"==typeof t?{path:t}:t)._normalized)return o;if(o.name){var o,i=(o=m({},t)).params;return i&&"object"==typeof i&&(o.params=m({},i)),o}if(!o.path&&o.params&&e){(o=m({},o))._normalized=!0;var a=m(m({},e.params),o.params);return e.name?(o.name=e.name,o.params=a):e.matched.length&&(s=e.matched[e.matched.length-1].path,o.path=H(s,a,e.path)),o}var s,i=(t=o.path||"",s=i="",0<=(a=t.indexOf("#"))&&(i=t.slice(a),t=t.slice(0,a)),0<=(a=t.indexOf("?"))&&(s=t.slice(a+1),t=t.slice(0,a)),{path:t,query:s,hash:i}),e=e&&e.path||"/",e=i.path?k(i.path,e,r||o.append):e,n=function(t,e,r){void 0===e&&(e={});var n,o,r=r||c;try{n=r(t||"")}catch(t){n={}}for(o in e){var i=e[o];n[o]=Array.isArray(i)?i.map(u):u(i)}return n}(i.query,o.query,n&&n.options.parseQuery),i=o.hash||i.hash;return{_normalized:!0,path:e,query:n,hash:i=i&&"#"!==i.charAt(0)?"#"+i:i}}function F(){}var z,j=[String,Object],S=[String,Array],D={name:"RouterLink",props:{to:{type:j,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:S,default:"click"}},render:function(t){var e=this,r=this.$router,n=this.$route,o=r.resolve(this.to,n,this.append),i=o.location,a=o.route,s=o.href,u={},c=r.options.linkActiveClass,p=r.options.linkExactActiveClass,o=null==this.activeClass?null==c?"router-link-active":c:this.activeClass,c=null==this.exactActiveClass?null==p?"router-link-exact-active":p:this.exactActiveClass,p=a.redirectedFrom?g(null,N(a.redirectedFrom),null,r):a;u[c]=w(n,p,this.exactPath),u[o]=this.exact||this.exactPath?u[c]:b(n,p);function h(t){J(t)&&(e.replace?r.replace(i,F):r.push(i,F))}var n=u[c]?this.ariaCurrentValue:null,f={click:J};Array.isArray(this.event)?this.event.forEach(function(t){f[t]=h}):f[this.event]=h;p={class:u},c=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:s,route:a,navigate:h,isActive:u[o],isExactActive:u[c]});if(c){if(0,1===c.length)return c[0];if(1<c.length||!c.length)return 0===c.length?t():t("span",{},c)}if(0,"a"===this.tag)p.on=f,p.attrs={href:s,"aria-current":n};else{c=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(c){c.isStatic=!1;var l,d,y=c.data=m({},c.data);for(l in y.on=y.on||{},y.on){var v=y.on[l];l in f&&(y.on[l]=Array.isArray(v)?v:[v])}for(d in f)d in y.on?y.on[d].push(f[d]):y.on[d]=h;c=c.data.attrs=m({},c.data.attrs);c.href=s,c["aria-current"]=n}else p.on=f}return t(this.tag,p,this.$slots.default)}};function J(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function K(t){var n,e,r;K.installed&&z===t||(K.installed=!0,n=function(t){return void 0!==t},e=function(t,e){var r=t.$options._parentVnode;n(r)&&n(r=r.data)&&n(r=r.registerRouteInstance)&&r(t,e)},(z=t).mixin({beforeCreate:function(){n(this.$options.router)?((this._routerRoot=this)._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,e(this,this)},destroyed:function(){e(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",x),t.component("RouterLink",D),(r=t.config.optionMergeStrategies).beforeRouteEnter=r.beforeRouteLeave=r.beforeRouteUpdate=r.created)}var Q="undefined"!=typeof window;function X(t,e,r,n,o){var i=e||[],a=r||Object.create(null),s=n||Object.create(null);t.forEach(function(t){!function r(n,o,i,t,e,a){var s=t.path;var u=t.name;0;var c=t.pathToRegexpOptions||{};var s=W(s,e,c.strict);"boolean"==typeof t.caseSensitive&&(c.sensitive=t.caseSensitive);var p={path:s,regex:Y(s,c),components:t.components||{default:t.component},alias:t.alias?"string"==typeof t.alias?[t.alias]:t.alias:[],instances:{},enteredCbs:{},name:u,parent:e,matchAs:a,redirect:t.redirect,beforeEnter:t.beforeEnter,meta:t.meta||{},props:null==t.props?{}:t.components?t.props:{default:t.props}};t.children&&t.children.forEach(function(t){var e=a?E(a+"/"+t.path):void 0;r(n,o,i,t,p,e)});o[p.path]||(n.push(p.path),o[p.path]=p);if(void 0!==t.alias)for(var h=Array.isArray(t.alias)?t.alias:[t.alias],f=0;f<h.length;++f){var l=h[f];0;var l={path:l,children:t.children};r(n,o,i,l,e,p.path||"/")}u&&(i[u]||(i[u]=p))}(i,a,s,t,o)});for(var u=0,c=i.length;u<c;u++)"*"===i[u]&&(i.push(i.splice(u,1)[0]),c--,u--);return{pathList:i,pathMap:a,nameMap:s}}function Y(t,e){return O(t,[],e)}function W(t,e,r){return"/"===(t=!r?t.replace(/\/$/,""):t)[0]||null==e?t:E(e.path+"/"+t)}function G(t,u){var t=X(t),c=t.pathList,p=t.pathMap,h=t.nameMap;function f(t,e,r){var n=N(t,e,!1,u),t=n.name;if(t){t=h[t];if(0,!t)return l(null,n);var o=t.regex.keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof n.params&&(n.params={}),e&&"object"==typeof e.params)for(var i in e.params)!(i in n.params)&&-1<o.indexOf(i)&&(n.params[i]=e.params[i]);return n.path=H(t.path,n.params),l(t,n,r)}if(n.path){n.params={};for(var a=0;a<c.length;a++){var s=c[a],s=p[s];if(function(t,e,r){var n=e.match(t);{if(!n)return!1;if(!r)return!0}for(var o=1,i=n.length;o<i;++o){var a=t.keys[o-1];a&&(r[a.name||"pathMatch"]="string"==typeof n[o]?d(n[o]):n[o])}return!0}(s.regex,n.path,n.params))return l(s,n,r)}}return l(null,n)}function n(t,e){var r=t.redirect,n="function"==typeof r?r(g(t,e,null,u)):r;if(!(n="string"==typeof n?{path:n}:n)||"object"!=typeof n)return l(null,e);var o=n,i=o.name,a=o.path,s=e.query,r=e.hash,n=e.params,s=o.hasOwnProperty("query")?o.query:s,r=o.hasOwnProperty("hash")?o.hash:r,n=o.hasOwnProperty("params")?o.params:n;if(i){h[i];return f({_normalized:!0,name:i,query:s,hash:r,params:n},void 0,e)}if(a){t=k(a,(t=t).parent?t.parent.path:"/",!0);return f({_normalized:!0,path:H(t,n),query:s,hash:r},void 0,e)}return l(null,e)}function l(t,e,r){return t&&t.redirect?n(t,r||e):t&&t.matchAs?function(t,e){var r=f({_normalized:!0,path:H(e,t.params)});if(r){e=r.matched,e=e[e.length-1];return t.params=r.params,l(e,t)}return l(null,t)}(e,t.matchAs):g(t,e,r,u)}return{match:f,addRoute:function(t,e){var r="object"!=typeof t?h[t]:void 0;X([e||t],c,p,h,r),r&&X(r.alias.map(function(t){return{path:t,children:[e]}}),c,p,h,r)},getRoutes:function(){return c.map(function(t){return p[t]})},addRoutes:function(t){X(t,c,p,h)}}}var Z=Q&&window.performance&&window.performance.now?window.performance:Date;function tt(){return Z.now().toFixed(3)}var et=tt();function rt(t){return et=t}var nt=Object.create(null);function ot(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),t=m({},window.history.state);return t.key=et,window.history.replaceState(t,"",e),window.addEventListener("popstate",st),function(){window.removeEventListener("popstate",st)}}function it(r,n,o,i){var a;!r.app||(a=r.options.scrollBehavior)&&r.app.$nextTick(function(){var e=function(){var t=et;if(t)return nt[t]}(),t=a.call(r,n,o,i?e:null);t&&("function"==typeof t.then?t.then(function(t){ft(t,e)}).catch(function(t){0}):ft(t,e))})}function at(){et&&(nt[et]={x:window.pageXOffset,y:window.pageYOffset})}function st(t){at(),t.state&&t.state.key&&rt(t.state.key)}function ut(t){return pt(t.x)||pt(t.y)}function ct(t){return{x:pt(t.x)?t.x:window.pageXOffset,y:pt(t.y)?t.y:window.pageYOffset}}function pt(t){return"number"==typeof t}var ht=/^#\d/;function ft(t,e){var r,n,o,i="object"==typeof t;i&&"string"==typeof t.selector?(r=ht.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector))?(n=t.offset&&"object"==typeof t.offset?t.offset:{},n={x:pt((o=n).x)?o.x:0,y:pt(o.y)?o.y:0},o=r,r=n,n=document.documentElement.getBoundingClientRect(),e={x:(o=o.getBoundingClientRect()).left-n.left-r.x,y:o.top-n.top-r.y}):ut(t)&&(e=ct(t)):i&&ut(t)&&(e=ct(t)),e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var lt=Q&&((-1===(Vt=window.navigator.userAgent).indexOf("Android 2.")&&-1===Vt.indexOf("Android 4.0")||-1===Vt.indexOf("Mobile Safari")||-1!==Vt.indexOf("Chrome")||-1!==Vt.indexOf("Windows Phone"))&&(window.history&&"function"==typeof window.history.pushState));function dt(e,r){at();var t,n=window.history;try{r?((t=m({},n.state)).key=et,n.replaceState(t,"",e)):n.pushState({key:rt(tt())},"",e)}catch(t){window.location[r?"replace":"assign"](e)}}function yt(t){dt(t,!0)}function vt(e,r,n){var o=function(t){t>=e.length?n():e[t]?r(e[t],function(){o(t+1)}):o(t+1)};o(0)}var mt={redirected:2,aborted:4,cancelled:8,duplicated:16};function gt(t,e){return bt(t,e,mt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+function(e){if("string"==typeof e)return e;if("path"in e)return e.path;var r={};return xt.forEach(function(t){t in e&&(r[t]=e[t])}),JSON.stringify(r,null,2)}(e)+'" via a navigation guard.')}function wt(t,e){return bt(t,e,mt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function bt(t,e,r,n){n=new Error(n);return n._isRouter=!0,n.from=t,n.to=e,n.type=r,n}var xt=["params","query","hash"];function Rt(t){return-1<Object.prototype.toString.call(t).indexOf("Error")}function kt(t,e){return Rt(t)&&t._isRouter&&(null==e||t.type===e)}function Et(r){return function(t,e,s){var u=!1,c=0,p=null;Ct(r,function(r,t,n,o){if("function"==typeof r&&void 0===r.cid){u=!0,c++;var e,i=_t(function(t){var e;((e=t).__esModule||Ot&&"Module"===e[Symbol.toStringTag])&&(t=t.default),r.resolved="function"==typeof t?t:z.extend(t),n.components[o]=t,--c<=0&&s()}),a=_t(function(t){var e="Failed to resolve async component "+o+": "+t;p||(p=Rt(t)?t:new Error(e),s(p))});try{e=r(i,a)}catch(t){a(t)}e&&("function"==typeof e.then?e.then(i,a):(e=e.component)&&"function"==typeof e.then&&e.then(i,a))}}),u||s()}}function Ct(t,r){return At(t.map(function(e){return Object.keys(e.components).map(function(t){return r(e.components[t],e.instances[t],e,t)})}))}function At(t){return Array.prototype.concat.apply([],t)}var Ot="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function _t(r){var n=!1;return function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];if(!n)return n=!0,r.apply(this,t)}}S=function(t,e){this.router=t,this.base=function(t){{var e;t=t||(Q?(e=document.querySelector("base"),(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")):"/")}"/"!==t.charAt(0)&&(t="/"+t);return t.replace(/\/$/,"")}(e),this.current=f,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};function jt(t,o,i,e){t=Ct(t,function(t,e,r,n){t=function(t,e){"function"!=typeof t&&(t=z.extend(t));return t.options[e]}(t,o);if(t)return Array.isArray(t)?t.map(function(t){return i(t,e,r,n)}):i(t,e,r,n)});return At(e?t.reverse():t)}function St(t,e){if(e)return function(){return t.apply(e,arguments)}}S.prototype.listen=function(t){this.cb=t},S.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},S.prototype.onError=function(t){this.errorCbs.push(t)},S.prototype.transitionTo=function(t,e,r){var n,o=this;try{n=this.router.match(t,this.current)}catch(e){throw this.errorCbs.forEach(function(t){t(e)}),e}var i=this.current;this.confirmTransition(n,function(){o.updateRoute(n),e&&e(n),o.ensureURL(),o.router.afterHooks.forEach(function(t){t&&t(n,i)}),o.ready||(o.ready=!0,o.readyCbs.forEach(function(t){t(n)}))},function(e){r&&r(e),e&&!o.ready&&(kt(e,mt.redirected)&&i===f||(o.ready=!0,o.readyErrorCbs.forEach(function(t){t(e)})))})},S.prototype.confirmTransition=function(o,t,r){var i=this,a=this.current;this.pending=o;function s(e){!kt(e)&&Rt(e)&&i.errorCbs.length&&i.errorCbs.forEach(function(t){t(e)}),r&&r(e)}var e=o.matched.length-1,n=a.matched.length-1;if(w(o,a)&&e==n&&o.matched[e]===a.matched[n])return this.ensureURL(),s(((c=bt(c=a,o,mt.duplicated,'Avoided redundant navigation to current location: "'+c.fullPath+'".')).name="NavigationDuplicated",c));function u(t,n){if(i.pending!==o)return s(wt(a,o));try{t(o,a,function(t){var e,r;!1===t?(i.ensureURL(!0),s(bt(e=a,r=o,mt.aborted,'Navigation aborted from "'+e.fullPath+'" to "'+r.fullPath+'" via a navigation guard.'))):Rt(t)?(i.ensureURL(!0),s(t)):"string"==typeof t||"object"==typeof t&&("string"==typeof t.path||"string"==typeof t.name)?(s(gt(a,o)),"object"==typeof t&&t.replace?i.replace(t):i.push(t)):n(t)})}catch(t){s(t)}}var e=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,o.matched),n=e.updated,c=e.deactivated,p=e.activated,n=[].concat(jt(c,"beforeRouteLeave",St,!0),this.router.beforeHooks,jt(n,"beforeRouteUpdate",St),p.map(function(t){return t.beforeEnter}),Et(p));vt(n,u,function(){vt(jt(p,"beforeRouteEnter",function(t,e,r,n){return o=t,i=r,a=n,function(t,e,r){return o(t,e,function(t){"function"==typeof t&&(i.enteredCbs[a]||(i.enteredCbs[a]=[]),i.enteredCbs[a].push(t)),r(t)})};var o,i,a}).concat(i.router.resolveHooks),u,function(){return i.pending!==o?(s(wt(a,o)),0):(i.pending=null,t(o),void(i.router.app&&i.router.app.$nextTick(function(){v(o)})))})})},S.prototype.updateRoute=function(t){this.current=t,this.cb&&this.cb(t)},S.prototype.setupListeners=function(){},S.prototype.teardown=function(){this.listeners.forEach(function(t){t()}),this.listeners=[],this.current=f,this.pending=null};var Tt=function(r){function t(t,e){r.call(this,t,e),this._startLocation=Pt(this.base)}return r&&(t.__proto__=r),((t.prototype=Object.create(r&&r.prototype)).constructor=t).prototype.setupListeners=function(){var r,t,n,e,o=this;0<this.listeners.length||(t=(r=this.router).options.scrollBehavior,(n=lt&&t)&&this.listeners.push(ot()),e=function(){var e=o.current,t=Pt(o.base);o.current===f&&t===o._startLocation||o.transitionTo(t,function(t){n&&it(r,t,e,!0)})},window.addEventListener("popstate",e),this.listeners.push(function(){window.removeEventListener("popstate",e)}))},t.prototype.go=function(t){window.history.go(t)},t.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){dt(E(n.base+t.fullPath)),it(n.router,t,o,!1),e&&e(t)},r)},t.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){yt(E(n.base+t.fullPath)),it(n.router,t,o,!1),e&&e(t)},r)},t.prototype.ensureURL=function(t){Pt(this.base)!==this.current.fullPath&&(t?dt:yt)(E(this.base+this.current.fullPath))},t.prototype.getCurrentLocation=function(){return Pt(this.base)},t}(S);function Pt(t){var e=window.location.pathname;return((e=t&&0===e.toLowerCase().indexOf(t.toLowerCase())?e.slice(t.length):e)||"/")+window.location.search+window.location.hash}var Lt=function(n){function t(t,e,r){n.call(this,t,e),r&&function(t){var e=Pt(t);if(!/^\/#/.test(e))return window.location.replace(E(t+"/#"+e)),!0}(this.base)||$t()}return n&&(t.__proto__=n),((t.prototype=Object.create(n&&n.prototype)).constructor=t).prototype.setupListeners=function(){var t,r,e,n,o=this;0<this.listeners.length||(t=this.router.options.scrollBehavior,(r=lt&&t)&&this.listeners.push(ot()),e=function(){var e=o.current;$t()&&o.transitionTo(qt(),function(t){r&&it(o.router,t,e,!0),lt||It(t.fullPath)})},n=lt?"popstate":"hashchange",window.addEventListener(n,e),this.listeners.push(function(){window.removeEventListener(n,e)}))},t.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Bt(t.fullPath),it(n.router,t,o,!1),e&&e(t)},r)},t.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){It(t.fullPath),it(n.router,t,o,!1),e&&e(t)},r)},t.prototype.go=function(t){window.history.go(t)},t.prototype.ensureURL=function(t){var e=this.current.fullPath;qt()!==e&&(t?Bt:It)(e)},t.prototype.getCurrentLocation=qt,t}(S);function $t(){var t=qt();if("/"===t.charAt(0))return 1;It("/"+t)}function qt(){var t=window.location.href,e=t.indexOf("#");return e<0?"":t=t.slice(e+1)}function Ut(t){var e=window.location.href,r=e.indexOf("#");return(0<=r?e.slice(0,r):e)+"#"+t}function Bt(t){lt?dt(Ut(t)):window.location.hash=t}function It(t){lt?yt(Ut(t)):window.location.replace(Ut(t))}var Mt=function(r){function t(t,e){r.call(this,t,e),this.stack=[],this.index=-1}return r&&(t.__proto__=r),((t.prototype=Object.create(r&&r.prototype)).constructor=t).prototype.push=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)},r)},t.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)},r)},t.prototype.go=function(t){var r,n=this,o=this.index+t;o<0||o>=this.stack.length||(r=this.stack[o],this.confirmTransition(r,function(){var e=n.current;n.index=o,n.updateRoute(r),n.router.afterHooks.forEach(function(t){t&&t(r,e)})},function(t){kt(t,mt.duplicated)&&(n.index=o)}))},t.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},t.prototype.ensureURL=function(){},t}(S),Vt=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=G(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!lt&&!1!==t.fallback,this.fallback&&(e="hash"),this.mode=e=!Q?"abstract":e){case"history":this.history=new Tt(this,t.base);break;case"hash":this.history=new Lt(this,t.base,this.fallback);break;case"abstract":this.history=new Mt(this,t.base);break;default:0}},S={currentRoute:{configurable:!0}};function Ht(e,r){return e.push(r),function(){var t=e.indexOf(r);-1<t&&e.splice(t,1)}}Vt.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},S.currentRoute.get=function(){return this.history&&this.history.current},Vt.prototype.init=function(e){var n,t,o=this;this.apps.push(e),e.$once("hook:destroyed",function(){var t=o.apps.indexOf(e);-1<t&&o.apps.splice(t,1),o.app===e&&(o.app=o.apps[0]||null),o.app||o.history.teardown()}),this.app||(this.app=e,((n=this.history)instanceof Tt||n instanceof Lt)&&(t=function(t){var e,r;n.setupListeners(),e=t,r=n.current,t=o.options.scrollBehavior,lt&&t&&"fullPath"in e&&it(o,e,r,!1)},n.transitionTo(n.getCurrentLocation(),t,t)),n.listen(function(e){o.apps.forEach(function(t){t._route=e})}))},Vt.prototype.beforeEach=function(t){return Ht(this.beforeHooks,t)},Vt.prototype.beforeResolve=function(t){return Ht(this.resolveHooks,t)},Vt.prototype.afterEach=function(t){return Ht(this.afterHooks,t)},Vt.prototype.onReady=function(t,e){this.history.onReady(t,e)},Vt.prototype.onError=function(t){this.history.onError(t)},Vt.prototype.push=function(r,t,e){var n=this;if(!t&&!e&&"undefined"!=typeof Promise)return new Promise(function(t,e){n.history.push(r,t,e)});this.history.push(r,t,e)},Vt.prototype.replace=function(r,t,e){var n=this;if(!t&&!e&&"undefined"!=typeof Promise)return new Promise(function(t,e){n.history.replace(r,t,e)});this.history.replace(r,t,e)},Vt.prototype.go=function(t){this.history.go(t)},Vt.prototype.back=function(){this.go(-1)},Vt.prototype.forward=function(){this.go(1)},Vt.prototype.getMatchedComponents=function(t){t=t?t.matched?t:this.resolve(t).route:this.currentRoute;return t?[].concat.apply([],t.matched.map(function(e){return Object.keys(e.components).map(function(t){return e.components[t]})})):[]},Vt.prototype.resolve=function(t,e,r){t=N(t,e=e||this.history.current,r,this),r=this.match(t,e),e=r.redirectedFrom||r.fullPath;return{location:t,route:r,href:function(t,e,r){e="hash"===r?"#"+e:e;return t?E(t+"/"+e):e}(this.history.base,e,this.mode),normalizedTo:t,resolved:r}},Vt.prototype.getRoutes=function(){return this.matcher.getRoutes()},Vt.prototype.addRoute=function(t,e){this.matcher.addRoute(t,e),this.history.current!==f&&this.history.transitionTo(this.history.getCurrentLocation())},Vt.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==f&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(Vt.prototype,S),Vt.install=K,Vt.version="3.5.1",Vt.isNavigationFailure=kt,Vt.NavigationFailureType=mt,Vt.START_LOCATION=f,Q&&window.Vue&&window.Vue.use(Vt),e.a=Vt}}]);