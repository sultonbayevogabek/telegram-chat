import { selectOne } from './functions'

export default function () {
   try {
      if (document.body.clientWidth < 1400) {
         document.body.style.zoom = 0.67
         selectOne('.app').style.height = document.body.clientHeight * 1.43 + 'px'
      }
   } catch (e) {}
}