(this["webpackJsonpthreadder-frontend"]=this["webpackJsonpthreadder-frontend"]||[]).push([[0],{133:function(e,t,n){},134:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(9),i=n.n(c),o=n(16),l=n(37),s=n(171),u=n(182),d=n(11),h=n.n(d),f=n(74),m=n.n(f),j=n(77),p={main:"#283845",light:"#395164",dark:"#22303c",contrastText:"#ffffff",contrastText2:"#e5e5e5"},g={paper:p.light,default:"#202c39"},x=Object(j.a)({palette:{primary:p,secondary:{main:"#ffc107",light:"#ffd147",dark:"#c97d02",hover:"#ffa042",inactive:"#432a01",contrastText:"#14213d",inactiveText:"#111111"},background:g},spacing:4,shape:{borderRadius:2}}),b=n(183),O=n(178),v=n(177),w=n(188),y=n(175),T=n(176),N=n(137),C=n(39),I=n(172),S=n(2),k=Object(s.a)((function(e){return{styledButton:{"&:disabled":{color:e.palette.secondary.inactiveText,backgroundColor:e.palette.secondary.inactive},"&:hover":{backgroundColor:e.palette.secondary.hover}}}}));function F(e){var t=k(),n=h()(e.className,t.styledButton);return Object(S.jsx)(I.a,Object(C.a)(Object(C.a)({},e),{},{className:n}))}var H=n(184),L=n(174),z=n(191),W=n(186),A=Object(s.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)}}}));function E(e){var t={paper:A().menuList};return Object(S.jsx)(W.a,Object(C.a)({classes:t},e))}var U=n(190),G=Object(s.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)},menuItem:{color:e.palette.primary.contrastText,"&:hover":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main}}}}));function R(e){var t=G(),n=Object(r.useState)(null),a=Object(o.a)(n,2),c=a[0],i=a[1],l=function(){i(null)};return Object(S.jsxs)(H.a,{children:[Object(S.jsx)(L.a,{size:"small",onClick:function(e){i(e.currentTarget)},children:Object(S.jsx)(z.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),Object(S.jsxs)(E,{id:"account-settings-menu",getContentAnchorEl:null,anchorEl:c,anchorReference:"anchorEl",anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"},open:Boolean(c),onClose:l,autoFocus:!1,children:[Object(S.jsx)(U.a,{className:t.menuItem,onClick:function(){l();var t=e.user.screenName;window.open("https://twitter.com/".concat(t),"_blank")},children:"Go to Twitter"}),Object(S.jsx)(U.a,{className:t.menuItem,onClick:function(){l(),e.logout()},children:"Log out"})]})]})}var B=Object(s.a)((function(e){return{toolbar:{height:"1em",padding:"1em 1.5em"},title:{flexGrow:1}}}));function V(e){var t=B(),n=Object(S.jsx)(F,{variant:"contained",color:"secondary",onClick:e.login,children:"Log in"});return Object(S.jsx)(y.a,{position:"relative",children:Object(S.jsxs)(T.a,{className:t.toolbar,children:[Object(S.jsx)(N.a,{variant:"h5",className:t.title,children:"Threadder"}),e.loggedIn?Object(S.jsx)(R,{user:e.user,logout:e.logout}):n]})})}var J=Object(s.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},textareaContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},threadTextarea:{fontFamily:"inherit",fontSize:"inherit",resize:"none",width:"100%",padding:"0.5em 0.75em",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,border:0,boxShadow:"inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)","&:focus":{border:0,outline:0}},statsContainer:{padding:"1em 1.5em",display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",backgroundColor:e.palette.primary.dark},statsText:{color:e.palette.primary.contrastText2}}})),_=a.a.forwardRef((function(e,t){var n=J();return Object(S.jsxs)(v.a,{container:!0,spacing:2,className:h()(n.root,n.fullHeight),children:[Object(S.jsx)(v.a,{item:!0,xs:12,className:h()(n.expandingFlexItem,n.fullHeight),children:Object(S.jsx)(O.a,{className:h()(n.textareaContainer,n.fullHeight,n.containerWithShadow),children:Object(S.jsx)("textarea",{className:h()(n.threadTextarea,n.fullHeight),onChange:e.handleTweetInput,placeholder:"Type your tweet here...",value:e.tweetText,ref:t})})}),Object(S.jsx)(v.a,{item:!0,xs:12,className:n.fixedSizeFlexItem,children:Object(S.jsxs)(O.a,{className:h()(n.statsContainer,n.containerWithShadow),children:[Object(S.jsx)(N.a,{variant:"body2",className:n.statsText,children:"Characters: ".concat(e.tweetText.length)}),Object(S.jsx)(N.a,{variant:"body2",className:n.statsText,children:"Tweets: ".concat(e.thread.length)})]})}),Object(S.jsx)(w.a,{mdUp:!0,children:Object(S.jsx)(v.a,{item:!0,xs:12,className:n.fixedSizeFlexItem,children:Object(S.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.viewThreadHandler,children:"View thread"})})})]})})),P=Object(s.a)((function(e){return{root:{marginBottom:"1.5em",flexFlow:"row nowrap","&:last-child":{marginBottom:0}},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},verticalGrid:{display:"flex",flexFlow:"column nowrap"},centerVerticalGridItems:{alignItems:"center"},threadLineContainer:{padding:0},threadLine:{width:"2px",height:"calc(100% + 1.5em)",backgroundColor:e.palette.background.default},tweetContainer:{marginLeft:"1em"},resetFont:{fontFamily:"inherit",fontSize:"inherit"},defaultTextColor:{color:e.palette.primary.contrastText},userName:{fontWeight:"bold"},userHandle:{color:e.palette.primary.contrastText2,marginLeft:"0.5em"},tweetText:{padding:0,margin:0,marginTop:"0.25em",whiteSpace:"pre-wrap",overflowWrap:"break-word"},hiddenOverflow:{overflow:"hidden"}}}));function Z(e){var t=P();return Object(S.jsxs)(v.a,{container:!0,className:t.root,children:[Object(S.jsxs)(v.a,{container:!0,className:h()(t.fixedSizeFlexItem,t.verticalGrid,t.centerVerticalGridItems),children:[Object(S.jsx)(v.a,{item:!0,children:Object(S.jsx)(z.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),e.threadLine&&Object(S.jsx)(v.a,{item:!0,className:h()(t.expandingFlexItem,t.threadLineContainer),children:Object(S.jsx)("div",{className:t.threadLine})})]}),Object(S.jsxs)(v.a,{container:!0,className:h()(t.expandingFlexItem,t.verticalGrid,t.tweetContainer,t.hiddenOverflow),children:[Object(S.jsxs)(v.a,{item:!0,children:[Object(S.jsx)("span",{className:h()(t.resetFont,t.defaultTextColor,t.userName),children:e.user.name}),Object(S.jsx)("span",{className:h()(t.resetFont,t.userHandle),children:"@".concat(e.user.screenName)})]}),Object(S.jsx)(v.a,{item:!0,children:Object(S.jsx)("p",{className:h()(t.resetFont,t.defaultTextColor,t.tweetText),children:e.text})})]})]})}var q=Object(s.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},autoOverflow:{overflow:"auto"},hiddenOverflow:{overflow:"hidden"},tweetsContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},buttonRowContainer:{display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",gap:"1em",margin:0,padding:0}}}));function D(e){var t=q(),n=e.thread.map((function(t,n,r){return Object(S.jsx)(Z,{user:e.user,text:t,threadLine:n+1<r.length},t)}));return Object(S.jsxs)(v.a,{container:!0,spacing:2,className:h()(t.root,t.fullHeight,t.hiddenOverflow),children:[Object(S.jsx)(v.a,{item:!0,xs:12,className:h()(t.expandingFlexItem,t.fullHeight,t.hiddenOverflow),children:Object(S.jsx)(O.a,{className:h()(t.tweetsContainer,t.fullHeight,t.containerWithShadow,t.autoOverflow),children:n})}),Object(S.jsx)(v.a,{item:!0,xs:12,className:t.fixedSizeFlexItem,children:Object(S.jsxs)(O.a,{className:h()(t.buttonRowContainer,t.fullHeight),children:[Object(S.jsx)(w.a,{mdUp:!0,children:Object(S.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.editThreadHandler,children:"Edit thread"})}),Object(S.jsx)(F,{variant:"contained",color:"secondary",onClick:e.publishHandler,disabled:!n.length>0,fullWidth:!0,children:"Publish thread"})]})})]})}var M=n(189),Y=n(179),$=n(180),K=Object(s.a)((function(e){return{dialogText:{color:e.palette.primary.contrastText,textAlign:"center"}}}));function Q(e){var t=K();return Object(S.jsx)(M.a,{open:e.open,children:Object(S.jsx)(Y.a,{children:Object(S.jsx)($.a,{className:t.dialogText,children:e.msg})})})}var X=n(181),ee=n(185),te=Object(s.a)((function(e){return{root:{position:"absolute",width:"30%",margin:0,zIndex:1e4,left:"35%",top:0}}}));function ne(e){var t=te();return Object(S.jsx)(X.a,{in:e.visible,className:t.root,children:Object(S.jsx)(ee.a,{severity:e.severity,children:e.msg})})}var re=n(75);n.n(re).a.config();var ae=280,ce="https://threadder-app.herokuapp.com/",ie="Untitled User";function oe(e){return e.replace(/^[ \t]*/,"").replace(/[ \t]*$/,"")}function le(e){return e.split(/(\n)/).filter((function(e,t,n){return"\n"!==e||"\n"===e&&"\n"!==n[t]}))}function se(e){return e.split(/((?<!\svs?)(?<=\s\w+[a-zA-Z]+)\.(?=\s*[a-zA-Z]+\w*)|(?<=\d+[\s./-]\d+|\s\d+)\.(?=\s*\W*[a-zA-Z]+\w*\W*)|\.$)/g).map((function(e,t,n){return"."===n[t+1]?"".concat(e,"."):"."===e?"":e})).filter((function(e){return""!==e})).map((function(e){return oe(e)}))}function ue(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";if(0===e.length)return[];for(var n=[],r=0;r<e.length;r++)if(0!==r){var a=n.length-1,c=n[a],i=e[r];c.length<=70||c.length+i.length<=ae?(c+=i.startsWith("\n")?i:"".concat(t).concat(i),n[a]=c):n.push(e[r])}else n.push(e[r]);return n}var de=n(58),he=n(50);function fe(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(0!==n){var a=t.length-1,c=je(t[a]);c.length+r.length+1<=ae?t[a]="".concat(c," ").concat(r):t.push(r)}else t.push(r)}return t}function me(e){if(e.length<=ae)return e;for(var t=Math.ceil(e.length/277),n=[],r=0;r<t;r++){var a=277*r,c=277*(r+1),i=e.slice(a,c)+"...";n.push(i)}return n}function je(e){return"..."===e.slice(e.length-3)?e.slice(0,e.length-3):e}function pe(e){var t=e.trim().split("(---)").map((function(e){return e.trim()})).filter((function(e){return""!==e}));if(ge(t))return t;var n=t.map((function(e){return e.length<=ae?e:function(e){var t=ue(le(e),"\n");return t.every((function(e){return e.length<=ae}))?t:ue(t.map((function(e){return e.length<=ae?e:se(e)})).flat().map((function(e){return e.trim()})))}(e)})).flat().map((function(e){return e.trim()}));return ge(n)?n:fe(n.map((function(e){return e.length<=ae?e:function(e){if(e.length<=ae)return e;var t,n=e.split(" ").filter((function(e){return 0!==e.length})),r="",a=[],c=Object(he.a)(n);try{for(c.s();!(t=c.n()).done;){var i=t.value.trim();i.length>ae?(r.length>0&&(a.push("".concat(r,"...")),r=""),a=[].concat(Object(de.a)(a),Object(de.a)(me(i)))):0===r.length?r+=i:r.length+i.length+1<277?r+=" ".concat(i):(a.push("".concat(r,"...")),r=i)}}catch(l){c.e(l)}finally{c.f()}r.length>0&&a.push(r);var o=a.length-1;return a[o]=je(a[o]),a}(e)})).flat().map((function(e){return e.trim()}))).flat().map((function(e){return e.trim()}))}function ge(e){return e.every((function(e){return e.length<=ae}))}function xe(e){return null!==e&&(t=e,Object.entries(t).length>0)&&function(e,t){var n,r=Object.keys(e),a=Object(he.a)(t);try{for(a.s();!(n=a.n()).done;){var c=n.value;if(!r.includes(c))return!1}}catch(i){a.e(i)}finally{a.f()}return!0}(e,["name","screenName","profileImage"])&&e.name!==ie;var t}var be=n(76),Oe=n.n(be);function ve(e){return"local"===e?localStorage:"session"===e?sessionStorage:void 0}function we(e,t,n){var r=ve(e);r&&r.setItem(t,JSON.stringify(n))}function ye(e,t){var n=ve(e);if(n)return JSON.parse(n.getItem(t))}function Te(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return Oe()({url:e,method:t,withCredentials:!0,baseURL:ce,data:n||{}})}function Ne(e){return Te("/request_token","get").then((function(t){var n=window.open(t.data.redirect,"Login to Twitter","width=500,height=720");return function(){var e,t;return new Promise((function(n,r){e=setInterval((function(){ye("local","userUpdated")&&(clearInterval(e),clearTimeout(t),we("local","userUpdated",!1),n("Login successful"))}),1e3),t=setTimeout((function(){clearInterval(e),r("Login failed because the process timed out")}),1e4)}))}().finally((function(){n.close(),e()}))}))}var Ce=Object(s.a)((function(e){return{root:Object(l.a)({height:"100vh",maxHeight:"100vh"},e.breakpoints.down("sm"),{height:"93vh",maxHeight:"93vh"}),gridContainer:{flexFlow:"column nowrap",height:"100%"},appHeader:{flex:0},appView:Object(l.a)({flex:1},e.breakpoints.up("md"),{display:"flex",flexFlow:"row nowrap",gap:e.spacing(1.5)}),mainArea:{height:"100%"},hiddenOverflow:{overflow:"hidden"},loggedInSuccess:{color:e.palette.primary.contrastText,textAlign:"center",fontWeight:"normal"}}}));function Ie(e){var t=Ce(),n={name:ie,screenName:"untitled_user",profileImage:""},a=Object(r.useState)(!1),c=Object(o.a)(a,2),i=c[0],l=c[1],s=Object(r.useState)("error"),d=Object(o.a)(s,2),f=d[0],j=d[1],p=Object(r.useState)(""),g=Object(o.a)(p,2),y=g[0],T=g[1],N=Object(r.useState)(!1),C=Object(o.a)(N,2),I=C[0],k=C[1],F=Object(r.useState)("This is an empty dialog"),H=Object(o.a)(F,2),L=H[0],z=H[1],W=Object(r.useState)(!1),A=Object(o.a)(W,2),E=A[0],U=A[1],G=Object(r.useState)(ye("session","loggedIn")||!1),R=Object(o.a)(G,2),B=R[0],J=R[1],P=Object(r.useState)(ye("local","user")||n),Z=Object(o.a)(P,2),q=Z[0],M=Z[1],Y=Object(r.useState)(ye("session","tweetText")||""),$=Object(o.a)(Y,2),K=$[0],X=$[1],ee=Object(r.useState)([]),te=Object(o.a)(ee,2),re=te[0],ae=te[1],ce=Object(r.useState)(!0),oe=Object(o.a)(ce,2),le=oe[0],se=oe[1],ue=Object(r.createRef)(),de=function(){se(!le)},he=function(){U(!1)},fe=function(){ge("Please wait while we try to log you into your account"),Ne(he).then((function(){var e=ye("local","user");xe(e)&&(Oe("success","You are now logged in"),J(!0),M(e),me())})).catch((function(e){console.log(e),Oe("error","string"===typeof e?e:"Login failed")})).finally(be)},me=function(){ye("session","publishAfterLogin")&&(we("session","publishAfterLogin",!1),je())},je=function(){ge("Hold tight while we publish your thread"),function(e){return Te("/publish_thread","post",{tweets:e})}(re).then((function(){Oe("success","Thread published successfully"),X("")})).catch((function(e){console.log(e),Oe("error","string"===typeof e?e:"Failed to publish your thread")})).finally(be)},ge=function(e){z(e),k(!0)},be=function(){k(!1)},Oe=function(e,t){l(!0),j(e),T(t)};return Object(r.useEffect)((function(){if(""!==document.location.search){U(!0);var e=m.a.parse(document.location.search);xe(e)&&(M(e),we("local","userUpdated",!0))}}),[]),Object(r.useEffect)((function(){ue.current&&ue.current.focus()}),[ue]),Object(r.useEffect)((function(){we("session","loggedIn",B)}),[B]),Object(r.useEffect)((function(){we("local","user",q)}),[q]),Object(r.useEffect)((function(){0===K.length?ae([]):ae(pe(K)),we("session","tweetText",K)}),[K]),Object(r.useEffect)((function(){we("session","thread",re)}),[re]),Object(r.useEffect)((function(){var e;if(i)return e&&clearTimeout(e),e=setTimeout((function(){l(!1)}),3e3),function(){return clearTimeout(e)}}),[i]),Object(S.jsx)(u.a,{theme:x,children:Object(S.jsxs)(b.a,{children:[Object(S.jsx)(ne,{visible:i,severity:f,msg:y}),Object(S.jsx)(Q,{open:I,msg:L}),E&&Object(S.jsx)(O.a,{className:t.root,children:Object(S.jsx)("h2",{className:t.loggedInSuccess,children:"Logged in successfully"})}),!E&&Object(S.jsx)(O.a,{className:t.root,children:Object(S.jsxs)(v.a,{container:!0,spacing:3,className:t.gridContainer,children:[Object(S.jsx)(v.a,{item:!0,xs:12,className:t.appHeader,children:Object(S.jsx)(V,{user:q,loggedIn:B,login:fe,logout:function(){Te("/logout","get").then((function(){Oe("success","You are now logged out"),J(!1),M(n)})).catch((function(e){console.log(e),Oe("error","string"===typeof e?e:"Logout failed")}))}})}),Object(S.jsxs)(v.a,{item:!0,xs:12,className:h()(t.appView,t.hiddenOverflow),children:[Object(S.jsx)(w.a,{smDown:!le,children:Object(S.jsx)(v.a,{item:!0,xs:12,md:7,className:h()(t.mainArea,t.hiddenOverflow),children:Object(S.jsx)(_,{tweetText:K,handleTweetInput:function(e){var t=e.target.value;X(t)},thread:re,viewThreadHandler:de,ref:ue})})}),Object(S.jsx)(w.a,{smDown:le,children:Object(S.jsx)(v.a,{item:!0,xs:12,md:5,className:h()(t.mainArea,t.hiddenOverflow),children:Object(S.jsx)(D,{user:q,thread:re,editThreadHandler:de,publishHandler:function(){B?je():(we("session","publishAfterLogin",!0),fe())}})})})]})]})})]})})}n(133);i.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(Ie,{})}),document.querySelector("#root"))}},[[134,1,2]]]);
//# sourceMappingURL=main.93f8d756.chunk.js.map