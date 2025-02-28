import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMascotas, getMascota, updateMascota, deleteMascota, createMascota } from '../../services/MascotasService';

// Funcion para obtiener las mascotas
export const getMascotasAsync = createAsyncThunk(
    'mascotas/getMascotas',
    async () => {
        const mascotas = await getMascotas();
        return mascotas;
    }
);

// Funcion para obtiener las mascota
export const getMascotaAsync = createAsyncThunk(
    'mascotas/getMascota',
    async (id: string) => {
        const mascotas = await getMascota(id);
        return mascotas;
    }
);

// Funcion para crear la mascota
export const createMascotaAsync = createAsyncThunk(
    'mascotas/createMascota',
    async (payload: any) => {
        const mascotas = await createMascota(payload);
        return mascotas;
    }
);

// Funcion para modificar la mascota
export const updateMascotaAsync = createAsyncThunk(
    'mascotas/updateMascota',
    async (payload: any) => {
        const mascotas = await updateMascota(payload.id, payload);
        return mascotas;
    }
);

// Funcion para borrar la mascota
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
        mascotas: [] as any[],
        mascotaSelected: "",
        status: "idle",
    },
    reducers: {
        // Reducer síncrono para resetear el estado de la mascota seleccionada
        resetMascota: (state) => {
            state.mascotaSelected = "";
            state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            // Manejo de estados para getMascotasAsync
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

            // Manejo de estados para getMascotaAsync
            .addCase(getMascotaAsync.pending, (state) => {
                state.status = 'loading',
                    state.mascotaSelected = ""
            })
            .addCase(getMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.mascotaSelected = action.payload
            })

            // Manejo de estados para updateMascotaAsync
            .addCase(updateMascotaAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Actualiza la mascota en el array de mascotas
                const prevState = { ...state }
                //Actualiza la mascota en el array de  las mascoats
                prevState.mascotas = prevState.mascotas.map((mascota: any) => {
                    if (mascota.id == action.payload.id) {
                        mascota = action.payload
                    }
                    return mascota
                })
                console.log(action.payload);
                state.mascotas = prevState.mascotas
            })

            // Manejo de estados para deleteMascotaAsync
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
                //Elimina la mascota del array
                state.mascotas = prevState.mascotas
            })

            // Manejo de estados para createMascotaAsync
            .addCase(createMascotaAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const newState = {
                    ...state,
                    //Añade la nueva mascota al array
                    mascotas: [...state.mascotas, action.payload]
                }
                state.mascotas = newState.mascotas
            });
    }
})

export const { resetMascota } = mascotasSlice.actions

export default mascotasSlice.reducer