(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[93],{1584:function(e,t,a){"use strict";a.r(t);var n=a(7),i=a(0),c=a.n(i),r=a(84),o=a(12),l=a(5),s=a(39),j=a(325),d=a(567),b=a(569),u=a(1590),O=a(1602),x=a(895),h=a(747),m=a(565),p=a(900),g=a.n(p),f=a(1371),v=a.n(f),C=a(536),y=a(77),k=a(1),w=["onClose","selectedValue"],S=["username@gmail.com","user02@gmail.com"];function T(e){var t=e.onClose,a=e.selectedValue,n=Object(s.a)(e,w);function i(e){t(e)}return Object(k.jsxs)(m.a,Object(l.a)(Object(l.a)({onClose:function(){t(a)},"aria-labelledby":"simple-dialog-title"},n),{},{children:[Object(k.jsx)(h.a,{id:"simple-dialog-title",children:"Set backup account"}),Object(k.jsxs)(b.a,{children:[S.map((function(e){return Object(k.jsxs)(u.a,{button:!0,onClick:function(){return i(e)},children:[Object(k.jsx)(O.a,{children:Object(k.jsx)(d.a,{sx:{backgroundColor:y.a[100],color:y.a[600]},children:Object(k.jsx)(g.a,{})})}),Object(k.jsx)(x.a,{primary:e})]},e)})),Object(k.jsxs)(u.a,{button:!0,onClick:function(){return i("addAccount")},children:[Object(k.jsx)(O.a,{children:Object(k.jsx)(d.a,{children:Object(k.jsx)(v.a,{})})}),Object(k.jsx)(x.a,{primary:"add account"})]})]})]}))}function D(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],i=c.a.useState(S[1]),r=Object(o.a)(i,2),l=r[0],s=r[1];return Object(k.jsxs)("div",{children:[Object(k.jsxs)(C.a,{variant:"subtitle1",children:["Selected: ",l]}),Object(k.jsx)("br",{}),Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Open simple dialog"}),Object(k.jsx)(T,{selectedValue:l,open:a,onClose:function(e){n(!1),s(e)}})]})}var G=a(723),P=a(627),W=a(752);function A(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1];function i(){n(!1)}return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Open alert dialog"}),Object(k.jsxs)(m.a,{open:a,onClose:i,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(k.jsx)(h.a,{id:"alert-dialog-title",children:"Use Google's location service?"}),Object(k.jsx)(P.a,{children:Object(k.jsx)(W.a,{id:"alert-dialog-description",children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),Object(k.jsxs)(G.a,{children:[Object(k.jsx)(j.a,{onClick:i,color:"primary",children:"Disagree"}),Object(k.jsx)(j.a,{onClick:i,color:"primary",autoFocus:!0,children:"Agree"})]})]})]})}var B=a(779),L=c.a.forwardRef((function(e,t){return Object(k.jsx)(B.a,Object(l.a)({direction:"up",ref:t},e))}));function z(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1];function i(){n(!1)}return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Slide in alert dialog"}),Object(k.jsxs)(m.a,{open:a,TransitionComponent:L,keepMounted:!0,onClose:i,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description",children:[Object(k.jsx)(h.a,{id:"alert-dialog-slide-title",children:"Use Google's location service?"}),Object(k.jsx)(P.a,{children:Object(k.jsx)(W.a,{id:"alert-dialog-slide-description",children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),Object(k.jsxs)(G.a,{children:[Object(k.jsx)(j.a,{onClick:i,color:"primary",children:"Disagree"}),Object(k.jsx)(j.a,{onClick:i,color:"primary",children:"Agree"})]})]})]})}var N=a(532);function F(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1];function i(){n(!1)}return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Open form dialog"}),Object(k.jsxs)(m.a,{open:a,onClose:i,"aria-labelledby":"form-dialog-title",children:[Object(k.jsx)(h.a,{id:"form-dialog-title",children:"Subscribe"}),Object(k.jsxs)(P.a,{children:[Object(k.jsx)(W.a,{children:"To subscribe to this website, please enter your email address here. We will send updates occasionally."}),Object(k.jsx)(N.a,{autoFocus:!0,margin:"dense",id:"name",label:"Email Address",type:"email",fullWidth:!0})]}),Object(k.jsxs)(G.a,{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"secondary",onClick:i,children:"Cancel"}),Object(k.jsx)(j.a,{onClick:i,color:"primary",children:"Subscribe"})]})]})]})}var M=a(194),R=a(195),V=a(597),E=a(598),U=a(46),q=a(650),H=a.n(q),J=a(538),I=Object(U.a)(h.a)((function(e){var t=e.theme;return{margin:0,padding:t.spacing(2),"& .closeButton":{position:"absolute",right:t.spacing(1),top:t.spacing(1),color:t.palette.grey[500]}}})),K=function(e){var t=e.children,a=e.onClose;return Object(k.jsxs)(I,{disableTypography:!0,children:[Object(k.jsx)(C.a,{variant:"h6",children:t}),a?Object(k.jsx)(J.a,{"aria-label":"Close",className:"closeButton",onClick:a,children:Object(k.jsx)(H.a,{})}):null]})},Y=Object(U.a)(P.a)((function(e){return{"&.root":{padding:e.theme.spacing(2)}}})),Q=Object(U.a)(G.a)((function(e){return{"&.root":{margin:0,padding:e.theme.spacing(1)}}})),X=function(e){Object(V.a)(a,e);var t=Object(E.a)(a);function a(){var e;Object(M.a)(this,a);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={open:!1},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClose=function(){e.setState({open:!1})},e}return Object(R.a)(a,[{key:"render",value:function(){return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"secondary",onClick:this.handleClickOpen,children:"Open dialog"}),Object(k.jsxs)(m.a,{onClose:this.handleClose,"aria-labelledby":"customized-dialog-title",open:this.state.open,children:[Object(k.jsx)(K,{id:"customized-dialog-title",onClose:this.handleClose,children:"Modal title"}),Object(k.jsxs)(Y,{dividers:!0,children:[Object(k.jsx)(C.a,{gutterBottom:!0,children:"Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."}),Object(k.jsx)(C.a,{gutterBottom:!0,children:"Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."}),Object(k.jsx)(C.a,{gutterBottom:!0,children:"Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla."})]}),Object(k.jsx)(Q,{children:Object(k.jsx)(j.a,{onClick:this.handleClose,color:"primary",children:"Save changes"})})]})]})}}]),a}(c.a.Component),Z=X,$=a(562),_=a(863),ee=a(768),te=a(42),ae=a(69),ne=c.a.forwardRef((function(e,t){return Object(k.jsx)(B.a,Object(l.a)({direction:"up",ref:t},e))}));function ie(){var e=Object(ae.a)(),t=c.a.useState(!1),a=Object(o.a)(t,2),n=a[0],i=a[1];function r(){i(!1)}return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){i(!0)},children:"Open full-screen dialog"}),Object(k.jsxs)(m.a,{fullScreen:!0,open:n,onClose:r,TransitionComponent:ne,children:[Object(k.jsx)(_.a,{sx:{position:"relative"},children:Object(k.jsxs)(ee.a,{children:[Object(k.jsx)(J.a,{edge:"start",color:"inherit",onClick:r,"aria-label":"Close",children:Object(k.jsx)(H.a,{})}),Object(k.jsx)(te.d,{sx:{flex:1,marginLeft:e.spacing(2)},children:"Sound"}),Object(k.jsx)(j.a,{color:"inherit",onClick:r,children:"save"})]})}),Object(k.jsxs)(b.a,{children:[Object(k.jsx)(u.a,{button:!0,children:Object(k.jsx)(x.a,{primary:"Phone ringtone",secondary:"Titania"})}),Object(k.jsx)($.a,{}),Object(k.jsx)(u.a,{button:!0,children:Object(k.jsx)(x.a,{primary:"Default notification ringtone",secondary:"Tethys"})})]})]})]})}var ce=a(324),re=a(1046),oe=a(720),le=a(323),se=a(322),je=a(732),de=Object(U.a)("div")((function(e){var t=e.theme;return{"& form":{display:"flex",flexDirection:"column",margin:"auto",width:"fit-content"},"& .formControl":{marginTop:t.spacing(2),minWidth:120},"& .formControlLabel":{marginTop:t.spacing(1)}}}));function be(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],i=c.a.useState(!0),r=Object(o.a)(i,2),l=r[0],s=r[1],d=c.a.useState("sm"),b=Object(o.a)(d,2),u=b[0],O=b[1];function x(){n(!1)}return Object(k.jsxs)(de,{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Open max-width dialog"}),Object(k.jsxs)(m.a,{fullWidth:l,maxWidth:u,open:a,onClose:x,"aria-labelledby":"max-width-dialog-title",children:[Object(k.jsx)(h.a,{id:"max-width-dialog-title",children:"Optional sizes"}),Object(k.jsxs)(P.a,{children:[Object(k.jsx)(W.a,{children:"You can set my maximum width and whether to adapt or not."}),Object(k.jsxs)("form",{noValidate:!0,children:[Object(k.jsxs)(se.a,{className:"formControl",children:[Object(k.jsx)(le.a,{htmlFor:"max-width",children:"maxWidth"}),Object(k.jsxs)(ce.a,{value:u,onChange:function(e){O(e.target.value)},inputProps:{name:"max-width",id:"max-width"},children:[Object(k.jsx)(oe.a,{value:!1,children:"false"}),Object(k.jsx)(oe.a,{value:"xs",children:"xs"}),Object(k.jsx)(oe.a,{value:"sm",children:"sm"}),Object(k.jsx)(oe.a,{value:"md",children:"md"}),Object(k.jsx)(oe.a,{value:"lg",children:"lg"}),Object(k.jsx)(oe.a,{value:"xl",children:"xl"})]})]}),Object(k.jsx)(je.a,{className:"formControlLabel",control:Object(k.jsx)(re.a,{checked:l,onChange:function(e){s(e.target.checked)},value:"fullWidth"}),label:"Full width"})]})]}),Object(k.jsx)(G.a,{children:Object(k.jsx)(j.a,{onClick:x,color:"primary",children:"Close"})})]})]})}var ue=a(557);function Oe(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],i=Object(ae.a)(),r=Object(ue.a)(i.breakpoints.down("sm"));function l(){n(!1)}return Object(k.jsxs)("div",{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)},children:"Open responsive dialog"}),Object(k.jsxs)(m.a,{fullScreen:r,open:a,onClose:l,"aria-labelledby":"responsive-dialog-title",children:[Object(k.jsx)(h.a,{id:"responsive-dialog-title",children:"Use Google's location service?"}),Object(k.jsx)(P.a,{children:Object(k.jsx)(W.a,{children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),Object(k.jsxs)(G.a,{children:[Object(k.jsx)(j.a,{onClick:l,color:"primary",children:"Disagree"}),Object(k.jsx)(j.a,{onClick:l,color:"primary",autoFocus:!0,children:"Agree"})]})]})]})}var xe=a(1360),he=a(1510),me=["onClose","value","open"],pe=["None","Atria","Callisto","Dione","Ganymede","Hangouts Call","Luna","Oberon","Phobos","Pyxis","Sedna","Titania","Triton","Umbriel"];function ge(e){var t=e.onClose,a=e.value,n=e.open,i=Object(s.a)(e,me),r=c.a.useState(a),d=Object(o.a)(r,2),b=d[0],u=d[1],O=c.a.useRef(null);return c.a.useEffect((function(){n||u(a)}),[a,n]),Object(k.jsxs)(m.a,Object(l.a)(Object(l.a)({maxWidth:"xs",disableEscapeKeyDown:!0,TransitionProps:{onEntering:function(){null!=O.current&&O.current.focus()}},"aria-labelledby":"confirmation-dialog-title",open:n},i),{},{children:[Object(k.jsx)(h.a,{id:"confirmation-dialog-title",children:"Phone Ringtone"}),Object(k.jsx)(P.a,{dividers:!0,children:Object(k.jsx)(xe.a,{ref:O,"aria-label":"Ringtone",name:"ringtone",value:b,onChange:function(e,t){u(t)},children:pe.map((function(e){return Object(k.jsx)(je.a,{value:e,control:Object(k.jsx)(he.a,{}),label:e},e)}))})}),Object(k.jsxs)(G.a,{children:[Object(k.jsx)(j.a,{variant:"outlined",color:"secondary",onClick:function(){t()},children:"Cancel"}),Object(k.jsx)(j.a,{onClick:function(){t(b)},color:"primary",children:"Ok"})]})]}))}var fe=Object(U.a)("div")((function(e){return{width:"100%",maxWidth:360,backgroundColor:e.theme.palette.background.paper,"& .paper":{width:"80%",maxHeight:435}}}));function ve(){var e=c.a.useState(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],i=c.a.useState("Dione"),r=Object(o.a)(i,2),l=r[0],s=r[1];return Object(k.jsx)(fe,{children:Object(k.jsxs)(b.a,{component:"div",role:"list",children:[Object(k.jsx)(u.a,{button:!0,divider:!0,disabled:!0,role:"listitem",children:Object(k.jsx)(x.a,{primary:"Interruptions"})}),Object(k.jsx)(u.a,{button:!0,divider:!0,"aria-controls":"ringtone-menu","aria-label":"Phone ringtone",onClick:function(){n(!0)},role:"listitem",children:Object(k.jsx)(x.a,{primary:"Phone ringtone",secondary:l})}),Object(k.jsx)(u.a,{button:!0,divider:!0,disabled:!0,role:"listitem",children:Object(k.jsx)(x.a,{primary:"Default notification ringtone",secondary:"Tethys"})}),Object(k.jsx)(ge,{keepMounted:!0,open:a,value:l,className:"paper",id:"ringtone-menu",onClose:function(e){n(!1),e&&s(e)}})]})})}var Ce=a(188),ye=Object(U.a)("div")((function(e){var t,a=e.theme;return t={margin:"30px"},Object(n.a)(t,a.breakpoints.down("sm"),{margin:"16px"}),Object(n.a)(t,"& .breadcrumb",Object(n.a)({marginBottom:"30px"},a.breakpoints.down("sm"),{marginBottom:"16px"})),t}));t.default=function(){return Object(k.jsxs)(ye,{children:[Object(k.jsx)("div",{className:"breadcrumb",children:Object(k.jsx)(r.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Dialog"}]})}),Object(k.jsx)(r.m,{title:"simple Dialog",children:Object(k.jsx)(D,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"alert dialog",children:Object(k.jsx)(A,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"transition",children:Object(k.jsx)(z,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"form dialog",children:Object(k.jsx)(F,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"customized dialog",children:Object(k.jsx)(Z,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"full-screen dialog",children:Object(k.jsx)(ie,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"optimized size dialog",children:Object(k.jsx)(be,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"responsive dialog",children:Object(k.jsx)(Oe,{})}),Object(k.jsx)(Ce.a,{py:"12px"}),Object(k.jsx)(r.m,{title:"confirmation dialog",children:Object(k.jsx)(ve,{})})]})}}}]);