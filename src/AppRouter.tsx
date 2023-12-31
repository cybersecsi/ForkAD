import { createBrowserRouter, Outlet, redirect, RouteObject } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Header, Content } from '@/layout';
import {
  Login,
  Scoreboard,
  Admin,
  TaskAdmin,
  TeamAdmin,
  TeamScoreboard,
  TeamTaskLog,
  NoMatch,
  Error,
  Rules,
  NotStarted,
} from '@/views';
import { ADMIN_REACT_ROUTES, PUBLIC_REACT_ROUTES } from '@/config';
import { removeSlash } from '@/utils/helpers';
import { AdminRESTManagerInstance } from '@/rest';
import { useCtf } from '@/context';
import { Loading } from '@/components';
import { CtfStatus } from '@/types';

const userLoader = async (): Promise<boolean> => {
  try {
    await AdminRESTManagerInstance.getStatus();
    return true;
  } catch {
    return false;
  }
};

const routeLoader = async (redirectEndpoint: string) => {
  const isLoggedIn = await userLoader();
  if (!isLoggedIn) {
    return redirect(redirectEndpoint);
  }
  return null;
};

const NoMatchElement = () => {
  return <NoMatch />;
};

const DefaultLayout = () => {
  const { ctfStatus } = useCtf();

  if (ctfStatus === CtfStatus.LOADING) {
    return <Loading />;
  }

  if (ctfStatus === CtfStatus.WAITING) {
    return <NotStarted />;
  }

  return (
    <ErrorBoundary fallback={<Error />}>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </ErrorBoundary>
  );
};

const PublicRouteObjects: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: removeSlash(PUBLIC_REACT_ROUTES.BASE_ROUTE),
        element: <Scoreboard />,
      },
      {
        path: removeSlash(`${PUBLIC_REACT_ROUTES.TEAM_ROUTE}/:teamId`),
        element: <TeamScoreboard />,
      },
      {
        path: removeSlash(PUBLIC_REACT_ROUTES.RULES_ROUTE),
        element: <Rules />,
      },
      {
        path: removeSlash(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
        element: <Login />,
        loader: async () => {
          const isLoggedIn = await userLoader();
          if (isLoggedIn) {
            return redirect('/admin');
          } else {
            return null;
          }
        },
      },
    ],
  },
];

const AdminRouteObjects: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: removeSlash(ADMIN_REACT_ROUTES.BASE_ROUTE),
        element: <Admin />,
      },
      {
        path: removeSlash(`${ADMIN_REACT_ROUTES.TASK_ROUTE}/:taskId`),
        element: <TaskAdmin />,
        loader: async () => await routeLoader(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
      },
      {
        path: removeSlash(ADMIN_REACT_ROUTES.CREATE_TASK_ROUTE),
        element: <TaskAdmin />,
        loader: async () => await routeLoader(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
      },
      {
        path: removeSlash(`${ADMIN_REACT_ROUTES.TEAM_ROUTE}/:teamId`),
        element: <TeamAdmin />,
        loader: async () => await routeLoader(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
      },
      {
        path: removeSlash(ADMIN_REACT_ROUTES.CREATE_TEAM_ROUTE),
        element: <TeamAdmin />,
        loader: async () => await routeLoader(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
      },
      {
        path: removeSlash(`${ADMIN_REACT_ROUTES.TEAM_TASK_LOG_ROUTE}/team/:teamId/task/:taskId`),
        element: <TeamTaskLog />,
        loader: async () => await routeLoader(PUBLIC_REACT_ROUTES.LOGIN_ROUTE),
      },
    ],
  },
];

export const AppRouter = createBrowserRouter([
  {
    path: PUBLIC_REACT_ROUTES.BASE_ROUTE,
    children: PublicRouteObjects,
  },
  {
    path: '/admin',
    children: AdminRouteObjects,
  },
  { path: '*', element: <NoMatchElement /> },
]);
