(window.webpackJsonp=window.webpackJsonp||[]).push([["npm.linkify-it"],{b117:function(_,t,e){"use strict";var i=t.src_Any=e("cbc7").source,s=t.src_Cc=e("a7bc").source,r=t.src_Z=e("4fc2").source,n=t.src_P=e("7ca0").source,c=t.src_ZPCc=[r,n,s].join("|"),o=t.src_ZCc=[r,s].join("|"),a="(?:(?!>|<|"+c+")"+i+")";t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";t.src_auth="(?:(?:(?!"+o+"|[@/]).)+@)?";var h=t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",e=t.src_host_terminator="(?=$|>|<|"+c+")(?!-|_|:\\d|\\.-|\\.(?!$|"+c+"))",n=t.src_path="(?:[/?#](?:(?!"+o+"|[()[\\]{}.,\"'?!\\-<>]).|\\[(?:(?!"+o+"|\\]).)*\\]|\\((?:(?!"+o+"|[)]).)*\\)|\\{(?:(?!"+o+'|[}]).)*\\}|\\"(?:(?!'+o+'|["]).)+\\"|\\\'(?:(?!'+o+"|[']).)+\\'|\\'(?="+a+").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!"+o+"|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!"+o+").|\\!(?!"+o+"|[!]).|\\?(?!"+o+"|[?]).)+|\\/)?",r=(t.src_email_name='[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+',t.src_xn="xn--[a-z0-9\\-]{1,59}"),s=t.src_domain_root="(?:"+r+"|"+a+"{1,63})",i=t.src_domain="(?:"+r+"|(?:"+a+")|(?:"+a+"(?:-(?!-)|"+a+"){0,61}"+a+"))",r=t.src_host="(?:(?:(?:(?:"+i+")\\.)*"+s+"))",a=t.tpl_host_fuzzy="(?:(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:(?:(?:"+i+")\\.)+(?:%TLDS%)))",s=t.tpl_host_no_ip_fuzzy="(?:(?:(?:"+i+")\\.)+(?:%TLDS%))";t.src_host_strict=r+e;i=t.tpl_host_fuzzy_strict=a+e;t.src_host_port_strict=r+h+e;a=t.tpl_host_port_fuzzy_strict=a+h+e,e=t.tpl_host_port_no_ip_fuzzy_strict=s+h+e;t.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+c+"|>|$))",t.tpl_email_fuzzy="(^|<|>|\\(|"+o+')([\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+@'+i+")",t.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|]|"+c+"))((?![$+<=>^`|])"+a+n+")",t.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|]|"+c+"))((?![$+<=>^`|])"+e+n+")"},fbcd:function(_,t,i){"use strict";function c(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(_){e[_]=t[_]})}),e}function o(_){return Object.prototype.toString.call(_)}function a(_){return"[object Function]"===o(_)}function h(_){return _.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}var s={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};var r={"http:":{validate:function(_,t,e){t=_.slice(t);return e.re.http||(e.re.http=new RegExp("^\\/\\/"+e.re.src_auth+e.re.src_host_port_strict+e.re.src_path,"i")),e.re.http.test(t)?t.match(e.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(_,t,e){var i=_.slice(t);return e.re.no_http||(e.re.no_http=new RegExp("^"+e.re.src_auth+"(?:localhost|(?:(?:"+e.re.src_domain+")\\.)+"+e.re.src_domain_root+")"+e.re.src_port+e.re.src_host_terminator+e.re.src_path,"i")),!e.re.no_http.test(i)||3<=t&&":"===_[t-3]||3<=t&&"/"===_[t-3]?0:i.match(e.re.no_http)[0].length}},"mailto:":{validate:function(_,t,e){t=_.slice(t);return e.re.mailto||(e.re.mailto=new RegExp("^"+e.re.src_email_name+"@"+e.re.src_host_strict,"i")),e.re.mailto.test(t)?t.match(e.re.mailto)[0].length:0}}},l="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",n="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function u(){return function(_,t){t.normalize(_)}}function p(s){var t=s.re=c({},i("b117")),_=s.__tlds__.slice();function e(_){return _.replace("%TLDS%",t.src_tlds)}s.__tlds_replaced__||_.push(l),_.push(t.src_xn),t.src_tlds=_.join("|"),t.email_fuzzy=RegExp(e(t.tpl_email_fuzzy),"i"),t.link_fuzzy=RegExp(e(t.tpl_link_fuzzy),"i"),t.link_no_ip_fuzzy=RegExp(e(t.tpl_link_no_ip_fuzzy),"i"),t.host_fuzzy_test=RegExp(e(t.tpl_host_fuzzy_test),"i");var r=[];function n(_,t){throw new Error('(LinkifyIt) Invalid schema "'+_+'": '+t)}s.__compiled__={},Object.keys(s.__schemas__).forEach(function(_){var t=s.__schemas__[_];if(null!==t){var e,i={validate:null,link:null};if(s.__compiled__[_]=i,"[object Object]"===o(t))return"[object RegExp]"===o(t.validate)?i.validate=(e=t.validate,function(_,t){t=_.slice(t);return e.test(t)?t.match(e)[0].length:0}):a(t.validate)?i.validate=t.validate:n(_,t),void(a(t.normalize)?i.normalize=t.normalize:t.normalize?n(_,t):i.normalize=u());"[object String]"!==o(t)?n(_,t):r.push(_)}}),r.forEach(function(_){s.__compiled__[s.__schemas__[_]]&&(s.__compiled__[_].validate=s.__compiled__[s.__schemas__[_]].validate,s.__compiled__[_].normalize=s.__compiled__[s.__schemas__[_]].normalize)}),s.__compiled__[""]={validate:null,normalize:u()};_=Object.keys(s.__compiled__).filter(function(_){return 0<_.length&&s.__compiled__[_]}).map(h).join("|");s.re.schema_test=RegExp("(^|(?!_)(?:[><]|"+t.src_ZPCc+"))("+_+")","i"),s.re.schema_search=RegExp("(^|(?!_)(?:[><]|"+t.src_ZPCc+"))("+_+")","ig"),s.re.pretest=RegExp("("+s.re.schema_test.source+")|("+s.re.host_fuzzy_test.source+")|@","i"),(_=s).__index__=-1,_.__text_cache__=""}function e(_,t){var e=_.__index__,i=_.__last_index__,s=_.__text_cache__.slice(e,i);this.schema=_.__schema__.toLowerCase(),this.index=e+t,this.lastIndex=i+t,this.raw=s,this.text=s,this.url=s}function d(_,t){t=new e(_,t);return _.__compiled__[t.schema].normalize(t,_),t}function m(_,t){if(!(this instanceof m))return new m(_,t);var e;t||(e=_,Object.keys(e||{}).reduce(function(_,t){return _||s.hasOwnProperty(t)},!1)&&(t=_,_={})),this.__opts__=c({},s,t),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=c({},r,_),this.__compiled__={},this.__tlds__=n,this.__tlds_replaced__=!1,this.re={},p(this)}m.prototype.add=function(_,t){return this.__schemas__[_]=t,p(this),this},m.prototype.set=function(_){return this.__opts__=c(this.__opts__,_),this},m.prototype.test=function(_){if(this.__text_cache__=_,this.__index__=-1,!_.length)return!1;var t,e,i,s,r,n,c;if(this.re.schema_test.test(_))for((n=this.re.schema_search).lastIndex=0;null!==(t=n.exec(_));)if(i=this.testSchemaAt(_,t[2],n.lastIndex)){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i;break}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&0<=(c=_.search(this.re.host_fuzzy_test))&&(this.__index__<0||c<this.__index__)&&null!==(e=_.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))&&(s=e.index+e[1].length,(this.__index__<0||s<this.__index__)&&(this.__schema__="",this.__index__=s,this.__last_index__=e.index+e[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&0<=_.indexOf("@")&&null!==(r=_.match(this.re.email_fuzzy))&&(s=r.index+r[1].length,r=r.index+r[0].length,(this.__index__<0||s<this.__index__||s===this.__index__&&r>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=s,this.__last_index__=r)),0<=this.__index__},m.prototype.pretest=function(_){return this.re.pretest.test(_)},m.prototype.testSchemaAt=function(_,t,e){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(_,e,this):0},m.prototype.match=function(_){var t=0,e=[];0<=this.__index__&&this.__text_cache__===_&&(e.push(d(this,t)),t=this.__last_index__);for(var i=t?_.slice(t):_;this.test(i);)e.push(d(this,t)),i=i.slice(this.__last_index__),t+=this.__last_index__;return e.length?e:null},m.prototype.tlds=function(_,t){return _=Array.isArray(_)?_:[_],t?this.__tlds__=this.__tlds__.concat(_).sort().filter(function(_,t,e){return _!==e[t-1]}).reverse():(this.__tlds__=_.slice(),this.__tlds_replaced__=!0),p(this),this},m.prototype.normalize=function(_){_.schema||(_.url="http://"+_.url),"mailto:"!==_.schema||/^mailto:/i.test(_.url)||(_.url="mailto:"+_.url)},_.exports=m}}]);