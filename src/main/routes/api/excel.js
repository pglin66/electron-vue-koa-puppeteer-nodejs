const fs = require('fs');
const xlsx = require('node-xlsx');
export default async(ctx, next) => {
    const XLSX = require('xlsx');
    let workbook = XLSX.readFile('d://demo.xlsx');
    let first_sheet_name = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[first_sheet_name];
    let cell = worksheet['D4'].v;
    console.log(cell)
    worksheet['D4'].v = 'NEW VALUE from NODE';
    XLSX.writeFile(workbook, 'd://test2.xls');
    /*var list = xlsx.parse("d://google.xls");
    const res = xlsx.build(list)
    fs.writeFile('d://demo.xlsx', res, err => {
        if (err) throw err;
        console.log('文件已被保存');
    })*/

    ctx.body=cell
}
