import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsuarios, getUsuario, updateUsuario, deleteUsuario, createUsuario, getAllUsuarios } from '../../services/UsuariosService';

// Acciones asíncronas para operaciones CRUD de usuarios
/* export const getUsuariosAsync = createAsyncThunk(
    'usuarios/getUsuarios',
    async () => {
        const usuarios = await getUsuarios();
        return usuarios;
    }
); */

export const getUsuariosAsync = createAsyncThunk(
    "usuarios/getUsuarios",
    async ({
        page = 1,
        perPage = 5,
        search = ''
    }: { page?: number; perPage?: number; search?: string }) => {
        const response = await getUsuarios(page, perPage, search);
        return response;
    }
);

export const getAllUsuariosAsync = createAsyncThunk(
    'solicitudes/getAllUsuarios',
    async () => {
        const response = await getAllUsuarios(); // sin paginación
        return response;
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
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 5,
    },
    reducers: {
        // Reducer síncrono para resetear el estado del usuario seleccionado
        resetUsuario: (state) => {
            state.usuarioSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
        // Manejo de estados para getUsuariosAsync
            .addCase(getUsuariosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsuariosAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarios = action.payload.data;
                state.currentPage = action.payload.current_page; // <--- CAMBIO
                state.totalPages = action.payload.last_page;     // <--- CAMBIO
                state.totalItems = action.payload.total;         // <--- CAMBIO si existe
                state.perPage = action.payload.per_page;    
                console.log(state.usuarios);
            })
            .addCase(getUsuariosAsync.rejected, (state) => {
                state.status = 'failed';
            })

            .addCase(getAllUsuariosAsync.pending, (state) => {
                            state.status = 'loading';
                        })
                        .addCase(getAllUsuariosAsync.fulfilled, (state, action) => {
                            state.status = 'succeeded';
                            state.usuarios = action.payload; // aquí es un array simple
                        })

            // Manejo de estados para getUsuarioAsync
            .addCase(getUsuarioAsync.pending, (state) => {
                state.status = 'loading',
                    state.usuarioSelected = ""
            })
            .addCase(getUsuarioAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.usuarioSelected = action.payload
            })

            // Manejo de estados para updateUsuarioAsync
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

            // Manejo de estados para deleteUsuarioAsync
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

            // Manejo de estados para createUsuarioAsync
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