import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { getNotifications } from "../features/common/slice/NotificationSlice";
let socketInstance;
export const initializeSocket = (token, user) => {
    socketInstance = io('http://localhost:8900', {
        query: { token },
    });
    console.log(token, user)
    socketInstance.emit("new-user-add", user._id)
    socketInstance.on("get-users", (data) => {
        console.log("got user", data)
    })
    socketInstance.on('disconnect', () => {
        console.log('Disconnected from server!');
    });
    console.log("i am here")
}
export const socketSendUserNotification = (userToSend, type) => {
    socketInstance.emit("send-notification", userToSend, type)
}
export const socketGetNotifications = (user, dispatch) => {
    socketInstance.on("get-notification", (data) => {
        toast.success("New Notification")
        const audio = new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1150-pristine.mp3');
        audio.muted = true;
        audio.autoplay = true;
        dispatch(getNotifications(user._id))
    })
}
