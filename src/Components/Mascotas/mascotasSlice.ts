import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMascotas, getMascota, updateMascota, deleteMascota, createMascota, getAllMascotas } from '../../services/MascotasService';

// Thunks para acciones asincrónicas
/* export const getMascotasAsync = createAsyncThunk(
    'mascotas/getMascotas',
    async ({ page = 1, perPage = 5 }: { page?: number; perPage?: number }) => {
        const response = await getMascotas(page, perPage);
        return response; // { data, currentPage, totalPages, totalItems, perPage }
    }
); */

export const getMascotasAsync = createAsyncThunk(
    'mascotas/getMascotas',
    async ({
        page = 1,
        perPage = 5,
        search = ''
    }: { page?: number; perPage?: number; search?: string }) => {
        const response = await getMascotas(page, perPage, search);
        return response;
    }
);

export const getAllMascotasAsync = createAsyncThunk(
    'solicitudes/getAllMascotas',
    async () => {
        const response = await getAllMascotas(); // sin paginación
        return response;
    }
);


export const getMascotaAsync = createAsyncThunk(
    'mascotas/getMascota',
    async (id: string) => {
        const mascota = await getMascota(id);
        return mascota;
    }
);

export const createMascotaAsync = createAsyncThunk(
    'mascotas/createMascota',
    async (payload: any) => {
        const mascota = await createMascota(payload);
        return mascota;
    }
);

export const updateMascotaAsync = createAsyncThunk(
    'mascotas/updateMascota',
    async (payload: any) => {
        const mascota = await updateMascota(payload.id, payload);
        return mascota;
    }
);

export const deleteMascotaAsync = createAsyncThunk(
    'mascotas/deleteMascota',
    async (id: string) => {
        const response = await deleteMascota(id);
        return { id, response };
    }
);

export const mascotasSlice = createSlice({
    name: 'mascotas',
    initialState: {
        mascotas: [] as any[],
        mascotaSelected: null as any | null,
        status: 'idle',
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 5,
    },
    reducers: {
        resetMascota: (state) => {
            state.mascotaSelected = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // getMascotasAsync
            .addCase(getMascotasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMascotasAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotas = action.payload.data;
                state.currentPage = action.payload.current_page; // <--- CAMBIO
                state.totalPages = action.payload.last_page;     // <--- CAMBIO
                state.totalItems = action.payload.total;         // <--- CAMBIO si existe
                state.perPage = action.payload.per_page;         // <--- CAMBIO si existe
            })

            .addCase(getAllMascotasAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllMascotasAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotas = action.payload; // aquí es un array simple
            })

            .addCase(getMascotasAsync.rejected, (state) => {
                state.status = 'failed';
            })

            // getMascotaAsync
            .addCase(getMascotaAsync.pending, (state) => {
                state.status = 'loading';
                state.mascotaSelected = null;
            })
            .addCase(getMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotaSelected = action.payload;
            })

            // createMascotaAsync
            .addCase(createMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Cuando creamos una mascota, podrías recargar la página 1 o añadir directamente:
                state.mascotas.unshift(action.payload); // Añadimos arriba
                state.totalItems += 1;
                // Opcional: si supera el perPage, remover el último para mantener el tamaño
                if (state.mascotas.length > state.perPage) {
                    state.mascotas.pop();
                }
            })

            // updateMascotaAsync
            .addCase(updateMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotas = state.mascotas.map((mascota) =>
                    mascota.id === action.payload.id ? action.payload : mascota
                );
            })

            // deleteMascotaAsync
            .addCase(deleteMascotaAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMascotaAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mascotas = state.mascotas.filter(
                    (mascota) => mascota.id !== action.payload.id
                );
                state.totalItems -= 1;

                // Si tras borrar, la página queda vacía y no es la primera, bajamos página
                if (state.mascotas.length === 0 && state.currentPage > 1) {
                    state.currentPage -= 1;
                }
            });
    },
});

export const { resetMascota } = mascotasSlice.actions;

export default mascotasSlice.reducer;
