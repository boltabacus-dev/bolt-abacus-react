import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from '@layouts/DefaultLayout';
import RootLayout from '@layouts/RootLayout';
import StudentLayout from '@layouts/StudentLayout';
import AdminLayout from '@layouts/AdminLayout';
import TeacherLayout from '@layouts/TeacherLayout';

import HomePage from '@pages/home';
import Custom404Page from '@pages/not-found';
import ProfilePage from '@pages/profile';
import LoginPage from '@pages/login';
import ResetPasswordPage from '@pages/reset-password';
import StudentDashboardPage from '@pages/student/dashboard';
import StudentLevelPage from '@pages/student/level';
import StudentQuizPage from '@pages/student/quiz';
import StudentTestPage from '@pages/student/test';
import StudentReportPage from '@pages/student/report';
import AdminDashboardPage from '@pages/admin/dashboard';
import AdminAddTeacherPage from '@pages/admin/add-teacher';
import AdminAddStudentPage from '@pages/admin/add-student';
import AdminAddBatchPage from '@pages/admin/add-batch';
import AdminAddQuestionPage from '@pages/admin/add-question';
import AdminEditQuestionPage from '@pages/admin/edit-question';
import AdminViewQuizPage from '@pages/admin/view-quiz';
import TeacherDashboardPage from '@pages/teacher/dashboard';
import TeacherUpdateLinkPage from '@pages/teacher/update-link';

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
            path: 'add/batch',
            element: <AdminAddBatchPage />,
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
