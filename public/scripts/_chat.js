import {selectOne} from './_functions'

export default function () {
   const socket = io()

   const chatForm = selectOne('#chat-form'),
      typingField = chatForm.querySelector('#typing-field'),
      userIdInput = chatForm.querySelector('[name="userId"]'),
      sendMessageBtn = chatForm.querySelector('#send-message'),
      chatList = selectOne('.messages-list'),
      contactList = selectOne('.chat-list__ul')

   chatList.scrollTop = chatList.scrollHeight

   function addZero(number) {
      if (number < 10) {
         return `0${number}`
      }
      return number
   }

   function currentTime() {
      return `${addZero(new Date().getHours())} : ${addZero(new Date().getMinutes())}`
   }

   function fullName(firstName, lastName) {
      return `${firstName[0].toUpperCase()}${firstName.substring(1).toLowerCase()} ${lastName[0].toUpperCase()}${lastName.substring(1).toLowerCase()}`
   }

   typingField.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
         e.preventDefault()

         chatList.innerHTML += `
         <li class="messages__item">
           <div class="message-text send">
               <p>${typingField.value.trim()}</p>
               <time class="message-time">${currentTime()}</time>
           </div>
           <div class="message-owner-img">
               <img src="${sendMessageBtn.getAttribute('data-avatar')}" alt="">
           </div>
         </li>
      `

         socket.emit('new-message', {
            message: typingField.value,
            userId: userIdInput.value
         })

         e.target.value = '';

         chatList.scrollTop = chatList.scrollHeight
      }
   })

   function chatFormSubmit() {
      chatForm.addEventListener('submit', e => {
         e.preventDefault()

         chatList.innerHTML += `
         <li class="messages__item">
           <div class="message-text send">
               <p>${typingField.value.trim()}</p>
               <time class="message-time">${currentTime()}</time>
           </div>
           <div class="message-owner-img">
               <img src="${sendMessageBtn.getAttribute('data-avatar')}" alt="">
           </div>
         </li>
      `

         socket.emit('new-message', {
            message: typingField.value,
            userId: userIdInput.value
         })

         e.target.reset()

         chatList.scrollTop = chatList.scrollHeight
      })
   }

   chatFormSubmit()

   socket.on('new-message', data => {
      chatList.innerHTML += `
         <li class="messages__item">
           <div class="message-owner-img">
               <img src="${data.message['user.avatar']}" alt="">
           </div>
           <div class="message-text received">
               <p>${data.message.messageText}</p>
               <time class="message-time">${currentTime()}</time>
           </div>
         </li>
       `
      chatList.scrollTop = chatList.scrollHeight
   })

   socket.on('login', data => {
      contactList.innerHTML += `
         <li class="chat-list__li active-contact" id="${data.user.userId}">
             <div class="contact-img">
                 <img src="${data.user.avatar}">
                 <div class="active-indicator"></div>
             </div>
             <div class="chat-info">
                 <h3 class="contact-name">${fullName(data.user.firstName, data.user.lastName)}</h3>
                 <div class="last-message"><strong>role: </strong>${data.user.role}</div>
             </div>
         </li>
      `
   })

   socket.on('left', data => {
      const id = userIdInput.value

      socket.emit('left-real', {
         id: userIdInput.value
      })
   })

   socket.on('disconnect', () => {
      socket.broadcast.emit('left-real', {
         id: userIdInput.value
      })
   })

   socket.on('left-real', data => {
      document.querySelector(`#${data.id}`).classList.remove('active-contact')
   })
}