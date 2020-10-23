let {exec,sql} =require('../sql/main').default
let utils =require('../utils')
export default async(ctx, next) => {
    let result = await exec(sql.table('google_mail').where().page(2,3).select());
    utils.success(ctx,result)
}

