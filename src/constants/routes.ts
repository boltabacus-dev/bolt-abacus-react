// Frontend Routes
export const HOME_PAGE = '/';
export const ABOUT_SECTION = '/#about';
export const SERVICES_SECTION = '/#pricing';
export const CONTACT_SECTION = '/#footer';

export const PROFILE_PAGE = '/profile';

export const LOGIN_PAGE = '/login';

export const STUDENT_ROUTE = '/student';
export const STUDENT_DASHBOARD = `${STUDENT_ROUTE}/dashboard`;
export const STUDENT_LEVEL = `${STUDENT_ROUTE}/level`;
export const STUDENT_PRACTICE = `${STUDENT_ROUTE}/practice`;

export const ADMIN_ROUTE = '/admin';
export const ADMIN_DASHBOARD = `${ADMIN_ROUTE}/dashboard`;
export const ADMIN_ADD_STUDENT = `${ADMIN_ROUTE}/add/student`;
export const ADMIN_ADD_TEACHER = `${ADMIN_ROUTE}/add/teacher`;
export const ADMIN_ADD_BATCH = `${ADMIN_ROUTE}/add/batch`;
export const ADMIN_ADD_QUESTION = `${ADMIN_ROUTE}/add/question`;

export const TEACHER_ROUTE = '/teacher';
export const TEACHER_DASHBOARD = `${TEACHER_ROUTE}/dashboard`;

// Backend Endpoints
export const LOGIN_ENDPOINT = '/login/';

export const STUDENT_DASHBOARD_ENDPOINT = '/levels/';
export const STUDENT_LEVEL_ENDPOINT = '/classes/';
export const STUDENT_QUIZ_ENDPOINT = '/quiz/';
export const STUDENT_QUIZ_SUBMIT_ENDPOINT = '/quizCorrection/';
export const STUDENT_REPORT_ENDPOINT = '/report/';

export const GET_ALL_BATCHES_ENDPOINT = '/getAllBatches/';
export const GET_ALL_TEACHERS_ENDPOINT = '/getTeachers/';

export const ADD_STUDENT_ENDPOINT = '/addStudent/';
export const ADD_TEACHER_ENDPOINT = '/addTeacher/';
export const ADD_BATCH_ENDPOINT = '/addBatch/';
