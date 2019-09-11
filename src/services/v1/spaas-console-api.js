/*
 * spaas-console接口
 * @author barret
 * @date 2019/06/03
 */
import axios from '@/services/apiClient';
import {routers} from '@/const/config';
import {userInfo} from '@/const/config';

const isSingleBuild = process.env.SINGLE_BUILD === '1';

const apiVersion = '/api/v1';
const serviceType = '/spaas-console-api';
const basicUrl = `${serviceType}${apiVersion}`;

// adminUser
export const loginByUsername = data =>
  isSingleBuild ? userInfo : axios.$post(`${basicUrl}/users/login`, data);

/**
 * 获取侧边菜单栏
 * @param {*} param0
 */

/*
  export default function getXpassPermission(appId) {
    GET(`${basicUrl}/xpassPermission/userMenuTree/${appId}`);
  }
*/

// 根据appId获取左侧菜单
// eslint-disable-next-line import/prefer-default-export
export const getUserMenuTree = appId =>
  isSingleBuild ? routers : axios.$get(`${basicUrl}/xpassPermission/userMenuTree/${appId}`);
