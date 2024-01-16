(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[79],{1562:function(e,t,n){"use strict";n.r(t);var i=n(16),a=n(5),c=n(12),r=n(7),o=n(540),s=n(611),l=n(325),d=n(570),j=n(84),b=n(46),u=n(0),h=n.n(u),m=n(604),O=n(633),g=n(72),x=(n(580),n(122),n(21)),p=n(650),f=n.n(p),v=n(565),S=n(723),y=n(627),D=n(752),T=n(747),C=n(1),P=Object(b.a)(m.TextValidator)((function(){return{width:"100%",marginBottom:"16px"}})),w=Object(b.a)("div")((function(e){var t,n=e.theme;return t={margin:"30px"},Object(r.a)(t,n.breakpoints.down("sm"),{margin:"16px"}),Object(r.a)(t,"& .breadcrumb",Object(r.a)({marginBottom:"30px"},n.breakpoints.down("sm"),{marginBottom:"16px"})),t})),I=(Object(b.a)("h4")((function(e){var t;e.theme;return t={fontSize:"1rem",fontWeight:"500",marginBottom:"16px",textTransform:"capitalize",color:"grey"},Object(r.a)(t,"fontSize",14),Object(r.a)(t,"marginTop",-20),Object(r.a)(t,"textAlign","center"),t})),Object(b.a)("div")((function(e){e.theme;return{marginTop:10}})));t.default=function(){var e=Object(u.useRef)(),t=(Object(g.c)((function(e){return e.loginReducer.LoginData})),Object(g.b)(),Object(x.f)()),n=Object(u.useState)(!1),b=Object(c.a)(n,2),p=b[0],M=b[1],A=Object(u.useState)(!1),B=Object(c.a)(A,2),R=B[0],k=B[1],H=Object(u.useState)(""),L=Object(c.a)(H,2),N=L[0],z=L[1],U=h.a.useState(!1),W=Object(c.a)(U,2),F=W[0],V=W[1],E=Object(u.useState)({}),_=Object(c.a)(E,2),J=_[0],q=_[1],G=Object(u.useState)([]),K=Object(c.a)(G,2),Q=K[0],X=K[1];Object(u.useEffect)((function(){return m.ValidatorForm.addValidationRule("isPasswordMatch",(function(e){return console.log(e),e===J.password})),function(){return m.ValidatorForm.removeValidationRule("isPasswordMatch")}}),[J.password]),Object(u.useEffect)((function(){q(Object(a.a)({},J))}),[]);J.ADM_RegistraionID;var Y=J.DocTitle,Z=J.DocString;return Object(C.jsx)("div",{children:Object(C.jsxs)(w,{children:[Object(C.jsx)("div",{className:"breadcrumb",children:Object(C.jsx)(j.a,{routeSegments:[{name:"Dashboard",path:"/Admission/ADM_Dashboard"},{name:"Upload Documents"}]})}),Object(C.jsx)(m.ValidatorForm,{children:Object(C.jsx)(o.a,{container:!0,sx:{mt:2},children:Object(C.jsx)(o.a,{item:!0,lg:12,md:12,sm:12,xs:12,sx:{mt:2},children:Object(C.jsxs)(j.m,{title:"Attached Documents",children:[Object(C.jsx)(s.a,{severity:"info",children:"Upload scan copies of original NTN, STRN, Incorporation/ registration No., PEC registration and other available, certificates if applicable."}),Object(C.jsx)(I,{}),Object(C.jsxs)(o.a,{container:!0,children:[Object(C.jsx)(o.a,{lg:5,md:5,sm:12,xs:12,children:Object(C.jsxs)("div",{children:[Object(C.jsx)("span",{style:{fontSize:12},children:"Document Name"}),Object(C.jsx)(P,{style:{marginTop:3},size:"small",type:"text",name:"DocTitle",onChange:function(e){e.persist(),q(Object(a.a)(Object(a.a)({},J),{},Object(r.a)({},e.target.name,e.target.value)))},value:Y})]})}),Object(C.jsx)(o.a,{lg:.2,md:.2}),Object(C.jsx)(o.a,{lg:5,md:5,sm:12,xs:12,children:Object(C.jsxs)("div",{children:[Object(C.jsx)("span",{style:{fontSize:12},children:"Upload Image (Image Size should be less than 1 MB)"}),Object(C.jsx)("div",{style:{borderWidth:1,borderStyle:"solid",padding:7,marginTop:2.5,borderRadius:5,borderColor:"#c9c9c9"},children:Object(C.jsx)("form",{method:"POST",action:"/profile-upload-single",encType:"multipart/form-data",children:Object(C.jsx)("input",{ref:e,accept:"image/*",type:"file",onChange:function(e){q(Object(a.a)(Object(a.a)({},J),{},{DocString:e.target.files[0]}))}})})})]})}),Object(C.jsx)(o.a,{lg:.2,md:.2}),Object(C.jsx)(o.a,{lg:1.6,md:1.6,sm:12,xs:12,children:Object(C.jsx)(O.a,{onClick:function(){return X((function(e){return[].concat(Object(i.a)(e),[{id:Q.length,DocTitle:Y,DocString:Z}])})),q(Object(a.a)(Object(a.a)({},J),{},{DocTitle:"",DocString:""})),void(e.current.value="")},color:"success",variant:"contained",style:{width:"100%",marginTop:23},children:"ADD RECORD"})})]}),Q.map((function(e){return Object(C.jsxs)(o.a,{container:!0,style:{backgroundColor:"#F5F5F5",paddingTop:"8px",paddingBottom:"5px",alignItems:"center",alignContent:"center",paddingLeft:"15px",borderRadius:5,marginBottom:"10px"},children:[Object(C.jsx)(o.a,{lg:5,md:5,sm:12,xs:12,children:Object(C.jsxs)("span",{children:[e.id+1+". ",e.DocTitle]})}),Object(C.jsx)(o.a,{lg:.2,md:.2}),Object(C.jsx)(o.a,{lg:5,md:5,sm:12,xs:12,children:Object(C.jsx)(l.a,{onClick:function(){z(e.DocString),k(!0)},children:"Preview Image"})}),Object(C.jsx)(o.a,{lg:.2,md:.2}),Object(C.jsx)(o.a,{lg:1.6,md:1.6,sm:12,xs:12,children:Object(C.jsx)(f.a,{onClick:function(){return function(e){X((function(t){return t.filter((function(t){return t.id!==e}))}))}(e.id)},style:{color:"red",width:"100%",marginLeft:"auto"}})})]})})),Object(C.jsx)(I,{}),Object(C.jsx)(I,{}),Object(C.jsx)(O.a,{type:"submit",onClick:function(e){t("/Admission/EMP_Dashboard")},loading:p,loadingIndicator:"Loading\u2026",variant:"contained",children:"Save and Next"}),Object(C.jsx)(O.a,{onClick:function(){return M(!1)},color:"secondary",variant:"contained",style:{marginLeft:10},children:"Cancel"})]})})})}),Object(C.jsx)(d.a,{open:F,autoHideDuration:3e3,anchorOrigin:{vertical:"top",horizontal:"right"},onClose:function(){return V(!1)},children:Object(C.jsx)(s.a,{onClose:function(){return V(!1)},sx:{width:"100%"},severity:"success",variant:"filled",children:"Well Done!.. Document saved successfully."})}),Object(C.jsxs)(v.a,{open:R,onClose:function(){return k(!1)},scroll:"paper",children:[Object(C.jsx)(T.a,{id:"scroll-dialog-title",children:"Preview Image"}),Object(C.jsx)(y.a,{dividers:"paper",children:Object(C.jsx)(D.a,{id:"scroll-dialog-description",tabIndex:-1,children:Object(C.jsx)("img",{style:{height:"100%",width:"100%"},src:""==N?null:URL.createObjectURL(N)})})}),Object(C.jsx)(S.a,{children:Object(C.jsx)(l.a,{onClick:function(){return k(!1)},children:"Close"})})]})]})})}},578:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n.p;var i=n.p+"static/media/PMC_Logo.81c16fd5.png",a={ShortName:"PUMHSW",FullName:"Peoples University of Medical & Health Sciences for Women",Message:"Welcome to the People\u2019s Institute of Technologist in Heath (PITH), Peoples University of Medical & Health Sciences for Women (PUMHSW) Nawab shah, Shaheed Benazirabad. PITH is one of the first initiatives of PUMHSW in Allied Health Sciences offering four different technologies including BS-Intensive Care Technology, BS-Anesthesia Technology, BS-Cardiovascular Technology & BS-Medical Laboratory Technology.",CompanyLogo:i,IPAddress:"http://121.52.155.34/pumhs_ums/",Address:"Hospital road, Civil Lines, Nawabshah, Shaheed Benazirabad, Sindh 67450"}},580:function(e,t,n){"use strict";var i=n(578).a.IPAddress;t.a={localhost:"http://121.52.155.34:5000/",Address:i,print:"http://172.173.225.115/",admission:"http://172.173.225.115:5000/"}}}]);