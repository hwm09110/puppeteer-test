const puppeteer = require('puppeteer');

// 休眠函数
function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(' enough sleep~');
        }, second);
    })
}
// 站点地址url
// var url = `http://t.shuqi.com/route.php?pagename=route.php#!/ct/cover/bid/6070553`
// var api = `http://walden1.shuqireader.com/webapi/book/info`

// var url = `https://www.baokaodaxue.com`
// var api = `https://www.baokaodaxue.com/Bkdx/News/getNotice`

var url = `https://www.youzy.cn/`
var api = `https://www.baokaodaxue.com/Bkdx/News/getNotice`


class Parse {
  constructor() {
    this.page = null
    this.browser = null
    this.bookMessage = {}
  }

  async init() {
    // 构造浏览器对象
    // 显示浏览器
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true
    });
    // // 创建页面
    this.page = await this.browser.newPage();
    // // 模拟浏览器信息
    const UA = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36";
    await Promise.all([
        this.page.setUserAgent(UA),
        // 允许执行js脚本
        this.page.setJavaScriptEnabled(true),
        // 页面视口大小
        this.page.setViewport({width: 1300, height: 1080}),
    ]);
    await this.getData()
  }


  async getData() {
    
    let page = await this.page


    // await page.setRequestInterception(true);

    // page.on('console', msg => console.log('PAGE LOG:', ...msg.args));

    // 等待页面请求完成
    // page.on('requestfinished', async request => {
    //   // 查看所有请求地址
    //   console.log(request.url())
    // // ajax
    // if (request.resourceType() == "xhr") {
    //     // console.log(request.resourceType() == "xhr")
    //     // 匹配所需数据的请求地址
    //     console.log(request.url().indexOf(api) != -1)
    //     if(request.url().indexOf('https://www.youzy.cn/Data/ScoreLines/Plans/Professions/Query') != -1) {
    //     // if(request.url().indexOf(api) != -1) {
    //       (async () => {
    //         try {
    //             // 获取数据并转为json格式
    //             let res = await request.response();
    //             let result = await res.json();
    //             console.log('获取数据', res)
    //             console.log('获取数据', result)
    //         //   let res_data = result.data     
    //         //   // 接口数据中找到需要的数据      
    //         //   this.bookMessage = {                        
    //         //     'book_name': res_data.bookName,              
    //         //     'book_summary': res_data.desc,              
    //         //     'author_name': res_data.authorName,              
    //         //   }
    //         //   let data = await this.bookMessage
    //         //   console.log('爬取的数据：', res)
    //         //   console.log('爬取的数据：', result)
    //         //   console.log('所需数据：', data)
    //         } catch(err) {
    //           console.log('错误信息', err)
    //         }

    //         // 关闭浏览器            
    //         // await this.browser.close() 
          
    //       })()
    //     }
    //   }
    // });

    // //请求失败
    // page.on('requestfailed', req => {
    //     console.log(`请求失败: ${req.url()}`);
    // });

    // //拦截请求
    // page.on('request', interceptedRequest => {
    //     const url = interceptedRequest.url()
    //     console.log('拦截请求url', url)
    //     if (url.indexOf('gradeRedirect') > 0) {
    //         interceptedRequest.abort();
    //     } else {
    //         interceptedRequest.continue();
    //     }
    // });

    //拦截响应
    // page.on('response', async res => {
    //     if (res.url().indexOf(api) != -1) {
    //         console.log(res.status());

    //         // 原本接口返回的数据 {"code":0,"data":"hello ajanuw"}
    //         console.log(await res.text());
    //          // 关闭浏览器            
    //     //    await this.browser.close() 
    //     }
    // });

    // 打开页面
    try{
        await page.goto(url, {timeout : 60000});

        await page.evaluate(v => {
          console.log($)
          $('.js-selectProvince').eq(0).click()
          // $('#divLogin').click()
          // $('.login-type-mobile-btn').click()
        })

        await sleep(2000)
        // //点击登录，弹窗登录弹窗
        await page.click('#divLogin')
        //切换到手机号码登录
        await page.click('.login-type-mobile-btn')  
        await this.page.type('.fm-login-mobile .login-user', '13945922164', {delay: 100});
        await sleep(1000)
        await this.page.type('.fm-login-mobile .fm-mobilePassUnSee', '957126', {delay: 100});
        await sleep(1000)
        await page.click('.js-login')  //弹窗确定登录按钮

        //去招生计划页面
        const page2 = await this.browser.newPage()
        page2.setViewport({width: 1300, height: 1080})
        page2.on('requestfinished', async request => {
          // 查看所有请求地址
          console.log(request.url())
          // ajax
          if (request.resourceType() == "xhr") {
              // console.log(request.resourceType() == "xhr")
              // 匹配所需数据的请求地址
              console.log(request.url().indexOf("https://www.youzy.cn/Data/ScoreLines/Plans/Professions/Query") != -1)
              if(request.url().indexOf('https://www.youzy.cn/Data/ScoreLines/Plans/Professions/Query') != -1) {
              // if(request.url().indexOf(api) != -1) {
                (async () => {
                  try {
                      // 获取数据并转为json格式
                      let res = await request.response()
                      let result = await res.json()
                      console.log('获取数据', res)
                      console.log('获取数据', result)
                  //   let res_data = result.data     
                  //   // 接口数据中找到需要的数据      
                  //   this.bookMessage = {                        
                  //     'book_name': res_data.bookName,              
                  //     'book_summary': res_data.desc,              
                  //     'author_name': res_data.authorName,              
                  //   }
                  //   let data = await this.bookMessage
                  //   console.log('爬取的数据：', res)
                  //   console.log('爬取的数据：', result)
                  //   console.log('所需数据：', data)
                  } catch(err) {
                    console.log('错误信息', err)
                  }
      
                  // 关闭浏览器            
                  // await this.browser.close() 
                
                })()
              }
            }
        });

        await page2.goto("https://www.youzy.cn/tzy/search/colleges/homepage/planIndex?cid=838", {timeout : 60000})


        
    }catch(e){
        console.log('打开页面', e)
    }
  }
}

let parse = new Parse()
parse.init()