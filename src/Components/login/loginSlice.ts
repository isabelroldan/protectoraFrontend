import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { doLogin, doLogout } from '../../services/LoginService';

// Acción asíncrona para el proceso de login
export const loginAsync = createAsyncThunk(
  'login/doLogin',
  async (credentials: any) => {
    const token = await doLogin(credentials);
    return token;
  }
);

// Acción asíncrona para el proceso de logout
export const logoutAsync = createAsyncThunk(
  'login/doLogout',
  async () => {
    const token = await doLogout();
    return token;
  }
);

// Slice de Redux para manejar el estado de autenticación
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: "",
    status: "idle",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      // Manejo de estados para loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access_token.split('|')[1];

        // Guardar token y rol
        sessionStorage.setItem("token", state.token);
        sessionStorage.setItem("rol", action.payload.user.rol);
        sessionStorage.setItem("id", action.payload.user.id);

        console.log("ROL:", action.payload.user.rol);
      })

      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })

      // Manejo de estados para logoutAsync
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        // Limpia el token al cerrar sesión
        state.token = ""
        sessionStorage.setItem("token", state.token);
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = 'failed';
        // Limpia el token incluso si falla el logout
        state.token = ""
        sessionStorage.setItem("token", state.token);
      })
      ;
  }
})

export const { } = loginSlice.actions

export default loginSlice.reducer