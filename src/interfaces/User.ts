export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  role: 'Student' | 'Teacher' | 'Admin';
}
