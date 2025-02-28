import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createSolicitud, deleteSolicitud, getSolicitud, getSolicitudes, updateSolicitud } from '../../services/SolicitudesService';

// Acciones asíncronas para operaciones CRUD de solicitudes

export const getSolicitudesAsync = createAsyncThunk(
    'solicitudes/getSolicitudes',
    async () => {
        const solicitudes = await getSolicitudes();
        return solicitudes;
    }
);

export const getSolicitudAsync = createAsyncThunk(
    'mascotas/getSolicitud',
    async (id: string) => {
        const solicitud = await getSolicitud(id);
        return solicitud;
    }
);

export const createSolicitudAsync = createAsyncThunk(
    'mascotas/createSolicitud',
    async (payload: any) => {
        const solicitud = await createSolicitud(payload);
        return solicitud;
    }
);

export const updateSolicitudAsync = createAsyncThunk(
    'mascotas/updateSolicitud',
    async (payload: any) => {
        const solicitud = await updateSolicitud(payload.id, payload);
        return solicitud;
    }
);

export const deleteSolicitudAsync = createAsyncThunk(
    'mascotas/deleteSolicitud',
    async (payload: any) => {
        const solicitud = await deleteSolicitud(payload);
        return solicitud;
    }
);


export const solicitudesSlice = createSlice({
    name: 'solicitudes',
    initialState: {
        solicitudes: [] as any[],
        solicitudSelected: "",
        status: "idle",
    },
    reducers: {
        // Reducer síncrono para resetear el estado de la solicitud seleccionada
        resetSolicitud: (state) => {
            state.solicitudSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
        // Manejo de estados para getSolicitudesAsync
            .addCase(getSolicitudesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSolicitudesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.solicitudes = action.payload;
                console.log(state.solicitudes);
            })

            // Manejo de estados para getSolicitudAsync
            .addCase(getSolicitudAsync.pending, (state) => {
                state.status = 'loading',
                    state.solicitudSelected = ""
            })
            .addCase(getSolicitudAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.solicitudSelected = action.payload
            })

            // Manejo de estados para updateSolicitudAsync
            .addCase(updateSolicitudAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateSolicitudAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.solicitudes = prevState.solicitudes.map((solicitud: any) => {
                    if (solicitud.id == action.payload.id) {
                        solicitud = action.payload
                    }
                    return solicitud
                })
                console.log(action.payload);
                state.solicitudes = prevState.solicitudes
            })

            // Manejo de estados para deleteSolicitudAsync
            .addCase(deleteSolicitudAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteSolicitudAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.solicitudes = prevState.solicitudes.filter((solicitud: any) => {
                    if (solicitud.id != action.payload.id) {
                        return solicitud
                    }
                })
                console.log(action.payload);
                state.solicitudes = prevState.solicitudes
            })

            // Manejo de estados para createSolicitudAsync
            .addCase(createSolicitudAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createSolicitudAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const newState = {
                    ...state,
                    solicitudes: [...state.solicitudes, action.payload]
                }
                state.solicitudes = newState.solicitudes
            });
    }
})

export const { resetSolicitud } = solicitudesSlice.actions

export default solicitudesSlice.reducer