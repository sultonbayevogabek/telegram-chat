function selectOne(selector) {
   return document.querySelector(selector)
}

function selectAll(selector) {
   return document.querySelectorAll(selector)
}

function clearText(text) {
   return text.trim().toLowerCase()
}

module.exports = { selectOne, selectAll, clearText }