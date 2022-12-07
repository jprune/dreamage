import Link from 'next/link';
import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import { AiOutlineMenuFold } from 'react-icons/ai';

import { useStateContext } from '../../contexts/ContextProvider';

type Props = {}

const Sidebar = (props: Props) => {
    const { activeMenu, screenSize, setActiveMenu } = useStateContext();
    const links = ['Profile', 'Business Manager', 'Photoshoot', 'Galleries', 'Print Shop', 'Education & Resources', 'Directory'];
    const linksPrep = ['Profile', 'BusinessManager', 'Photoshoot', 'Galleries', 'PrintShop', 'Edures', 'Directory'];
    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    return (
        <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
            <div className='flex justify-between items-center mt-4 px-3'>
                <Link href={'/photographer'} onClick={handleCloseSideBar} className="items-center gap-3 flex text-xl font-extrabold tracking-tight text-slate-900">
                    <FaCameraRetro /> <span>Dreamage</span>
                </Link>
                { screenSize <= 900 ? (
                    <button onClick={handleCloseSideBar} className="text-4xl">
                        <AiOutlineMenuFold />
                    </button>
                ) : null }
            </div>
            <div className='mt-10 flex flex-col px-3 gap-5'>
                {linksPrep.map((link) => (
                    <Link 
                        href={`/photographer/${link.toLowerCase()}`} 
                        key={link}
                        onClick={handleCloseSideBar}
                        className="w-full text-start text-xl bg-slate-200 rounded-lg px-4 py-2"
                    >
                        <span className='uppercase'>{link}</span>
                    </Link>
                )
                )}
            </div>
        </div>
    );
};

export default Sidebar;