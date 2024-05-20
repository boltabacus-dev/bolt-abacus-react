import { jwtDecode } from 'jwt-decode';

import { AuthToken } from '@interfaces/AuthToken';

// TODO: Add refresh token after backend implementation
export const validAuthToken = (token: string): boolean => {
  const decodedToken: AuthToken = jwtDecode(token);
  const timestamp = decodedToken.expiryTime;

  const date = new Date();
  const nowUTC = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  const expiryDate = new Date(timestamp).setHours(0, 0, 0, 0);
  const todayDate = new Date(nowUTC).setHours(0, 0, 0, 0);

  const isNotExpired = todayDate <= expiryDate;

  return isNotExpired;
};
