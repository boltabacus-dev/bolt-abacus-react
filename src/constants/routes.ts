// Frontend Routes
export const HOME_PAGE = '/';
export const ABOUT_SECTION = '/#about';
export const SERVICES_SECTION = '/#pricing';
export const CONTACT_SECTION = '/#footer';

export const PROFILE_PAGE = '/profile';
export const RESET_PASSWORD_PAGE = '/reset-password';
export const FORGOT_PASSWORD_PAGE = '/forgot-password';
export const LOGIN_PAGE = '/login';

export const STUDENT_ROUTE = '/student';
export const STUDENT_DASHBOARD = `${STUDENT_ROUTE}/dashboard`;
export const STUDENT_LEVEL = `${STUDENT_ROUTE}/level`;
export const STUDENT_PRACTICE = `${STUDENT_ROUTE}/practice`;
export const STUDENT_PROGRESS = `${STUDENT_ROUTE}/progress`;

export const ADMIN_ROUTE = '/admin';
export const ADMIN_DASHBOARD = `${ADMIN_ROUTE}/dashboard`;
export const ADMIN_ADD_STUDENT = `${ADMIN_ROUTE}/add/student`;
export const ADMIN_BULK_ADD_STUDENT = `${ADMIN_ROUTE}/add/student/bulk`;
export const ADMIN_ADD_TEACHER = `${ADMIN_ROUTE}/add/teacher`;
export const ADMIN_SUB_ADMIN_TEACHER = `${ADMIN_ROUTE}/add/sub-admin`;
export const ADMIN_ADD_BATCH = `${ADMIN_ROUTE}/add/batch`;
export const ADMIN_EDIT_BATCH = `${ADMIN_ROUTE}/edit/batch`;
export const ADMIN_ALL_BATCH = `${ADMIN_ROUTE}/all/batch`;
export const ADMIN_ADD_QUESTION = `${ADMIN_ROUTE}/add/question`;
export const ADMIN_ADD_ORGANIZATION = `${ADMIN_ROUTE}/add/organization`;
export const ADMIN_VIEW_ORGANIZATION = `${ADMIN_ROUTE}/view/organization`;
export const ADMIN_EDIT_ORGANIZATION = `${ADMIN_ROUTE}/edit/organization`;
export const ADMIN_BULK_ADD_QUESTION = `${ADMIN_ROUTE}/add/question/bulk`;
export const ADMIN_EDIT_QUESTION = `${ADMIN_ROUTE}/edit/question`;
export const ADMIN_VIEW_QUIZ = `${ADMIN_ROUTE}/view/quiz`;

export const SUB_ADMIN_ROUTE = '/sub-admin';
export const SUB_ADMIN_DASHBOARD = `${SUB_ADMIN_ROUTE}/dashboard`;
export const SUB_ADMIN_ADD_STUDENT = `${SUB_ADMIN_ROUTE}/add/student`;
export const SUB_ADMIN_BULK_ADD_STUDENT = `${SUB_ADMIN_ROUTE}/add/student/bulk`;
export const SUB_ADMIN_ADD_TEACHER = `${SUB_ADMIN_ROUTE}/add/teacher`;
export const SUB_ADMIN_ADD_BATCH = `${SUB_ADMIN_ROUTE}/add/batch`;
export const SUB_ADMIN_ALL_BATCH = `${SUB_ADMIN_ROUTE}/all/batch`;
export const SUB_ADMIN_EDIT_BATCH = `${SUB_ADMIN_ROUTE}/edit/batch`;

export const TEACHER_ROUTE = '/teacher';
export const TEACHER_DASHBOARD = `${TEACHER_ROUTE}/dashboard`;
export const TEACHER_UPDATE_LINK = `${TEACHER_ROUTE}/update-link`;
export const TEACHER_BATCH_REPORT = `${TEACHER_ROUTE}/report`;
export const TEACHER_STUDENT_PROGRESS = `${TEACHER_ROUTE}/student-progress`;
export const TEACHER_STUDENTS = `${TEACHER_ROUTE}/students`;

// Backend Endpoints
export const LOGIN_ENDPOINT = '/login/';
export const RESET_PASSWORD_ENDPOINT = '/resetPassword/';
export const FORGOT_PASSWORD_ENDPOINT = '/forgotPassword/';

export const ADD_STUDENT_ENDPOINT = '/addStudent/';
export const BULK_ADD_STUDENT_ENDPOINT = '/bulkAddStudents/';
export const STUDENT_DASHBOARD_ENDPOINT = '/levels/';
export const STUDENT_LEVEL_ENDPOINT = '/classes/';
export const STUDENT_QUIZ_ENDPOINT = '/quiz/';
export const STUDENT_QUIZ_SUBMIT_ENDPOINT = '/quizCorrection/';
export const STUDENT_REPORT_ENDPOINT = '/report/';
export const STUDENT_PROGRESS_ENDPOINT = '/getStudentProgressStudent/';

export const GET_LEVEL_SCHEMA_ENDPOINT = '/getTopicsData/';
export const GET_ALL_QUIZ_QUESTIONS_ENDPOINT = '/getAllQuestions/';

export const GET_QUESTION_ENDPOINT = '/getQuestion/';
export const ADD_QUESTION_ENDPOINT = '/addQuestion/';
export const BULK_ADD_QUESTION_ENDPOINT = '/bulkAddQuestions/';
export const EDIT_QUESTION_ENDPOINT = '/editQuestion/';

export const GET_ALL_TEACHERS_ENDPOINT = '/getTeachers/';
export const ADD_TEACHER_ENDPOINT = '/addTeacher/';

export const GET_ALL_BATCHES_ENDPOINT = '/getAllBatches/';
export const GET_BATCH_ENDPOINT = '/getBatch/';
export const ADD_BATCH_ENDPOINT = '/addBatch/';
export const EDIT_BATCH_ENDPOINT = '/editBatch/';

export const GET_ALL_TEACHER_BATCHES_ENDPOINT = '/getTeacherBatches/';
export const UPDATE_BATCH_LINK_ENDPOINT = '/updateBatchLink/';
export const UPDATE_CLASS_ENDPOINT = '/updateClass/';
export const GET_BATCH_REPORT_ENDPOINT = '/getClassReport/';
export const GET_STUDENT_PROGRESS_ENDPOINT = '/getStudentProgress/';
export const GET_BATCH_STUDENTS_ENDPOINT = '/getStudents/';

export const ADD_SUB_ADMIN_ENDPOINT = '/addSubAdmin/';

export const GET_ALL_TAG_NAMES_ENDPOINT = '/getAllTags/';
export const GET_TAG_DETAILS_ENDPOINT = '/getTagDetails/';
export const ADD_TAG_ENDPOINT = '/addTag/';
export const EDIT_TAG_ENDPOINT = '/updateTagDetails/';
