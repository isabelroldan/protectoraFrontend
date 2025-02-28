import LayoutNav from './Nav/LayoutNav';
import LayoutFooter from './Footer/LayoutFooter';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Layout({ children }: { children: React.ReactNode }) {

    // Obtiene el token del estado global de Redux
    const token = useSelector((state: any) => state.login.token);
    const navigateTo = useNavigate()

    // Efecto para verificar la autenticación
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        console.log(storedToken);
        if (!storedToken || storedToken === "") navigateTo('/login')
    }, [navigateTo, token])

    // Estructura del layout
    return (
        <>
            <LayoutNav />
            {children}
            <LayoutFooter />
        </>
    )
}

export default Layout
