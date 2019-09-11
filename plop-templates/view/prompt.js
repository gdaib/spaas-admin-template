const {notEmpty} = require('../utils.js');

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入视图名字',
      validate: notEmpty('视图名字'),
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择预设模板',
      choices: ['default', 'el-data-table'],
    },
    {
      type: 'confirm',
      name: 'index',
      message: 'is index entry',
    },
    {
      type: 'confirm',
      name: 'route',
      message: '是否添加路由',
    },
    {
      type: 'input',
      name: 'routeName',
      message: '请输入路由标题',
      when: data => data.route,
      validate: notEmpty('路由标题'),
    },
    {
      type: 'list',
      name: 'appType',
      message: '请选择应用列表展示形式: enable为展示，none为不展示，disabled为展示不可编辑',
      when: data => data.route,
      choices: ['enable', 'none', 'disabled'],
    },
  ],
  actions: data => {
    const {type, index: isIndex, name} = data;
    // 如果是 Index 那么同级目录会有其他路由，如果不是的话，直接创建 name.vue 即可
    // 路由路径，会根据 index 选项是否创建一个目录，比如同级会有其他路由则需要 选择 index 选项
    const pagePath = `src/pages/${isIndex ? `${name}/index` : name}.vue`;

    // pages 引入 views 的文件路径，需要根据是否是 Index 选项加路径
    data.viewPath = `@/views/${name}${isIndex ? '/index' : ''}/index.vue`;

    // /a/b/c 拿到最后一个斜杠后续的 name
    // eslint-disable-next-line prefer-destructuring
    data.viewName = name.match(/\/?([^/]*)$/)[1];

    const actions = [
      {
        type: 'add',
        path: pagePath,
        templateFile: 'plop-templates/view/route.hbs',
        data: {
          viewPath: '{{ viewPath }}',
        },
        skipIfExists: true,
      },
      {
        type: 'add',
        path: data.viewPath.replace('@', 'src'),
        templateFile: `plop-templates/view/${type}.hbs`,
        data: {
          viewName: '{{viewName}}',
        },
        skipIfExists: true,
      },
    ];

    // 如果写路由文件则执行 action
    if (data.route) {
      actions.push({
        type: 'setRouteInfo',
      });
    }

    return actions;
  },
};
