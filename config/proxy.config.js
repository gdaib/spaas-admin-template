// 不能以斜杠结尾
const apiServer = process.env.API_SERVER;

const mockServer = 'http://39.98.50.163:3000/mock/995';

module.exports = {
  mock: {
    '/deepexi-dashboard': mockServer,
    '/spaas-enterprise-contact': mockServer,
    '/spaas-console-api': mockServer,
    '/spaas-application-center': apiServer,
    '/deepexi-cloud': apiServer,
  },
  dev: {
    '/deepexi-dashboard': apiServer,
    '/spaas-enterprise-contact': apiServer,
    '/spaas-console-api': apiServer,
    '/spaas-application-center': apiServer,
    '/deepexi-cloud': apiServer,
  },
};
