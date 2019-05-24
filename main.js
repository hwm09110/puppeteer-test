// puppeteer
const puppeteer = require('puppeteer')
const path = require('path')
const chalk = require('chalk')
const log = console.log



async function start () {
	log(chalk.blue('打开浏览器'))
	const browser = await puppeteer.launch({
		headless:true //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
	})
  	const page = await browser.newPage()
	await page.goto('http://www.baokaodaxue.com')
	// const dimensions = await page.evaluate(() => {
	//     return {
	//       width: document.documentElement.clientWidth,
	//       height: document.documentElement.clientHeight,
	//       deviceScaleFactor: window.devicePixelRatio
	//     };
	// });
	// console.log('Dimensions:', dimensions);

	await page.screenshot({path: 'bkdx.png', fullPage: true})
	// await page.pdf({path: 'bkdx.pdf', format: 'A4'});  //保存 pdf文件

	await browser.close()
	log(chalk.blue('关闭浏览器'))
	process.exit(0);
}

start()