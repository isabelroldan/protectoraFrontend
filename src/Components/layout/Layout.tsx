import LayoutNav from './Nav/LayoutNav';
import LayoutFooter from './Footer/LayoutFooter';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LayoutNav />
            {children}
            <LayoutFooter />
        </>
    )
}

export default Layout
