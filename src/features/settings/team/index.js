import { data } from "autoprefixer"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import TitleCard from "../../../components/Cards/TitleCard"
import socketInstance, { initializeSocket, socketSendUserNotification } from "../../../socket/Socket"
import { showNotification } from '../../common/headerSlice'
import { sendNotification } from "../../common/slice/NotificationSlice"
import { getUsers, RESET, upgradeUser } from "../../user/slice/authSlice"
const TopSideButtons = () => {
    const dispatch = useDispatch()
    const addNewTeamMember = () => {
        dispatch(showNotification({ message: "Add New Member clicked", status: 1 }))
    }
    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => addNewTeamMember()}>Invite New</button>
        </div>
    )
}
const TEAM_MEMBERS = [
    { name: "Alex", avatar: "https://reqres.in/img/faces/1-image.jpg", email: "alex@dashwind.com", role: "Owner", joinedOn: moment(new Date()).add(-5 * 1, 'days').format("DD MMM YYYY"), lastActive: "5 hr ago" },
    { name: "Ereena", avatar: "https://reqres.in/img/faces/2-image.jpg", email: "ereena@dashwind.com", role: "Admin", joinedOn: moment(new Date()).add(-5 * 2, 'days').format("DD MMM YYYY"), lastActive: "15 min ago" },
    { name: "John", avatar: "https://reqres.in/img/faces/3-image.jpg", email: "jhon@dashwind.com", role: "Admin", joinedOn: moment(new Date()).add(-5 * 3, 'days').format("DD MMM YYYY"), lastActive: "20 hr ago" },
    { name: "Matrix", avatar: "https://reqres.in/img/faces/4-image.jpg", email: "matrix@dashwind.com", role: "Manager", joinedOn: moment(new Date()).add(-5 * 4, 'days').format("DD MMM YYYY"), lastActive: "1 hr ago" },
    { name: "Virat", avatar: "https://reqres.in/img/faces/5-image.jpg", email: "virat@dashwind.com", role: "Support", joinedOn: moment(new Date()).add(-5 * 5, 'days').format("DD MMM YYYY"), lastActive: "40 min ago" },
    { name: "Miya", avatar: "https://reqres.in/img/faces/6-image.jpg", email: "miya@dashwind.com", role: "Support", joinedOn: moment(new Date()).add(-5 * 7, 'days').format("DD MMM YYYY"), lastActive: "5 hr ago" },
]
function Team() {
    const dispatch = useDispatch()
    const [selectedOptions, setSelectedOptions] = useState({});
    const [members, setMembers] = useState(null)
    const [userToSend, setUserToSend] = useState("")
    const { users, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    const handleOptionChange = (itemId, event) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [itemId]: event.target.value,
        }));
    };
    useEffect(() => {
        if (users && isSuccess) {
            setMembers(users)
            dispatch(RESET())
        }
    }, [users])
    useEffect(() => {
        const getUserList = async () => {
            await dispatch(getUsers())
        }
        getUserList()
    }, [])
    useEffect(() => {
        if (isSuccess && message === "role-update") {
            // Remove the old user object from the array
            setMembers(prevUsers => {
                // Find the user by their ID
                const updatedUsers = prevUsers.map(user => {
                    if (user._id === userToSend) {
                        // Update the user's role
                        return { ...user, role: selectedOptions[userToSend] };
                    } else {
                        return user;
                    }
                });
                return updatedUsers;
            });
            const type = "role update"
            socketSendUserNotification(userToSend, type)
            dispatch(RESET())
        }
    }, [isSuccess])
    const handleSubmit = async (id, previousRole) => {
        const selectedRole = selectedOptions[id]
        if (selectedRole === undefined) {
            toast.error("Please select a role to upgrade")
            return
        }
        if (selectedRole === previousRole) {
            toast.error(`The user is already ${previousRole}. Select Different Role `)
            return
        }
        const userData = {
            role: selectedOptions[id],
            id: id
        }
        console.log(userData)
        setUserToSend(userData.id)
        await dispatch(upgradeUser(userData))
    }
    const getRoleComponent = (role) => {
        if (role === "admin") return <div className="badge badge-secondary">{role}</div>
        if (role === "manager") return <div className="badge">{role}</div>
        if (role === "suspended") return <div className="badge badge-error">{role}</div>
        if (role === "user") return <div className="badge badge-accent">{role}</div>
        else return <div className="badge badge-ghost">{role}</div>
    }
    return (
        <>
            <TitleCard title="Active Members" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Role</th>
                                <th>Change To</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members &&
                                members.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={l.photo} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>{getRoleComponent(l.role)}</td>
                                            <td>
                                                <select
                                                    className="select select-ghost w-full max-w-xs"
                                                    value={selectedOptions[l._id] || ""}
                                                    onChange={(event) => handleOptionChange(l._id, event)}
                                                >
                                                    <option diasbled="true">Select</option>
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="team">Team</option>
                                                    <option value="suspended">Suspended</option>
                                                </select>
                                            </td>
                                            <td><button onClick={() => handleSubmit(l._id, l.role)} className="btn btn-success btn-sm btn-outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            </button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}
export default Team
