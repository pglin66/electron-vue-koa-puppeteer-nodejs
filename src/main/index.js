'use strict'

import {app, BrowserWindow} from 'electron'


const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');


const errorHandler = require('./middleware/errorHandler').default;
const authenticated = require('./middleware/authenticated').default;
//控制器地址
const indexRoute = require('./routes/index');
const googleEmail = require('./routes/puppeteer/googleEmail');
const email = require('./routes/api/email');
const ip = require('./routes/api/ip');
const excel = require('./routes/api/excel');
const Koaapp = new Koa()
const router = new Router();
Koaapp.use(errorHandler);
Koaapp.use(cors());
//路由地址
router.get('/index', bodyParser(), indexRoute.default);
router.get('/googleEmail', bodyParser(), googleEmail.default);
router.get('/googleEmail/regbtn', bodyParser(), googleEmail.regbtn);

router.get('/googleEmail/typeform', bodyParser(), googleEmail.typeform);
router.get('/googleEmail/readelsx', bodyParser(), googleEmail.readelsx);
router.get('/googleEmail/typenumber', bodyParser(), googleEmail.typenumber);
router.get('/googleEmail/getnumber', bodyParser(), googleEmail.getnumber);
router.get('/googleEmail/typecode', bodyParser(), googleEmail.typecode);
router.get('/googleEmail/typeinfo', bodyParser(), googleEmail.typeinfo);
router.get('/googleEmail/next1', bodyParser(), googleEmail.next1);
router.get('/googleEmail/next2', bodyParser(), googleEmail.next2);
router.get('/api/email', bodyParser(), email.default);
router.post('/api/email/save', bodyParser(), email.save);
router.get('/api/email/info', bodyParser(), email.info);
router.get('/api/excel', bodyParser(), excel.default);

router.get('/api/ip', bodyParser(), ip.default);

router.get('/api/email/save', bodyParser(), async function (ctx) {
    ctx.body = 1;
    console.log(121212)
});

/*router.get('/my-pets', authenticated, petsRoute);*/
Koaapp.use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 500,
        useContentSize: true,
        width: 500
    })
    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
