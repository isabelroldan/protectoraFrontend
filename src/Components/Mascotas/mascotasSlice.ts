import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMascotas, getMascota, updateMascota, deleteMascota, createMascota } from '../../services/MascotasService';


export const getMascotasAsync = createAsyncThunk(
    'mascotas/getMascotas',
    async () => {
        const mascotas = await getMascotas();
        return mascotas;
    }
);

export const getMascotaAsync = createAsyncThunk(
    'mascotas/getMascota',
    async (id: string) => {
        const mascotas = await getMascota(id);
        return mascotas;
    }
);

export const createMascotaAsync = createAsyncThunk(
    'mascotas/createMascota',
    async (payload: any) => {
        const mascotas = await createMascota(payload);
        return mascotas;
    }
);

export const updateMascotaAsync = createAsyncThunk(
    'mascotas/updateMascota',
    async (payload: any) => {
        const mascotas = await updateMascota(payload.id, payload);
        return mascotas;
    }
);

export const deleteMascotaAsync = createAsyncThunk(
    'mascotas/deleteMascota',
    async (payload: any) => {
        const mascotas = await deleteMascota(payload);
        return mascotas;
    }
);

export const mascotasSlice = createSlice({
    name: 'mascotas',
    initialState: {
        mascotas: "",
        mascotaSelected: "",
        status: "idle",
    },
    reducers: {
        resetMascota: (state) => {
            state.mascotaSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMascotasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMascotasAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotas = action.payload;
                console.log(state.mascotas);
            })
            .addCase(getMascotasAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getMascotaAsync.pending, (state) => {
                state.status = 'loading',
                    state.mascotaSelected = ""
            })
            .addCase(getMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.mascotaSelected = action.payload
            })
            .addCase(updateMascotaAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.mascotas = prevState.mascotas.map((mascota: any) => {
                    if (mascota.id == action.payload.id) {
                        mascota = action.payload
                    }
                    return mascota
                })
                console.log(action.payload);
                state.mascotas = prevState.mascotas
            })
            .addCase(deleteMascotaAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const prevState = { ...state }
                prevState.mascotas = prevState.mascotas.filter((mascota: any) => {
                    if (mascota.id != action.payload.id) {
                        return mascota
                    }
                })
                console.log(action.payload);
                state.mascotas = prevState.mascotas
            })
            .addCase(createMascotaAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const newState = {
                    ...state,
                    mascotas: [...state.mascotas, action.payload]
                }
                state.mascotas = newState.mascotas
            });
    }
})

export const { resetMascota } = mascotasSlice.actions

export default mascotasSlice.reducer