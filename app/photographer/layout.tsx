'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';

import NavBar from './NavBar';
import Sidebar from './Sidebar';

// eslint-disable-next-line consistent-return
const Layout = ( { children }: {children: React.ReactNode}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const { activeMenu, setScreenSize, screenSize, setActiveMenu } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenSize]);
    
    if (session) {
        return (
            <div className="flex flex-wrap">
                {activeMenu ? (
                    <div className="w-72 fixed bg-white shadow-xl">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0">
                        <Sidebar />
                    </div>
                )}
                <div className={
                    activeMenu
                        ? 'min-h-screen overflow-hidden ml-72 w-full'
                        : 'w-full min-h-screen flex-2 '
                }>
                    <div className="fixed md:static w-full">
                        <NavBar />
                    </div>
                    <div className='mx-5'>      
                        {children}
                    </div>
                </div>
            </div>
        );
    } 
    router.push('/auth/login');
};

export default Layout;