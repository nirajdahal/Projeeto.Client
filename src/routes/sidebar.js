/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
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
    path: '', // url
    icon: <ChartBarIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Projects', // name that appear in Sidebar
    isAccessible: ['admin', 'team', 'manager', 'user'],
    submenu: [
      {
        path: '/app/kanban', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Show Projects', // name that appear in Sidebar
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/project-list',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'All Project',
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/create-project',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Create Project',
        isAccessible: ['admin', 'manager', 'team']
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Edit Project',
        isAccessible: ['admin', 'manager', 'team']
      }]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
    name: 'Settings', // name that appear in Sidebar
    isAccessible: ['admin', 'manager', 'team', 'user'],
    submenu: [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses} />, // icon component
        name: 'Profile', // name that appear in Sidebar
        isAccessible: ['admin', 'manager', 'team', 'user']
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
]
export default routes
