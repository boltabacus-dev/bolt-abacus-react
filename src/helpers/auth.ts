import { jwtDecode } from 'jwt-decode';

import { AuthToken } from '@interfaces/AuthToken';

// TODO: Add refresh token after backend implementation
export const validAuthToken = (token: string): boolean => {
  const decodedToken: AuthToken = jwtDecode(token);
  const { creationTime } = decodedToken;

  const createdDate = new Date(`${creationTime.replace(' ', 'T')}Z`);
  const expiryDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000); // EXPIRY TIME TO 24HRS
  const now = new Date();

  return now < expiryDate;
};
