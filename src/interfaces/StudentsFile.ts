export type Student = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type StudentsFileRowType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type TeacherStudent = {
  userId: number;
  firstName: string;
  lastName: string;
};

export type AdminStudent = {
  userId: number;
  firstName: string;
  lastName: string;
};

export type SubAdminStudent = {
  userId: number;
  firstName: string;
  lastName: string;
};

export type SearchStudent = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  tag: string;
};
