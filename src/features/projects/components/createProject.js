import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import authService from "../../user/services/UserService";
import projectService from "../services/ProjectService";
function CreateProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [selectedManager, setSelectedManager] = useState("")
    const [managers, setManagers] = useState([])
    useEffect(() => {
        const getManagerList = async () => {
            const data = await authService.getManagers();
            setManagers(data.data)
        }
        getManagerList()
    }, [])
    const testVaribale = 5;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, description, manager: selectedManager }
        //api call
        try {
            const response = await projectService.createProject(data)
            toast.success(response.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const handleClick = async (event) => {
        const data = { name: "1st Done development", stage: "643e1d3bc4e84b3dcdbbc70b", description: "1st done okay ", priority: "Medium", type: "Others", assignees: ['64184448444e26a02206cab2', '6436e785cf99a5e2550b3751', '643e1d01c4e84b3dcdbbc706'] }
        const response = await projectService.createProject(data)
    }
    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                </div>
                {managers && <div>
                    <label htmlFor="managers">Managers:</label>
                    <select
                        className="select select-sm"
                        id="managers"
                        defaultValue={""}
                        onChange={(e) => setSelectedManager(e.target.value)}
                    >
                        <option value="" disabled >Select</option>
                        {managers.map((manager) => (
                            <option key={manager._id} value={manager._id} >
                                {manager.name}
                            </option>
                        ))}
                    </select>
                </div>}
                <button disabled={!(name && description && managers)} type="submit">Create</button>
            </form>
            <button className="btn btn-primary" onClick={handleClick}>Hello</button>
        </div>
    );
}
export default CreateProject;