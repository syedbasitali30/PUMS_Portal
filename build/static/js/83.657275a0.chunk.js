(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[83],{543:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(42),c=n(53),r=n(768),s=n(46),l=n(69),d=n(124),b=n(1),u=(Object(s.a)(r.a)((function(){return{display:"flex",alignItems:"center",minHeight:d.c,"@media (max-width: 499px)":{display:"table",width:"100%",minHeight:"auto",padding:"1rem 0","& .container":{flexDirection:"column !important","& a":{margin:"0 0 16px !important"}}}}})),Object(s.a)("div")((function(){return{width:"100%",display:"flex",alignItems:"center",padding:"0px 1rem",maxWidth:"1170px",margin:"0 auto"}})),function(){var e=Object(l.a)(),t=Object(c.a)().settings;t.themes[t.footer.theme];return Object(b.jsx)(b.Fragment,{})}),h=n(5),j=n(12),p=n(7),m=n(201),f=n(188),x=n(84),O=n(40),g=n(103),y=n(67),v=n(52),S=n(34),w=n.n(S),I=n(122),k=n.n(I),T=function(e,t){switch(t.type){case"LOAD_NOTIFICATIONS":case"DELETE_NOTIFICATION":case"CLEAR_NOTIFICATIONS":return Object(h.a)(Object(h.a)({},e),{},{notifications:t.payload});default:return Object(h.a)({},e)}},N=Object(a.createContext)({notifications:[],deleteNotification:function(){},clearNotifications:function(){},getNotifications:function(){},createNotification:function(){}}),C=function(e){e.settings;var t=e.children,n=Object(a.useReducer)(T,[]),i=Object(j.a)(n,2),o=i[0],c=i[1],r=function(){var e=Object(v.a)(w.a.mark((function e(t){var n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.a.post("/api/notification/delete",{id:t});case 3:n=e.sent,c({type:"DELETE_NOTIFICATION",payload:n.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(v.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.a.post("/api/notification/delete-all");case 3:t=e.sent,c({type:"CLEAR_NOTIFICATIONS",payload:t.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(v.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.a.get("/api/notification");case 3:t=e.sent,c({type:"LOAD_NOTIFICATIONS",payload:t.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(v.a)(w.a.mark((function e(t){var n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.a.post("/api/notification/add",{notification:t});case 3:n=e.sent,c({type:"CREATE_NOTIFICATION",payload:n.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){l()}),[]),Object(b.jsx)(N.Provider,{value:{notifications:o.notifications,deleteNotification:r,clearNotifications:s,getNotifications:l,createNotification:d},children:t})},D=N,_=function(){return Object(a.useContext)(D)},A=n(538),E=n(1589),L=n(307),R=n(568),B=n(1601),M=n(520),P=Object(s.a)("div")((function(){return{padding:"16px",marginBottom:"16px",display:"flex",alignItems:"center",height:d.c,boxShadow:g.b[6],"& h5":{marginLeft:"8px",marginTop:0,marginBottom:0,fontWeight:"500"}}})),z=Object(s.a)(f.a)((function(e){return{position:"relative","&:hover":{"& .messageTime":{display:"none"},"& .deleteButton":{opacity:"1"}},"& .messageTime":{color:e.theme.palette.text.secondary},"& .icon":{fontSize:"1.25rem"}}})),F=Object(s.a)(A.a)((function(e){e.theme;return{opacity:"0",position:"absolute",right:5,marginTop:9,marginRight:"24px",background:"rgba(0, 0, 0, 0.01)"}})),H=Object(s.a)("div")((function(e){return{padding:"12px 8px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0, 0, 0, 0.01)","& small":{fontWeight:"500",marginLeft:"16px",color:e.theme.palette.text.secondary}}})),W=Object(s.a)("span")((function(e){return{fontWeight:"500",marginLeft:"16px",color:e.theme.palette.text.secondary}})),V=function(e){var t=e.container,n=Object(c.a)().settings,r=Object(l.a)().palette.text.secondary,s=i.a.useState(!1),u=Object(j.a)(s,2),h=u[0],p=u[1],m=_(),x=m.deleteNotification,g=(m.clearNotifications,m.notifications),y=function(){p(!h)},v=Object(l.a)().palette.text.primary;return Object(b.jsxs)(a.Fragment,{children:[Object(b.jsx)(A.a,{onClick:y,children:Object(b.jsx)(E.a,{color:"secondary",badgeContent:null===g||void 0===g?void 0:g.length,children:Object(b.jsx)(L.a,{sx:{color:v},children:"notifications"})})}),Object(b.jsx)(R.a,{theme:n.themes[n.activeTheme],children:Object(b.jsx)(B.a,{width:"100px",container:t,variant:"temporary",anchor:"right",open:h,onClose:y,ModalProps:{keepMounted:!0},children:Object(b.jsxs)(f.a,{sx:{width:d.a},children:[Object(b.jsxs)(P,{children:[Object(b.jsx)(L.a,{color:"primary",children:"notifications"}),Object(b.jsx)("h5",{children:"Notifications"})]}),null===g||void 0===g?void 0:g.map((function(e){return Object(b.jsxs)(z,{children:[Object(b.jsx)(F,{size:"small",className:"deleteButton",onClick:function(){return x(e.id)},children:Object(b.jsx)(L.a,{className:"icon",children:"clear"})}),Object(b.jsx)(O.b,{to:"/".concat(e.path),onClick:y,style:{textDecoration:"none"},children:Object(b.jsxs)(M.a,{sx:{mx:2,mb:3},elevation:3,children:[Object(b.jsxs)(H,{children:[Object(b.jsxs)(f.a,{display:"flex",children:[Object(b.jsx)(L.a,{className:"icon",color:e.icon.color,children:e.icon.name}),Object(b.jsx)(W,{children:e.heading})]}),Object(b.jsxs)(o.f,{className:"messageTime",children:[e.timestamp," ago"]})]}),Object(b.jsxs)(f.a,{sx:{px:2,pt:1,pb:2},children:[Object(b.jsx)(o.e,{sx:{m:0},children:e.title}),Object(b.jsx)(o.f,{sx:{color:r},children:e.subtitle})]})]})})]},e.id)})),!(null===g||void 0===g||!g.length)&&Object(b.jsx)(b.Fragment,{})]})})})]})},U=n(72),J=n(720),Y=n(557),G=n(513),X=n(567),Q=n(572),q=n(608),K=n.n(q),Z=n(796),$=Object(s.a)(A.a)((function(e){return{color:e.theme.palette.text.primary}})),ee=Object(s.a)("div")((function(e){e.theme;return{top:0,zIndex:96,transition:"all 0.3s ease",boxShadow:g.b[8],height:d.c}})),te=Object(s.a)(f.a)((function(e){var t,n=e.theme;return t={padding:"8px",paddingLeft:18,paddingRight:20,height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:n.palette.primary.main},Object(p.a)(t,n.breakpoints.down("sm"),{paddingLeft:16,paddingRight:16}),Object(p.a)(t,n.breakpoints.down("xs"),{paddingLeft:14,paddingRight:16}),t})),ne=Object(s.a)(f.a)((function(){return{display:"flex",alignItems:"center",cursor:"pointer",borderRadius:24,padding:4,"& span":{margin:"0 8px"}}})),ae=Object(s.a)(J.a)((function(e){return{display:"flex",alignItems:"center",minWidth:185,"& a":{width:"100%",display:"flex",alignItems:"center",textDecoration:"none"},"& span":{marginRight:"10px",color:e.theme.palette.text.primary}}})),ie=(Object(s.a)("div")((function(e){var t=e.theme;return Object(p.a)({display:"inherit"},t.breakpoints.down("md"),{display:"none !important"})})),function(){var e=JSON.parse(window.localStorage.getItem("TopBarDetails")),t=(Object(U.c)((function(e){return e.loginReducer.LoginData})),Object(U.c)((function(e){return e.focusReducer.Progress}))),n=i.a.useState(0),r=Object(j.a)(n,2),s=r[0],d=r[1],u=i.a.useState(10),p=Object(j.a)(u,2),O=p[0],g=p[1],y=Object(a.useState)(!1),v=Object(j.a)(y,2),S=(v[0],v[1]),w=i.a.useRef((function(){}));i.a.useEffect((function(){w.current=function(){if(s>100||!t)d(0),g(10);else{var e=10*Math.random(),n=10*Math.random();d(s+e),g(s+e+n)}}})),i.a.useEffect((function(){var e=setInterval((function(){w.current()}),400);return function(){clearInterval(e)}}),[]);var I=Object(l.a)(),k=Object(c.a)(),T=k.settings,N=k.updateSettings,D=Object(m.a)(),_=D.logout,A=(D.user,Object(Y.a)(I.breakpoints.down("md")));return Object(a.useEffect)((function(){var e=setInterval((function(){S((function(e){return!e}))}),1e3);return function(){return clearInterval(e)}}),[]),Object(b.jsxs)(ee,{children:[Object(b.jsxs)(te,{children:[Object(b.jsxs)(f.a,{display:"flex",children:[Object(b.jsx)($,{onClick:function(){var e,t,n=T.layout1Settings;e=A?"close"===n.leftSidebar.mode?"mobile":"close":"full"===n.leftSidebar.mode?"close":"full",t={mode:e},N({layout1Settings:{leftSidebar:Object(h.a)({},t)}})},children:Object(b.jsx)(L.a,{children:"menu"})}),Object(b.jsx)(o.a,{style:{textTransform:"uppercase",paddingLeft:5,fontSize:20,paddingTop:5},children:"Admission Portal"})]}),Object(b.jsxs)(f.a,{display:"flex",alignItems:"center",children:[Object(b.jsxs)(C,{children:[Object(b.jsx)(Z.a,{icon:Object(b.jsx)(L.a,{children:"access_time"}),label:Object(b.jsx)("b",{children:K()().format("DD/MM/YYYY hh:mm:ss")})}),Object(b.jsx)(V,{})]}),Object(b.jsx)(x.h,{menuButton:Object(b.jsxs)(ne,{children:[Object(b.jsx)(G.a,{xsDown:!0,children:Object(b.jsx)(o.g,{children:Object(b.jsxs)("strong",{style:{textTransform:"uppercase"},children:[" ",e[0]]})})}),Object(b.jsx)(X.a,{src:e[1],sx:{cursor:"pointer"}})]}),children:Object(b.jsxs)(ae,{onClick:_,children:[Object(b.jsx)(L.a,{children:" power_settings_new "}),Object(b.jsx)(o.g,{children:" Logout "})]})})]})]}),t?Object(b.jsx)(Q.a,{variant:"determinate",value:s,valueBuffer:O,color:"secondary"}):null]})}),oe=i.a.memo(ie),ce=n(570),re=n(779),se=n(650),le=n.n(se),de=n(26),be=n(578),ue=Object(s.a)(f.a)((function(e){e.theme;return{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 18px 20px 29px"}})),he=Object(s.a)(o.g)((function(e){e.theme;return{fontSize:18,marginLeft:".5rem",display:"compact"===e.mode?"none":"block"}})),je=function(e){var t=e.children,n=Object(U.c)((function(e){return e.focusReducer.Error})),a=Object(U.b)(),o=Object(c.a)().settings.layout1Settings.leftSidebar.mode,r=i.a.forwardRef((function(e,t){return Object(b.jsx)(re.a,Object(h.a)(Object(h.a)({},e),{},{direction:"right"}))}));return Object(b.jsxs)(ue,{children:[Object(b.jsxs)(f.a,{display:"flex",alignItems:"center",children:[Object(b.jsx)(x.g,{}),Object(b.jsx)(he,{mode:o,className:"sidenavHoverShow",children:be.a.ShortName})]}),Object(b.jsx)(f.a,{className:"sidenavHoverShow",sx:{display:"compact"===o?"none":"block"},children:t||null}),Object(b.jsx)(ce.a,{open:n||void 0,autoHideDuration:3e3,ContentProps:{sx:{background:"#323232",color:"#ffffff",fontWeight:"normal",maxWidth:600,paddingRight:5,fontSize:13}},TransitionComponent:r,message:"Sorry, something went wrong there. Try again.",action:Object(b.jsx)(i.a.Fragment,{children:Object(b.jsx)(A.a,{"aria-label":"close",color:"inherit",sx:{p:.5},onClick:function(){return a(Object(de.p)(!1))},children:Object(b.jsx)(le.a,{})})})})]})},pe=n(214),me=n.n(pe),fe=[],xe=[{label:"Navigation",type:"label"},{name:"Dashboard",path:"/Admission/ADM_Dashboard",icon:"dashboard"},{name:"Basic Info",path:"/Admission/ADM_BasicInfo",icon:"info"},{name:"Education",path:"/Admission/ADM_Education",icon:"school"}],Oe=[{label:"Navigation",type:"label"},{name:"Dashboard",path:"/Tech/Tech_Dashboard",icon:"dashboard"},{name:"Basic Info",path:"/Tech/Tech_BasicInfo",icon:"info"},{name:"Education",path:"/Tech/Tech_Education",icon:"school"}],ge=[{label:"Navigation",type:"label"},{name:"Dashboard",path:"/Admission/EMP_Dashboard",icon:"dashboard"},{name:"Basic Info",path:"/Admission/EMP_BasicInfo",icon:"info"},{name:"Education Info",path:"/Admission/EMP_Education",icon:"school"},{name:"Job Experience",path:"/Admission/EMP_JobInfo",icon:"layers"},{name:"Research Work",path:"/Admission/EMP_Research",icon:"search"},{name:"Upload Documents",path:"/Admission/EMP_UploadDocs",icon:"chrome_reader_mode"}],ye=[{label:"Navigation",type:"label"},{name:"Dashboard",path:"/Vendor/Vendor_Dashboard",icon:"dashboard"},{name:"My Profile",path:"/Vendor/Vendor_AccSettings",icon:"settings"},{name:"Advanced Information",path:"/Vendor/Vendor_Information",icon:"info"},{name:"Active NIT",path:"/Vendor/Vendor_Active_NIT",icon:"gavel"},{name:"Active RFQ",path:"/Vendor/Vendor_Active_RFQ",icon:"content_copy"},{name:"Applied Tenders",path:"/Vendor/Vendor_Applied_Active_NIT",icon:"beenhere"}],ve=Object(s.a)(me.a)((function(){return{paddingLeft:"1rem",paddingRight:"1rem",position:"relative"}})),Se=Object(s.a)("div")((function(e){var t=e.theme;return Object(p.a)({position:"fixed",top:0,left:0,bottom:0,right:0,width:"100vw",background:"rgba(0, 0, 0, 0.54)",zIndex:-1},t.breakpoints.up("lg"),{display:"none"})})),we=function(e){var t=e.children,n=Object(a.useState)(fe),i=Object(j.a)(n,2),o=i[0],r=i[1];Object(a.useEffect)((function(){var e=window.localStorage.getItem("loginType");r("Employee"===e?ge:"Vendor"===e?ye:"Student"===e?xe:"TechStudent"===e?Oe:fe)}),[]);var s=Object(c.a)(),l=s.settings,d=s.updateSettings;return Object(b.jsxs)(a.Fragment,{children:[Object(b.jsxs)(ve,{options:{suppressScrollX:!0},children:[t,Object(b.jsx)(x.l,{items:o})]}),Object(b.jsx)(Se,{onClick:function(){return function(e){var t=l.activeLayout+"Settings",n=l[t];d(Object(h.a)(Object(h.a)({},l),{},Object(p.a)({},t,Object(h.a)(Object(h.a)({},n),{},{leftSidebar:Object(h.a)(Object(h.a)({},n.leftSidebar),e)}))))}({mode:"close"})}})]})},Ie=n(1046),ke=Object(s.a)(f.a)((function(e){var t=e.theme,n=e.width,a=e.primaryBg,i=e.bgImgURL;return{position:"fixed",top:0,left:0,height:"100vh",width:n,boxShadow:g.b[8],backgroundRepeat:"no-repeat",backgroundPosition:"top",backgroundSize:"cover",zIndex:111,overflow:"hidden",color:t.palette.text.primary,transition:"all 250ms ease-in-out",backgroundImage:"linear-gradient(to bottom, rgba(".concat(a,", 0.96), rgba(").concat(a,", 0.96)), url(").concat(i,")"),"&:hover":{width:d.a,"& .sidenavHoverShow":{display:"block"},"& .compactNavItem":{width:"100%",maxWidth:"100%","& .nav-bullet":{display:"block"},"& .nav-bullet-text":{display:"none"}}}}})),Te=Object(s.a)(f.a)((function(){return{height:"100%",display:"flex",flexDirection:"column"}})),Ne=function(){var e=Object(l.a)(),t=Object(c.a)(),n=t.settings,a=t.updateSettings,i=n.layout1Settings.leftSidebar,o=i.mode,r=i.bgImgURL,s=Object(y.a)(e.palette.primary.main);return Object(b.jsx)(ke,{bgImgURL:r,primaryBg:s,width:"compact"===o?d.b:d.a,children:Object(b.jsxs)(Te,{children:[Object(b.jsx)(je,{children:Object(b.jsx)(G.a,{smDown:!0,children:Object(b.jsx)(Ie.a,{onChange:function(){var e;e={mode:"compact"===o?"full":"compact"},a({layout1Settings:{leftSidebar:Object(h.a)({},e)}})},checked:"full"!==i.mode,color:"secondary",size:"small"})})}),Object(b.jsx)(we,{})]})})},Ce=i.a.memo(Ne),De=n(29),_e=function(e){var t=e.children,n=Object(De.a)(),a=Object(c.a)().settings,i=a.themes[a.layout1Settings.leftSidebar.theme]||n;return Object(b.jsx)(R.a,{theme:i,children:t})},Ae=n(8),Ee=n(1047),Le=Object(s.a)("div")((function(){return{position:"fixed",right:"30px",bottom:"50px",zIndex:99,transition:"all 0.15s ease","&.open":{right:"10px"}}})),Re=function(){var e=Object(c.a)(),t=e.settings,n=e.updateSettings,a=function(){n({secondarySidebar:{open:!t.secondarySidebar.open}})},i=Object(l.a)().palette.primary.contrastText;return Object(b.jsxs)(Le,{className:Object(Ae.default)({open:t.secondarySidebar.open}),children:[t.secondarySidebar.open&&Object(b.jsx)(A.a,{onClick:a,size:"small","aria-label":"toggle",children:Object(b.jsx)(L.a,{sx:{color:i},children:"close"})}),!t.secondarySidebar.open&&Object(b.jsx)(Ee.a,{color:"primary","aria-label":"expand",onClick:a,children:Object(b.jsx)(L.a,{sx:{color:i},children:"settings"})})]})},Be=Object(s.a)(E.a)((function(){return{top:"0",right:"0",height:"32px",width:"32px",borderRadius:"50%"}})),Me=n(942),Pe=n(325),ze=n(767),Fe=Object(s.a)(o.g)((function(e){var t=e.theme;return{color:t.palette.secondary.main,backgroundColor:t.palette.primary.dark,fontWeight:700,transform:"rotate(90deg)",marginBottom:"2.5rem",padding:".25rem .5rem",borderRadius:"4px",cursor:"pointer",letterSpacing:"1.5px",fontSize:"1rem","&:hover, &.open":{backgroundColor:t.palette.secondary.main,color:t.palette.secondary.contrastText}}})),He=Object(s.a)("div")((function(e){var t=e.theme;return{height:"100vh",width:320,position:"fixed",top:0,right:0,zIndex:50,display:"flex",flexDirection:"column",paddingBottom:"32px",boxShadow:g.b[12],background:t.palette.background.default,"& .helpText":{margin:"0px .5rem 1rem"}}})),We=Object(s.a)(Be)((function(){return{width:"100%",height:"152px !important",cursor:"pointer",marginTop:"12px",marginBottom:"12px","& .layout-name":{display:"none"},"&:hover .layout-name":{position:"absolute",display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%",background:"rgba(0,0,0,0.3)",zIndex:12}}})),Ve=Object(s.a)("div")((function(){return{minHeight:58,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",boxShadow:g.b[6]}})),Ue=Object(s.a)("img")((function(){return{width:"100%"}})),Je=Object(s.a)(me.a)((function(){return{paddingLeft:"16px",paddingRight:"16px"}})),Ye=[{name:"Light Sidebar",thumbnail:"/assets/images/screenshots/layout1-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"blue",layout1Settings:{leftSidebar:{mode:"full",theme:"whiteBlue",bgOpacity:.98},topbar:{theme:"blueDark",fixed:!0}},footer:{theme:"slateDark1"}}},{name:"Compact Sidebar",thumbnail:"/assets/images/screenshots/layout5-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"blue",layout1Settings:{leftSidebar:{mode:"compact",theme:"slateDark1",bgOpacity:.92},topbar:{theme:"whiteBlue",fixed:!0}}}},{name:"Dark Sidebar",thumbnail:"/assets/images/screenshots/layout1-blue-customizer.png",isPro:!1,options:{activeLayout:"layout1",activeTheme:"blue",layout1Settings:{leftSidebar:{mode:"full",theme:"slateDark1",bgOpacity:.92},topbar:{theme:"blueDark",fixed:!0}}}}],Ge=function(){var e=Object(a.useState)(!1),t=Object(j.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(0),s=Object(j.a)(r,2),d=s[0],u=s[1],p=Object(c.a)(),m=p.settings,x=p.updateSettings,O=Object(l.a)().palette.text.secondary,g=function(){i(!n)},y=function(e){u(e)},v=Object(h.a)({},m.themes[m.activeTheme]);return Object(b.jsxs)(a.Fragment,{children:[Object(b.jsx)(Me.a,{title:"Theme Settings",placement:"left",children:Object(b.jsx)(Fe,{className:"open",onClick:g,children:"DEMOS"})}),Object(b.jsx)(R.a,{theme:v,children:Object(b.jsx)(B.a,{anchor:"right",open:n,variant:"temporary",onClose:g,ModalProps:{keepMounted:!0},children:Object(b.jsxs)(He,{children:[Object(b.jsxs)(Ve,{children:[Object(b.jsxs)(f.a,{display:"flex",children:[Object(b.jsx)(L.a,{className:"icon",color:"primary",children:"settings"}),Object(b.jsx)(o.c,{sx:{ml:1,fontSize:"1rem"},children:"Theme Settings"})]}),Object(b.jsx)(A.a,{onClick:g,children:Object(b.jsx)(L.a,{className:"icon",children:"close"})})]}),Object(b.jsxs)(f.a,{px:3,mb:2,display:"flex",children:[Object(b.jsx)(Pe.a,{variant:"outlined",color:0===d?"secondary":"primary",onClick:function(){return y(0)},sx:{mr:2},children:"Demos"}),Object(b.jsx)(Pe.a,{variant:"outlined",color:1===d?"secondary":"primary",onClick:function(){return y(1)},children:"Settings"})]}),Object(b.jsxs)(Je,{options:{suppressScrollX:!0},children:[0===d&&Object(b.jsxs)(f.a,{sx:{mb:4,mx:3},children:[Object(b.jsx)(f.a,{sx:{color:O},children:"Layouts"}),Object(b.jsx)(f.a,{display:"flex",flexDirection:"column",children:Ye.map((function(e){return Object(b.jsx)(We,{color:"secondary",badgeContent:"Pro",invisible:!e.isPro,children:Object(b.jsxs)(M.a,{sx:{position:"relative"},onClick:function(){return x(e.options)},elevation:4,children:[Object(b.jsx)(f.a,{sx:{overflow:"hidden"},className:"layout-name",children:Object(b.jsx)(Pe.a,{variant:"contained",color:"secondary",children:e.name})}),Object(b.jsx)(Ue,{src:e.thumbnail,alt:e.name})]})},e.name)}))})]}),1===d&&Object(b.jsx)("div",{children:Object(b.jsxs)("div",{className:"helpText",children:["We used React context API to control layout. Check out the"," ",Object(b.jsx)(ze.a,{href:"http://demos.ui-lib.com/matx-react-doc/layout.html",target:"_blank",children:"Documentation"})]})})]})]})})})]})},Xe=Object(s.a)("div")((function(e){var t=e.theme;return{position:"fixed",height:"100vh",width:e.width,right:0,bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:t.shadows[8],backgroundColor:t.palette.primary.main,zIndex:98,transition:"all 0.15s ease",color:t.palette.text.primary,"@global":{"@media screen and (min-width: 767px)":{".content-wrap, .layout2.layout-contained, .layout2.layout-full":{marginRight:function(e){return e.width}},".matx-customizer":{right:function(e){return e.width}}},"@media screen and (max-width: 959px)":{".toolbar-menu-wrap .menu-area":{width:function(e){return"calc(100% - ".concat(e.width,")")}}}}}})),Qe=function(){var e=Object(l.a)().palette.primary.contrastText;return Object(b.jsxs)(Xe,{width:"50px",className:"secondary-sidebar",children:[Object(b.jsx)(o.g,{sx:{m:"auto"}}),Object(b.jsx)(Ge,{}),Object(b.jsx)(x.c,{icon:Object(b.jsx)(A.a,{sx:{my:"12px",color:e},size:"small",children:Object(b.jsx)(L.a,{children:"comments"})}),children:Object(b.jsx)(x.d,{})}),Object(b.jsx)(o.g,{sx:{m:"auto"}})]})},qe=function(e){var t=e.theme,n=(e.classes,e.children);e.open;return Object(b.jsx)(R.a,{theme:t,children:n})},Ke=function(){var e=Object(c.a)().settings,t=e.themes[e.secondarySidebar.theme];return Object(b.jsxs)(qe,{theme:t,children:[e.secondarySidebar.open&&Object(b.jsx)(Qe,{}),Object(b.jsx)(Re,{})]})},Ze=n(21),$e=Object(s.a)(f.a)((function(e){return{display:"flex",background:e.theme.palette.background.default}})),et=Object(s.a)(f.a)((function(){return{height:"100%",display:"flex",overflowY:"auto",overflowX:"hidden",flexDirection:"column",justifyContent:"space-between"}})),tt=Object(s.a)(me.a)((function(){return{height:"100%",position:"relative",display:"flex",flexGrow:"1",flexDirection:"column"}})),nt=Object(s.a)(f.a)((function(e){return{height:"100vh",display:"flex",flexGrow:"1",flexDirection:"column",verticalAlign:"top",marginLeft:e.width,position:"relative",overflow:"hidden",transition:"all 0.3s ease",marginRight:e.secondarySidebar.open?50:0}})),at=function(){var e=Object(c.a)(),t=e.settings,n=e.updateSettings,i=t.layout1Settings,o=t.secondarySidebar,r=t.themes[i.topbar.theme],s=i.leftSidebar,h=s.mode,j=s.show,p=function(){switch(h){case"full":return d.a;case"compact":return d.b;default:return"0px"}}(),m=Object(l.a)(),O=Object(Y.a)(m.breakpoints.down("md")),g=Object(a.useRef)({isMdScreen:O,settings:t}),y="theme-".concat(m.palette.type);Object(a.useEffect)((function(){var e=g.current.settings,t=e.layout1Settings.leftSidebar.mode;e.layout1Settings.leftSidebar.show&&n({layout1Settings:{leftSidebar:{mode:O?"close":t}}})}),[O]);var v=window.localStorage.getItem("loginType");return Object(b.jsxs)($e,{className:y,children:[j&&"close"!==h&&Object(b.jsx)(_e,{children:"FN_MBBS_Student"==v?null:Object(b.jsx)(Ce,{})}),Object(b.jsxs)(nt,{width:"FN_MBBS_Student"==v?"full":p,secondarySidebar:o,children:[i.topbar.show&&i.topbar.fixed&&Object(b.jsx)(R.a,{theme:r,children:Object(b.jsx)(oe,{fixed:!0,className:"elevation-z8"})}),t.perfectScrollbar&&Object(b.jsxs)(tt,{children:[i.topbar.show&&!i.topbar.fixed&&Object(b.jsx)(R.a,{theme:r,children:Object(b.jsx)(oe,{})}),Object(b.jsx)(f.a,{flexGrow:1,position:"relative",children:Object(b.jsx)(x.j,{children:Object(b.jsx)(Ze.b,{})})}),t.footer.show&&!t.footer.fixed&&Object(b.jsx)(u,{})]}),!t.perfectScrollbar&&Object(b.jsxs)(et,{children:[i.topbar.show&&!i.topbar.fixed&&Object(b.jsx)(R.a,{theme:r,children:Object(b.jsx)(oe,{})}),Object(b.jsx)(f.a,{flexGrow:1,position:"relative",children:Object(b.jsx)(x.j,{children:Object(b.jsx)(Ze.b,{})})}),t.footer.show&&!t.footer.fixed&&Object(b.jsx)(u,{})]}),t.footer.show&&t.footer.fixed&&Object(b.jsx)(u,{})]}),t.secondarySidebar.show&&Object(b.jsx)(Ke,{})]})};t.default=i.a.memo(at)},578:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n.p;var a=n.p+"static/media/PMC_Logo.81c16fd5.png",i={ShortName:"PUMHSW",FullName:"Peoples University of Medical & Health Sciences for Women",Message:"Welcome to the People\u2019s Institute of Technologist in Heath (PITH), Peoples University of Medical & Health Sciences for Women (PUMHSW) Nawab shah, Shaheed Benazirabad. PITH is one of the first initiatives of PUMHSW in Allied Health Sciences offering four different technologies including BS-Intensive Care Technology, BS-Anesthesia Technology, BS-Cardiovascular Technology & BS-Medical Laboratory Technology.",CompanyLogo:a,IPAddress:"http://121.52.155.34/pumhs_ums/",Address:"Hospital road, Civil Lines, Nawabshah, Shaheed Benazirabad, Sindh 67450"}}}]);