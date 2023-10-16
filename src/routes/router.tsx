import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from '@layouts/DefaultLayout';
import RootLayout from '@layouts/RootLayout';
import StudentLayout from '@layouts/StudentLayout';

import HomePage from '@pages/home';
import Custom404Page from '@pages/not-found';
import LoginPage from '@pages/login';
import StudentDashboardPage from '@pages/student/dashboard';
import StudentLevelPage from '@pages/student/level';
import StudentQuizPage from '@pages/student/quiz';
import StudentTestPage from '@pages/student/test';

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
        ],
      },
      // Route: 'boltabacus.com/student' -> No Navbar & Footer
      {
        path: 'student',
        element: <StudentLayout withNavBar={false} withFooter={false} />,
        children: [
          {
            path: 'quiz/:levelId/:classId/:topicId/:quizType',
            element: <StudentQuizPage />,
          },
          {
            path: 'test/:levelId/:classId/:topicId',
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
      // Route: 'boltabacus.com' -> 404 Page
      {
        path: '*',
        element: <Custom404Page link="/" buttonText="Go Back" />,
      },
    ],
  },
]);
