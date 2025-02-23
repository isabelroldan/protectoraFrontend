import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './login/Login';
import Principal from './Principal/Principal';
import Mascotas from './Mascotas/Mascotas';
import MascotasSee from './Mascotas/MascotasSee';
import MascotasEdit from './Mascotas/MascotaEdit';
import Usuarios from './Usuarios/Usuarios';
import UsuariosEdit from './Usuarios/UsuarioEdit';
import UsuariosSee from './Usuarios/UsuariosSee';
import Solicitudes from './Solicitudes/Solicitudes';

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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
