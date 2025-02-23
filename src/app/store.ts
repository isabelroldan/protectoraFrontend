import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/login/loginSlice'
import mascotasReducer from '../Components/Mascotas/mascotasSlice'
import usuariosReducer from '../Components/Usuarios/usuariosSlice'
export default configureStore({
  reducer: {
    login: loginReducer,
    mascotas: mascotasReducer,
    usuarios: usuariosReducer
  },
})