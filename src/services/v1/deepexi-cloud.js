import axios from '@/services/apiClient';

const apiVersion = '/api/v1';
const serviceType = '/deepexi-cloud';
const serviceTenantType = `${serviceType}/tenant`;
const serviceAdminType = `${serviceType}/admin`;

const basicUrl = `${serviceType}${apiVersion}`;
const tenantUrl = `${serviceTenantType}${apiVersion}`;
const adminUrl = `${serviceAdminType}${apiVersion}`;

/**
 *
 * @param {*} userInfo
 */
export const loginByUsername = userInfo => axios.$post(`${basicUrl}/login`, userInfo);

/**
 *
 * @param {*} params
 * @param {string} tenantId 租户ID
 * @param {number} appId  产品ID
 * @param {number} status 3 是通过审核
 */
export const getProductList = params => axios.$get(`${adminUrl}/spaasProductSubscribe`, {params});
// 获取用户权限菜单
/**
 *
 * @param {*} params
 * @param {string} code 资源组 code
 * @param {string} tenantId 租户ID
 * @param {number} appId  产品ID
 */
export const getMenu = params => axios.$get(`${tenantUrl}/menus`, {params});
