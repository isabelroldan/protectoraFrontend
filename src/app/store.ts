import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/login/loginSlice'
export default configureStore({
  reducer: {
    login: loginReducer
  },
})