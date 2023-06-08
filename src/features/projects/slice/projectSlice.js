import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import projectService from "../services/ProjectService";
const initialState = {
    project: {},
    stages: [],
    task: {},
    updatedTask: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
const setErrorFromResponse = (error) => {
    let message = ""
    if (error.response) {
        message = error.response.data.message
    }
    else {
        message = error.message
    }
    return message
}
// create Project
export const createProject = createAsyncThunk(
    "project/create",
    async (data, thunkAPI) => {
        try {
            return await projectService.createProject(data);
        } catch (error) {
            const message = setErrorFromResponse(error)
            return thunkAPI.rejectWithValue(message)
        }
    }
);
// Get stages By Project Id
export const getStages = createAsyncThunk("project/getStages", async (projectId, thunkAPI) => {
    try {
        return await projectService.getStages(projectId)
    } catch (error) {
        const message = setErrorFromResponse(error)
        return thunkAPI.rejectWithValue(message);
    }
});
// Get stages By Project Id
export const updateTask = createAsyncThunk(
    "project/updateTask",
    async ({ paramIds, data }, thunkAPI) => {
        try {
            console.log("lets look at the data", paramIds, data)
            return await projectService.updateTask(paramIds, data);
        } catch (error) {
            const message = setErrorFromResponse(error)
            return thunkAPI.rejectWithValue(message);
        }
    }
);
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        RESET(state) {
            state.project = {}
            state.stages = []
            state.task = {}
            state.updatedTask = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(getStages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStages.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stages = action.payload.data
                state.message = action.payload.message
                toast.success("All tasks")
            })
            .addCase(getStages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.updatedTask = action.payload
                state.message = action.payload.message
                toast.success("Updated Task Succesfully")
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    },
})
export const { RESET } =
    projectSlice.actions;
// export const selectUser = (state) => state.project.user;
export default projectSlice.reducer;
