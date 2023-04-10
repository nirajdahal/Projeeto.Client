import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import authReducer from "../features/user/slice/authSlice"
import notificationReducer from "../features/common/slice/NotificationSlice"
const combinedReducer = {
  header: headerSlice,
  auth: authReducer,
  notification: notificationReducer,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice
}
export default configureStore({
  reducer: combinedReducer
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())