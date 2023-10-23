export interface User {
  name: {
    first: string;
    last: string;
  };
  role: 'student' | 'teacher' | 'admin';
}
