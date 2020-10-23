const fs = require('fs')
var config = JSON.parse(fs.readFileSync('D://googleConfig.json','utf-8'));
const XLSX = require('xlsx');
export async function success(ctx, data = '', errmsg = '成功！', errno = 0) {
    ctx.body = {
        errno,
        errmsg,
        data
    }
}

export async function fail(ctx, errno = 1000, errmsg = '', data = '') {
    ctx.body = {
        errno,
        errmsg,
        data
    }
}
export function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                console.log(data)
                postdata+=data
            })
            ctx.req.on("end",function(){

                resolve(postdata);
            })
        }catch(error){
            reject(error);
        }
    });
}

export function  randomPassword(size) {
    let seed = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a',
        'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '2', '3', '4', '5', '6', '7', '8', '9'
    );//数组
    let seedlength = seed.length; //数组长度
    let createPassword = '';
    for (let i = 0; i < size; i++) {
        let j = Math.floor(Math.random() * seedlength);
        createPassword += seed[j];
    }
    return createPassword;
}

export function exceSave(key,index,text){
    let workbook = XLSX.readFile(config.excelPath);
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];
    console.log(key+(parseInt(index)+1),text)
    XLSX.utils.sheet_add_aoa(worksheet, [[text]], {origin: key+(parseInt(index)+1)});
    XLSX.writeFile(workbook, config.excelPath);
}

export function getinfo() {
    //@gmail.com
    let emaildomainarry = ['@cs.com', '@verizon.net', '@aol.com', '@comcast.net', '@warwick.net', '@hotmail.com', '@outlook.com', '@yahoo.com', '@westnet.com.au', '@BIGPOND.NET.AU', '@gionline.com.au', '@cairns.net.au', '@bigpond.com', '@netzero.net', '@twcny.rr.com', '@comcast.net'];
    let genderarry = ['1', '2', '3'];//2 女  1男  3不透露
    let yeararry = [];
    for (var i = 1960; i <= 2002; i++) {
        yeararry.push(i);
    }
    let montharry = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    let dayarry = [];
    for (var i = 1; i <= 28; i++) {
        dayarry.push(i);
    }

    function random(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    return  {
        emaildomain: random(emaildomainarry),
        gender: random(genderarry),
        year: random(yeararry),
        month: random(montharry),
        day: random(dayarry),
    };
}
