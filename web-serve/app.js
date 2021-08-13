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

app.use(express.static('../deploy'));

// const PROXY_EDSP = process.env.PROXY_EDSP || 'http://10.22.0.137:31801/edsp';
const PROXY_EDSP = 'http://10.22.0.137:31801/edsp';
const PROXY_LOADER = process.env.PROXY_LOADER || 'http://10.22.0.230:8080';

console.log('PROXY_EDSP: ', PROXY_EDSP);
console.log('PROXY_LOADER: ', PROXY_LOADER);
// 代理
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
// app.use(
//   '/loader',
//   proxy({
//     target: PROXY_LOADER,
//     pathRewrite: {
//       '/loader': '',
//     },
//     changeOrigin: true,
//   }),
// );

app.listen(9900, (req, res) => {
  console.log(req, res);
  console.log('启动成功，请通过localhost:9900访问');
});

