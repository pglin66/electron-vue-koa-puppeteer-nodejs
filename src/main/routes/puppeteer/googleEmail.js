const puppeteer = require('puppeteer')
import axios from 'axios'

let utils = require('../../utils')
const xlsx = require('node-xlsx');
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('D://googleConfig.json', 'utf-8'));
axios.defaults.timeout = config.axiosTimeout;
var browser, page, xlslit, xlslitindex,email;

export async function readelsx(ctx, next) {
    xlslit = xlsx.parse(config.excelPath);
    xlslit = xlslit[0].data
    function getindex() {
        for (var i in xlslit) {
            if (!xlslit[i]['7']) {
                xlslitindex = i
                return;
            }
        }
    }

    getindex();
    utils.success(ctx, {list: xlslit, index: xlslitindex})
}

export default async (ctx, next) => {
    try {
        browser = await puppeteer.launch({
            executablePath: config.executablePath,
            headless: false,
            ignoreDefaultArgs: ['--enable-automation'],
            'args': [
                '--lang=en-US',
                '--start-maximized'
            ]
        })
        page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36')
        await page.goto(config.openUrl)
        await page.setViewport({
            width: 1920,
            height: 1080
        })
        ctx.append('Content-Type', 'text/html;charset=utf-8');
        utils.success(ctx, '谷歌邮箱打开成功')
    } catch (e) {
        utils.fail(ctx, '浏览器关闭')
    }
}

export async function regbtn(ctx, next) {

    try {
        const regbtn = await page.$('.zQJV3 [role="button"]');
        regbtn.click();
        await page.waitFor(500);
        const element = await page.$('.XvhY1d .z80M1:nth-child(1)');//得到元素
        const size = await element.boundingBox();//使用boundingBox函数得到元素的尺寸信息
        await page.mouse.move(size.x, size.y);
        await page.mouse.down();
        await page.mouse.up();//松开鼠标
        utils.success(ctx, '点击成功')
    } catch (e) {
        utils.fail(ctx, '失败')
    }
}

export async function typeform(ctx, next) {
    await page.waitFor(2000);
    await page.waitFor('#lastName');
    await page.evaluate(() => {
        document.getElementById("lastName").value = "";
    });
    await page.type('#lastName', xlslit[xlslitindex][0]);
    await page.click('body');//点击空白
    await page.waitFor(500);
    await page.waitFor('#firstName');
    await page.evaluate(() => {
        document.getElementById("firstName").value = "";
    });
    await page.type('#firstName', xlslit[xlslitindex][1]);
    await page.click('body');//点击空白
    await page.waitFor(500);
    await page.waitFor('#username');
    await page.evaluate(() => {
        document.getElementById("username").value = "";
    });
    await page.type('#username', xlslit[xlslitindex][0] + xlslit[xlslitindex][1]);
    await page.click('body');//点击空白
    //监控数据是否提交完跳转
    let response = await page.waitForResponse(response => {
        console.log('response1', response.url());
        return response.url().includes('accounts.google.com/_/signup/webusernameavailability');
    });
    let webusernameavailability = await response.text();
    webusernameavailability = JSON.parse(webusernameavailability.replace(')]}\'', ''));
    if (webusernameavailability[0][0][1] == 2) {
        console.log('邮箱名称正常');
        if (webusernameavailability[0][0][2].length > 0) {
            console.log('邮箱名称可选', webusernameavailability[0][0][2]);
            await page.evaluate(() => {
                document.getElementById("username").value = "";
            });
            await page.type('#username', webusernameavailability[0][0][2][0]);
            await page.click('body');//点击空白
        } else {
            await page.evaluate(() => {
                document.getElementById("username").value = "";
            });
            await page.type('#username', xlslit[xlslitindex][0] + xlslit[xlslitindex][1] + utils.randomPassword(6));
            await page.click('body');//点击空白
            console.log('邮箱名称不可选');
        }

    } else if (webusernameavailability[0][0][1] == 3) {
        await page.evaluate(() => {
            document.getElementById("username").value = "";
        });
        await page.type('#username', xlslit[xlslitindex][0] + xlslit[xlslitindex][1] + utils.randomPassword(6));
        await page.click('body');//点击空白
    } else if (webusernameavailability[0][0][1] == 1) {
        console.log('邮箱名称直接可以用', webusernameavailability);
    } else {
        await page.evaluate(() => {
            document.getElementById("username").value = "";
        });
        await page.type('#username', xlslit[xlslitindex][0] + xlslit[xlslitindex][1] + utils.randomPassword(6));
        await page.click('body');//点击空白
        console.log('邮箱名异常了', webusernameavailability);
    }
    await page.waitFor(500);
    await page.waitFor('[name="Passwd"]');
    await page.evaluate(() => {
        document.querySelector('[name="Passwd"]').value = "";
        document.querySelector('[name="ConfirmPasswd"]').value = "";
    });
    let pwd = utils.randomPassword(10)

    await page.type('[name="Passwd"]', pwd);
    await page.click('body');//点击空白
    await page.waitFor(500);
    await page.waitFor('[name="ConfirmPasswd"]');

    await page.type('[name="ConfirmPasswd"]', pwd);
    utils.exceSave('H', xlslitindex, pwd)
    await page.click('body');//点击空白
    await page.waitFor(500);
     email = await page.$eval('#username', input => input.value);
    utils.exceSave('H', xlslitindex, email)
    utils.exceSave('I', xlslitindex, pwd)

    const firstText2 = await page.$('#accountDetailsNext');
    await firstText2.click();

    //监控数据是否提交完跳转
    response = await page.waitForResponse(response => {
        console.log('response1', response.url());
        return response.url().includes('accounts.google.com/_/signup/accountdetails');
    });
    let accountdetails = await response.text();
    accountdetails = JSON.parse(accountdetails.replace(')]}\'', ''));
    if (accountdetails[0][0][1] == 3) {
        utils.success(ctx, '信息填写成功')
    } else {
        utils.fail(ctx, '信息填写失败')
    }

}

