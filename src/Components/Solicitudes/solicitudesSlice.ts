import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSolicitudes } from '../../services/SolicitudesService';


export const getSolicitudesAsync = createAsyncThunk(
    'solicitudes/getSolicitudes',
    async () => {
        const solicitudes = await getSolicitudes();
        return solicitudes;
    }
);


export const solicitudesSlice = createSlice({
    name: 'solicitudes',
    initialState: {
        solicitudes: "",
        solicitudSelected: "",
        status: "idle",
    },
    reducers: {
        resetSolicitud: (state) => {
            state.solicitudSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSolicitudesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSolicitudesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.solicitudes = action.payload;
                console.log(state.solicitudes);
            });
    }
})

export const { resetSolicitud } = solicitudesSlice.actions

export default solicitudesSlice.reducer