import Link from 'next/link';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { RiDashboardFill, RiGroupFill, RiAppStoreFill } from 'react-icons/ri';
import { useStateContext } from '../../contexts/ContextProvider';
type Props = {}

const NavBar = (props: Props) => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext();
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    return (
        <div className='flex justify-between md:justify-end items-center text-center p-4 bg-slate-200 shadow-lg'>
            { !activeMenu && (
                <button onClick={handleActiveMenu} className="text-4xl">
                    <AiOutlineMenuUnfold />
                </button>
            )}
            <div className='flex gap-3 justify-center items-center'>
                <Link href={'/photographer'} className="flex items-center">
                    <button type='button' className='text-4xl flex items-center gap-2'>
                        <RiDashboardFill />
                        { screenSize >= 900 && <span className='uppercase text-2xl font-semibold'>Dashboard</span>}
                    </button>
                </Link>
                {/* link zu facebook */}
                <Link href={'/'} className="flex items-center">
                    <button type='button' className='text-4xl flex items-center gap-2'>
                        <RiGroupFill />
                        { screenSize >= 900 && <span className='uppercase text-2xl font-semibold'>Join Group</span>}
                    </button>
                </Link>
                {/* Link to appstore */}
                <Link href={'/'} className="flex items-center">
                    <button type='button' className='text-4xl flex items-center gap-2'>
                        <RiAppStoreFill />
                        { screenSize >= 900 && <span className='uppercase text-2xl font-semibold'>Download App</span>}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;