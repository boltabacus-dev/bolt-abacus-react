export interface AuthToken {
  role: 'Student' | 'Teacher' | 'Admin' | 'SubAdmin';
  creationTime: string;
  expiryTime: string;
  userId: number;
  organizationExpirationDate: string;
}
