(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[52],{1464:function(e,t,n){"use strict";var r=n(581);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(582)),i=n(1),c=(0,a.default)((0,i.jsx)("path",{d:"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"}),"Image");t.default=c},1559:function(e,t,n){"use strict";n.r(t);var r=n(52),a=n(12),i=n(7),c=n(34),o=n.n(c),s=n(536),l=n(540),d=n(570),u=n(611),j=n(84),b=n(46),h=n(0),f=n.n(h),p=n(604),m=n(72),x=n(580),O=n(608),v=n.n(O),g=n(1464),y=n.n(g),S=n(767),M=n(1),C=Object(b.a)("div")((function(e){var t,n=e.theme;return t={margin:"30px"},Object(i.a)(t,n.breakpoints.down("sm"),{margin:"16px"}),Object(i.a)(t,"& .breadcrumb",Object(i.a)({marginBottom:"30px"},n.breakpoints.down("sm"),{marginBottom:"16px"})),t}));t.default=function(){var e=Object(m.c)((function(e){return e.loginReducer.VendorData})),t=f.a.useState(!1),n=Object(a.a)(t,2),i=n[0],c=n[1],b=f.a.useState([]),h=Object(a.a)(b,2),O=h[0],g=h[1];f.a.useEffect((function(){T()}),[]);var T=function(){var t=Object(r.a)(o.a.mark((function t(n){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(x.a.Address+"vpanel.asmx/LOAD_VENDOR_INFO",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"systemID="+e.SYSTEMID}).then((function(e){return e.json()})).then((function(e){g(e[0])})).catch((function(e){console.log(e)}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(M.jsx)("div",{children:Object(M.jsxs)(C,{children:[Object(M.jsx)("div",{className:"breadcrumb",children:Object(M.jsx)(j.a,{routeSegments:[{name:"Dashboard",path:"/Admission/ADM_Dashboard"},{name:"Advanced Information"}]})}),Object(M.jsxs)(p.ValidatorForm,{children:[Object(M.jsxs)(j.m,{children:[Object(M.jsx)(s.a,{component:"h1",variant:"h6",style:{marginTop:-15},children:e.SupplierTitle}),Object(M.jsxs)(l.a,{container:!0,spacing:2,sx:{mt:"0px"},children:[Object(M.jsx)(l.a,{item:!0,xs:12,sm:3,children:Object(M.jsxs)("div",{children:["Registration Type:"," ",Object(M.jsx)("b",{children:O.RegistrationTypeTitle})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:3,children:Object(M.jsxs)("div",{children:["Legal Type: ",Object(M.jsx)("b",{children:O.LegalTypeTitle})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:3,children:Object(M.jsxs)("div",{children:["Email: ",Object(M.jsx)("b",{children:O.Email})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:3,children:Object(M.jsxs)("div",{children:["Registration Date:"," ",Object(M.jsx)("b",{children:v()(O.BusinessRegistrationDate).format("DD/MM/YYYY")})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["Phone: ",Object(M.jsx)("b",{children:O.Phone})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["Cell No: ",Object(M.jsx)("b",{children:O.CellNo})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["NTN: ",Object(M.jsx)("b",{children:O.NTN})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["STRN: ",Object(M.jsx)("b",{children:O.STRN})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["STS: ",Object(M.jsx)("b",{children:O.STS})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["CNIC: ",Object(M.jsx)("b",{children:O.CNIC})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)("div",{children:["District: ",Object(M.jsx)("b",{children:O.DistrictTitle})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:10,children:Object(M.jsxs)("div",{children:["Address:"," ",Object(M.jsxs)("b",{children:[O.Address,", ",O.Country]})]})})]})]}),Object(M.jsx)("br",{}),Object(M.jsx)(j.m,{title:"Attached Documents",children:Object(M.jsxs)(l.a,{container:!0,spacing:2,children:[Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)(S.a,{href:O.NTNImage,target:"_blank",variant:"body2",style:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(y.a,{}),Object(M.jsx)("b",{style:{paddingLeft:2,paddingTop:0},children:"NTN Attachment"})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)(S.a,{href:O.STRNImage,target:"_blank",variant:"body2",style:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(y.a,{}),Object(M.jsx)("b",{style:{paddingLeft:2,paddingTop:0},children:"STRN Attachment"})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)(S.a,{href:O.STSImage,target:"_blank",variant:"body2",style:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(y.a,{}),Object(M.jsx)("b",{style:{paddingLeft:2,paddingTop:0},children:"STS Attachment"})]})}),Object(M.jsx)(l.a,{item:!0,xs:12,sm:2,children:Object(M.jsxs)(S.a,{href:O.CNICImage,target:"_blank",variant:"body2",style:{display:"flex",alignItems:"center"},children:[Object(M.jsx)(y.a,{}),Object(M.jsx)("b",{style:{paddingLeft:2,paddingTop:0},children:"CNIC Attachment"})]})})]})})]}),Object(M.jsx)(d.a,{open:i,autoHideDuration:3e3,anchorOrigin:{vertical:"top",horizontal:"right"},onClose:function(){return c(!1)},children:Object(M.jsx)(u.a,{onClose:function(){return c(!1)},sx:{width:"100%"},severity:"success",variant:"filled",children:"Well Done!.. Basic info saved successfully."})})]})})}},522:function(e,t,n){"use strict";n.r(t),n.d(t,"capitalize",(function(){return r.a})),n.d(t,"createChainedFunction",(function(){return a.a})),n.d(t,"createSvgIcon",(function(){return i.a})),n.d(t,"debounce",(function(){return c.a})),n.d(t,"deprecatedPropType",(function(){return o})),n.d(t,"isMuiElement",(function(){return s.a})),n.d(t,"ownerDocument",(function(){return l.a})),n.d(t,"ownerWindow",(function(){return d.a})),n.d(t,"requirePropFactory",(function(){return u.a})),n.d(t,"setRef",(function(){return j})),n.d(t,"unstable_useEnhancedEffect",(function(){return b.a})),n.d(t,"unstable_useId",(function(){return h.a})),n.d(t,"unsupportedProp",(function(){return f.a})),n.d(t,"useControlled",(function(){return p.a})),n.d(t,"useEventCallback",(function(){return m.a})),n.d(t,"useForkRef",(function(){return x.a})),n.d(t,"useIsFocusVisible",(function(){return O.a})),n.d(t,"unstable_ClassNameGenerator",(function(){return v.a}));var r=n(10),a=n(584),i=n(83),c=n(191);var o=function(e,t){return function(){return null}},s=n(121),l=n(61),d=n(151),u=n(524),j=n(148).a,b=n(59),h=n(577),f=n(583),p=n(189),m=n(60),x=n(25),O=n(190),v=n(183)},524:function(e,t,n){"use strict";n(3);t.a=function(e,t){return function(){return null}}},577:function(e,t,n){"use strict";var r=n(305);t.a=r.a},578:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n.p;var r=n.p+"static/media/PMC_Logo.81c16fd5.png",a={ShortName:"PUMHSW",FullName:"Peoples University of Medical & Health Sciences for Women",Message:"Welcome to the People\u2019s Institute of Technologist in Heath (PITH), Peoples University of Medical & Health Sciences for Women (PUMHSW) Nawab shah, Shaheed Benazirabad. PITH is one of the first initiatives of PUMHSW in Allied Health Sciences offering four different technologies including BS-Intensive Care Technology, BS-Anesthesia Technology, BS-Cardiovascular Technology & BS-Medical Laboratory Technology.",CompanyLogo:r,IPAddress:"http://121.52.155.34/pumhs_ums/",Address:"Hospital road, Civil Lines, Nawabshah, Shaheed Benazirabad, Sindh 67450"}},580:function(e,t,n){"use strict";var r=n(578).a.IPAddress;t.a={localhost:"http://121.52.155.34:5000/",Address:r,print:"http://172.173.225.115/",admission:"http://172.173.225.115:5000/"}},581:function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},582:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(522)},583:function(e,t,n){"use strict";t.a=function(e,t,n,r,a){return null}},584:function(e,t,n){"use strict";var r=n(559);t.a=r.a},589:function(e,t,n){"use strict";n(0);var r=n(83),a=n(1);t.a=Object(r.a)(Object(a.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},611:function(e,t,n){"use strict";var r=n(7),a=n(4),i=n(3),c=n(0),o=n(8),s=n(47),l=n(119),d=n(6),u=n(13),j=n(10),b=n(182),h=n(28),f=n(33);function p(e){return Object(h.a)("MuiAlert",e)}var m,x=Object(f.a)("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),O=n(538),v=n(83),g=n(1),y=Object(v.a)(Object(g.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),S=Object(v.a)(Object(g.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),M=Object(v.a)(Object(g.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),C=Object(v.a)(Object(g.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),T=n(589),A=["action","children","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"],N=Object(d.a)(b.a,{name:"MuiAlert",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["".concat(n.variant).concat(Object(j.a)(n.color||n.severity))]]}})((function(e){var t=e.theme,n=e.ownerState,a="light"===t.palette.mode?l.b:l.i,c="light"===t.palette.mode?l.i:l.b,o=n.color||n.severity;return Object(i.a)({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},o&&"standard"===n.variant&&Object(r.a)({color:a(t.palette[o].light,.6),backgroundColor:c(t.palette[o].light,.9)},"& .".concat(x.icon),{color:"dark"===t.palette.mode?t.palette[o].main:t.palette[o].light}),o&&"outlined"===n.variant&&Object(r.a)({color:a(t.palette[o].light,.6),border:"1px solid ".concat(t.palette[o].light)},"& .".concat(x.icon),{color:"dark"===t.palette.mode?t.palette[o].main:t.palette[o].light}),o&&"filled"===n.variant&&{color:"#fff",fontWeight:t.typography.fontWeightMedium,backgroundColor:"dark"===t.palette.mode?t.palette[o].dark:t.palette[o].main})})),I=Object(d.a)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:function(e,t){return t.icon}})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),w=Object(d.a)("div",{name:"MuiAlert",slot:"Message",overridesResolver:function(e,t){return t.message}})({padding:"8px 0"}),L=Object(d.a)("div",{name:"MuiAlert",slot:"Action",overridesResolver:function(e,t){return t.action}})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),k={success:Object(g.jsx)(y,{fontSize:"inherit"}),warning:Object(g.jsx)(S,{fontSize:"inherit"}),error:Object(g.jsx)(M,{fontSize:"inherit"}),info:Object(g.jsx)(C,{fontSize:"inherit"})},R=c.forwardRef((function(e,t){var n=Object(u.a)({props:e,name:"MuiAlert"}),r=n.action,c=n.children,l=n.className,d=n.closeText,b=void 0===d?"Close":d,h=n.color,f=n.icon,x=n.iconMapping,v=void 0===x?k:x,y=n.onClose,S=n.role,M=void 0===S?"alert":S,C=n.severity,R=void 0===C?"success":C,D=n.variant,z=void 0===D?"standard":D,P=Object(a.a)(n,A),H=Object(i.a)({},n,{color:h,severity:R,variant:z}),_=function(e){var t=e.variant,n=e.color,r=e.severity,a=e.classes,i={root:["root","".concat(t).concat(Object(j.a)(n||r)),"".concat(t)],icon:["icon"],message:["message"],action:["action"]};return Object(s.a)(i,p,a)}(H);return Object(g.jsxs)(N,Object(i.a)({role:M,elevation:0,ownerState:H,className:Object(o.default)(_.root,l),ref:t},P,{children:[!1!==f?Object(g.jsx)(I,{ownerState:H,className:_.icon,children:f||v[R]||k[R]}):null,Object(g.jsx)(w,{ownerState:H,className:_.message,children:c}),null!=r?Object(g.jsx)(L,{className:_.action,children:r}):null,null==r&&y?Object(g.jsx)(L,{ownerState:H,className:_.action,children:Object(g.jsx)(O.a,{size:"small","aria-label":b,title:b,color:"inherit",onClick:y,children:m||(m=Object(g.jsx)(T.a,{fontSize:"small"}))})}):null]}))}));t.a=R},767:function(e,t,n){"use strict";var r=n(12),a=n(7),i=n(4),c=n(3),o=n(0),s=n(8),l=n(47),d=n(11),u=n(119),j=n(10),b=n(6),h=n(13),f=n(190),p=n(25),m=n(536),x=n(28),O=n(33);function v(e){return Object(x.a)("MuiLink",e)}var g=Object(O.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),y=n(1),S=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],M={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},C=Object(b.a)(m.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat(Object(j.a)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=Object(d.b)(t,"palette.".concat(function(e){return M[e]||e}(n.color)))||n.color;return Object(c.a)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?Object(u.a)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&Object(a.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(g.focusVisible),{outline:"auto"}))})),T=o.forwardRef((function(e,t){var n=Object(h.a)({props:e,name:"MuiLink"}),a=n.className,d=n.color,u=void 0===d?"primary":d,b=n.component,m=void 0===b?"a":b,x=n.onBlur,O=n.onFocus,g=n.TypographyClasses,M=n.underline,T=void 0===M?"always":M,A=n.variant,N=void 0===A?"inherit":A,I=Object(i.a)(n,S),w=Object(f.a)(),L=w.isFocusVisibleRef,k=w.onBlur,R=w.onFocus,D=w.ref,z=o.useState(!1),P=Object(r.a)(z,2),H=P[0],_=P[1],W=Object(p.a)(t,D),B=Object(c.a)({},n,{color:u,component:m,focusVisible:H,underline:T,variant:N}),V=function(e){var t=e.classes,n=e.component,r=e.focusVisible,a=e.underline,i={root:["root","underline".concat(Object(j.a)(a)),"button"===n&&"button",r&&"focusVisible"]};return Object(l.a)(i,v,t)}(B);return Object(y.jsx)(C,Object(c.a)({className:Object(s.default)(V.root,a),classes:g,color:u,component:m,onBlur:function(e){k(e),!1===L.current&&_(!1),x&&x(e)},onFocus:function(e){R(e),!0===L.current&&_(!0),O&&O(e)},ref:W,ownerState:B,variant:N},I))}));t.a=T}}]);