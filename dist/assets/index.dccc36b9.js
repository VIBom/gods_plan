import{_ as k,d as y,r as o,x,y as C,o as d,c as I,f as u,b as t,G as B,w as E,D as z,i as l,J as S,p as T,a as V,l as b}from"./index.4af51ece.js";import{t as _}from"./api.5700921d.js";import"./request.583deb04.js";const A=s=>(T("data-v-126dba44"),s=s(),V(),s),D={class:"main-container"},M=A(()=>t("div",{class:"goTop"},[t("svg",{viewBox:"0 0 1025 1024",fill:"currentColor"},[t("path",{d:"M533.204945 247.840277c-11.435995-13.314876-30.184888-13.314876-41.620883 0l-342.378861 399.573165c-11.435995 13.319992-6.434858 24.25659 11.19346 24.25659l128.001279 0c17.621155 0 31.995203 14.379165 31.995203 32.007483l0 256.048609c0 17.626271 14.378142 32.00339 32.001343 32.00339l320.002175 0c17.628318 0 31.996226-14.378142 31.996226-32.00339L704.394887 703.678539c0-17.629342 14.376095-32.007483 32.005437-32.007483l127.999232 0c17.621155 0 22.624339-10.937621 11.185273-24.25659L533.204945 247.840277z","p-id":"3191"}),t("path",{d:"M192.395911 159.573836l640.002303 0c35.375346 0 64.00064-28.633481 64.00064-64.011897 0-35.382509-28.625294-64.011897-64.00064-64.011897l-640.002303 0c-35.371252 0-63.99757 28.629387-63.99757 64.011897C128.398341 130.940356 157.023635 159.573836 192.395911 159.573836z","p-id":"3192"})])],-1)),P={class:"content-section",id:"artistWrap"},W=["onClick"],N={class:"card-detail"},F={class:"detail-name"},q=y({setup(s){const p=b(),i=o(!0),m=o("Artist"),v=o([{title:"\u534E\u8BED",id:1},{title:"\u6B27\u7F8E",id:2},{title:"\u97E9\u56FD",id:3},{title:"\u65E5\u672C",id:4}]),c=o([]),h=async()=>{let e=await _();c.value=e.list.artists},f=async e=>{const n=document.querySelector("#artistWrap");n&&n.scrollTo({top:0,behavior:"smooth"});let a=await _(e.id);a.code==200&&(c.value=a.list.artists)},L=e=>{p.push({name:"Artist",params:{id:e}})};return x(()=>{h(),C(()=>{window.addEventListener("resize",()=>{i.value=!1,setTimeout(()=>{i.value=!0},100)})})}),(e,n)=>{const a=l("main-header"),w=l("LazyImg"),g=l("Waterfall");return d(),I("div",D,[u(a,{menuLink:m.value,menuItemsList:v.value,onOnClick:f},null,8,["menuLink","menuItemsList"]),M,t("div",P,[i.value?(d(),B(g,{key:0,lazyload:!0,class:"artists-card",list:c.value,breakpoints:{1900:{rowPerView:4},1100:{rowPerView:3},500:{rowPerView:2}}},{item:E(({item:r})=>[t("div",{class:"artist-card",onClick:G=>L(r.id)},[u(w,{class:"card-img",url:r.picUrl,alt:""},null,8,["url"]),t("div",N,[t("span",F,S(r.name),1)])],8,W)]),_:1},8,["list"])):z("",!0)])])}}});var R=k(q,[["__scopeId","data-v-126dba44"]]);export{R as default};
