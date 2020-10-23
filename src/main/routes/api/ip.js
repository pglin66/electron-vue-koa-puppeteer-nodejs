let {exec,sql} =require('../../sql/main').default
let utils =require('../../utils')
const {spawn} = require('child_process');
const puppeteer = require('puppeteer')
import axios from 'axios'

const fs = require('fs')

var config = JSON.parse(fs.readFileSync('D://googleConfig.json', 'utf-8'));
export default async(ctx, next) => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Users\\Administrator\\AppData\\Local\\google\\Chrome\\Application\\chrome.exe',
        headless: false,
        ignoreDefaultArgs: ['--enable-automation'],
    });
    const beforeip = await browser.newPage();
    await beforeip.goto('https://api.ipify.org/');
    var before = await beforeip.$eval('body', el => el.innerText);
    await beforeip.close();
    var local = await axios('https://api.ipify.org/');
    spawn(
        config.ip911S5,
        ['-changeproxy/US']
    );
    var after = '';
    function getip() {
        return new Promise(function(resolve, reject) {
            async function get(fun) {
                const afterip = await browser.newPage();
                await afterip.goto('https://api.ipify.org/');
                after = await afterip.$eval('body', el => el.innerText);
                await afterip.close();
                if (after !== before) {
                    fun();
                } else {
                    setTimeout(() => {
                        get(fun);
                    }, 2000);
                }
            }
            get(function() {
                resolve();
            });
        });
    }
    await getip();
    browser.close();
    utils.success(ctx,{
        before: before,
        local: local.body,
       after: after
    })
}

