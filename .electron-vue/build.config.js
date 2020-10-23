{
  // 针对 'x64' 架构
  arch: 'x64',

    // 使用 'electron/asar' 压缩应用
    asar: true,

  // 应用程序的目录
  dir: path.join(__dirname, '../'),

  // 设置 electron 程序的图标
  // 基于平台添加文件的扩展
  //
  // 如果针对 Linux 进行构建, 请阅读
  // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#icon
  icon: path.join(__dirname, '../build/icons/icon'),

  // 忽略可能造成最后程序很大的文件
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,

  // 把构建结果存储到 `builds`
  out: path.join(__dirname, '../build'),

  // 重写现有构建
  overwrite: true,

  // 指定平台的环境变量
  platform: process.env.BUILD_TARGET || 'all'
}
