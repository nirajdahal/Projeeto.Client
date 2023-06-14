import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BASE_URL;
const API_URL = `${BACKEND_URL}/api`;
// Projects
// Get getProject 
const getProject = async (id) => {
    const response = await axios.get(API_URL + "/projects/" + id);
    return response.data;
}
// Get getProjects 
const getAllProjects = async (id) => {
    const response = await axios.get(API_URL + "/projects");
    return response.data;
}
// Create project
const createProject = async (data) => {
    const response = await axios.post(API_URL + "/projects", data);
    return response.data;
}
//Stages
// Get getStagesByProjectId 
const getStages = async (id) => {
    const response = await axios.get(API_URL + "/projects/" + id + '/stages');
    return response.data;
}
//Tasks
// Move task to another stage
const updateTaskToNewStage = async (paramIds, data) => {
    const response = await axios.put(`${API_URL}/stages/${paramIds.stageId}/tasks/${paramIds.id}/newStage`, data);
    return response.data;
}
// Reorder tasks within a stage
const reorderTaskWithinStage = async (paramIds, data) => {
    const response = await axios.put(`${API_URL}/stages/${paramIds.stageId}/tasks/${paramIds.id}/reorder`, data);
    return response.data;
}
// Reorder tasks within a stage
const getTaskById = async (paramIds) => {
    const response = await axios.get(`${API_URL}/stages/${paramIds.stageId}/tasks/${paramIds.id}`);
    return response.data;
}
// Create task
const createTask = async (stageId, data) => {
    const response = await axios.post(`${API_URL}/stages/${stageId}/tasks`, data);
    return response.data;
}
//Update Task
const updateTask = async (paramIds, data) => {
    const response = await axios.put(`${API_URL}/stages/${paramIds.stageId}/tasks/${paramIds.id}`, data)
    return response.data;
}
//Update Task
const deleteTask = async (paramIds) => {
    const response = await axios.delete(`${API_URL}/stages/${paramIds.stageId}/tasks/${paramIds.id}`)
    return response.data;
}
const projectService = {
    getAllProjects,
    getProject,
    createProject,
    getStages,
    updateTaskToNewStage,
    reorderTaskWithinStage,
    updateTask,
    deleteTask,
    createTask,
    getTaskById
};
export default projectService;