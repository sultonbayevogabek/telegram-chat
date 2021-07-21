'use strict';

document.addEventListener('DOMContentLoaded', () => {
   //declare selection functions
   function $(selector) {
      return document.querySelector(selector);
   }

   function $$(selector) {
      return document.querySelectorAll(selector);
   }

   const messagesList = $('.messages-list'),
      chatForm = $('.chat-form'),
      typingField = $('#typing-field'),
      chatList = $('.chat-list__ul'),
      searchInput = $('#search-input'),
      chatSound = $('#chat-sound');


   typingField.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
         e.preventDefault();
         formSubmit(e.target.parentElement);
      } else {
         keysPressed[e.key] = true;
         if (keysPressed['Control'] && e.key === 'Enter') {
            alert(e.key);
         }
      }

   })

   function formSubmit(target) {

      const sendingTime = timeReturner();

      messagesList.innerHTML += `
         <li class="message send">
            <p>${typingField.value}</p>
            <time class="message-time">${sendingTime}</time>
         </li>
      `
      setTimeout(() => {
         chatSound.play();
      }, 100)

      answerWriter(typingField.value);

      target.reset();

      messagesList.scrollTop = messagesList.scrollHeight;

      typingField.focus();
   }

   chatForm.addEventListener('submit', e => {
      e.preventDefault();
      formSubmit();
      typingField.value = ''
   });

   function timeReturner() {
      return addZero(new Date().getHours()) + ':' + addZero(new Date().getMinutes());
   }

   function addZero(number) {
      if (number < 10) {
         return `0${number}`
      }
      return number
   }

   function answerWriter(message) {

      setTimeout(() => {

         const sendingTime = timeReturner(),
            myMessage = message.trim().toLowerCase();

         let answer;

         if (myMessage === 'salom') {
            answer = 'Valaykum salom. Ishlaring yaxshimi?'
         } else if (myMessage === '') {
            answer = 'Zerikdingmi deyman!'
         } else if (myMessage === 'tentak' || myMessage === 'ahmoq') {
            answer = 'So`kinma nomard. Man sanga nima dedim?'
         } else if (myMessage === 'xayr') {
            answer = 'Xayr salomat bo`ling. Yaxshi kunlarda ko`rishaylik! :)'
         } else {
            answer = message + ' - bu gapga nima deb javob qaytarish meni miyyamga kiritilmagan! :( Ming bor uzur. Ayb mandamas, dasturchida'
         }
         messagesList.innerHTML += `
         <li class="message received">
            <p>${answer}</p>
            <time class="message-time">${sendingTime}</time>
         </li>
      `
         setTimeout(() => {
            chatSound.play();
         }, 100);

         messagesList.scrollTop = messagesList.scrollHeight;

      }, 2000);

   }

   function renderChatList(array) {
      chatList.innerHTML = '';

      array.forEach(chat => {
         chatList.innerHTML += `
            <li class="chat-list__li ${chat.isOnline ? 'active-contact' : ''}" data-contact-id=${chat.contactId}>
               <div class="contact-img">
                  <img src=${chat.avatarURL} alt=${chat.contactName} width="60" height="60">
                  <div class="active-indicator"></div>
               </div>
               <div class="chat-info">
                  <h3 class="contact-name">${chat.contactName}</h3>
                  <div class="last-message">${chat.chatMessages.sent[0]['messageText']}</div>
               </div>
               <time>${chat.chatMessages.sent[0].messageTime}</time>
            </li>
         `
      })
   }

   renderChatList(data);

   let chatListItems = $$('.chat-list__li'),
      selectedChatId = 1;

   searchInput.addEventListener('input', e => {
      const searchingContactName = e.target.value;

      const filteredContactsArray = data.filter(contact => {
         return contact.contactName.toLowerCase().indexOf(searchingContactName.toLowerCase()) > -1
      })

      renderChatList(filteredContactsArray);

      chatListItems = $$('.chat-list__li')

      chatListAndField();
   })

   chatListItems[0].classList.add('selected-chat');

   function chatListAndField() {
      chatListItems.forEach(chat => {
         chat.addEventListener('click', e => {
            chatListItems.forEach(item => item.classList.remove('selected-chat'));

            e.currentTarget.classList.add('selected-chat');

            selectedChatId = e.currentTarget.getAttribute('data-contact-id');

            chatListItems = $$('.chat-list__li')

            chatFieldRender(selectedChatId);
         })
      })
   }

   chatListAndField();

   const chattingContact = $('.chatting-contact'),
      chattingContactName = $('.chatting-contact__name');

   function chatFieldRender(id = 1) {
      const selectedChat = data[id - 1];

      if (selectedChat.isOnline) {
         chattingContact.classList.add('active-contact');
      } else {
         chattingContact.classList.remove('active-contact');
      }

      chattingContactName.textContent = selectedChat.contactName;
      chattingContactName.dataset.id = String(id);

      messagesList.innerHTML = `
         <li class="message received">
            <p>${selectedChat.chatMessages.received[0].messageText}</p>
            <time class="message-time">${selectedChat.chatMessages.received[0].messageTime}</time>
         </li>
         <li class="message send">
            <p>${selectedChat.chatMessages.sent[0].messageText}</p>
            <time class="message-time">${selectedChat.chatMessages.sent[0].messageTime}</time>
         </li>
      `
   }

   chatFieldRender();

   //video call

   const darkLayer = $('.dark-layer'),
      videoCall = $('.video-call'),
      videoCallImg = $('.video-call__img'),
      videoCallEndBtn = $('.video-call__option--item:first-child'),
      videoCallContactName = $('.video-call h3'),
      videoCallerBtn = $('#video-call'),
      videoCallSound = $('#gudok'),
      videoCallEndSound = $('#call-end-sound');

   videoCallerBtn.addEventListener('click', () => {
      startVideoCall(selectedChatId);
   })

   videoCallEndBtn.addEventListener('click', endVideoCall);

   window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
         userInfoDarkLayer.classList.add('hide');
      }
   })


   darkLayer.addEventListener('click', e => {
      if (e.target === darkLayer) {
         endVideoCall();
      }
   })

   function startVideoCall(id) {
      setTimeout(() => {
         darkLayer.classList.remove('hide');
         videoCallImg.src = data[id - 1].avatarURL;
         videoCallContactName.textContent = data[id - 1].contactName;
         videoCallSound.play()
      }, 1000)
   }

   function endVideoCall() {
      setTimeout(() => {
         darkLayer.classList.add('hide');
         videoCallSound.pause();
         videoCallEndSound.play();
      }, 1000)
   }




   //login

   const loginForm = $('#login-form'),
      countrySelect = $('#country-select'),
      phoneCode = $('.phone__code');

   phoneCodes.forEach((item, index) => {
      countrySelect.innerHTML += `
         <option value='${index + 1}'>${item.name}</option>
      `
   })

   var x, i, j, l, ll, selElmnt, a, b, c;
   /* Look for any elements with the class "custom-select": */
   x = document.getElementsByClassName("custom-select");
   l = x.length;
   for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
         /* For each option in the original select element,
         create a new DIV that will act as an option item: */
         c = document.createElement("DIV");
         c.innerHTML = selElmnt.options[j].innerHTML;
         c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
               if (s.options[i].innerHTML == this.innerHTML) {
                  s.selectedIndex = i;
                  h.innerHTML = this.innerHTML;
                  y = this.parentNode.getElementsByClassName("same-as-selected");
                  yl = y.length;
                  for (k = 0; k < yl; k++) {
                     y[k].removeAttribute("class");
                  }
                  this.setAttribute("class", "same-as-selected");
                  break;
               }
            }
            h.click();
         });
         b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
         /* When the select box is clicked, close any other select boxes,
         and open/close the current select box: */
         e.stopPropagation();
         closeAllSelect(this);
         this.nextSibling.classList.toggle("select-hide");
         this.classList.toggle("select-arrow-active");
      });
   }

   function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, xl, yl, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
         if (elmnt == y[i]) {
            arrNo.push(i)
         } else {
            y[i].classList.remove("select-arrow-active");
         }
      }
      for (i = 0; i < xl; i++) {
         if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
         }
      }
   }

   /* If the user clicks anywhere outside the select box,
   then close all select boxes: */
   document.addEventListener("click", closeAllSelect);

   const selected = $('.select-selected'),
      selectItems = $('.select-items');

   selectItems.addEventListener('click', e => {
      const selectedCountry = selected.textContent;

      phoneCodes.forEach(item => {
         if (item.name === selectedCountry) {
            phoneCode.textContent = item.dial_code;
         }
      })
   })

   loginForm.addEventListener('submit', e => {
      e.preventDefault();

      $('.login').classList.add('hide');
   })

   //user info

   const userInfoDarkLayer = $('.dark-layer-user-info'),
      userInfoModal = $('.user-info');
   let sendMessageBtn;
   chattingContactName.addEventListener('click', e => {
      const userId = e.target.getAttribute('data-id');
      const {contactName, phoneNumber, bio, userName, avatarURL} = data[Number(userId) - 1];
      userInfoDarkLayer.classList.remove('hide');
      userInfoModal.innerHTML = `
         <div class="user-info__header">
            <img src=${avatarURL} alt="" width="100" height="100">
            <h3>${contactName}</h3>
         </div>
         <div class="user-info__main">
            <span class="i">i</span>
            <div class="user-info__part">
               <div>${phoneNumber}</div>
               <div>Mobile</div>
            </div>
            <div class="user-info__part">
               <div>${bio}</div>
               <div>Bio</div>
            </div>
            <div class="user-info__part">
               <div>${userName}</div>
               <div>Username</div>
            </div>
         </div>
         <div class="user-info__footer">
               SEND MESSAGE
         </div>
      `
      sendMessageBtn = $('.user-info__footer');

      sendMessageBtn.addEventListener('click', () => {
         userInfoDarkLayer.classList.add('hide');
         typingField.focus();
      })
   })

   userInfoDarkLayer.addEventListener('click', e => {
      if (e.target !== userInfoModal) {
         userInfoDarkLayer.classList.add('hide');
      }
   })
})