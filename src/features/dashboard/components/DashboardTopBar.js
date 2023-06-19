import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon'
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon'
import ShareIcon from '@heroicons/react/24/outline/ShareIcon'
const periodOptions = [
    { name: "Today", value: "TODAY" },
    { name: "Yesterday", value: "YESTERDAY" },
    { name: "This Week", value: "THIS_WEEK" },
    { name: "Last Week", value: "LAST_WEEK" },
    { name: "This Month", value: "THIS_MONTH" },
    { name: "Last Month", value: "LAST_MONTH" },
]
function DashboardTopBar({ updateDashboardPeriod }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
            </div>
            <div className="text-right ">
                <button className="btn btn-ghost btn-sm normal-case"><ArrowPathIcon className="w-4 mr-2" />Refresh Data</button>
                <button className="btn btn-ghost btn-sm normal-case  ml-2"><ShareIcon className="w-4 mr-2" />Share</button>
                <div className="dropdown dropdown-bottom dropdown-end  ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><EllipsisVerticalIcon className="w-5" /></label>
                    <ul tabIndex={0} className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a><EnvelopeIcon className="w-4" />Email Digests</a></li>
                        <li><a><ArrowDownTrayIcon className="w-4" />Download</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DashboardTopBar