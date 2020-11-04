'use strict'

const http = require('http');
const parse = require('./parse.js')
const { 
  createTableWordsMarkup, 
  createListLinksMarkup,
  createHtmlMarkup,
  createListExternalLinksMarkup,
  createListImagesMarkup
} = require('./helpers/markup')
const { sortWord } = require('./helpers/data')

http.createServer(async (req, res) => {
  const header = ''
  const data = await parse()
  const words = sortWord(data.words)
  const table = createTableWordsMarkup(words)
  const links = createListLinksMarkup(data.wordesLinks)
  const externalLinks = createListExternalLinksMarkup(data.externalLinks)
  const images = createListImagesMarkup(data.images)

  const html = createHtmlMarkup({ header, table, links, externalLinks, images });

  res.writeHead(200, {'Content-Type': 'text/html',});
  res.end(html);

}).listen(3005);