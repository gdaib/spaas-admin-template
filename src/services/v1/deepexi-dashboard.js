import axios from '@/services/apiClient';
import {tagList} from '@/const/config';

const isSingleBuild = process.env.SINGLE_BUILD === '1';

const apiVersion = '/api/v1';
const deepexiDashboard = `/deepexi-dashboard${apiVersion}`;

// 根据thirdId获取头部导航栏列表
// eslint-disable-next-line import/prefer-default-export
export const getXpaasTag = thirdId =>
  isSingleBuild
    ? tagList
    : axios.$get(`${deepexiDashboard}/tenantComponents/xpaas/getXpaasTag/${thirdId}`);