//获取手机号码
export async function getnumber(ctx, next) {
    await page.waitFor(2000);
    let total = 0;

    async function start(resolve, reject) {
        if (total >= config.getnumberTotal) {
            reject(['获取次数超过' + total]);
            return;
        }
        total += 1;
        console.log('发起了请求', total)
        await axios.get('http://api2.5sim.net/stubs/handler_api.php?api_key=' + config.numberKey + '&action=getNumber&country=' + config.country + '&service=google&count=1').then(number => {
            console.log('请求响应了', number.status)
            if (number.status == 200) {
                number = number.data.split(':');
                console.log(number)
                if (number[0] == 'ACCESS_NUMBER') {
                    resolve(number);
                } else if (number[0] == 'NO_NUMBER') {
                    start(resolve, reject)
                } else {
                    start(resolve, reject)
                }
            } else {
                start(resolve, reject)
            }
        }).catch(error => {
            start(resolve, reject)
        });//google
    }

    function get() {
        return new Promise((resolve, reject) => {
            start(resolve, reject)
        })
    }

    await get().then(res => {
        utils.success(ctx, {
            id: res[1],
            number: res[2],
            total
        }, '获取手机成功')
    }).catch(res => {
        utils.fail(ctx, '获取手机失败', res)
        return;
    });

}

export async function typenumber(ctx, next) {
    await page.waitFor(2000);
    let {number = ''} = ctx.request.query
    await page.waitFor(500);
    await page.waitFor('#phoneNumberId');
    await page.evaluate(() => {
        document.querySelector('#phoneNumberId').value = "";
    });

    await page.type('#phoneNumberId', number);
    await page.waitFor(500);
    let nextbtn = await page.$('.dG5hZc .qhFLie button');
    nextbtn.click();
    let response = await page.waitForResponse(response => {
        console.log('response1', response.url());
        return response.url().includes('accounts.google.com/_/signup/sendidv');
    });
    let sendidv = await response.text();
    sendidv = JSON.parse(sendidv.replace(')]}\'', ''));
    if (sendidv[0][0][1] == 2) {
        utils.fail(ctx, '手机号码异常')
    } else {
        utils.success(ctx, '手机号码正常')
    }
}

