import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario } from '../../services/UsuariosService';


export const getUsuariosAsync = createAsyncThunk(
    'usuarios/getUsuarios',
    async () => {
        const usuarios = await getUsuarios();
        return usuarios;
    }
);

export const getUsuarioAsync = createAsyncThunk(
    'usuarios/getUsuario',
    async (id: string) => {
        const usuarios = await getUsuario(id);
        return usuarios;
    }
);

export const createUsuarioAsync = createAsyncThunk(
    'usuarios/createUsuario',
    async (payload: any) => {
        const usuarios = await createUsuario(payload);
        return usuarios;
    }
);

export const updateUsuarioAsync = createAsyncThunk(
    'usuarios/updateUsuario',
    async (payload: any) => {
        const usuarios = await updateUsuario(payload.id, payload);
        return usuarios;
    }
);

export const deleteUsuarioAsync = createAsyncThunk(
    'usuarios/deleteUsuario',
    async (payload: any) => {
        const usuarios = await deleteUsuario(payload);
        return usuarios;
    }
);

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuarios: [] as any[],
        usuarioSelected: "",
        status: "idle",
    },
    reducers: {
        resetUsuario: (state) => {
            state.usuarioSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsuariosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsuariosAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarios = action.payload;
                console.log(state.usuarios);
            })
            .addCase(getUsuariosAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getUsuarioAsync.pending, (state) => {
                state.status = 'loading',
                    state.usuarioSelected = ""
            })
            .addCase(getUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.usuarioSelected = action.payload
            })
            .addCase(updateUsuarioAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.usuarios = prevState.usuarios.map((usuario: any) => {
                    if (usuario.id == action.payload.id) {
                        usuario = action.payload
                    }
                    return usuario
                })
                console.log(action.payload);
                state.usuarios = prevState.usuarios
            })
            .addCase(deleteUsuarioAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.usuarios = prevState.usuarios.filter((usuario: any) => {
                    if (usuario.id != action.payload.id) {
                        return usuario
                    }
                })
                console.log(action.payload);
                state.usuarios = prevState.usuarios
            })
            .addCase(createUsuarioAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const newState = {
                    ...state,
                    usuarios: [...state.usuarios, action.payload]
                }
                state.usuarios = newState.usuarios
            });
    }
})

export const { resetUsuario } = usuariosSlice.actions

export default usuariosSlice.reducer