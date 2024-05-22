import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from '@layouts/DefaultLayout';
import RootLayout from '@layouts/RootLayout';
import StudentLayout from '@layouts/StudentLayout';
import AdminLayout from '@layouts/AdminLayout';
import SubAdminLayout from '@layouts/SubAdminLayout';
import TeacherLayout from '@layouts/TeacherLayout';

import HomePage from '@pages/home';
import Custom404Page from '@pages/not-found';
import ProfilePage from '@pages/profile';
import LoginPage from '@pages/login';
import ResetPasswordPage from '@pages/reset-password';
import ResetPasswordPageV2 from '@pages/reset-password-v2';
import ForgotPasswordPage from '@pages/forgot-password';
import StudentDashboardPage from '@pages/student/dashboard';
import StudentLevelPage from '@pages/student/level';
import StudentQuizPage from '@pages/student/quiz';
import StudentTestPage from '@pages/student/test';
import StudentReportPage from '@pages/student/report';
import StudentProgressPage from '@pages/student/student-progress';
import AdminDashboardPage from '@pages/admin/dashboard';
import AdminAddTeacherPage from '@pages/admin/add-teacher';
import AdminAddSubAdminPage from '@pages/admin/add-sub-admin';
import AdminAddOrganizationPage from '@pages/admin/add-organization';
import AdminAddStudentPage from '@pages/admin/add-student';
import AdminViewAllBatchesPage from '@pages/admin/all-batches';
import AdminEditBatchPage from '@pages/admin/edit-batch';
import AdminAddBatchPage from '@pages/admin/add-batch';
import AdminAddQuestionPage from '@pages/admin/add-question';
import AdminBulkAddQuestionsPage from '@pages/admin/bulk-add-questions';
import AdminEditQuestionPage from '@pages/admin/edit-question';
import AdminViewQuizPage from '@pages/admin/view-quiz';
import AdminViewOrganizationPage from '@pages/admin/view-organization';
import SubAdminDashboardPage from '@pages/sub-admin/dashboard';
import SubAdminAddBatchPage from '@pages/sub-admin/add-batch';
import SubAdminAddStudentPage from '@pages/sub-admin/add-student';
import SubAdminAddTeacherPage from '@pages/sub-admin/add-teacher';
import SubAdminViewAllBatchesPage from '@pages/sub-admin/all-batches';
import SubAdminEditBatchPage from '@pages/sub-admin/edit-batch';
import TeacherDashboardPage from '@pages/teacher/dashboard';
import TeacherUpdateLinkPage from '@pages/teacher/update-link';
import TeacherBatchReportPage from '@pages/teacher/report';
import TeacherStudentProgressPage from '@pages/teacher/student-progress';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      // Route: 'boltabacus.com/' -> With Navbar & Footer
      {
        path: '',
        element: <RootLayout withNavBar withFooter />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
      // Route: 'boltabacus.com/login' -> With Navbar only
      {
        path: 'login',
        element: <RootLayout withNavBar withFooter={false} />,
        children: [
          {
            path: '',
            element: <LoginPage />,
          },
        ],
      },
      // Route: 'boltabacus.com/reset-password' -> With Navbar only
      {
        path: 'reset-password',
        element: <RootLayout withNavBar withFooter={false} />,
        children: [
          {
            path: '',
            element: <ResetPasswordPage />,
          },
        ],
      },
      // Route: 'boltabacus.com/reset-password/v2' -> With Navbar only
      {
        path: 'resetPassword/v2/:authToken',
        element: <RootLayout withNavBar withFooter={false} />,
        children: [
          {
            path: '',
            element: <ResetPasswordPageV2 />,
          },
        ],
      },
      // Route: 'boltabacus.com/forgot-password' -> With Navbar only
      {
        path: 'forgot-password',
        element: <RootLayout withNavBar withFooter={false} />,
        children: [
          {
            path: '',
            element: <ForgotPasswordPage />,
          },
        ],
      },
      // Route: 'boltabacus.com/student' -> With Navbar & Footer
      {
        path: 'student',
        element: <StudentLayout withNavBar withFooter />,
        children: [
          {
            path: '',
            element: <StudentDashboardPage />,
          },
          {
            path: 'dashboard',
            element: <StudentDashboardPage />,
          },
          {
            path: 'level/:levelId',
            element: <StudentLevelPage />,
          },
          {
            path: 'report/:levelId/:classId',
            element: <StudentReportPage />,
          },
          {
            path: 'progress',
            element: <StudentProgressPage />,
          },
        ],
      },
      // Route: 'boltabacus.com/student' -> No Navbar & Footer
      {
        path: 'student',
        element: <StudentLayout withNavBar withFooter={false} />,
        children: [
          {
            path: 'quiz/:levelId/:classId/:topicId/:quizType',
            element: <StudentQuizPage />,
          },
          {
            path: 'test/:levelId/:classId',
            element: <StudentTestPage />,
          },
          {
            path: '*',
            element: (
              <Custom404Page
                link="/student/dashboard"
                buttonText="Go to Dashboard"
              />
            ),
          },
        ],
      },
      // Route: 'boltabacus.com/admin'
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <AdminDashboardPage />,
          },
          {
            path: 'dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: 'add/student',
            element: <AdminAddStudentPage />,
          },
          {
            path: 'add/teacher',
            element: <AdminAddTeacherPage />,
          },
          {
            path: 'add/sub-admin',
            element: <AdminAddSubAdminPage />,
          },
          {
            path: 'add/batch',
            element: <AdminAddBatchPage />,
          },
          {
            path: 'edit/batch/:batchId',
            element: <AdminEditBatchPage />,
          },
          {
            path: 'all/batch',
            element: <AdminViewAllBatchesPage />,
          },
          {
            path: 'view/organization',
            element: <AdminViewOrganizationPage />,
          },
          {
            path: 'view/quiz',
            element: <AdminViewQuizPage />,
          },
          {
            path: 'add/question',
            element: <AdminAddQuestionPage />,
          },
          {
            path: 'add/question/bulk',
            element: <AdminBulkAddQuestionsPage />,
          },
          {
            path: 'add/organization',
            element: <AdminAddOrganizationPage />,
          },
          {
            path: 'edit/question/:questionId',
            element: <AdminEditQuestionPage />,
          },
          {
            path: '*',
            element: (
              <Custom404Page
                link="/admin/dashboard"
                buttonText="Go to Dashboard"
              />
            ),
          },
        ],
      },
      // Route: 'boltabacus.com/sub-admin'
      {
        path: 'sub-admin',
        element: <SubAdminLayout />,
        children: [
          {
            path: '',
            element: <SubAdminDashboardPage />,
          },
          {
            path: 'dashboard',
            element: <SubAdminDashboardPage />,
          },
          {
            path: 'add/batch',
            element: <SubAdminAddBatchPage />,
          },
          {
            path: 'add/student',
            element: <SubAdminAddStudentPage />,
          },
          {
            path: 'add/teacher',
            element: <SubAdminAddTeacherPage />,
          },
          {
            path: 'all/batch',
            element: <SubAdminViewAllBatchesPage />,
          },
          {
            path: 'edit/batch/:batchId',
            element: <SubAdminEditBatchPage />,
          },
          {
            path: '*',
            element: (
              <Custom404Page
                link="/sub-admin/dashboard"
                buttonText="Go to Dashboard"
              />
            ),
          },
        ],
      },
      // Route: 'boltabacus.com/teacher'
      {
        path: 'teacher',
        element: <TeacherLayout />,
        children: [
          {
            path: '',
            element: <TeacherDashboardPage />,
          },
          {
            path: 'dashboard',
            element: <TeacherDashboardPage />,
          },
          {
            path: 'update-link/:batchId',
            element: <TeacherUpdateLinkPage />,
          },
          {
            path: 'report/:batchId',
            element: <TeacherBatchReportPage />,
          },
          {
            path: 'student-progress/:studentId',
            element: <TeacherStudentProgressPage />,
          },
        ],
      },
      // Route: 'boltabacus.com' -> 404 Page
      {
        path: '*',
        element: <Custom404Page link="/" buttonText="Go Back" />,
      },
    ],
  },
]);
