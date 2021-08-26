(this["webpackJsonpthreadder-frontend"]=this["webpackJsonpthreadder-frontend"]||[]).push([[0],{133:function(e,t,n){},134:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(9),c=n.n(i),o=n(17),s=n(37),l=n(171),u=n(182),d=n(11),h=n.n(d),f=n(74),m=n.n(f),j=n(77),g={main:"#283845",light:"#395164",dark:"#22303c",contrastText:"#ffffff",contrastText2:"#e5e5e5"},p={paper:g.light,default:"#202c39"},b=Object(j.a)({palette:{primary:g,secondary:{main:"#ffc107",light:"#ffd147",dark:"#c97d02",hover:"#ffa042",inactive:"#432a01",contrastText:"#14213d",inactiveText:"#111111"},background:p},spacing:4,shape:{borderRadius:2}}),x=n(183),O=n(178),v=n(177),w=n(188),y=n(175),T=n(176),N=n(137),C=n(39),S=n(172),I=n(2),k=Object(l.a)((function(e){return{styledButton:{"&:disabled":{color:e.palette.secondary.inactiveText,backgroundColor:e.palette.secondary.inactive},"&:hover":{backgroundColor:e.palette.secondary.hover}}}}));function F(e){var t=k(),n=h()(e.className,t.styledButton);return Object(I.jsx)(S.a,Object(C.a)(Object(C.a)({},e),{},{className:n}))}var H=n(184),L=n(174),z=n(191),W=n(186),A=Object(l.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)}}}));function E(e){var t={paper:A().menuList};return Object(I.jsx)(W.a,Object(C.a)({classes:t},e))}var M=n(190),G=Object(l.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)},menuItem:{color:e.palette.primary.contrastText,"&:hover":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main}}}}));function R(e){var t=G(),n=Object(r.useState)(null),a=Object(o.a)(n,2),i=a[0],c=a[1],s=function(){c(null)};return Object(I.jsxs)(H.a,{children:[Object(I.jsx)(L.a,{size:"small",onClick:function(e){c(e.currentTarget)},children:Object(I.jsx)(z.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),Object(I.jsxs)(E,{id:"account-settings-menu",getContentAnchorEl:null,anchorEl:i,anchorReference:"anchorEl",anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"},open:Boolean(i),onClose:s,autoFocus:!1,children:[Object(I.jsx)(M.a,{className:t.menuItem,onClick:function(){s();var t=e.user.screenName;window.open("https://twitter.com/".concat(t),"_blank")},children:"Go to Twitter"}),Object(I.jsx)(M.a,{className:t.menuItem,onClick:function(){s(),e.logout()},children:"Log out"})]})]})}var B=Object(l.a)((function(e){return{toolbar:{height:"1em",padding:"1em 1.5em"},title:{flexGrow:1}}}));function U(e){var t=B(),n=Object(I.jsx)(F,{variant:"contained",color:"secondary",onClick:e.login,children:"Log in"});return Object(I.jsx)(y.a,{position:"relative",children:Object(I.jsxs)(T.a,{className:t.toolbar,children:[Object(I.jsx)(N.a,{variant:"h5",className:t.title,children:"Threadder"}),e.loggedIn?Object(I.jsx)(R,{user:e.user,logout:e.logout}):n]})})}var V=Object(l.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},textareaContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},threadTextarea:{fontFamily:"inherit",fontSize:"inherit",resize:"none",width:"100%",padding:"0.5em 0.75em",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,border:0,boxShadow:"inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)","&:focus":{border:0,outline:0}},statsContainer:{padding:"1em 1.5em",display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",backgroundColor:e.palette.primary.dark},statsText:{color:e.palette.primary.contrastText2}}})),J=a.a.forwardRef((function(e,t){var n=V();return Object(I.jsxs)(v.a,{container:!0,spacing:2,className:h()(n.root,n.fullHeight),children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:h()(n.expandingFlexItem,n.fullHeight),children:Object(I.jsx)(O.a,{className:h()(n.textareaContainer,n.fullHeight,n.containerWithShadow),children:Object(I.jsx)("textarea",{className:h()(n.threadTextarea,n.fullHeight),onChange:e.handleTweetInput,placeholder:"Type your tweet here...",value:e.tweetText,ref:t})})}),Object(I.jsx)(v.a,{item:!0,xs:12,className:n.fixedSizeFlexItem,children:Object(I.jsxs)(O.a,{className:h()(n.statsContainer,n.containerWithShadow),children:[Object(I.jsx)(N.a,{variant:"body2",className:n.statsText,children:"Characters: ".concat(e.tweetText.length)}),Object(I.jsx)(N.a,{variant:"body2",className:n.statsText,children:"Tweets: ".concat(e.thread.length)})]})}),Object(I.jsx)(w.a,{mdUp:!0,children:Object(I.jsx)(v.a,{item:!0,xs:12,className:n.fixedSizeFlexItem,children:Object(I.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.viewThreadHandler,children:"View thread"})})})]})})),_=Object(l.a)((function(e){return{root:{marginBottom:"1.5em",flexFlow:"row nowrap","&:last-child":{marginBottom:0}},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},verticalGrid:{display:"flex",flexFlow:"column nowrap"},centerVerticalGridItems:{alignItems:"center"},threadLineContainer:{padding:0},threadLine:{width:"2px",height:"calc(100% + 1.5em)",backgroundColor:e.palette.background.default},tweetContainer:{marginLeft:"1em"},resetFont:{fontFamily:"inherit",fontSize:"inherit"},defaultTextColor:{color:e.palette.primary.contrastText},userName:{fontWeight:"bold"},userHandle:{color:e.palette.primary.contrastText2,marginLeft:"0.5em"},tweetText:{padding:0,margin:0,marginTop:"0.25em",whiteSpace:"pre-wrap",overflowWrap:"break-word"},hiddenOverflow:{overflow:"hidden"}}}));function Z(e){var t=_();return Object(I.jsxs)(v.a,{container:!0,className:t.root,children:[Object(I.jsxs)(v.a,{container:!0,className:h()(t.fixedSizeFlexItem,t.verticalGrid,t.centerVerticalGridItems),children:[Object(I.jsx)(v.a,{item:!0,children:Object(I.jsx)(z.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),e.threadLine&&Object(I.jsx)(v.a,{item:!0,className:h()(t.expandingFlexItem,t.threadLineContainer),children:Object(I.jsx)("div",{className:t.threadLine})})]}),Object(I.jsxs)(v.a,{container:!0,className:h()(t.expandingFlexItem,t.verticalGrid,t.tweetContainer,t.hiddenOverflow),children:[Object(I.jsxs)(v.a,{item:!0,children:[Object(I.jsx)("span",{className:h()(t.resetFont,t.defaultTextColor,t.userName),children:e.user.name}),Object(I.jsx)("span",{className:h()(t.resetFont,t.userHandle),children:"@".concat(e.user.screenName)})]}),Object(I.jsx)(v.a,{item:!0,children:Object(I.jsx)("p",{className:h()(t.resetFont,t.defaultTextColor,t.tweetText),children:e.text})})]})]})}var q=Object(l.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},autoOverflow:{overflow:"auto"},hiddenOverflow:{overflow:"hidden"},tweetsContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},buttonRowContainer:{display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",gap:"1em",margin:0,padding:0}}}));function D(e){var t=q(),n=e.thread.map((function(t,n,r){return Object(I.jsx)(Z,{user:e.user,text:t,threadLine:n+1<r.length},t)}));return Object(I.jsxs)(v.a,{container:!0,spacing:2,className:h()(t.root,t.fullHeight,t.hiddenOverflow),children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:h()(t.expandingFlexItem,t.fullHeight,t.hiddenOverflow),children:Object(I.jsx)(O.a,{className:h()(t.tweetsContainer,t.fullHeight,t.containerWithShadow,t.autoOverflow),children:n})}),Object(I.jsx)(v.a,{item:!0,xs:12,className:t.fixedSizeFlexItem,children:Object(I.jsxs)(O.a,{className:h()(t.buttonRowContainer,t.fullHeight),children:[Object(I.jsx)(w.a,{mdUp:!0,children:Object(I.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.editThreadHandler,children:"Edit thread"})}),Object(I.jsx)(F,{variant:"contained",color:"secondary",onClick:e.publishHandler,disabled:!n.length>0,fullWidth:!0,children:"Publish thread"})]})})]})}var P=n(189),Y=n(179),$=n(180),K=Object(l.a)((function(e){return{dialogText:{color:e.palette.primary.contrastText,textAlign:"center"}}}));function Q(e){var t=K();return Object(I.jsx)(P.a,{open:e.open,children:Object(I.jsx)(Y.a,{children:Object(I.jsx)($.a,{className:t.dialogText,children:e.msg})})})}var X=n(181),ee=n(185),te=Object(l.a)((function(e){return{root:{position:"absolute",width:"30%",margin:0,zIndex:1e4,left:"35%",top:0}}}));function ne(e){var t=te();return Object(I.jsx)(X.a,{in:e.visible,className:t.root,children:Object(I.jsx)(ee.a,{severity:e.severity,children:e.msg})})}var re=n(75);n.n(re).a.config();var ae=280,ie="https://threadder-app.herokuapp.com/",ce="Untitled User";function oe(e){return e.replace(/^[ \t]*/,"").replace(/[ \t]*$/,"")}function se(e){return e.split(/(\n)/).filter((function(e,t,n){return"\n"!==e||"\n"===e&&"\n"!==n[t]}))}function le(e){return e.split(/((?<!\svs?)(?<=\s\w+[a-zA-Z]+)\.(?=\s*[a-zA-Z]+\w*)|(?<=\d+[\s./-]\d+|\s\d+)\.(?=\s*\W*[a-zA-Z]+\w*\W*)|\.$)/g).map((function(e,t,n){return"."===n[t+1]?"".concat(e,"."):"."===e?"":e})).filter((function(e){return""!==e})).map((function(e){return oe(e)}))}function ue(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";if(0===e.length)return[];for(var n=[],r=0;r<e.length;r++)if(0!==r){var a=n.length-1,i=n[a],c=e[r];i.length<=70||i.length+c.length<=ae?(i+=c.startsWith("\n")?c:"".concat(t).concat(c),n[a]=i):n.push(e[r])}else n.push(e[r]);return n}var de=n(58),he=n(50);function fe(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(0!==n){var a=t.length-1,i=je(t[a]);i.length+r.length+1<=ae?t[a]="".concat(i," ").concat(r):t.push(r)}else t.push(r)}return t}function me(e){if(e.length<=ae)return e;for(var t=Math.ceil(e.length/277),n=[],r=0;r<t;r++){var a=277*r,i=277*(r+1),c=e.slice(a,i)+"...";n.push(c)}return n}function je(e){return"..."===e.slice(e.length-3)?e.slice(0,e.length-3):e}function ge(e){var t=e.trim().split("(---)").map((function(e){return e.trim()})).filter((function(e){return""!==e}));if(pe(t))return t;var n=t.map((function(e){return e.length<=ae?e:function(e){var t=ue(se(e),"\n");return t.every((function(e){return e.length<=ae}))?t:ue(t.map((function(e){return e.length<=ae?e:le(e)})).flat().map((function(e){return e.trim()})))}(e)})).flat().map((function(e){return e.trim()}));return pe(n)?n:fe(n.map((function(e){return e.length<=ae?e:function(e){if(e.length<=ae)return e;var t,n=e.split(" ").filter((function(e){return 0!==e.length})),r="",a=[],i=Object(he.a)(n);try{for(i.s();!(t=i.n()).done;){var c=t.value.trim();c.length>ae?(r.length>0&&(a.push("".concat(r,"...")),r=""),a=[].concat(Object(de.a)(a),Object(de.a)(me(c)))):0===r.length?r+=c:r.length+c.length+1<277?r+=" ".concat(c):(a.push("".concat(r,"...")),r=c)}}catch(s){i.e(s)}finally{i.f()}r.length>0&&a.push(r);var o=a.length-1;return a[o]=je(a[o]),a}(e)})).flat().map((function(e){return e.trim()}))).flat().map((function(e){return e.trim()}))}function pe(e){return e.every((function(e){return e.length<=ae}))}function be(e){return null!==e&&(t=e,Object.entries(t).length>0)&&function(e,t){var n,r=Object.keys(e),a=Object(he.a)(t);try{for(a.s();!(n=a.n()).done;){var i=n.value;if(!r.includes(i))return!1}}catch(c){a.e(c)}finally{a.f()}return!0}(e,["name","screenName","profileImage"])&&e.name!==ce;var t}var xe=n(76),Oe=n.n(xe);function ve(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return Oe()({url:e,method:t,withCredentials:!0,baseURL:ie,data:n||{}})}function we(e){return"local"===e?localStorage:"session"===e?sessionStorage:void 0}function ye(e,t,n){var r=we(e);r&&r.setItem(t,JSON.stringify(n))}function Te(e,t){var n=we(e);if(n)return JSON.parse(n.getItem(t))}var Ne=Object(l.a)((function(e){return{root:Object(s.a)({height:"100vh",maxHeight:"100vh"},e.breakpoints.down("sm"),{height:"93vh",maxHeight:"93vh"}),gridContainer:{flexFlow:"column nowrap",height:"100%"},appHeader:{flex:0},appView:Object(s.a)({flex:1},e.breakpoints.up("md"),{display:"flex",flexFlow:"row nowrap",gap:e.spacing(1.5)}),mainArea:{height:"100%"},hiddenOverflow:{overflow:"hidden"},loggedInSuccess:{color:e.palette.primary.contrastText,textAlign:"center",fontWeight:"normal"}}}));function Ce(e){var t=Ne(),n={name:ce,screenName:"untitled_user",profileImage:""},a=Object(r.useState)(!1),i=Object(o.a)(a,2),c=i[0],s=i[1],l=Object(r.useState)("error"),d=Object(o.a)(l,2),f=d[0],j=d[1],g=Object(r.useState)(""),p=Object(o.a)(g,2),y=p[0],T=p[1],N=Object(r.useState)(!1),C=Object(o.a)(N,2),S=C[0],k=C[1],F=Object(r.useState)("This is an empty dialog"),H=Object(o.a)(F,2),L=H[0],z=H[1],W=Object(r.useState)(Te("session","loggedIn")||!1),A=Object(o.a)(W,2),E=A[0],M=A[1],G=Object(r.useState)(Te("session","user")||n),R=Object(o.a)(G,2),B=R[0],V=R[1],_=Object(r.useState)(Te("session","tweetText")||""),Z=Object(o.a)(_,2),q=Z[0],P=Z[1],Y=Object(r.useState)([]),$=Object(o.a)(Y,2),K=$[0],X=$[1],ee=Object(r.useState)(!0),te=Object(o.a)(ee,2),re=te[0],ae=te[1],ie=Object(r.createRef)(),oe=function(){ae(!re)},se=function(){de("Please wait while we try to log you into your account"),ve("/request_token","get").then((function(e){document.location.href=e.data.redirect})).catch((function(e){console.log(e),fe("error","string"===typeof e?e:"Login failed")})).finally(he)},le=Object(r.useCallback)((function(){de("Hold tight while we publish your thread"),function(e){return ve("/publish_thread","post",{tweets:e})}(K).then((function(){fe("success","Thread published successfully"),P("")})).catch((function(e){console.log(e),fe("error","string"===typeof e?e:"Failed to publish your thread")})).finally(he)}),[K]),ue=Object(r.useCallback)((function(){Te("session","publishAfterLogin")&&(ye("session","publishAfterLogin",!1),le())}),[le]),de=function(e){z(e),k(!0)},he=function(){k(!1)},fe=function(e,t){s(!0),j(e),T(t)};return Object(r.useEffect)((function(){Te("session","loginSuccessMessage")?(ye("session","loginSuccessMessage",!1),fe("success","You are now logged in")):Te("session","loginFailMessage")&&(ye("session","loginFailMessage",!1),fe("error","Login failed"))}),[]),Object(r.useEffect)((function(){if(""!==document.location.search){var e=m.a.parse(document.location.search);document.location.search="",be(e)?(M(!0),V(e),ye("session","loginSuccessMessage",!0)):ye("session","loginFailMessage",!0)}}),[ue]),Object(r.useEffect)((function(){ie.current&&ie.current.focus()}),[ie]),Object(r.useEffect)((function(){ye("session","loggedIn",E)}),[E]),Object(r.useEffect)((function(){ye("session","user",B)}),[B]),Object(r.useEffect)((function(){0===q.length?X([]):X(ge(q)),ye("session","tweetText",q)}),[q]),Object(r.useEffect)((function(){ye("session","thread",K)}),[K]),Object(r.useEffect)((function(){var e;if(c)return e&&clearTimeout(e),e=setTimeout((function(){s(!1)}),3e3),function(){return clearTimeout(e)}}),[c]),Object(I.jsx)(u.a,{theme:b,children:Object(I.jsxs)(x.a,{children:[Object(I.jsx)(ne,{visible:c,severity:f,msg:y}),Object(I.jsx)(Q,{open:S,msg:L}),Object(I.jsx)(O.a,{className:t.root,children:Object(I.jsxs)(v.a,{container:!0,spacing:3,className:t.gridContainer,children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:t.appHeader,children:Object(I.jsx)(U,{user:B,loggedIn:E,login:se,logout:function(){ve("/logout","get").then((function(){fe("success","You are now logged out"),M(!1),V(n)})).catch((function(e){console.log(e),fe("error","string"===typeof e?e:"Logout failed")}))}})}),Object(I.jsxs)(v.a,{item:!0,xs:12,className:h()(t.appView,t.hiddenOverflow),children:[Object(I.jsx)(w.a,{smDown:!re,children:Object(I.jsx)(v.a,{item:!0,xs:12,md:7,className:h()(t.mainArea,t.hiddenOverflow),children:Object(I.jsx)(J,{tweetText:q,handleTweetInput:function(e){var t=e.target.value;P(t)},thread:K,viewThreadHandler:oe,ref:ie})})}),Object(I.jsx)(w.a,{smDown:re,children:Object(I.jsx)(v.a,{item:!0,xs:12,md:5,className:h()(t.mainArea,t.hiddenOverflow),children:Object(I.jsx)(D,{user:B,thread:K,editThreadHandler:oe,publishHandler:function(){E?le():(ye("session","publishAfterLogin",!0),se())}})})})]})]})})]})})}n(133);c.a.render(Object(I.jsx)(a.a.StrictMode,{children:Object(I.jsx)(Ce,{})}),document.querySelector("#root"))}},[[134,1,2]]]);
//# sourceMappingURL=main.4db23e8c.chunk.js.map