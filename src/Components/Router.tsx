import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Principal from './Principal/Principal';
import Mascotas from './Mascotas/Mascotas';
import MascotasSee from './Mascotas/MascotasSee';
import MascotasEdit from './Mascotas/MascotaEdit';
import Usuarios from './Usuarios/Usuarios';
import UsuariosEdit from './Usuarios/UsuarioEdit';
import UsuariosSee from './Usuarios/UsuariosSee';
import Solicitudes from './Solicitudes/Solicitudes';
import SolicitudSee from './Solicitudes/SolicitudSee';
import SolicitudEdit from './Solicitudes/SolicitudEdit';
import CalendarioSolicitudes from './CalendarioSolicitudes/CalendarioSolicitudes';

function Router() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Principal />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/mascotas' element={<Mascotas />}></Route>
                    <Route path='/mascotas/create' element={<MascotasEdit />}></Route>
                    <Route path='/mascotas/see/:id' element={<MascotasSee />}></Route>
                    <Route path='/mascotas/edit/:id' element={<MascotasEdit />}></Route>

                    <Route path='/usuarios' element={<Usuarios />}></Route>
                    <Route path='/usuarios/create' element={<UsuariosEdit />}></Route>
                    <Route path='/usuarios/see/:id' element={<UsuariosSee />}></Route>
                    <Route path='/usuarios/edit/:id' element={<UsuariosEdit />}></Route>

                    <Route path='/solicitudes' element={<Solicitudes />}></Route>
                    <Route path='/solicitudes/create' element={<SolicitudEdit />}></Route>
                    <Route path='/solicitudes/see/:id' element={<SolicitudSee />}></Route>
                    <Route path='/solicitudes/edit/:id' element={<SolicitudEdit />}></Route>

                    <Route path="/calendario" element={<CalendarioSolicitudes />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
