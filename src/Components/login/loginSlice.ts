import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { doLogin, doLogout } from '../../services/LoginService';

export const loginAsync = createAsyncThunk(
  'login/doLogin',
  async (credentials: any) => {
    const token = await doLogin(credentials);
    return token;
  }
);

export const logoutAsync = createAsyncThunk(
  'login/doLogout',
  async () => {
    const token = await doLogout();
    return token;
  }
);

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
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access_token.split('|')[1];
        sessionStorage.setItem("token", state.token);
        console.log(state.token);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.token = ""
        sessionStorage.setItem("token", state.token);
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.status = 'failed';
        state.token = ""
        sessionStorage.setItem("token", state.token);
      })
      ;
  }
})

export const { } = loginSlice.actions

export default loginSlice.reducer