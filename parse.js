'use strict'

const puppeteer = require('puppeteer');
const { filterPdf, filterHash } = require('./helpers/data')

const collectData = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const wordsMap = {}
  const images = []
  await page.goto(link);

  let externalLinks = await page.$$eval('a[target*="_"]',a => a.map(a => a.href));
  externalLinks = filterPdf(externalLinks)

  let links = await page.$$eval('a',a => a.map(a => a.href));

  links = links.filter(link => link.match(/http\w*:\/\/(\w{3}|\w{4}).innoscripta.de\/[^#]/g))
  links = filterPdf(links)
  links = filterHash(links)

  let words = await page.$eval('*', el => el.innerText);
  words = words
    .split(/(\r\n|\r|\n|\s|,)/g)
    .filter(word => !word.match(/^[0-9]*$/g))
    .filter(word => word.replace(/(\.|\,)/g, ''))
    .filter(word => word.replace(/\s&\s\)/g, ''))

  words.forEach(word => {
    const trimmed = word.trim()

    if (trimmed.length) {
      if (!wordsMap[trimmed]) {
        wordsMap[trimmed] = 0
      }

      wordsMap[trimmed] += 1 
    }
  });

  try {
    let imagesOnPage = await page.$$eval('img',img => img.map(a => a.src));
    imagesOnPage.forEach(image => images.push(image))
  }
  catch(e) {
    console.log(e)
  }
  

  await browser.close()

  const data = {
    words: wordsMap,
    links,
    externalLinks,
    images
  }

  return data
}

const collectLinks = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const mainUrl = 'https://www.innoscripta.de/'
    await page.goto(mainUrl);

    let links = await page.$$eval('a',a => a.map(a => a.href));

    links = links.filter(link => link.match(/http\w*:\/\/(\w{3}|\w{4}).innoscripta.de\/[^#]/g))
    links = filterPdf(links)
    links = filterHash(links)
    links = [...new Set(links)]

    links = [mainUrl, ...links]

    await browser.close();
    return links
  } catch(e) {
    console.log(e)
  }
}

const parse = async () => {

  let links = await collectLinks()

  const getData = async () => {
    const result = {
      links: [],
      words: {},
      wordesLinks: links,
      externalLinks: [],
      images: []
    }

    for (const link of links) {
      console.log(`process link ${link}`)
      const data = await collectData(link)

      for(let key in data.words) {
        if (!result.words[key]) {
          result.words[key] = 0
        }
        result.words[key] += data.words[key]      
      }

      for(let link of data.links) {
        result.links.push(link)
      }

      for(let externalLink of data.externalLinks) {
        result.externalLinks.push(externalLink)
      }

      for(let image of data.images) {
        result.images.push(image)
      }
    }

    return result
  }

  const result = await getData()

  return result
}

module.exports = parse
