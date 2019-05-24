// puppeteer
const puppeteer = require('puppeteer')
const path = require('path')
const chalk = require('chalk')
const log = console.log



log(chalk.blue('Hello') + ' World' + chalk.red('!'))


async function start () {
	const browser = await puppeteer.launch()
  	const page = await browser.newPage()
	await page.goto('http://www.baokaodaxue.com')
	await page.screenshot({path: 'bkdx.png'})

	await browser.close()
}

start()