export async function typecode(ctx, next) {
    await page.waitFor(2000);
    let {number, id} = ctx.request.query

    //设置短信状态
    await axios.get('http://api2.5sim.net/stubs/handler_api.php?api_key=' + config.numberKey + '&action=setStatus&id=' + id + '&status=1');

    function getcode() {
        var total = 0;
        return new Promise(function (resolve, reject) {
              function get(resolve, reject) {
                if (total >= config.getcodeTotal) {
                    reject('超过设定次数'+total);
                    return;
                }
                total += 1
                console.log('发起请求')
                 axios.get('http://api2.5sim.net/stubs/handler_api.php?api_key=' + config.numberKey + '&action=getStatus&id=' + id).then(res => {
                     console.log('发起请求:===',res.data)
                    res.data = res.data.split(':');
                    if (res.data[0] == 'STATUS_OK'||res.data[0] == 'STATUS_ACCESS') {
                        console.log('获取到验证码', res.data);
                        resolve(res.data[1]);
                    } else {
                        //没有收到短信
                        setTimeout(() => {
                            console.log('5秒完成');
                            get(resolve,reject);
                        }, 3000);
                    }
                }).catch(res => {
                    setTimeout(() => {
                        get(resolve,reject);
                    }, 3000);
                });
            }
            get(resolve, reject);
        });
    }

    await getcode().then(async code => {
        await page.waitFor(2000);
         await page.waitFor('#code');
         await page.type('#code', code);
         await page.waitFor(500);
         let nextbtn = await page.$('.dG5hZc .qhFLie button');
         nextbtn.click();
         //监控数据是否提交完跳转
         let response = await page.waitForResponse(response => {
             return response.url().includes('accounts.google.com/_/signup/verifyidv');
         });
         let verifyidv = await response.text();
         verifyidv = JSON.parse(verifyidv.replace(')]}\'', ''));
         if (verifyidv[0][0][1] == 1) {
             utils.success(ctx, '验证成功')
         } else {
             utils.fail(ctx, 2, '验证错误', verifyidv)
         }
    }).catch(res => {

        utils.fail(ctx, 2, res)
    });

}

export async function typeinfo(ctx, next) {
    let userinfo = utils.getinfo();
    ctx.body=userinfo

    await page.waitFor('[name="recoveryEmail"]');
    await page.type('[name="recoveryEmail"]', email + userinfo.emaildomain);
    await page.waitFor('#year');
    await page.type('#year', userinfo.year + '');
    await page.waitFor('#month');
    await page.select('#month', userinfo.month + '');
    await page.waitFor('#day');
    await page.type('#day', userinfo.day + '');
    await page.waitFor('#gender');
    await page.select('#gender', userinfo.gender + '');
    console.log('等待6妙');
    await page.waitFor(2000);
    let nextbtn = await page.$('.dG5hZc .qhFLie button');
    console.log('点击下一步');

    utils.exceSave('J', xlslitindex,  userinfo.year + '-' + userinfo.month + '-' + userinfo.day)
    utils.exceSave('K', xlslitindex,  userinfo.gender==1?'男':userinfo.gender==2?'女':'不透露')
    utils.exceSave('L', xlslitindex,   email + userinfo.emaildomain)

    nextbtn.click();
    //监控数据是否提交完跳转
    let response = await page.waitForResponse(response => {
        console.log('response1', response.url());
        return response.url().includes('accounts.google.com/_/signup/webpersonaldetails');
    });
    let webpersonaldetails = await response.text();
    webpersonaldetails = JSON.parse(webpersonaldetails.replace(')]}\'', ''));
    if (webpersonaldetails[0][0][1] == 1) {
        utils.success(ctx, '成功')
    } else {
        utils.fail(ctx)
    }
}

export async function next1(ctx, next) {
    let nextbtn = await page.$('.dG5hZc .qhFLie button');
    console.log('点击立即启用');
    nextbtn.click();
    //监控数据是否提交完跳转
    let response = await page.waitForResponse(response => {
        console.log('response1', response.url());
        return response.url().includes('accounts.google.com/_/signup/updatephone');
    });
    let updatephone = await response.text();
    updatephone = JSON.parse(updatephone.replace(')]}\'', ''));
    if (updatephone[0][0][1]) {
        console.log('下一步验证成功！', updatephone);
        utils.success(ctx, '成功')
    } else {
        console.log('下一步验证错误！', updatephone);
        utils.fail(ctx, '错误')
    }
}
export async function next2(ctx, next) {
    await page.waitFor(1000);
    let nextbtn = await page.$('#termsofserviceNext');
    nextbtn.click();
    utils.success(ctx, '成功')
}
