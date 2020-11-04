'use strict'

function createTableWordsMarkup(list) {
  return (
    `<table>
      <thead>
        <tr>
          <td>Word</td>
          <td>Count</td>
        </tr>
      <thead/>
      <tbody>
        ${list.map(([word, count]) => (
          `<tr>
            <td>${word}</td>
            <td>${count}</td>
            </tr>`
        )).join('')}
      </tbody>
    </table>
    `
  )
}

function createListLinksMarkup(links) {
  return (
    `<div>
      <h2>Visited links</h2>
      <ul class="links">
        ${links.map(link => `<li><a target="_blank" href=${link}>${link}</a></li>`).join('')}
      <ul/>
    </div>
    `
  )
}

function createListExternalLinksMarkup(links) {
  return (
    `<div>
      <h2>External Links</h2>
      <ul class="links">
        ${links.map(link => `<li><a target="_blank" href=${link}>${link}</a></li>`).join('')}
      <ul/>
    </div>
    `
  )
}

function createListImagesMarkup(list) {
  return (
    `<div>
      <h2>Images</h2>
      <ul class="links">
        ${list.map(src => `<li><img src=${src}></li>`).join('')}
      <ul/>
    </div>
    `
  )
}

function createHtmlMarkup({ header, table, links, externalLinks, images }) {
  return (
    `<!DOCTYPE html>
      <html>
        <head>
          ${header}

          <style>
            table { border-collapse: collapse; }
            td { border: 1px solid black; }
          </style>
        </head>
        <body>
          <div style="display: flex;">
            <div>
              ${table}
            </div>
            <div>  
              ${links}
            </div>
            <div>
              ${externalLinks}
            </div>
            <div>
              ${images}
            </div>
          </div>
        </body>
      </html>`
  )
}

module.exports = {
  createTableWordsMarkup,
  createListLinksMarkup,
  createHtmlMarkup,
  createListExternalLinksMarkup,
  createListImagesMarkup
}