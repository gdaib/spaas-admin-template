import axios from '@/services/apiClient';
import {userInfo} from '@/const/config';

const isSingleBuild = process.env.SINGLE_BUILD === '1';

const apiVersion = '/api/v1';
const enterpriseContact = `/spaas-enterprise-contact${apiVersion}`;

// 获取头部导航栏thirdId
export const adminUser = tenantId =>
  isSingleBuild
    ? userInfo
    : axios.$get(`${enterpriseContact}/users/adminUser`, {
        params: {tenantId},
      });
