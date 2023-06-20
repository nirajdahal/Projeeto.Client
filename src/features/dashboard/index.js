import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../common/headerSlice'
import BarChart from './components/BarChart'
import DashboardStats from './components/DashboardStats'
import DoughnutChart from './components/DoughnutChart'
import UserChannels from './components/UserChannels'
import dashboardService from './services/DashboardService'
function Dashboard() {
    const [priorityData, setPriorityData] = useState(null)
    const [typeData, setTypeData] = useState(null)
    const [projectManagerData, setProjectManagerData] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleProjectData = (val) => {
        const project = val
        navigate(`/app/edit-project`, { state: project })
    }
    useEffect(() => {
        const getProjectWithManager = async () => {
            const data = await dashboardService.getAllProjectWithManager()
            setProjectManagerData(data.data)
        }
        const getPriorities = async () => {
            const data = await dashboardService.getAllTaskPriorities()
            setPriorityData(data.data)
        }
        const getTypes = async () => {
            const data = await dashboardService.getAllTaskTypes()
            setTypeData(data.data)
        }
        getProjectWithManager()
        getPriorities()
        getTypes()
    }, [])
    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange}`, status: 1 }))
    }
    return (
        <>
            <div className="grid lg:grid-cols-1 mt-8  grid-cols-1 gap-6">
                <DashboardStats />
            </div>
            <div className="grid lg:grid-cols-1 mt-4  grid-cols-1 gap-6">
                {projectManagerData && <UserChannels data={projectManagerData} handleSubmit={handleProjectData} title='All Projects' />}</div>
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {priorityData && <DoughnutChart chartData={priorityData} title='Priority' />}
                {typeData && <DoughnutChart chartData={typeData} title='Task Type' />}
            </div>
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {priorityData && <BarChart chartData={priorityData} title={'Ticket Priority'} />}
                {typeData && <BarChart chartData={typeData} title={'Ticket Type'} />}
            </div>
        </>
    )
}
export default Dashboard