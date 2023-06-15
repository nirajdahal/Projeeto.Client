import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RESET, createStage } from '../../slice/projectSlice'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const CreateStage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const projectToAddStageInto = location.state
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const colorRef = useRef('#FFFFFF');
    const { stage, isSuccess } = useSelector(
        (state) => state.project
    )
    useEffect(() => {
        // if (!projectToAddStageInto) {
        //     window.location.href = "/"
        // }
        console.log(projectToAddStageInto)
    }, [])
    useEffect(() => {
        if (isSuccess && stage) {
            dispatch(RESET())
            window.location.href = `/app/kanban/${projectToAddStageInto}`
        }
    }, [stage])
    const handleClick = () => {
        console.log(name, description, colorRef.current, projectToAddStageInto)
        const data = {
            name, description, color: colorRef.current.toString(), project: projectToAddStageInto
        }
        console.log(data)
        dispatch(createStage({ projectToAddStageInto, data }))
    }
    return (
        <>
            <div className="modal-box relative">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className={`form-control `}>
                    <label className="label">
                        <span className={"label-text text-base-content "}>Name</span>
                    </label>
                    <input onChange={(e) => setName(e.target.value)} type='text' className="input  input-bordered w-full " />
                </div>
                <div className={`form-control `}>
                    <label className="label">
                        <span className={"label-text text-base-content "}>Description</span>
                    </label>
                    <textarea onChange={(e) => setDescription(e.target.value)} type='text' className="textarea textarea-bordered  " />
                </div>
                <div className='form-control'>
                </div><label className="label"><span className={"label-text text-base-content "}>Choose stage color:</span></label>
                <input type="color" className='input input-bordered w-full cursor-pointer' onChange={(e) => colorRef.current = e.target.value} />
                <div className='form-control mt-4'> <button disabled={!name.trim().length > 0} className='btn btn-dark' onClick={handleClick}>Create</button></div>
            </div>
        </>
    )
}
export default CreateStage