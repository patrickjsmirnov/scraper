'use strict'

function sortWord(wordsMap) {
  return Object.entries(wordsMap).sort((a, b) => b[1] - a[1] )
}

function filterPdf(links) {
  return links.filter(link => !link.endsWith('.pdf'))
}

function filterHash(links) {
  return links.map(link => link.replace(/#\w*\d*/g, ''))
}

module.exports = {
  sortWord,
  filterPdf,
  filterHash
}