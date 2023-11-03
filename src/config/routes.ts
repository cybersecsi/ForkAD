interface IGenericReactRoute {
  BASE_ROUTE: string;
}

interface IAdminRoutes extends IGenericReactRoute {
  TASK_ROUTE: string;
  CREATE_TASK_ROUTE: string;
  TEAM_ROUTE: string;
  CREATE_TEAM_ROUTE: string;
  TEAM_TASK_LOG_ROUTE: string;
}

interface IPublicRoutes extends IGenericReactRoute {
  TEAM_ROUTE: string;
  LOGIN_ROUTE: string;
  RULES_ROUTE: string;
}

export const ADMIN_REACT_ROUTES: IAdminRoutes = {
  BASE_ROUTE: '/',
  TASK_ROUTE: '/task',
  CREATE_TASK_ROUTE: '/create-task',
  TEAM_ROUTE: '/team',
  CREATE_TEAM_ROUTE: '/create-team',
  TEAM_TASK_LOG_ROUTE: '/team-task-log',
};

export const PUBLIC_REACT_ROUTES: IPublicRoutes = {
  BASE_ROUTE: '/',
  TEAM_ROUTE: '/team',
  LOGIN_ROUTE: '/login',
  RULES_ROUTE: '/rules',
};
