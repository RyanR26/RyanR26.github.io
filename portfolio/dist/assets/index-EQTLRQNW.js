(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const t of s.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&i(t)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();const S="modulepreload",O=function(e){return"/"+e},k={},_=function(n,o,i){let a=Promise.resolve();if(o&&o.length>0){const s=document.getElementsByTagName("link");a=Promise.all(o.map(t=>{if(t=O(t),t in k)return;k[t]=!0;const r=t.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(!!i)for(let u=s.length-1;u>=0;u--){const m=s[u];if(m.href===t&&(!r||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${c}`))return;const f=document.createElement("link");if(f.rel=r?"stylesheet":S,r||(f.as="script",f.crossOrigin=""),f.href=t,document.head.appendChild(f),r)return new Promise((u,m)=>{f.addEventListener("load",u),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${t}`)))})}))}return a.then(()=>n()).catch(s=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=s,window.dispatchEvent(t),!t.defaultPrevented)throw s})},g={};let E={};const D=e=>e===void 0,p=e=>e!==void 0,v=e=>typeof e=="function",U=e=>{const n={};let o=e.hooks;o=Array.isArray(o)?o:[o],o.map(i=>{i.routes.map(a=>{n[a]=Object.assign({},i.afterEnter&&{afterEnter:i.afterEnter},i.afterEnterLazy&&{afterEnterLazy:i.afterEnterLazy},i.beforeEnter&&{beforeEnter:i.beforeEnter},i.beforeLeave&&{beforeLeave:i.beforeLeave})})}),E=n},R=()=>({router:{current:"/",next:""}}),L={updateUrl(e){return history.pushState({previousUrl:L.getRouteFromUrl()},null,e),e},urlChangedEvent(e){window.dispatchEvent(new CustomEvent("urlChanged",{detail:{route:e}}))},getRouteFromUrl(){const e=location.href,n=e.substring(0,e.indexOf("/",14));return e.replace(n,"").replace(".html","")}},I=e=>[{name:"popstate",action:e.navigateHistory},{name:"Lazy_Component_Rendered",action:e.afterEnterLazy}],j=e=>{const n={},o={},i={},a={},s=(t,r,c={})=>p(c[r])?c[r]:p(E[t])&&E[t][r]?E[t][r]:p(E["/*"])?E["/*"][r]:r==="callback"?void 0:[];return{navigateHistory(){const t=L.getRouteFromUrl();console.log("popstate route ",t),e.msgs(c=>["effect",{def:()=>c}]).done(c=>{r(c)});const r=c=>{const b=c.router.current,f=s(b,"beforeLeave",n),u=s(t,"beforeEnter",o),m=s(t,"afterEnter",i),d=s(t,"callback",a);e.msgs(["state",{path:["router","next"],value:t},{preventRender:!1}],...(v(f)?f(b):f)||[],...(v(u)?u(t):u)||[],["state",{path:["router","current"],value:t}],...(v(m)?m(t):m)||[]).done(()=>{d&&(typeof d=="function"?d():Array.isArray(d)?e.msgs(...d):console.warn("Callback must be a function or message array"))})}},navigate(t,r,c){c.preventDefault();const b=L.getRouteFromUrl();n[b]=r.beforeLeave,o[t]=r.beforeEnter,i[t]=r.afterEnter,a[t]=r.callback;const f=s(b,"beforeLeave",r),u=s(t,"beforeEnter",r),m=s(t,"afterEnter",r),d=s(t,"callback",r);e.msgs(w=>["control",{if:w.router.current!==t}],["state",{path:["router","next"],value:t},{preventRender:!1}],...(v(f)?f(b,t,c):f)||[],...(v(u)?u(t,c):u)||[],["effect",{name:L.updateUrl,args:[t]}],w=>["state",{path:["router","current"],value:w}],...(v(m)?m(t,c):m)||[]).done(()=>{d&&(typeof d=="function"?d():Array.isArray(d)?e.msgs(...d):console.warn("Callback must be a function or message array"))})},afterEnterLazy(){e.msgs(r=>["effect",{def:()=>r}]).done(r=>{const c=s(r.router.current,"afterEnterLazy");c&&c.length>0&&t(r,c)});const t=(r,c)=>{e.msgs(...c)}}}},$=(e,n)=>(o,i)=>{o("a",{text:e.name,href:e.href,class:e.href===e.current?"active":"",onclick:[n.routerActions.navigate,e.href,{beforeLeave:e.beforeLeave,beforeEnter:e.beforeEnter,afterEnter:e.afterEnter,callback:e.callback}]}),i("a")},x=({routes:e,activeRoute:n})=>()=>{let o=!1;for(let i=0;i<e.length;i++){const a=e[i];if(a.route.indexOf(":")>-1)if(p(g[n]))o=!0,g[n].component(g[n].params);else{const s=a.route.split("/"),t=n.split("/"),r={};if(s.length===t.length)for(let c=0;c<s.length&&!(s[c]!==t[c]&&s[c].indexOf(":")!==0);c++)s[c].indexOf(":")===0&&(r[s[c].replace(":","")]=t[c]),c===s.length-1&&(o=!0,D(g[n])&&(g[n]={},g[n].component=a.component,g[n].params=r,a.component(r)))}if(!o&&(n===a.route||n.indexOf(a.route+"/")===0)?(o=!0,a.component()):i===e.length-1&&a.route==="no-match"&&a.component(),o)break}},z=(e,n,o,i,a,s)=>[{RouterLink:$},{props:{name:e,href:n,beforeLeave:a,beforeEnter:o,afterEnter:i,callback:s},mergeStateToProps:t=>({current:t.router.current}),propTypes:t=>({name:t.string,href:t.string,beforeLeave:[t.array,t.undefined],beforeEnter:[t.array,t.undefined],afterEnter:[t.array,t.undefined],callback:[t.array,t.undefined],current:t.string})}],F=(...e)=>[{RouterSwitch:x},{props:{routes:e},mergeStateToProps:n=>({activeRoute:n.router.current}),propTypes:n=>({routes:n.array,activeRoute:n.string})}],h=(e,n)=>({route:e,component:n}),l="div",y="span",T="main",Q="section",A="nav",P=(()=>{async function e(t,r){if(await new Promise(c=>setTimeout(c,t)),r)return r}const n={},o=(t,r)=>n[r]===!0?!1:(n[r]=!0,new Promise(c=>{setTimeout(function(){n[r]=!1,c()},t)})),i={};return{Delay:e,DateObj:t=>{const r=new Date;if(typeof t!="string"||t==="")return r;if(typeof r[t]=="function")return r[t]();console.warn(`'${t}' is not a Date method`)},Throttle:o,Debounce:(t,r)=>(i[r]&&clearTimeout(i[r]),new Promise(c=>{i[r]=setTimeout(function(){c()},t)}))}})(),C=(e,n)=>["effect",{name:P.Delay,args:[e,n]}],B=()=>["effect",{name:P.DateObj,args:["toLocaleTimeString"]}],N=(e,n)=>{e();let o=setInterval(function(){e()},n.time);return()=>{clearInterval(o)}},V=(e="clock")=>({[e]:{active:!0,time:null,title:"time"}}),H=(e="clock")=>n=>({tick(){n.msgs(B(),o=>["state",{path:[e,"time"],value:o}])}}),M=(e,n)=>({name:N,action:n.tick,when:e,options:{time:1e3}}),q=e=>(n,o)=>{n(l,{class:"clock-font",text:e.time}),o(l)},K=e=>(n,o,{component:i})=>{const a=(c,b,f)=>{n(l,{class:`nav-item ${f} ${e.routeTransition==="in"?"fade-out":"fade-in"}`}),n(l),i(z(c,b)),o(l),o(l)},s=c=>{n(l,{class:`nav-item content-item ${e.routeTransition==="in"?"fade-out":"fade-in"}`}),c(),o(l)},t=()=>{n(l,{class:`nav-item content-container ${e.routeTransition==="in"?"transition-in":"transition-out"}`}),n(l),r(),o(l),o(l)},r=()=>{n(l,{class:"logo rotate"}),n(y,{text:"R"}),o(y),n(y,{text:"R"}),o(y),o(l)};n(A,{class:"nav"}),s(()=>i({ClockView:q},{props:{...e.clock}})),a("about","/about","blue"),a("projects","/projects"),a("contact","/contact","red"),t(),a("test2","/test2","yellow"),a("test3","/test3"),a("test4","/test4","orange"),s(()=>{n(l,{class:"bottom-right",text:"Built with Karbon UI framework"}),o(l)}),o(A)},W=_(()=>import("./about-nw7C__wT.js"),__vite__mapDeps([])),J={container:e=>e.getElementById("app"),state:{...R(),...V("clock"),navActive:!0,routeTransition:null},actions:[{routerActions:j},{ClockActions:H("clock")}],subscriptions:(e,n)=>[...I(n.routerActions),M(e.navActive,n.ClockActions)],tap:{state:e=>console.log("STATE: ",e),message:e=>console.log("MSG: ",e),subscriptions:e=>console.log("SUBS: ",e)},init:()=>{U({hooks:[{routes:["/"],beforeLeave:[["state",{path:["routeTransition"],value:"in"}],C(1500)],afterEnter:[C(10),["state",{path:["routeTransition"],value:"out"}]]}]})},view:e=>(n,o,{component:i,lazy:a})=>{n(T),i(F(h("/",()=>i({NavView:K},{props:{...e}})),h("/about",()=>{a(W,s=>i({AboutView:s.AboutView},{props:{...e}}))}),h("/contact",()=>{n(l,{text:"contact me",class:"screen-container"}),o(l)}),h("/projects",()=>{n(l,{text:"projects",class:"screen-container"}),o(l)}))),o(T)}};window.karbon.render(J);export{z as L,y as a,l as d,Q as s};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}