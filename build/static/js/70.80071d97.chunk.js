(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[70],{1576:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return V}));var a=n(52),o=n(12),r=n(5),i=n(34),s=n.n(i),c=n(0),l=n(567),d=n(563),u=n(532),m=n(767),h=n(182),p=n(507),g=n(794),j=n.n(g),b=n(536),f=n(154),x=n(568),y=n(645),O=n(656),v=n(540),S=n(732),w=n(736),C=n(565),T=n(627),k=n(325),P=n(580),I=(n(122),n(26)),W=n(72),M=n(201),N=n(40),A=n(21),H=(n(42),n(633)),B=n(578),D=(n(48),n(1));function L(e){return Object(D.jsxs)(b.a,Object(r.a)(Object(r.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ",Object(D.jsx)(N.c,{to:"/session/Home",children:B.a.ShortName})," ",(new Date).getFullYear(),"."]}))}var U=Object(f.b)();function V(){var e=Object(A.f)(),t=Object(M.a)().login,n=Object(W.b)(),r=c.useState({email:"info@aqmsolutions.com.pk",password:"dummyPass"}),i=Object(o.a)(r,2),g=i[0],f=(i[1],c.useState("")),B=Object(o.a)(f,2),V=B[0],E=B[1],z=c.useState(""),F=Object(o.a)(z,2),_=F[0],q=F[1],G=c.useState(!1),J=Object(o.a)(G,2),R=J[0],Y=J[1],K=c.useState(!1),Q=Object(o.a)(K,2),X=Q[0],Z=Q[1],$=c.useState({messageTitle:"Error!",message:"Your login is not matching our records. Please check your email and password.",image:O.a,button:"Okay"}),ee=Object(o.a)($,2),te=ee[0],ne=ee[1],ae=function(){var e=Object(a.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Y(!0),e.next=3,fetch(P.a.Address+"vpanel.asmx/VENDOR_LOGIN",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"id="+V+"&pwd="+_}).then((function(e){return e.json()})).then((function(e){Y(!1);var t=e[0];if("SUCCESS"==t.MSG){oe(),n(Object(I.n)(t)),localStorage.setItem("authDataVendor",JSON.stringify(t)),localStorage.setItem("loginType","Vendor"),window.sessionStorage.setItem("checkLogin","Login");var a=[t.SupplierTitle,""];localStorage.setItem("TopBarDetails",JSON.stringify(a))}else"PENDING"==t.MSG?(ne({messageTitle:"Your Account is Currently Being Reviewed!",message:"We will notify you soon as your account is approved or if we need any additional information from you.",image:y.a,button:"yes, continue"}),Z(!0)):(ne({messageTitle:"Error!",message:"Your login is not matching our records. Please check your email and password.",image:O.a,button:"Okay"}),Z(!0))})).catch((function(e){console.log(e),Y(!1)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),oe=function(){var n=Object(a.a)(s.a.mark((function n(a){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t(g.email,g.password);case 3:e("/Vendor/Vendor_Dashboard"),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),console.log(n.t0);case 9:case"end":return n.stop()}}),n,null,[[0,6]])})));return function(e){return n.apply(this,arguments)}}();return Object(D.jsxs)(x.a,{theme:U,children:[Object(D.jsxs)(v.a,{container:!0,component:"main",sx:{height:"100vh"},children:[Object(D.jsx)(d.a,{}),Object(D.jsx)(v.a,{item:!0,xs:!1,sm:4,md:7,sx:{backgroundImage:"url(https://www.jaggaer.com/app/uploads/2021/11/What-is-procurement.jpg)",backgroundRepeat:"no-repeat",backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[50]:e.palette.grey[900]},backgroundSize:"cover",backgroundPosition:"center"}}),Object(D.jsx)(v.a,{item:!0,xs:12,sm:8,md:5,component:h.a,elevation:6,square:!0,children:Object(D.jsxs)(p.a,{sx:{my:8,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(D.jsx)(l.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(D.jsx)(j.a,{})}),Object(D.jsx)(b.a,{component:"h1",variant:"h5",children:"Vendor Sign in"}),Object(D.jsxs)(p.a,{component:"form",noValidate:!0,onSubmit:function(e){e.preventDefault();var t=new FormData(e.currentTarget);console.log({email:t.get("email"),password:t.get("password")})},sx:{mt:1},children:[Object(D.jsx)(u.a,{onChange:function(e){E(e.target.value)},value:V,margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address & Cell No",name:"email",autoComplete:"email",autoFocus:!0}),Object(D.jsx)(u.a,{onChange:function(e){q(e.target.value)},value:_,margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),Object(D.jsx)(S.a,{control:Object(D.jsx)(w.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(D.jsx)(H.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},onClick:function(){return ae()},loading:R,loadingIndicator:"Loading\u2026",children:"Sign In"}),Object(D.jsxs)(v.a,{container:!0,children:[Object(D.jsx)(v.a,{item:!0,xs:!0,children:Object(D.jsx)(m.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(D.jsx)(v.a,{item:!0,children:Object(D.jsx)(N.c,{to:"/session/vendor_signup",style:{color:U.palette.primary.main,marginLeft:5,fontSize:14},children:"Don't have an account? Sign Up"})})]})]}),Object(D.jsx)("i",{style:{marginTop:40},children:"University Management System (UMS)"}),Object(D.jsx)(L,{sx:{mt:1}})]})})]}),Object(D.jsx)(C.a,{fullWidth:!0,maxWidth:"xs",open:X,onClose:function(){return Z(!1)},children:Object(D.jsx)(T.a,{children:Object(D.jsxs)("div",{children:[Object(D.jsx)("div",{style:{width:"100%",justifyContent:"center",display:"flex",paddingTop:30,paddingBottom:10},children:Object(D.jsx)("img",{src:te.image,width:"90px"})}),Object(D.jsx)(b.a,{variant:"h6",style:{fontWeight:"bold",textAlign:"center",paddingTop:25,paddingBottom:10},children:te.messageTitle}),Object(D.jsx)(b.a,{style:{color:"grey",textAlign:"center",fontSize:18},children:te.message}),Object(D.jsx)("div",{style:{width:"100%",justifyContent:"center",display:"flex"}}),Object(D.jsx)("div",{style:{width:"100%",justifyContent:"center",display:"flex"},children:Object(D.jsx)(k.a,{onClick:function(){return Z(!1)},style:{color:"#1976d2",marginTop:20},children:"Cancel"})})]})})})]})}},578:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n.p;var a=n.p+"static/media/PMC_Logo.81c16fd5.png",o={ShortName:"PUMHSW",FullName:"Peoples University of Medical & Health Sciences for Women",Message:"Welcome to the People\u2019s Institute of Technologist in Heath (PITH), Peoples University of Medical & Health Sciences for Women (PUMHSW) Nawab shah, Shaheed Benazirabad. PITH is one of the first initiatives of PUMHSW in Allied Health Sciences offering four different technologies including BS-Intensive Care Technology, BS-Anesthesia Technology, BS-Cardiovascular Technology & BS-Medical Laboratory Technology.",CompanyLogo:a,IPAddress:"http://121.52.155.34/pumhs_ums/",Address:"Hospital road, Civil Lines, Nawabshah, Shaheed Benazirabad, Sindh 67450"}},580:function(e,t,n){"use strict";var a=n(578).a.IPAddress;t.a={localhost:"http://121.52.155.34:5000/",Address:a,print:"http://172.173.225.115/",admission:"http://172.173.225.115:5000/"}},645:function(e,t,n){"use strict";t.a=n.p+"static/media/warning.d2431ca5.png"},656:function(e,t,n){"use strict";t.a=n.p+"static/media/cancel.15837238.png"}}]);