import {selectOne, selectAll, clearText} from './_functions'

export default function () {
   try {
      const socket = io()
      // hide or show auth form
      const authHeadersItems = selectAll('.auth__header__item'),
         authForms = selectAll('.auth__form')

      authHeadersItems.forEach((el, idx) => {
         el.addEventListener('click', e => {
            authForms.forEach(el => el.classList.remove('auth__form--visible'))
            authForms[idx].classList.add('auth__form--visible')
            authHeadersItems.forEach(el => el.classList.remove('auth__header__item--active'))
            authHeadersItems[idx].classList.add('auth__header__item--active')
         })
      })

      // signup
      const signUpForm = selectOne('#auth-signup'),
         avatarImgInput = signUpForm.querySelector('#avatar'),
         avatarImgElement = signUpForm.querySelector('.avatar > img'),
         firstNameInput = signUpForm.querySelector('#first-name'),
         lastNameInput = signUpForm.querySelector('#last-name'),
         emailInput = signUpForm.querySelector('#signup-email'),
         passwordInput = signUpForm.querySelector('#signup-password'),
         errorDisplay = signUpForm.querySelector('#error-display-signup')

      avatarImgInput.addEventListener('change', e => {
         if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
               avatarImgElement.src = e.target.result
            }

            reader.readAsDataURL(e.target.files[0])
         }
      })

      signUpForm.addEventListener('submit', async e => {
         e.preventDefault()

         const formData = new FormData()

         formData.append('avatar', avatarImgInput.files[0])
         formData.append('firstName', clearText(firstNameInput.value))
         formData.append('lastName', clearText(lastNameInput.value))
         formData.append('email', clearText(emailInput.value))
         formData.append('password', passwordInput.value)

         let response = await fetch('/auth/signup', {
            method: 'POST',
            body: formData
         })

         response = await response.json()

         if (response.ok) {
            socket.emit('login', {
               user: response.result.user
            })
            return window.location.reload()
         }

         errorDisplay.innerHTML = `
            <div class="alert">${response.message.substring(6)}</div>
         `
      })

      // signin
      const signInForm = selectOne('#auth-signin'),
         emailInputLogin = signInForm.querySelector('#email'),
         passwordInputLogin = signInForm.querySelector('#password'),
         errorDisplayLogin = signInForm.querySelector('#error-display-signin')

      signInForm.addEventListener('submit', async e => {
         e.preventDefault()

         let response = await fetch('/auth/signin', {
            headers: {
               'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
               email: clearText(emailInputLogin.value),
               password: passwordInputLogin.value
            })
         })

         response = await response.json()

         if (response.ok) {
            return window.location.reload()
         }

         errorDisplayLogin.innerHTML = `
            <div class="alert">${response.message.substring(6)}</div>
         `
      })
   } catch (e) {
   }
}