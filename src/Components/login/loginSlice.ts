import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { doLogin } from '../../services/LoginService';

export const loginAsync = createAsyncThunk(
    'login/doLogin',
    async (credentials: any) => {
      const token = await doLogin(credentials);
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
            state.token = action.payload.access_token.split('|')[1] ;
            console.log(state.token);
          })
          .addCase(loginAsync.rejected, (state) => {
            state.status = 'failed';
          });
      }
  })
  
  export const {  } = loginSlice.actions
  
  export default loginSlice.reducer