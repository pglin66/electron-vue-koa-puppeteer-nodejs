let {exec, sql} = require('../../sql/main').default
let utils = require('../../utils')
export default async function (ctx, next) {
    let {current = 1, size = 10,email} = ctx.request.query;
    let data={}
    if(email){
        data.firstname={LIKE:'%'+email+'%'}
    }
    let result = await exec(sql.table('google_mail').where(data).page(current, size).select());
    console.log(sql.table('google_mail').where(data).page(current, size).select())
    let count = await exec('SELECT  COUNT(*) FROM google_mail');
    utils.success(ctx, {
        data: result,
        count: count[0]['COUNT(*)']
    })
}
export async function info(ctx, next) {
    let {id} = ctx.request.query;
    let result = await exec(sql.table('google_mail').where({id}).limit(1).select());
    utils.success(ctx,result[0])
}
export async function save(ctx, next) {
    let {id, lastname, firstname, passwd, country, birthday, addressinfo, postalcode, city, state, smsid, status} = ctx.request.body;
    let result;
    if (id && parseInt(id)) {
        result = await exec(sql.table('google_mail').where({id}).data({
            lastname,
            firstname,
            passwd,
            country,
            birthday,
            addressinfo,
            postalcode,
            city,
            state,
            smsid,
            status,
            createtime: new Date().getTime(),
            updatetime: new Date().getTime()
        }, true).update());
    } else {
        result = await exec(sql.table('google_mail').where({id}).data({
            lastname,
            firstname,
            passwd,
            country,
            birthday,
            addressinfo,
            postalcode,
            city,
            state,
            smsid,
            status,
            createtime: new Date().getTime(),
            updatetime: new Date().getTime()
        }).insert());
    }

    utils.success(ctx, result);

}
