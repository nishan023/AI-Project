import { Outlet } from 'react-router-dom';
import AuthNav from '../components/LayoutComponents/AuthNav';

const Layout = () => {
    return (
        <>
            <div className='flex bg-bodyMain'>
                <div >
                    <AuthNav />
                </div>
                <main className=' w-full pl-16'>
                    <Outlet />
                </main>
            </div>

            <footer className='relative z-10 w-full'>
                {/* Footer content here */}
            </footer>
        </>
    );
};

export default Layout;
