(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[77],{1536:function(e,t,n){"use strict";n.r(t);var c=n(52),i=n(12),s=n(7),a=n(34),r=n.n(a),l=n(0),o=n(6),j=n(520),d=n(796),x=n(72),h=n(580),b=n(507),O=n(691),f=n(540),p=n(726),u=n(727),m=n(728),g=n(729),T=n(21),y=n(608),D=n.n(y),w=(n(660),n(565)),E=n(627),v=n(325),S=n(633),C=n(1),I=Object(o.a)(b.a)((function(){return{display:"flex",paddingLeft:"24px",paddingRight:"24px",marginBottom:"12px",alignItems:"center",justifyContent:"space-between"}})),P=Object(o.a)("span")((function(){return{fontSize:"1rem",fontWeight:"500",textTransform:"capitalize"}})),B=Object(o.a)(O.a)((function(){return{minWidth:400,whiteSpace:"pre","& small":{width:50,height:15,borderRadius:500,boxShadow:"0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"},"& td":{borderBottom:"none"},"& td:first-of-type":{paddingLeft:"16px !important"}}})),z=(Object(o.a)("small")((function(e){return{width:50,height:15,color:"#fff",padding:"4px 8px",borderRadius:"4px",overflow:"hidden",background:e.bgcolor,boxShadow:"0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"}})),Object(o.a)("h4")((function(e){e.theme;return Object(s.a)({fontSize:"1rem",fontWeight:"500",marginBottom:"16px",textTransform:"capitalize",color:"#34314c"},"fontSize",20)})));t.default=function(){var e=Object(T.f)(),t=Object(x.c)((function(e){return e.loginReducer.EmpData})),n=Object(l.useState)([]),s=Object(i.a)(n,2),a=s[0],o=s[1],O=Object(l.useState)([]),y=Object(i.a)(O,2),M=y[0],A=y[1],_=Object(l.useState)(!1),L=Object(i.a)(_,2),N=L[0],R=L[1],W=Object(l.useState)({}),k=Object(i.a)(W,2),J=k[0],F=k[1],Y=Object(l.useState)(!1),U=Object(i.a)(Y,2),H=U[0],G=U[1],V=Object(l.useState)(!1),q=Object(i.a)(V,2),K=q[0],Q=q[1];Object(l.useEffect)((function(){Z()}),[]);var X=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h.a.Address+"erec.asmx/GET_JOB_OPENING",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"comp=0"}).then((function(e){return e.json()})).then((function(e){var n=e.filter((function(e){return!t.some((function(t){return e.JOB_ID===t.JOB_ID}))}));o(n),A(t)})).catch((function(e){console.log(e),Q(!1)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=Object(c.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(h.a.Address+"erec.asmx/REC_JOB_APPLY_LIST_BY_EMP",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"systemID="+t.T_EMP_ID}).then((function(e){return e.json()})).then((function(e){X(e),Q(!0)})).catch((function(e){console.log(e),X([]),Q(!1)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(c.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return G(!0),e.next=3,fetch(h.a.Address+"erec.asmx/REC_JOB_APPLY_INSERT",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"systemID="+t.T_EMP_ID+"&jobID="+J.JOB_ID}).then((function(e){return e.json()})).then((function(e){G(!1),Z(),R(!1)})).catch((function(e){console.log(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ee={statusButton:{color:"white",borderRadius:5,height:25,paddingTop:1,marginTop:-5,marginBottom:-5}};return Object(C.jsxs)("div",{style:{margin:20},children:[Object(C.jsx)(f.a,{item:!0,lg:8,md:8,sm:12,xs:12,sx:{pl:"20px"},children:Object(C.jsxs)(z,{children:["Welcome ",t.NAME]})}),""!==t.DOB||0!==t.IsEducation||0!==t.IsExperience||0!==t.IsResearchWork||0!==t.IsFiles?Object(C.jsxs)(C.Fragment,{children:[K?Object(C.jsxs)(j.a,{elevation:3,sx:{pt:"20px",mb:3},children:[Object(C.jsx)(I,{children:Object(C.jsx)(P,{children:"Job Applied"})}),Object(C.jsx)(b.a,{width:"100%",children:Object(C.jsxs)(B,{children:[Object(C.jsx)(p.a,{children:Object(C.jsxs)(u.a,{children:[Object(C.jsx)(m.a,{sx:{width:"2%"}}),Object(C.jsx)(m.a,{sx:{width:"10%"},children:"S. No"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Job Title"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Department"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Designation"}),Object(C.jsx)(m.a,{sx:{width:"15%"},children:"Applied Date"}),Object(C.jsx)(m.a,{sx:{width:"13%"},children:"Action"})]})}),Object(C.jsx)(g.a,{children:M.map((function(t,n){return Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsxs)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:["0",n+1]}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:t.JOB_TITLE}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:t.DeptTitle}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:t.DesTitle}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:t.CREATEDATE}),Object(C.jsx)(m.a,{align:"left",children:Object(C.jsx)(d.a,{disabled:!0,onClick:function(){return e("/Admission/EMP_BasicInfo")},color:"success",label:"VOUCHER",style:ee.statusButton})})]},n)}))})]})})]}):null,Object(C.jsxs)(j.a,{elevation:3,sx:{pt:"20px",mb:3},children:[Object(C.jsx)(I,{children:Object(C.jsx)(P,{children:"Open Jobs List"})}),Object(C.jsx)(b.a,{width:"100%",children:Object(C.jsxs)(B,{children:[Object(C.jsx)(p.a,{children:Object(C.jsxs)(u.a,{children:[Object(C.jsx)(m.a,{sx:{width:"2%"}}),Object(C.jsx)(m.a,{sx:{width:"10%"},children:"S. No"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Job Title"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Department"}),Object(C.jsx)(m.a,{sx:{width:"20%"},children:"Designation"}),Object(C.jsx)(m.a,{sx:{width:"7.5%"},children:"Fee"}),Object(C.jsx)(m.a,{sx:{width:"7.5%"},children:"Close Date"}),Object(C.jsx)(m.a,{sx:{width:"13%"},children:"Action"})]})}),Object(C.jsx)(g.a,{children:a.map((function(e,t){return Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsxs)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:["0",t+1]}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:e.JOB_TITLE}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:e.DeptTitle}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:e.DesTitle}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:e.VOUCHER_AMOUNT}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:D()(e.END_DATE).format("DD/MM/YYYY")}),Object(C.jsx)(m.a,{align:"left",children:Object(C.jsx)(d.a,{onClick:function(){F(e),R(!0)},color:"primary",label:"APPLY",style:ee.statusButton})})]},t)}))})]})})]})]}):null,Object(C.jsxs)(j.a,{elevation:3,sx:{pt:"20px",mb:3},children:[Object(C.jsx)(I,{children:Object(C.jsx)(P,{children:"Complete Initial Process"})}),Object(C.jsx)(b.a,{width:"100%",children:Object(C.jsxs)(B,{children:[Object(C.jsx)(p.a,{children:Object(C.jsxs)(u.a,{children:[Object(C.jsx)(m.a,{sx:{width:"2.8%"}}),Object(C.jsx)(m.a,{sx:{width:"10%"},children:"S. No"}),Object(C.jsx)(m.a,{sx:{width:"73%"},children:"Description"}),Object(C.jsx)(m.a,{sx:{width:"13.2%"},children:"Action"})]})}),Object(C.jsxs)(g.a,{children:[Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"01"}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"Complete your Basic Information"}),Object(C.jsx)(m.a,{align:"left",children:""==t.DOB?Object(C.jsx)(d.a,{onClick:function(){return e("/Admission/EMP_BasicInfo")},color:"primary",label:"FULL INFO",style:ee.statusButton}):Object(C.jsx)(d.a,{color:"success",label:"COMPLETED",style:ee.statusButton})})]}),Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"02"}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"Complete your Education Information"}),Object(C.jsx)(m.a,{align:"left",children:0==t.IsEducation?Object(C.jsx)(d.a,{onClick:function(){return e("/Admission/EMP_Education")},color:"primary",label:"FULL INFO",style:ee.statusButton}):Object(C.jsx)(d.a,{color:"success",label:"COMPLETED",style:ee.statusButton})})]}),Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"03"}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"Complete your Job Experience"}),Object(C.jsx)(m.a,{align:"left",children:0==t.IsExperience?Object(C.jsx)(d.a,{onClick:function(){return e("/Admission/EMP_JobInfo")},color:"primary",label:"FULL INFO",style:ee.statusButton}):Object(C.jsx)(d.a,{color:"success",label:"COMPLETED",style:ee.statusButton})})]}),Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"04"}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"Complete your Research Work"}),Object(C.jsx)(m.a,{align:"left",children:0==t.IsResearchWork?Object(C.jsx)(d.a,{onClick:function(){return e("/Admission/EMP_Research")},color:"primary",label:"FULL INFO",style:ee.statusButton}):Object(C.jsx)(d.a,{color:"success",label:"COMPLETED",style:ee.statusButton})})]}),Object(C.jsxs)(u.a,{hover:!0,children:[Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"}}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"05"}),Object(C.jsx)(m.a,{align:"left",sx:{textTransform:"capitalize"},children:"Complete your Documents"}),Object(C.jsx)(m.a,{align:"left",children:0==t.IsFiles?Object(C.jsx)(d.a,{onClick:function(){return e("/Admission/EMP_UploadDocs")},color:"primary",label:"FULL INFO",style:ee.statusButton}):Object(C.jsx)(d.a,{color:"success",label:"COMPLETED",style:ee.statusButton})})]})]})]})})]}),Object(C.jsx)(w.a,{fullWidth:!0,maxWidth:"sm",open:N,onClose:function(){return R(!1)},children:Object(C.jsxs)(E.a,{children:[Object(C.jsx)("div",{style:{fontWeight:"bold",color:"#2e7d32",fontSize:18},children:"Job Details"}),Object(C.jsxs)(f.a,{container:!0,spacing:2,sx:{mt:1},children:[Object(C.jsxs)(f.a,{item:!0,xs:6,children:[Object(C.jsx)("div",{style:{fontWeight:"bold",color:"grey",fontSize:12},children:"Start Date"}),Object(C.jsx)("div",{style:{fontWeight:"bold",paddingTop:5},children:D()(J.START_DATE).format("DD MMMM YYYY")})]}),Object(C.jsxs)(f.a,{item:!0,xs:6,children:[Object(C.jsx)("div",{style:{fontWeight:"bold",color:"grey",fontSize:12},children:"Close Date"}),Object(C.jsx)("div",{style:{fontWeight:"bold",paddingTop:5},children:D()(J.END_DATE).format("DD MMMM YYYY")})]})]}),Object(C.jsxs)(f.a,{container:!0,spacing:2,sx:{mt:2,backgroundColor:"#f8f8f8",paddingBottom:"15px",borderRadius:"10px"},children:[Object(C.jsxs)(f.a,{item:!0,xs:3,children:[Object(C.jsx)("div",{style:{color:"#454243"},children:"Department:"}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:"Designation:"}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:"Grade / BPS:"}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:"Processing Fee:"}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:"Description:"})]}),Object(C.jsxs)(f.a,{item:!0,xs:9,children:[Object(C.jsx)("div",{style:{color:"#454243"},children:J.DeptTitle}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:J.DesTitle}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:J.BPS_ID}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:J.VOUCHER_AMOUNT}),Object(C.jsx)("div",{style:{color:"#454243",paddingTop:5},children:J.DESCRIPTION})]})]}),Object(C.jsx)(f.a,{container:!0,justifyContent:"flex-end",children:Object(C.jsxs)(f.a,{item:!0,children:[Object(C.jsx)(S.a,{onClick:function(){$()},loading:H,variant:"contained",sx:{mt:3,mb:2},children:"APPLY FOR JOB"}),Object(C.jsx)(v.a,{onClick:function(){return R(!1)},color:"secondary",variant:"contained",sx:{mt:3,mb:2,ml:1},children:"CLOSE"})]})})]})})]})}},578:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n.p;var c=n.p+"static/media/PMC_Logo.81c16fd5.png",i={ShortName:"PUMHSW",FullName:"Peoples University of Medical & Health Sciences for Women",Message:"Welcome to the People\u2019s Institute of Technologist in Heath (PITH), Peoples University of Medical & Health Sciences for Women (PUMHSW) Nawab shah, Shaheed Benazirabad. PITH is one of the first initiatives of PUMHSW in Allied Health Sciences offering four different technologies including BS-Intensive Care Technology, BS-Anesthesia Technology, BS-Cardiovascular Technology & BS-Medical Laboratory Technology.",CompanyLogo:c,IPAddress:"http://121.52.155.34/pumhs_ums/",Address:"Hospital road, Civil Lines, Nawabshah, Shaheed Benazirabad, Sindh 67450"}},580:function(e,t,n){"use strict";var c=n(578).a.IPAddress;t.a={localhost:"http://121.52.155.34:5000/",Address:c,print:"http://172.173.225.115/",admission:"http://172.173.225.115:5000/"}}}]);