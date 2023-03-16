import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/leads/leadSlice'
import authReducer from "../features/user/slice/authSlice"
const combinedReducer = {
  header: headerSlice,
  auth: authReducer,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice
}
export default configureStore({
  reducer: combinedReducer
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())