(this.webpackJsonpvegprice=this.webpackJsonpvegprice||[]).push([[0],{156:function(t,e,a){},157:function(t,e,a){},178:function(t,e,a){"use strict";a.r(e);var n=a(4),r=a.n(n),c=a(46),i=a.n(c),o=(a(156),a(157),a(5)),l=a(3);function u(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=new Date;if(console.log(e),t){var a=(new Date).setDate(e.getDate()-t);e=new Date(a)}var n=e.getYear()+1900,r=e.getMonth()+1,c=e.getDate();return r<10&&(r=0+r.toString()),c<10&&(c=0+c.toString()),n+"-"+r+"-"+c}var s=a(47),d=a.n(s);function f(t){var e=t.split("-");return e[0]=parseInt(e[0],10)-1911,e=e.join(".")}function j(t){var e=t.split(".");return e[0]=parseInt(e[0],10)+1911,e=e.join("-")}function m(t){var e=t.getMonth()+1,a=t.getDate();return"".concat(e,"/").concat(a)}function v(t,e){var a={};t.forEach((function(t){t[e].length>2&&(a[t[e]]=(a[t[e]]||0)+1)}));var n=Object.entries(a).sort((function(t,e){var a=Object(l.a)(t,2)[1];return Object(l.a)(e,2)[1]-a}));return n.length>0&&n[0][0]}var h=a(1),p=a(0);function b(t){var e=t.cropData,a=h.j("%Y-%m-%d"),r=e.slice(0,50),c=v(r,"CropCode"),i=v(r,"MarketName"),o=null===e||void 0===e?void 0:e.filter((function(t){return 0!==t.Avg_Price&&t.CropCode===c&&t.MarketName===i})).map((function(t){return{date:a(j(t.TransDate)),value:t.Avg_Price}})),l=function(t){};return Object(n.useEffect)((function(){if(o.length>0){var t=[20,20,20,50],e=parseInt(h.h(".App").style("width"),10)-40,a=h.h("#linechart").append("svg").attr("width",e-t[1]).attr("height",400),n=h.g().rangeRound([t[3],e-t[1]-t[3]]),r=h.f().rangeRound([400,t[0]+t[2]]);n.domain(h.c(o,(function(t){return t.date}))),r.domain([0,h.e(o,(function(t){return t.value}))]);var c=h.b().scale(r),i=h.a().scale(n).tickFormat(h.i("%m/%d")).ticks(Math.max((e/80).toFixed(0),5));a.append("g").attr("transform","translate(0,".concat(400-t[2],")")).call(i),a.append("g").call(c).attr("transform","translate(".concat(t[3],", ").concat(-t[2]," )")).append("text").text("\u50f9\u683c").attr("transform","rotate(-90)").attr("dy",".75em").attr("y",6).style("text-anchor","end"),a.append("path").datum(o).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("transform","translate(0,-20)").attr("d",h.d().x((function(t){return n(t.date)})).y((function(t){return r(t.value)}))),a.selectAll("dot").data(o).enter().append("circle").attr("fill","steelblue").attr("class","dot").attr("cx",(function(t){return n(t.date)})).attr("transform","translate(0,-20)").attr("cy",(function(t){return r(t.value)})).attr("r",4).on("mouseover",(function(t){h.h(this).attr("r",10).style("fill","lightblue");var e=t.target.__data__;a.append("text").attr("id","text".concat(n(e.date)).concat(r(e.value))).attr("fill","black").attr("x",(function(){return n(e.date)-10})).attr("y",(function(){return r(e.value)+10})).text((function(){return[e.value]})),a.append("text").attr("id","date".concat(n(e.date)).concat(r(e.value))).attr("fill","black").attr("x",(function(){return n(e.date)-13})).attr("y",(function(){return r(e.value)-40})).text((function(){return[m(e.date)]}))})).on("mouseout",(function(t){h.h(this).attr("r",4).style("fill","steelblue");var e=t.target.__data__;h.h("#text".concat(n(e.date)).concat(r(e.value))).remove(),h.h("#date".concat(n(e.date)).concat(r(e.value))).remove()})).on("click",l)}return function(){h.h("svg").remove()}}),[o]),Object(p.jsx)("div",{id:"linechart",className:"d-flex justify-content-center",children:0===o.length?Object(p.jsx)("div",{children:"\u6307\u5b9a\u65e5\u671f\u5167\u8a72\u5730\u5340\u6c92\u6709\u50f9\u683c\u8cc7\u6599\uff0c\u63db\u500b\u5730\u5340\u8a66\u8a66\uff01"}):""})}function x(t){var e=t.cropData;return e.length>0?Object(p.jsx)(b,{cropData:e}):Object(p.jsx)("div",{children:"Search!"})}function g(){var t=u(),e=u(31),a=Object(n.useState)({crop:"",city:"",startDate:f(e),endDate:f(t)}),r=Object(l.a)(a,2),c=r[0],i=r[1],s=Object(n.useState)([]),j=Object(l.a)(s,2),m=j[0],v=j[1];return Object(p.jsxs)("div",{className:"mt-4",children:[Object(p.jsxs)("div",{className:"mb-3",children:[Object(p.jsx)("div",{className:"h3",children:"\u8fd1\u671f\u83dc\u50f9\u67e5\u8a62"}),Object(p.jsx)("div",{className:"h5",children:"Produce Recent Price Lookup"})]}),Object(p.jsxs)("form",{className:"mb-3",onSubmit:function(t){t.preventDefault(),function(){var t="https://agridata.coa.gov.tw/api/v1/AgriProductsTransType/?Start_time=".concat(c.startDate,"&End_time=").concat(c.endDate,"&MarketName=").concat(c.city,"&CropName=").concat(c.crop);d.a.get(t).then((function(t){v(t.data.Data)}))}()},children:[Object(p.jsxs)("div",{className:"mt-2",children:[Object(p.jsx)("label",{htmlFor:"crop",children:"\u9805\u76ee\uff1a"}),Object(p.jsx)("select",{id:"crop",className:"mr-2",value:c.crop,onChange:function(t){i((function(e){return Object(o.a)(Object(o.a)({},e),{},{crop:t.target.value})}))},children:["","\u5ae9\u8591","\u849c\u982d","\u6d0b\u8525","\u863f\u8514","\u8304\u5b50","\u97ed\u83dc","\u82b9\u83dc","\u83e0\u83dc","\u6cb9\u83dc","\u7d05\u8525\u982d","\u7d50\u7403\u8435","\u7389\u7c73\u7b4d","\u674f\u9b91\u83c7","\u79c0\u73cd\u83c7","\u5c0f\u767d\u83dc","\u8435\u82e3\u83dc","\u82a5\u85cd\u83dc","\u82b1\u6930\u83dc","\u7b4a\u767d\u7b4d"].map((function(t){return Object(p.jsx)("option",{value:t,children:t},t)}))}),Object(p.jsx)("label",{htmlFor:"city",children:"\u5730\u5340\uff1a"}),Object(p.jsx)("select",{className:"mr-2",name:"",id:"city",onChange:function(t){i((function(e){return Object(o.a)(Object(o.a)({},e),{},{city:t.target.value})}))},value:c.city,children:["","\u53f0\u5317","\u53f0\u4e2d","\u5357\u6295","\u5c4f\u6771","\u9ad8\u96c4","\u5609\u7fa9","\u53f0\u5357","\u53f0\u6771","\u82b1\u84ee"].map((function(t){return Object(p.jsx)("option",{value:t,children:t},t)}))})]}),Object(p.jsxs)("div",{className:"mt-2 mr-2 ml-2 d-flex justify-content-center align-items-center",children:[Object(p.jsx)("input",{className:"ml-2 mr-2 flex-grow-1",type:"date",min:e,defaultValue:e,onChange:function(t){i((function(e){return Object(o.a)(Object(o.a)({},e),{},{startDate:f(t.target.value)})}))}})," ","\u81f3"," ",Object(p.jsx)("input",{className:"ml-2 mr-2 flex-grow-1",type:"date",max:t,defaultValue:t,onChange:function(t){i((function(e){return Object(o.a)(Object(o.a)({},e),{},{endDate:f(t.target.value)})}))}}),Object(p.jsx)("button",{type:"submit",class:"btn btn-outline-primary ml-2 mr-2  flex-grow-1",style:{fontSize:"1rem",width:"4rem"},children:"\u67e5\u8a62"})]})]}),Object(p.jsx)(x,{cropData:m})]})}var O=function(){return Object(p.jsx)("div",{className:"App Container m-auto",style:{maxWidth:"1000px"},children:Object(p.jsx)(g,{})})};i.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(O,{})}),document.getElementById("root"))}},[[178,1,2]]]);
//# sourceMappingURL=main.2622d0d5.chunk.js.map