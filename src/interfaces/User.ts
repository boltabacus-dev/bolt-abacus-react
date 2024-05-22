export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  organizationName: string;
  role: 'Student' | 'Teacher' | 'Admin' | 'SubAdmin';
}
