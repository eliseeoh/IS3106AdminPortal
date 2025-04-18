import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { UserDetailView } from 'src/sections/userDetail/view';
import { UserHistoryView } from 'src/sections/userHistory';
import AdminPage from 'src/pages/admin';
import AdminDetailPage from 'src/pages/admin-detail';
import WydProcessesPage from 'src/pages/wyd-processes';
import GalleryPage from 'src/pages/business-gallery';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const BusinessPage = lazy(() => import('src/pages/business'));
export const UserDetailPage = lazy(() => import('src/pages/user-detail'));
export const BusinessDetailPage = lazy(() => import('src/pages/business-detail'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const BookingBusinessPage = lazy(() => import('src/pages/bookings_business'));
export const BookingUserPage = lazy(() => import('src/pages/bookings_user'));
export const CreateAdminPage = lazy(() => import('src/pages/create-new-admin'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/sign-in" replace />,
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'home', element: <HomePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'user/:userId', element: <UserDetailPage /> },
        { path: 'user/:userId/bookings', element: <BookingUserPage /> },
        { path: 'business', element: <BusinessPage /> },
        { path: 'business/:businessId/gallery', element: <GalleryPage /> },
        { path: 'business/:businessId/bookings', element: <BookingBusinessPage /> },
        { path: 'business/:businessId', element: <BusinessDetailPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'userHistory/:userId', element: <UserHistoryView /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'admin/:adminId', element: <AdminDetailPage /> },
        { path: 'admin/create', element: <CreateAdminPage />},
        { path: 'processes', element: <WydProcessesPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
