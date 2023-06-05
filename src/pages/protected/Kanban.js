import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import projectService from "../../features/projects/services/ProjectService";
import { getStages, RESET } from "../../features/projects/slice/projectSlice";
import { configColor } from "../../features/projects/utils/ConfigColor";
function App() {
    const dispatch = useDispatch()
    const [boards, setBoards] = useState([
        {
            _id: "board-1",
            name: "To Do",
            tasks: [
                { _id: "task-1", name: "Buy milk" },
                { _id: "task-2", name: "Buy eggs" },
            ],
        },
        {
            _id: "board-2",
            name: "In Progress",
            tasks: [
                { _id: "task-3", name: "Do laundry" },
                { _id: "task-4", name: "Clean room" },
            ],
        },
        {
            _id: "board-3",
            name: "Done",
            tasks: [{ _id: "task-5", name: "Finish project" }],
        },
    ]);
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [tasktoEdit, setTaskToEdit] = useState({})
    const { stages } = useSelector(
        (state) => state.project
    )
    useEffect(() => {
        const getStagesFunc = async () => {
            const response = await projectService.getStages("643d7089186ee682aa473673")
            console.log(response)
            setBoards(response.data)
        }
        getStagesFunc()
    }, [])
    useEffect(() => {
        console.log(stages)
        setBoards(stages)
    }, [stages])
    const handleDragEnd = async ({ source, destination }) => {
        if (!destination) {
            return;
        }
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }
        const sourceBoard = boards.find((board) => board._id === source.droppableId);
        const destinationBoard = boards.find(
            (board) => board._id === destination.droppableId
        );
        const task = sourceBoard.tasks[source.index]
        console.log("task dragged", task)
        sourceBoard.tasks.splice(source.index, 1);
        destinationBoard.tasks.splice(destination.index, 0, task);
        setBoards([...boards])
        // reordering in a same stage
        if (destinationBoard._id === sourceBoard._id) {
            const data = {
                newPosition: destination.index
            }
            const paramIds = {
                projectId: "643d7089186ee682aa473673",
                stageId: sourceBoard._id,
                id: task._id
            }
            await projectService.reorderTaskWithinStage(paramIds, data)
        }
        // reordering in a same stage
        if (destinationBoard._id !== sourceBoard._id) {
            const data = {
                toStageId: destinationBoard._id,
                newOrder: destination.index
            }
            const paramIds = {
                stageId: sourceBoard._id,
                id: task._id
            }
            console.log("newPosition", destination.index)
            await projectService.updateTaskToNewStage(paramIds, data)
        }
    };
    const handleAddTask = (boardId) => {
        const taskName = prompt("Enter task name:");
        if (taskName) {
            const boardIndex = boards.findIndex((board) => board._id === boardId);
            setBoards((prevState) => {
                const newBoards = [...prevState];
                newBoards[boardIndex].tasks.unshift({
                    _id: `task-${Date.now()}`,
                    name: taskName,
                });
                return newBoards;
            });
        }
    };
    const handleEditTask = (boardId, task) => {
        setShowEditComponent(true)
        setTaskToEdit(task)
        // const boardIndex = boards.findIndex((board) => board._id === boardId);
        // const taskIndex = boards[boardIndex].tasks.findIndex(
        //     (task) => task._id === taskId
        // );
        // setBoards((prevState) => {
        //     const newBoards = [...prevState];
        //     newBoards[boardIndex].tasks[taskIndex].name = newName;
        //     return newBoards;
        // });
    };
    const handleDeleteTask = (boardId, taskId) => {
        const boardIndex = boards.findIndex((board) => board._id === boardId);
        setBoards((prevState) => {
            const newBoards = [...prevState];
            newBoards[boardIndex].tasks = newBoards[boardIndex].tasks.filter(
                (task) => task._id !== taskId
            );
            return newBoards;
        });
    };
    const handleAddBoard = () => {
        const boardName = prompt("Enter board name:");
        if (boardName) {
            setBoards((prevState) => [
                ...prevState,
                {
                    _id: `board-${Date.now()}`,
                    name: boardName,
                    tasks: [],
                },
            ]);
        }
    };
    const closeModal = () => {
        setShowEditComponent(false)
    }
    if (!showEditComponent) {
        return (
            <div className="min-h-screen bg-base-100">
                <header className=" shadow-lg py-1 px-8">
                    <button className="btn btn-base" onClick={handleAddBoard}>
                        + Add Board
                    </button>
                </header>
                <div className="flex p-6 overflow-x-auto ">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {boards.map((board) => (
                            <div
                                key={board._id}
                                className=" shadow-lg rounded-lg w-80 h-96 mx-1 my-1 flex-shrink-0"
                            >
                                <div className="flex items-center justify-between px-4 bg-neutral " >
                                    <h2 className="font-semibold ">{board.name} <span className="text-success" >{board.tasks.length}</span> </h2>
                                    <button
                                        className="btn "
                                        style={{ backgroundColor: board.color }}
                                        onClick={() => handleAddTask(board._id)}
                                    >
                                        + Add
                                    </button>
                                </div>
                                <Droppable droppableId={board._id}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`${snapshot.isDraggingOver ? "bg-base-200" : ""
                                                } flex-grow p-2 h-80 overflow-y-auto`} {...provided.droppableProps}
                                            ref={provided.innerRef}>{board.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task._id}
                                                    draggableId={task._id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className={`${snapshot.isDragging ? "opacity-75" : ""
                                                                } px-4 py-2 mb-2  rounded-md shadow-lg`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className="flex">
                                                                <div className="flex-2">
                                                                    {
                                                                        task.type && <div className={`badge ${configColor(task.type[0])} badge-outline mr-2`} >{task.type[0]}</div>
                                                                    }
                                                                    {
                                                                        task.type && <div className={`badge ${configColor(task.priority[0])} badge-outline mr-2`}>{task.priority[0]} </div>
                                                                    }
                                                                </div>
                                                                <div className="flex-1 justify-end avatar-group -space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="w-5">
                                                                            <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="w-5">
                                                                            <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="w-5">
                                                                            <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar placeholder">
                                                                        <div className="w-5 bg-neutral-focus text-neutral-content">
                                                                            <span className="text-xs">+9</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="task-title">
                                                                <p className="mt-4">{task.name.substring(0, 32)}</p>
                                                            </div>
                                                            <div className="flex">
                                                                <div className="flex-1 mt-5">
                                                                    <span className="text-xs ">
                                                                        Jan 5 2023</span>
                                                                </div>
                                                                <div className="flex-2 flex justify-end  mt-2">
                                                                    <button
                                                                        className="btn btn-ghost"
                                                                        onClick={() =>
                                                                            handleEditTask(
                                                                                board._id,
                                                                                task
                                                                            )
                                                                        }
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-ghost"
                                                                        onClick={() =>
                                                                            handleDeleteTask(board._id, task._id)
                                                                        }
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </DragDropContext>
                </div>
            </div>
        );
    }
    else {
        return (
            <EditTask closeWindow={closeModal} selectedTask={tasktoEdit} />
        )
    }
}
function EditTask({ closeWindow, selectedTask }) {
    return (
        <>
            <div className=" cursor-auto min-h-screen ">
                <div className=" grid gap-4 h-100 modal-box w-12/12 max-w-5xl p-8">
                    <label onClick={closeWindow} htmlFor="editTask" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Edit Task</h3>
                    <div className={`form-control `}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Name</span>
                        </label>
                        <input defaultValue={selectedTask.name} type='text' className="input  input-bordered w-full " />
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Description</span>
                        </label>
                        <textarea defaultValue={selectedTask.description} type='text' className="textarea  textarea-bordered w-full " />
                    </div>
                    <div className="flex">
                        <div className={`form-control `} >
                            <label className="label">
                                <span className={"label-text text-base-content w-full "}>Type &nbsp;
                                    <span className={`badge ${configColor(selectedTask.type[0])} badge-outline mr-2`} >{selectedTask.type[0]}</span>
                                </span>
                            </label>
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Change</option>
                                <option>Svelte</option>
                                <option>Vue</option>
                                <option>React</option>
                            </select>
                        </div>
                        <div className={`form-control ml-1`}>
                            <label className="label">
                                <span className={"label-text text-base-content w-full "}>Priority &nbsp;
                                    <span className={`badge ${configColor(selectedTask.priority[0])} badge-outline mr-2`} >{selectedTask.priority[0]}</span>
                                </span>
                            </label>
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Change</option>
                                <option>Svelte</option>
                                <option>Vue</option>
                                <option>React</option>
                            </select>
                        </div>
                    </div>
                    <div className={`form-control w-full`}>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Assigned Users</span>
                        </label>
                    </div>
                    <div>
                        <div className="avatar online">
                            <div className="rounded-full w-16">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU" />
                            </div>
                        </div>
                        <div className="avatar offline">
                            <div className=" rounded-full w-16">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfuSTDCkFtxG2yl9qDYnHEwV6vF6Y9hkbiuzLmOaVoO_jupwImy1-NmP_kd8LiPzaimI8&usqp=CAU" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </>
    )
}
export default App;
