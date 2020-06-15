const path = require('path');
const dotenv = require('dotenv');
const serverEnv = dotenv.config({ path: path.join(__dirname, '../', '.server-env') });
const clusterEnv = dotenv.config({ path: path.join(__dirname, '../', '.env.local') });
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');

if (serverEnv.error) {
  console.warn(serverEnv.error);
}

if (clusterEnv.error) {
  console.warn(clusterEnv.error);
}

const TOKEN = process.env.TOKEN;
const BASE_URL = process.env.BASE_URL;
const addAuthorization = async (req, _res, next) => {
  try {
    req.headers.authorization = `Basic ${TOKEN}`;
  } catch (e) {
    console.error(e);
  }
  return next();
};
const agent = new https.Agent({
  rejectUnauthorized: false
});
module.exports = function(app) {
  app.use(
    '/proxy',
    addAuthorization,
    createProxyMiddleware({
      target: `${BASE_URL}`,
      agent: agent,
      secure: true,
      hostRewrite: `${BASE_URL}`,
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': ''
      },
      onProxyReq: (proxyReq, req) => {
        Object.keys(req.headers).forEach(key => {
          proxyReq.setHeader(key, req.headers[key]);
        })
      },
      onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        Object.keys(proxyRes.headers).forEach(key => {
          res.append(key, proxyRes.headers[key]);
        });
      },
      onError: error => {
        console.error(error);
      }
    })
  );
  app.use(bodyParser.json());
  app.options('*', cors());
};