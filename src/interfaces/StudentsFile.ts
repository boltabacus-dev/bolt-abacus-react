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
  phoneNumber: string;
  email: string;
  blocked: boolean;
};

export type SubAdminStudent = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  blocked: boolean;
};

export type SearchStudent = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  batchName: string;
  tag: string;
  blocked: boolean;
};

export type SearchStudentV2 = {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  batchName: string;
  tag: string;
};

export type StudentBatchDetails = {
  firstName: string;
  lastName: string;
  email: string;
  batchId: number;
  batchName: string;
};
