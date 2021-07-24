function selectOne(selector) {
   return document.querySelector(selector)
}

function selectAll(selector) {
   return document.querySelectorAll(selector)
}

module.exports = { selectOne, selectAll }