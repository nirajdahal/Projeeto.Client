// All components mapping with path for internal routes
import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Kanban = lazy(() => import('../pages/protected/Kanban'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const ProjectCreation = lazy(() => import('../pages/protected/ProjectCreation'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Team = lazy(() => import('../pages/protected/Team'))
const ChangePassword = lazy(() => import('../pages/protected/ChangePassword'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard,
    isAccessible: ['admin', 'manager', 'team'] // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome,
    isAccessible: ['admin', 'manager', 'team', "user"] // view rendered
  },
  {
    path: '/leads',
    component: Leads,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/settings-team',
    component: Team,
    isAccessible: ['admin']
  },
  {
    path: '/change-password',
    component: ChangePassword,
    isAccessible: ['user', 'admin', 'team', 'manager']
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
    isAccessible: ['user', 'admin', 'team', 'manager']
  },
  {
    path: '/kanban',
    component: Kanban,
    isAccessible: ['user', 'admin', 'team', 'manager']
  },
  {
    path: '/settings-billing',
    component: Bills,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/create-project',
    component: ProjectCreation,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/getting-started',
    component: GettingStarted,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/features',
    component: DocFeatures,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/components',
    component: DocComponents,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/integration',
    component: Integration,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/charts',
    component: Charts,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/404',
    component: Page404,
    isAccessible: ['admin', 'manager']
  },
  {
    path: '/blank',
    component: Blank,
    isAccessible: ['admin', 'manager']
  },
]
export default routes
