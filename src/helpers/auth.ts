import { jwtDecode } from 'jwt-decode';

import { AuthToken } from '@interfaces/AuthToken';

// TODO: Add refresh token after backend implementation
export const validAuthToken = (token: string): boolean => {
  const decodedToken: AuthToken = jwtDecode(token);
  const timestamp = decodedToken.expiryTime;

  const expiryDate = new Date(timestamp).setHours(0, 0, 0, 0);
  const todayDate = new Date().setHours(0, 0, 0, 0);

  const isNotExpired = todayDate <= expiryDate;

  return isNotExpired;
};
