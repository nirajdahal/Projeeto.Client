/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
    isAccessible: ['admin', 'manager', 'team']
  },
  {
    path: '/app/leads', // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: 'Leads', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team']
  },
  {
    path: '/app/charts', // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: 'Charts', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team']
  },
  {
    path: '/app/kanban', // url
    icon: <ChartBarIcon className={iconClasses} />, // icon component
    name: 'Kanban', // name that appear in Sidebar
    isAccessible: ['admin', 'team', 'manager', 'user']
  },
  {
    path: '/app/integration', // url
    icon: <BoltIcon className={iconClasses} />, // icon component
    name: 'Integration', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team']
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Pages', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team', 'user'],
    submenu: [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: 'Login',
        isAccessible: ['admin', 'manager', 'team', 'user']
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Register', // name that appear in Sidebar
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses} />,
        name: 'Forgot Password',
        isAccessible: ['admin', 'manager', 'team', , 'user']
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: 'Blank Page',
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: '404',
        isAccessible: ['admin', 'manager', 'team']
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Settings', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team'],
    submenu: [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Profile', // name that appear in Sidebar
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Billing',
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/change-password',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Change Password',
        isAccessible: ['admin', 'manager', 'team', 'user']
      },
      {
        path: '/app/create-project',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Project',
        isAccessible: ['admin', 'manager', 'team', 'user']
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: 'Team Members', // name that appear in Sidebar
        isAccessible: ['admin']
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Documentation', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team'],
    submenu: [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
        name: 'Getting Started', // name that appear in Sidebar
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses} />,
        name: 'Features',
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
        name: 'Components',
        isAccessible: ['admin', 'manager', 'team']
      }
    ]
  },
]
export default routes
