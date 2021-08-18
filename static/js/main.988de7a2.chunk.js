(this["webpackJsonpthreadder-frontend"]=this["webpackJsonpthreadder-frontend"]||[]).push([[0],{127:function(e,t,n){},128:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(7),i=n.n(c),o=n(19),l=n(38),s=n(160),u=n(169),d=n(68),h=n.n(d),f=n(10),m=n.n(f),j=n(72),p={main:"#283845",light:"#395164",dark:"#22303c",contrastText:"#ffffff",contrastText2:"#e5e5e5"},x={paper:p.light,default:"#202c39"},g=Object(j.a)({palette:{primary:p,secondary:{main:"#ffc107",light:"#ffd147",dark:"#c97d02",hover:"#ffa042",inactive:"#432a01",contrastText:"#14213d",inactiveText:"#111111"},background:x},spacing:4,shape:{borderRadius:2}}),b=n(170),O=n(168),v=n(167),w=n(174),N=n(164),y=n(165),C=n(166),S=n(35),T=n(161),I=n(2),k=Object(s.a)((function(e){return{styledButton:{"&:disabled":{color:e.palette.secondary.inactiveText,backgroundColor:e.palette.secondary.inactive},"&:hover":{backgroundColor:e.palette.secondary.hover}}}}));function F(e){var t=k(),n=m()(e.className,t.styledButton);return Object(I.jsx)(T.a,Object(S.a)(Object(S.a)({},e),{},{className:n}))}var z=n(173),H=n(172),W=n(163),L=n(175),A=n(171),E=Object(s.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)}}}));function B(e){var t={paper:E().menuList};return Object(I.jsx)(A.a,Object(S.a)({classes:t},e))}var Z=n(176),G=n(69),R=n.n(G),U=n(70);n.n(U).a.config();var V=280,_="https://threadder-app.herokuapp.com/",J="Untitled User";function P(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return R()({url:e,method:t,withCredentials:!0,baseURL:_,data:n||{}})}function $(){return P("/request_token","get").then((function(e){document.location.href=e.data.redirect})).catch((function(e){return console.log(e)}))}function q(e){return P("/publish_thread","post",{tweets:e})}var D=Object(s.a)((function(e){return{menuList:{border:"solid 1px ".concat(e.palette.primary.dark)},menuItem:{color:e.palette.primary.contrastText,"&:hover":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main}}}}));function M(e){var t=D(),n=Object(r.useState)(null),a=Object(o.a)(n,2),c=a[0],i=a[1],l=Object(z.a)(["user"]),s=Object(o.a)(l,1)[0],u=function(){i(null)};return Object(I.jsxs)(H.a,{children:[Object(I.jsx)(W.a,{size:"small",onClick:function(e){i(e.currentTarget)},children:Object(I.jsx)(L.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),Object(I.jsxs)(B,{id:"account-settings-menu",getContentAnchorEl:null,anchorEl:c,anchorReference:"anchorEl",anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"},open:Boolean(c),onClose:u,autoFocus:!1,children:[Object(I.jsx)(Z.a,{className:t.menuItem,onClick:function(){u();var e=s.user.screenName;document.location.href="https://twitter.com/".concat(e)},children:"Go to Twitter"}),Object(I.jsx)(Z.a,{className:t.menuItem,onClick:function(){u(),P("/logout","get").then((function(){e.setLoggedOutState()})).catch((function(e){console.log(e)}))},children:"Log out"})]})]})}var K=Object(s.a)((function(e){return{toolbar:{height:"1em",padding:"1em 1.5em"},title:{flexGrow:1}}}));function Q(e){var t=K(),n=Object(I.jsx)(F,{variant:"contained",color:"secondary",onClick:$,children:"Log in"});return Object(I.jsx)(N.a,{position:"relative",children:Object(I.jsxs)(y.a,{className:t.toolbar,children:[Object(I.jsx)(C.a,{variant:"h5",className:t.title,children:"Threadder"}),e.loggedIn?Object(I.jsx)(M,{user:e.user,setLoggedOutState:e.setLoggedOutState}):n]})})}var X=Object(s.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},textareaContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},threadTextarea:{fontFamily:"inherit",fontSize:"inherit",resize:"none",width:"100%",padding:"0.5em 0.75em",color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,border:0,boxShadow:"inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4)","&:focus":{border:0,outline:0}},statsContainer:{padding:"1em 1.5em",display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",backgroundColor:e.palette.primary.dark},statsText:{color:e.palette.primary.contrastText2}}}));function Y(e){var t=X();return Object(I.jsxs)(v.a,{container:!0,spacing:2,className:m()(t.root,t.fullHeight),children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:m()(t.expandingFlexItem,t.fullHeight),children:Object(I.jsx)(O.a,{className:m()(t.textareaContainer,t.fullHeight,t.containerWithShadow),children:Object(I.jsx)("textarea",{className:m()(t.threadTextarea,t.fullHeight),onChange:e.handleTweetInput,placeholder:"Type your tweet here...",value:e.tweetText})})}),Object(I.jsx)(v.a,{item:!0,xs:12,className:t.fixedSizeFlexItem,children:Object(I.jsxs)(O.a,{className:m()(t.statsContainer,t.containerWithShadow),children:[Object(I.jsx)(C.a,{variant:"body2",className:t.statsText,children:"Characters: ".concat(e.tweetText.length)}),Object(I.jsx)(C.a,{variant:"body2",className:t.statsText,children:"Tweets: ".concat(e.thread.length)})]})}),Object(I.jsx)(w.a,{mdUp:!0,children:Object(I.jsx)(v.a,{item:!0,xs:12,className:t.fixedSizeFlexItem,children:Object(I.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.viewThreadHandler,children:"View thread"})})})]})}var ee=Object(s.a)((function(e){return{root:{marginBottom:"1.5em",flexFlow:"row nowrap","&:last-child":{marginBottom:0}},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},verticalGrid:{display:"flex",flexFlow:"column nowrap"},centerVerticalGridItems:{alignItems:"center"},threadLineContainer:{padding:0},threadLine:{width:"2px",height:"calc(100% + 1.5em)",backgroundColor:e.palette.background.default},tweetContainer:{marginLeft:"1em"},resetFont:{fontFamily:"inherit",fontSize:"inherit"},defaultTextColor:{color:e.palette.primary.contrastText},userName:{fontWeight:"bold"},userHandle:{color:e.palette.primary.contrastText2,marginLeft:"0.5em"},tweetText:{padding:0,margin:0,marginTop:"0.25em",whiteSpace:"pre-wrap",overflowWrap:"break-word"},hiddenOverflow:{overflow:"hidden"}}}));function te(e){var t=ee();return Object(I.jsxs)(v.a,{container:!0,className:t.root,children:[Object(I.jsxs)(v.a,{container:!0,className:m()(t.fixedSizeFlexItem,t.verticalGrid,t.centerVerticalGridItems),children:[Object(I.jsx)(v.a,{item:!0,children:Object(I.jsx)(L.a,{src:e.user.profileImage,alt:"".concat(e.user.name," profile picture")})}),e.threadLine&&Object(I.jsx)(v.a,{item:!0,className:m()(t.expandingFlexItem,t.threadLineContainer),children:Object(I.jsx)("div",{className:t.threadLine})})]}),Object(I.jsxs)(v.a,{container:!0,className:m()(t.expandingFlexItem,t.verticalGrid,t.tweetContainer,t.hiddenOverflow),children:[Object(I.jsxs)(v.a,{item:!0,children:[Object(I.jsx)("span",{className:m()(t.resetFont,t.defaultTextColor,t.userName),children:e.user.name}),Object(I.jsx)("span",{className:m()(t.resetFont,t.userHandle),children:"@".concat(e.user.screenName)})]}),Object(I.jsx)(v.a,{item:!0,children:Object(I.jsx)("p",{className:m()(t.resetFont,t.defaultTextColor,t.tweetText),children:e.text})})]})]})}var ne=Object(s.a)((function(e){return{root:{flexFlow:"column nowrap"},fullHeight:{height:"100%"},containerWithShadow:{boxShadow:e.shadows[4]},expandingFlexItem:{flex:1},fixedSizeFlexItem:{flex:0},autoOverflow:{overflow:"auto"},hiddenOverflow:{overflow:"hidden"},tweetsContainer:{padding:"1.5em",backgroundColor:e.palette.primary.main},buttonRowContainer:{display:"flex",flexFlow:"row nowrap",justifyContent:"space-between",gap:"1em",margin:0,padding:0}}}));function re(e){var t=ne(),n=e.thread.map((function(t,n,r){return Object(I.jsx)(te,{user:e.user,text:t,threadLine:n+1<r.length},t)}));return Object(I.jsxs)(v.a,{container:!0,spacing:2,className:m()(t.root,t.fullHeight,t.hiddenOverflow),children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:m()(t.expandingFlexItem,t.fullHeight,t.hiddenOverflow),children:Object(I.jsx)(O.a,{className:m()(t.tweetsContainer,t.fullHeight,t.containerWithShadow,t.autoOverflow),children:n})}),Object(I.jsx)(v.a,{item:!0,xs:12,className:t.fixedSizeFlexItem,children:Object(I.jsxs)(O.a,{className:m()(t.buttonRowContainer,t.fullHeight),children:[Object(I.jsx)(w.a,{mdUp:!0,children:Object(I.jsx)(F,{variant:"contained",color:"secondary",fullWidth:!0,onClick:e.editThreadHandler,children:"Edit thread"})}),Object(I.jsx)(F,{variant:"contained",color:"secondary",onClick:e.publishHandler,disabled:!n.length>0,fullWidth:!0,children:"Publish thread"})]})})]})}function ae(e){var t=ie(e.indexOf(". "),e.indexOf("\n")),n=-1===t?e.length:t;return[e.slice(0,n).trim(),e.slice(n).trim()]}function ce(e){var t=ie(e.lastIndexOf(". "),e.lastIndexOf("\n"),!0),n=-1===t?e.length:t;return[e.slice(0,n).trim(),e.slice(n).trim()]}function ie(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e>0||t>0?t<0||n&&e>0&&t>0&&e>t||!n&&e>0&&t>0&&e<t?e+1:e<0||n&&e>0&&t>0&&t>e||!n&&e>0&&t>0&&t<e?t+1:void 0:-1}function oe(e){return e.replace(/^[ \t]*/,"").replace(/[ \t]*$/,"")}function le(e){return e.split(/(?<=\d*[a-zA-Z]\w+)\.(?=\s*\d*[a-zA-Z]\w*\n?)/g).filter((function(e){return""!==e})).join(". ").split(/(?<=\d*[a-zA-Z]\w+\.)\s/g).map((function(e){return oe(e)}))}function se(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ";if(0===e.length)return[];for(var n=[],r=0;r<e.length;r++)if(0!==r){var a=n.length-1,c=n[a],i=e[r];c.length<=70||c.length+i.length<=V?(c+=i.startsWith("\n")?i:"".concat(t).concat(i),n[a]=c):n.push(e[r])}else n.push(e[r]);return n}function ue(e){return e.split("\n").filter((function(e){return""!==e}))}var de=n(25),he=n(47);function fe(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if(0!==n){var a=t.length-1,c=je(t[a]);c.length+r.length+1<=V?t[a]="".concat(c," ").concat(r):t.push(r)}else t.push(r)}return t}function me(e){if(e.length<=V)return e;for(var t=Math.ceil(e.length/277),n=[],r=0;r<t;r++){var a=277*r,c=277*(r+1),i=e.slice(a,c)+"...";n.push(i)}return n}function je(e){return"..."===e.slice(e.length-3)?e.slice(0,e.length-3):e}var pe=n(71);function xe(e,t){return e.test(t)}var ge={isAlphaNumeric:function(e){return xe(/^[a-zA-Z0-9]/,e)||xe(/[a-zA-Z0-9]$/,e)},isNonWordWithoutSpaceBefore:function(e){return xe(/^\S\W/,e)||xe(/\S\W$/,e)},isNonWordWithSpaceBefore:function(e){return xe(/^\s\W/,e)||xe(/\s\W$/,e)}},be=/((?:https?:\/\/|www.){1}[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*))/;function Oe(e){return be.test(e)}function ve(e,t){var n=t.slice(t.length-2),r=e[0],a=ge.isAlphaNumeric(n)&&ge.isAlphaNumeric(r),c=ge.isNonWordWithoutSpaceBefore(n)&&ge.isAlphaNumeric(r);return a||c?"".concat(t," ").concat(e):t+e}function we(e){var t=e.trim().split("(---)").map((function(e){return e.trim()})).filter((function(e){return""!==e}));if(Ne(t))return t;var n=t.map((function(e){return e.split(be).filter((function(e){return""!==e}))})).flat().map((function(e){return e.trim()})).map((function(e,t,n){return e.length<=V&&!n[t+1]||e.length<=V&&!Oe(n[t+1])||Oe(e)?e:function(e){console.log(le(e)),console.log(se(le(e)));var t=se(le(e));return t.every((function(e){return e.length<=V}))?t:se(t.map((function(e){return e.length<=V?e:ue(e)})).flat().map((function(e){return e.trim()})),"\n")}(e)})).flat().map((function(e){return e.trim()}));return n.some((function(e){return Oe(e)}))&&(n=function(e){for(var t=[],n=0;n<e.length;n++){var r=t.length-1,a=t[r],c=e[n];if(0===n||n>0&&!Oe(c)&&!Oe(a)&&a.length>70)t.push(c);else if(Oe(c)){a.length+c.length>V&&(t=[].concat(Object(de.a)(t.slice(0,r)),Object(de.a)(ce(a))));var i=t[t.length-1];t[t.length-1]=ve(c,i)}else{var o=c,l=[];if(a.length+c.length>V){var s=ae(c),u=Object(pe.a)(s);o=u[0],l=u.slice(1)}var d=t[t.length-1];t[t.length-1]=ve(o,d),t=[].concat(Object(de.a)(t),Object(de.a)(l))}}return t}(n).flat().map((function(e){return e.trim()}))),Ne(n)?n:fe(n.map((function(e){return e.length<=V?e:function(e){if(e.length<=V)return e;var t,n=e.split(" ").filter((function(e){return 0!==e.length})),r="",a=[],c=Object(he.a)(n);try{for(c.s();!(t=c.n()).done;){var i=t.value.trim();i.length>V?(r.length>0&&(a.push("".concat(r,"...")),r=""),a=[].concat(Object(de.a)(a),Object(de.a)(me(i)))):0===r.length?r+=i:r.length+i.length+1<277?r+=" ".concat(i):(a.push("".concat(r,"...")),r=i)}}catch(l){c.e(l)}finally{c.f()}r.length>0&&a.push(r);var o=a.length-1;return a[o]=je(a[o]),a}(e)})).flat().map((function(e){return e.trim()}))).flat().map((function(e){return e.trim()}))}function Ne(e){return e.every((function(e){return e.length<=V}))}function ye(e,t){sessionStorage.setItem(e,JSON.stringify(t))}function Ce(e){return JSON.parse(sessionStorage.getItem(e))}var Se=Object(s.a)((function(e){return{root:{height:"100vh",maxHeight:"100vh"},gridContainer:{flexFlow:"column nowrap",height:"100%"},appHeader:{flex:0},appView:Object(l.a)({flex:1},e.breakpoints.up("md"),{display:"flex",flexFlow:"row nowrap",gap:e.spacing(1.5)}),mainArea:{height:"100%"},hiddenOverflow:{overflow:"hidden"}}}));function Te(e){var t=Se(),n=Object.freeze({name:J,screenName:"untitled_user",profileImage:""}),a=Object(r.useState)(Ce("loggedIn")||!1),c=Object(o.a)(a,2),i=c[0],l=c[1],s=Object(r.useState)(Ce("user")||n),d=Object(o.a)(s,2),f=d[0],j=d[1],p=Object(r.useState)(Ce("tweetText")||""),x=Object(o.a)(p,2),N=x[0],y=x[1],C=Object(r.useState)([]),S=Object(o.a)(C,2),T=S[0],k=S[1],F=Object(r.useState)(!0),z=Object(o.a)(F,2),H=z[0],W=z[1],L=function(){W(!H)};return Object(r.useEffect)((function(){Ce("toPublish")&&(ye("toPublish",!1),q(Ce("thread")))})),Object(r.useEffect)((function(){if(""!==document.location.search){l(!0);var e=h.a.parse(document.location.search);j(e),document.location.search=""}}),[]),Object(r.useEffect)((function(){var e,t=Ce("user");null!==t&&(e=t,Object.entries(e).length>0)&&function(e,t){var n,r=Object.keys(e),a=Object(he.a)(t);try{for(a.s();!(n=a.n()).done;){var c=n.value;if(!r.includes(c))return!1}}catch(i){a.e(i)}finally{a.f()}return!0}(t,["name","screenName","profileImage"])&&t.name!==J&&(l(!0),j(Ce("user")))}),[]),Object(r.useEffect)((function(){ye("loggedIn",i)}),[i]),Object(r.useEffect)((function(){ye("user",f)}),[f]),Object(r.useEffect)((function(){0===N.length?k([]):k(we(N)),ye("tweetText",N)}),[N]),Object(r.useEffect)((function(){ye("thread",T)}),[T]),Object(I.jsx)(u.a,{theme:g,children:Object(I.jsx)(b.a,{children:Object(I.jsx)(O.a,{className:t.root,children:Object(I.jsxs)(v.a,{container:!0,spacing:3,className:t.gridContainer,children:[Object(I.jsx)(v.a,{item:!0,xs:12,className:t.appHeader,children:Object(I.jsx)(Q,{user:f,loggedIn:i,setLoggedOutState:function(){l(!1),j(n)}})}),Object(I.jsxs)(v.a,{item:!0,xs:12,className:m()(t.appView,t.hiddenOverflow),children:[Object(I.jsx)(w.a,{smDown:!H,children:Object(I.jsx)(v.a,{item:!0,xs:12,md:7,className:m()(t.mainArea,t.hiddenOverflow),children:Object(I.jsx)(Y,{tweetText:N,handleTweetInput:function(e){var t=e.target.value;y(t)},thread:T,viewThreadHandler:L})})}),Object(I.jsx)(w.a,{smDown:H,children:Object(I.jsx)(v.a,{item:!0,xs:12,md:5,className:m()(t.mainArea,t.hiddenOverflow),children:Object(I.jsx)(re,{user:f,thread:T,editThreadHandler:L,publishHandler:function(){i?q(T):(ye("toPublish",!0),$())}})})})]})]})})})})}n(127);i.a.render(Object(I.jsx)(a.a.StrictMode,{children:Object(I.jsx)(Te,{})}),document.querySelector("#root"))}},[[128,1,2]]]);
//# sourceMappingURL=main.988de7a2.chunk.js.map