import {getCookie} from 'cookies-next';

export const getToken = (state: any) => getCookie('token');

export const getRefreshToken = (state: any) => getCookie('refreshToken');

export const getOrganizationCode = (state: any) =>
  getCookie('organizationCode');
