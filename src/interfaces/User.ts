export interface User {
  name: {
    first: string;
    last: string;
  };
  role: 'Student' | 'Teacher' | 'Admin';
}
