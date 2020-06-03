const path = require('path');
const dotenv = require('dotenv');
const serverEnv = dotenv.config({ path: path.join(__dirname, '../', '.server-env') });
const clusterEnv = dotenv.config({ path: path.join(__dirname, '../', '.env.local') });
const proxy = require('http-proxy-middleware');
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

module.exports = function(app) {
  app.use(
    '/proxy',
    addAuthorization,
    proxy({
      target: `${BASE_URL}/`,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '/'
      },
      onProxyRes: proxyRes => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
      onError: error => {
        console.error(error);
      }
    })
  );
  app.use(bodyParser.json());
  app.options('*', cors());
};