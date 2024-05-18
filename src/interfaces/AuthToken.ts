export interface AuthToken {
  role: 'Student' | 'Teacher' | 'Admin';
  creationTime: string;
  expiryTime: string;
  userId: number;
  organizationExpirationDate: string;
}
