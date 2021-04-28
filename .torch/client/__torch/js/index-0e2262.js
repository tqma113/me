(()=>{"use strict";var e={7880:(e,t,r)=>{var o;r.r(t),r.d(t,{PreloadType:()=>o,default:()=>a}),function(e){e.Link="link",e.Inner="inner"}(o||(o={}));var n=e=>(t,r)=>{var n,{styles:a,scripts:s}=t,i=[],l=[];return(n=r,Object.keys(n)).forEach((t=>{(t=>e.some((e=>new RegExp("".concat(e,".css$")).test(t))))(t)&&i.push({type:o.Link,href:r[t],preload:!0}),e.includes(t)&&l.push({type:o.Link,src:r[t]})})),{styles:[...a,...i],scripts:[...s,...l]}};const a=[{path:"/photography/months",module:{pageCreater:()=>Promise.all([r.e(736),r.e(934)]).then(r.bind(r,5963)),transform:n(["months"])}},{path:["/photography/:year/:month","/photography/:onlyYear","/photography"],module:{pageCreater:()=>Promise.all([r.e(736),r.e(207)]).then(r.bind(r,6142)),transform:n(["photography"])}},{path:["/notes","/notes/tags/:tagName"],module:{pageCreater:()=>Promise.all([r.e(736),r.e(497)]).then(r.bind(r,8156)),transform:n(["notes"])}},{path:"/notes/tags",module:{pageCreater:()=>Promise.all([r.e(736),r.e(81)]).then(r.bind(r,4969)),transform:n(["tags"])}},{path:"/notes/:noteName",module:{pageCreater:()=>Promise.all([r.e(26),r.e(736),r.e(793)]).then(r.bind(r,3915)),transform:n(["note","highlight"])}},{path:"/",module:{pageCreater:()=>Promise.all([r.e(736),r.e(177)]).then(r.bind(r,6)),transform:n(["home"])}},{path:"/:path*",module:{pageCreater:()=>Promise.all([r.e(736),r.e(245)]).then(r.bind(r,4061)),transform:n(["notfound"])}}]}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,a)=>{if(!o){var s=1/0;for(d=0;d<e.length;d++){for(var[o,n,a]=e[d],i=!0,l=0;l<o.length;l++)(!1&a||s>=a)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(i=!1,a<s&&(s=a));i&&(e.splice(d--,1),t=n())}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[o,n,a]}})(),r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[])),r.u=e=>"js/"+{26:"highlight",81:"tags",177:"home",207:"photography",245:"notfound",497:"notes",793:"note",934:"months"}[e]+"-"+{26:"d6df67",81:"85a185",177:"39c72c",207:"4df8fc",245:"1fd25b",497:"1628c6",793:"e9b275",934:"72df6d"}[e]+".js",r.miniCssF=e=>"css/"+{26:"highlight",81:"tags",177:"home",207:"photography",245:"notfound",497:"notes",736:"vendor",793:"note",826:"index",934:"months"}[e]+".css",r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={};r.l=(t,o,n,a)=>{if(e[t])e[t].push(o);else{var s,i;if(void 0!==n)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var h=l[d];if(h.getAttribute("src")==t){s=h;break}}s||(i=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.src=t),e[t]=[o];var p=(r,o)=>{s.onerror=s.onload=null,clearTimeout(u);var n=e[t];if(delete e[t],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(o))),r)return r(o)},u=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),i&&document.head.appendChild(s)}}})(),r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/__torch/",(()=>{var e=e=>new Promise(((t,o)=>{var n=r.miniCssF(e),a=r.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=(s=r[o]).getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(n===e||n===t))return s}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){var s;if((n=(s=a[o]).getAttribute("data-href"))===e||n===t)return s}})(n,a))return t();((e,t,r,o)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.onerror=n.onload=a=>{if(n.onerror=n.onload=null,"load"===a.type)r();else{var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,n.parentNode.removeChild(n),o(l)}},n.href=t,document.head.appendChild(n)})(e,a,t,o)})),t={826:0};r.f.miniCss=(r,o)=>{t[r]?o.push(t[r]):0!==t[r]&&{81:1,177:1,207:1,497:1,793:1,934:1}[r]&&o.push(t[r]=e(r).then((()=>{t[r]=0}),(e=>{throw delete t[r],e})))}})(),(()=>{var e={826:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=a);var s=r.p+r.u(t),i=new Error;r.l(s,(o=>{if(r.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,n[1](i)}}),"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[s,i,l]=o,d=0;for(n in i)r.o(i,n)&&(r.m[n]=i[n]);for(l&&l(r),t&&t(o);d<s.length;d++)a=s[d],r.o(e,a)&&e[a]&&e[a][0](),e[s[d]]=0;r.O()},o=self.webpackChunk=self.webpackChunk||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(3034)));o=r.O(o)})();
//# sourceMappingURL=index-0e2262.js.map