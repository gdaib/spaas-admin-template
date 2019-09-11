const fs = require('fs');
const path = require('path');

exports.notEmpty = name => {
  return v => {
    if (!v || v.trim === '') {
      return `${name} 必须填写`;
    }
    return true;
  };
};

/**
 *写入 Route
 */
exports.setRouteAction = answers => {
  const navPath = path.resolve(__dirname, './../src/const/route-info.json');

  // 读取 JSON
  let routerInfoJson = {};

  if (fs.existsSync(navPath)) {
    // 防止读出来的不是 JSON
    try {
      routerInfoJson = JSON.parse(fs.readFileSync(navPath, 'utf-8'));
    } catch (error) {
      console.log(error);
    }
  }

  const {name, routeName, appType} = answers;

  const appMap = {
    enable: '1',
    none: '2',
    disabled: '3',
  };

  const routePath = name.startsWith('/') ? name : `/${name}`;

  // 路由匹配的是 : 不是 下划线
  routerInfoJson[routePath.replace(/_/g, ':')] = {
    title: routeName,
    appType: appMap[appType],
    enable: false,
  };

  fs.writeFileSync(navPath, JSON.stringify(routerInfoJson, null, '   '), 'utf-8');

  return '\nnav.config.json update success\n';
};
