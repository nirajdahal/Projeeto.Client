import React from 'react'
import projectService from '../../features/projects/services/ProjectService'
const handleClick = async () => {
    await projectService.getAllTeamProjects()
}
const ProjectList = () => {
    return (
        <>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-success">
                        <div className="avatar ">
                            <div className="w-16 rounded-full">
                                <img src="http://pngfind.com/pngs/m/39-398179_construction-workers-avatar-contractor-man-person-user-icon.png" />
                            </div>
                        </div>
                    </div>
                    <div className="stat-value">Manager</div>
                    <div className="stat-title">Niraj Dahal</div>
                    <div className="stat-desc text-success">Managing This Project</div>
                </div>
                <div className="stat">
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-success">31 tasks remaining</div>
                </div>
                <div className="stat">
                    <div className="stat-value">Mine</div>
                    <div className="stat-title">2  Task</div>
                    <div className="stat-desc text-success">UI Tasks</div>
                </div>
                <div className="stat">
                    <div className="stat-value">UI Development</div>
                    <div className="stat-desc text-success"><button onClick={() => handleClick()} className='btn btn-dark btn-wide mt-3'>View</button></div>
                </div>
            </div>
        </>
    )
}
export default ProjectList