import { selectOne } from './_functions'

export default function () {
   try {
      if (document.body.clientWidth < 1400 && !window.location.href.includes('/auth')) {
         document.body.style.zoom = 0.7
         selectOne('.app').style.height = document.body.clientHeight * 1.43 + 'px'
      }
   } catch (e) {}
}