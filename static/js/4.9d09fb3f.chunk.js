(this["webpackJsonpway-of-samurai"]=this["webpackJsonpway-of-samurai"]||[]).push([[4],{229:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"a",(function(){return r}));var n=function(t){if(!t)return"Field is required"},r=function(t){return function(e){if(e.length>t)return"Max lenght is ".concat(t," simbols")}}},230:function(t,e,a){"use strict";a.d(e,"b",(function(){return l})),a.d(e,"a",(function(){return i}));var n=a(57),r=a(0),o=a.n(r),s=a(231),u=a.n(s),c=function(t){var e=t.input,a=t.meta,r=(t.child,t.Element),s=Object(n.a)(t,["input","meta","child","Element"]),c=a.touched&&a.error;return o.a.createElement("div",{className:u.a.formControl+" "+(c&&u.a.error)},o.a.createElement(r,Object.assign({},e,s)),o.a.createElement("br",null),c&&o.a.createElement("span",null,a.error))},l=function(t){return o.a.createElement(c,Object.assign({},t,{Element:"textarea"}))},i=function(t){return o.a.createElement(c,Object.assign({},t,{Element:"input"}))}},231:function(t,e,a){t.exports={formControl:"FormsControls_formControl__2FQCU",error:"FormsControls_error__3ILIl"}},249:function(t,e,a){t.exports={profile:"Profile_profile__1CZOr"}},250:function(t,e,a){t.exports={posts:"MyPosts_posts__3bUYf",newPost:"MyPosts_newPost__2jfgz"}},251:function(t,e,a){t.exports={post:"Post_post__cS9rr",avatar:"Post_avatar__3NXVE",postText:"Post_postText__2olTO",buttons:"Post_buttons__-I5GZ"}},292:function(t,e,a){t.exports={profileInfo:"ProfileInfo_profileInfo__R7UVs",avatar:"ProfileInfo_avatar__2ZiPs",img:"ProfileInfo_img__1tbs2",description:"ProfileInfo_description__1UKiH"}},293:function(t,e,a){t.exports={statusBlock:"Status_statusBlock__2ivGl"}},308:function(t,e,a){"use strict";a.r(e);var n=a(33),r=a(34),o=a(36),s=a(35),u=a(57),c=a(0),l=a.n(c),i=a(249),m=a.n(i),f=a(250),p=a.n(f),d=a(251),b=a.n(d),v=a(81),E=a.n(v),_=l.a.memo((function(t){var e=t.children,a=t.likesCount;Object(u.a)(t,["children","likesCount"]);return l.a.createElement("div",{className:b.a.post},l.a.createElement("div",{className:b.a.avatar},l.a.createElement("img",{src:E.a,alt:"avatar"})),l.a.createElement("div",{className:b.a.postText},e),l.a.createElement("div",{className:b.a.buttons},l.a.createElement("span",null,"Like ",a)))})),h=a(112),j=a(113),y=a(229),O=a(230),g=Object(y.a)(10),P=l.a.memo((function(t){var e=t.handleSubmit;Object(u.a)(t,["handleSubmit"]);return l.a.createElement("form",{onSubmit:e},l.a.createElement(h.a,{name:"myPostTextarea",component:O.b,placeholder:"Type something clever :)",validate:[y.b,g]}),l.a.createElement("button",null,"Add post"))})),S=Object(j.a)({form:"myPostForm"})(P),k=l.a.memo((function(t){var e=t.posts,a=t.addPost;Object(u.a)(t,["posts","addPost"]);return l.a.createElement("div",{className:p.a.posts},l.a.createElement("h1",null,"My Posts"),l.a.createElement("div",{className:p.a.newPost},l.a.createElement(S,{onSubmit:function(t){a(t.myPostTextarea)}})),l.a.createElement("div",null,e.map((function(t){return l.a.createElement(_,{key:t.id,postID:t.id,likesCount:t.likesCount},t.text)}))))})),U=a(60),I=a(27),N=function(t){return t.profilePage.profile},x=function(t){return t.profilePage.posts},C=function(t){return t.profilePage.status},w=Object(I.b)((function(t){return{posts:x(t)}}),(function(t){return{addPost:function(e){t(Object(U.a)(e))}}}))(k),T=a(292),F=a.n(T);var A=a(74);function B(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var a=[],n=!0,r=!1,o=void 0;try{for(var s,u=t[Symbol.iterator]();!(n=(s=u.next()).done)&&(a.push(s.value),!e||a.length!==e);n=!0);}catch(c){r=!0,o=c}finally{try{n||null==u.return||u.return()}finally{if(r)throw o}}return a}}(t,e)||Object(A.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var D=a(293),M=a.n(D),J=l.a.memo((function(t){var e=t.status,a=t.updateUserStatus,n=(Object(u.a)(t,["status","updateUserStatus"]),B(Object(c.useState)(!1),2)),r=n[0],o=n[1],s=B(Object(c.useState)(e),2),i=s[0],m=s[1];return Object(c.useEffect)((function(){m(e)}),[e]),l.a.createElement("div",null,!r&&l.a.createElement("div",{onDoubleClick:function(){o(!0)},className:M.a.statusBlock},e||"------"),r&&l.a.createElement("div",{className:M.a.statusBlock},l.a.createElement("input",{onChange:function(t){m(t.currentTarget.value)},autoFocus:!0,onBlur:function(){o(!1),a(i)},type:"text",value:i})))})),L=l.a.memo((function(t){var e=t.profile,a=t.status,n=t.updateUserStatus;Object(u.a)(t,["profile","status","updateUserStatus"]);return l.a.createElement("div",{className:F.a.profileInfo},l.a.createElement("div",{className:F.a.avatar},l.a.createElement("div",{className:F.a.img,style:{backgroundImage:"url(".concat(e.photos.large,")")},alt:"avatar"})),l.a.createElement("div",{className:F.a.description},l.a.createElement("h1",null,e.fullName),l.a.createElement(J,{status:a,updateUserStatus:n}),l.a.createElement("br",null),"Looking for a job: ",!0===e.lookingForAJob?"yes":"no",l.a.createElement("br",null),"Description: ",e.lookingForAJobDescription,l.a.createElement("br",null),"Contacts:",l.a.createElement("ul",null,Object.keys(e.contacts).map((function(t,a){return l.a.createElement("li",{key:a},l.a.createElement("span",null,t,": ",e.contacts[t]))})))))})),Z=a(49),G=l.a.memo((function(t){var e=t.profile,a=t.status,n=t.updateUserStatus;Object(u.a)(t,["profile","status","updateUserStatus"]);return e?l.a.createElement("div",{className:"".concat(m.a.profile," ")},l.a.createElement("div",{className:"content-container"},l.a.createElement(L,{profile:e,status:a,updateUserStatus:n}),l.a.createElement(w,null))):l.a.createElement(Z.a,null)})),V=a(19),q=a(16),z=a(54),H=function(t){Object(o.a)(a,t);var e=Object(s.a)(a);function a(){return Object(n.a)(this,a),e.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var t=this.props,e=t.getUserProfile,a=t.getUserStatus,n=t.authUserId,r=this.props.match.params.userId;r||(r=n)||this.props.history.push("/login"),e(r),a(r)}},{key:"render",value:function(){return l.a.createElement(G,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateUserStatus:this.props.updateUserStatus}))}}]),a}(l.a.PureComponent);e.default=Object(q.d)(Object(I.b)((function(t){return{profile:N(t),status:C(t),isAuth:Object(z.a)(t),authUserId:Object(z.c)(t)}}),{getUserProfile:U.c,getUserStatus:U.d,updateUserStatus:U.e}),V.f)(H)}}]);
//# sourceMappingURL=4.9d09fb3f.chunk.js.map