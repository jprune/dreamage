import Link from 'next/link';
import React from 'react';

type Props = {
    item: {
        name: string;
        url: string;
        image: string;
    }
}

const DashboardCard = (props: Props) => {
    return (
        <Link href={`/photographer/${props.item.url}`} className='flex w-full md:w-1/4 md:flex-grow justify-center items-center h-40 md:h-80 bg-slate-300 rounded-lg'>
            <h3 className='text-4xl'>{props.item.name}</h3>
        </Link>
    );
};

export default DashboardCard;