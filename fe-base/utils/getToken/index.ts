import { getCookie } from "cookies-next";

export const getToken = (state: any) => getCookie('token');