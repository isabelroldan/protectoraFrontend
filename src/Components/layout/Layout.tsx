import LayoutNav from './Nav/LayoutNav';
import LayoutFooter from './Footer/LayoutFooter';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Layout({ children }: { children: React.ReactNode }) {
    const token = useSelector((state: any) => state.login.token);
    const navigateTo = useNavigate()

    useEffect(() => {
        if (!token) navigateTo('/login')
    }, [navigateTo, token])

    return (
        <>
            <LayoutNav />
            {children}
            <LayoutFooter />
        </>
    )
}

export default Layout
