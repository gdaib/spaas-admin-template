/*
 * @Description: nuxt 配置文件
 * @Author: barret
 * @Date: 2019-08-10 07:57:24
 * @LastEditTime: 2019-08-22 21:08:07
 * @LastEditors: barret
 */
require('dotenv').config();
const proxyConfig = require('./config/proxy.config');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

['PUBLIC_PATH', 'API_SERVER', 'COOKIE_PATH', 'NO_LOGIN'].forEach(key =>
  console.log('%s\t: %s', key, process.env[key]),
);

const env = process.env;
const isProd = env.MODE === 'prod';
const publicPath = env.PUBLIC_PATH || './';

// 不能以斜杠结尾
const apiServer = process.env.API_SERVER;
// 必须以斜杠结尾

const config = {
  aliIconFont: '',
  env: proxyConfig,
};

let axios = {
  proxy: true,
};

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer,
  };
}

const nuxtConfig = {
  srcDir: 'src/',
  mode: 'spa',
  env: {
    NO_LOGIN: process.env.NO_LOGIN,
    COOKIE_PATH: process.env.COOKIE_PATH || '/',
  },
  proxy: config.env[env.MODE],
  router: {
    middleware: ['meta', 'auth'],
    mode: 'hash',
  },
  /*
   ** Build configuration
   */
  build: {
    [isProd ? 'publicPath' : '']: publicPath,
    extractCSS: true,
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: '~node_modules/@femessage/theme-deepexi/lib',
          },
        ],
      ],
    },

    /*
     ** Run ESLint on save
     */
    extend(config, {isDev, isClient}) {
      config.module.rules = config.module.rules.filter(item => !item.test.test('.svg'));

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]',
        },
      });

      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: [resolve('src/icons')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 1K limit
              name: 'img/[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      });

      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            cache: true,
            fix: true,
            quiet: true,
          },
        });
      }
      isProd && (config.output.publicPath = publicPath);
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'SPaaS Console',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'SPaaS Console',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png',
      },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#5D81F9',
  },
  /**
   * Share variables, mixins, functions across all style files (no @import needed)
   * @Link https://github.com/nuxt-community/style-resources-module/
   */
  styleResources: {
    less: '~styles/var.less',
  },
  css: [
    {
      src: '~styles/global.less',
      lang: 'less',
    },
  ],
  plugins: [
    {
      src: '~/plugins/axios-port.js',
    },
    {
      src: '~/plugins/axios',
    },
    {
      src: '~/plugins/element',
    },
    {
      src: '~/plugins/router',
    },
    '~/plugins/globalPlugin',
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    [
      '@nuxtjs/dotenv',
      {
        path: './',
      },
    ],
    [
      '@nuxtjs/pwa',
      {
        icon: false,
      },
    ],
  ],
  axios,
};

module.exports = nuxtConfig;
