import { getCookie } from "cookies-next";

export const getToken = () => getCookie('token');

export const getOrganizationCode = () => getCookie('organizationCode');