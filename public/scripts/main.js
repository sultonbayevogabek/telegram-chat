'use strict'

import zoom from './_zoom'
import auth from './_auth'
import chat from './_chat'

document.addEventListener('DOMContentLoaded', () => {
   zoom()
   auth()
   chat()
})