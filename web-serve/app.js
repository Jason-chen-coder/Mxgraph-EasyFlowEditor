/*
 * @Descripttion: 
 * @version: 
 * @Author: Jason chen
 * @Date: 2021-08-12 18:00:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-16 15:02:54
 */
const express = require('express');
// 代理
// const proxy = require('http-proxy-middleware');
// 服务端压缩gzip
// var compression = require('compression');
// webpack打包好gzip文件
const expressStaticGzip = require('express-static-gzip');
const app = express();
// 启用服务端压缩gzip
// app.use(compression());
app.use(
  expressStaticGzip('../dist', {
    maxAge: '3d',
    setHeaders: setCustomCacheControl,
  })
);

function setCustomCacheControl (res, currentFilePath) {
  if (currentFilePath.match(/\index\.html$/)) {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'no-cache');
  }
}
// 打包后的静态资源目录
app.use(express.static('../dist'));

// 代理

// const PROXY_EDSP = 'http://10.22.0.137:31801/edsp';
// app.use(
//   '/edsp',
//   proxy({
//     target: PROXY_EDSP,
//     pathRewrite: {
//       '/edsp': '',
//     },
//     changeOrigin: true,
//   }),
// );


app.listen(9900, (req, res) => {
  console.log(req, res);
  console.log('启动成功，请通过localhost:9900访问');
});

