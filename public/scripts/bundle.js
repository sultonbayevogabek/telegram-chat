(()=>{var e={76:e=>{e.exports={selectOne:function(e){return document.querySelector(e)},selectAll:function(e){return document.querySelectorAll(e)},clearText:function(e){return e.trim().toLowerCase()}}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{"use strict";var e=s(76);document.addEventListener("DOMContentLoaded",(()=>{!function(){try{document.body.clientWidth<1400&&!window.location.href.includes("/auth")&&(document.body.style.zoom=.8,(0,e.selectOne)(".app").style.height=1.43*document.body.clientHeight+"px")}catch(e){}}(),function(){try{const t=io(),s=(0,e.selectAll)(".auth__header__item"),a=(0,e.selectAll)(".auth__form");s.forEach(((e,t)=>{e.addEventListener("click",(e=>{a.forEach((e=>e.classList.remove("auth__form--visible"))),a[t].classList.add("auth__form--visible"),s.forEach((e=>e.classList.remove("auth__header__item--active"))),s[t].classList.add("auth__header__item--active")}))}));const n=(0,e.selectOne)("#auth-signup"),r=n.querySelector("#avatar"),i=n.querySelector(".avatar > img"),l=n.querySelector("#first-name"),o=n.querySelector("#last-name"),c=n.querySelector("#signup-email"),u=n.querySelector("#signup-password"),d=n.querySelector("#error-display-signup");r.addEventListener("change",(e=>{if(e.target.files&&e.target.files[0]){let t=new FileReader;t.onload=function(e){i.src=e.target.result},t.readAsDataURL(e.target.files[0])}})),n.addEventListener("submit",(async s=>{s.preventDefault();const a=new FormData;a.append("avatar",r.files[0]),a.append("firstName",(0,e.clearText)(l.value)),a.append("lastName",(0,e.clearText)(o.value)),a.append("email",(0,e.clearText)(c.value)),a.append("password",u.value);let n=await fetch("/auth/signup",{method:"POST",body:a});if(n=await n.json(),n.ok)return t.emit("login",{user:n.result.user}),window.location.reload();d.innerHTML=`\n            <div class="alert">${n.message.substring(6)}</div>\n         `}));const m=(0,e.selectOne)("#auth-signin"),v=m.querySelector("#email"),g=m.querySelector("#password"),p=m.querySelector("#error-display-signin");m.addEventListener("submit",(async t=>{t.preventDefault();let s=await fetch("/auth/signin",{headers:{"Content-Type":"application/json; charset=utf-8"},method:"POST",body:JSON.stringify({email:(0,e.clearText)(v.value),password:g.value})});if(s=await s.json(),s.ok)return window.location.reload();p.innerHTML=`\n            <div class="alert">${s.message.substring(6)}</div>\n         `}))}catch(e){}}(),function(){const t=io(),s=(0,e.selectOne)("#chat-form"),a=s.querySelector("#typing-field"),n=s.querySelector('[name="userId"]'),r=s.querySelector("#send-message"),i=(0,e.selectOne)(".messages-list"),l=(0,e.selectOne)(".chat-list__ul");function o(e){return e<10?`0${e}`:e}function c(){return`${o((new Date).getHours())} : ${o((new Date).getMinutes())}`}i.scrollTop=i.scrollHeight,a.addEventListener("keypress",(e=>{"Enter"===e.key&&(e.preventDefault(),i.innerHTML+=`\n         <li class="messages__item">\n           <div class="message-text send">\n               <p>${a.value.trim()}</p>\n               <time class="message-time">${c()}</time>\n           </div>\n           <div class="message-owner-img">\n               <img src="${r.getAttribute("data-avatar")}" alt="">\n           </div>\n         </li>\n      `,t.emit("new-message",{message:a.value,userId:n.value}),e.target.value="",i.scrollTop=i.scrollHeight)})),s.addEventListener("submit",(e=>{e.preventDefault(),i.innerHTML+=`\n         <li class="messages__item">\n           <div class="message-text send">\n               <p>${a.value.trim()}</p>\n               <time class="message-time">${c()}</time>\n           </div>\n           <div class="message-owner-img">\n               <img src="${r.getAttribute("data-avatar")}" alt="">\n           </div>\n         </li>\n      `,t.emit("new-message",{message:a.value,userId:n.value}),e.target.reset(),i.scrollTop=i.scrollHeight})),t.on("new-message",(e=>{i.innerHTML+=`\n         <li class="messages__item">\n           <div class="message-owner-img">\n               <img src="${e.message["user.avatar"]}" alt="">\n           </div>\n           <div class="message-text received">\n               <p>${e.message.messageText}</p>\n               <time class="message-time">${c()}</time>\n           </div>\n         </li>\n       `,i.scrollTop=i.scrollHeight})),t.on("login",(e=>{var t,s;l.innerHTML+=`\n         <li class="chat-list__li active-contact" id="${e.user.userId}">\n             <div class="contact-img">\n                 <img src="${e.user.avatar}">\n                 <div class="active-indicator"></div>\n             </div>\n             <div class="chat-info">\n                 <h3 class="contact-name">${t=e.user.firstName,s=e.user.lastName,`${t[0].toUpperCase()}${t.substring(1).toLowerCase()} ${s[0].toUpperCase()}${s.substring(1).toLowerCase()}`}</h3>\n                 <div class="last-message"><strong>role: </strong>${e.user.role}</div>\n             </div>\n         </li>\n      `})),t.on("left",(e=>{n.value,t.emit("left-real",{id:n.value})})),t.on("disconnect",(()=>{t.broadcast.emit("left-real",{id:n.value})})),t.on("left-real",(e=>{document.querySelector(`#${e.id}`).classList.remove("active-contact")}))}()}))})()})();
//# sourceMappingURL=bundle.js.map