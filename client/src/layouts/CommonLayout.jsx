import { Outlet } from 'react-router-dom'
import AuthNav from '../components/LayoutComponents/AuthNav';


const Layout = () => {

    return (
        <>
            <div className='grid grid-cols-2'>
                <div className='z-50 sticky top-0'>
                    <AuthNav />
                </div>
                <main className='z-10 top-0 '>
                    <Outlet />
                </main>
            </div>

            <footer>

            </footer>
        </>
    )
}


export default Layout;