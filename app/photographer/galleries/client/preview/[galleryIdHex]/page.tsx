'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';


type Props = {}

const Page = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const clientGalleryIdHex = pathname?.slice(1).split('/')[3];

    const [showModal, setShowModal] = useState(false);
    const [clientEmail, setClientEmail] = useState<string>();

    const handleModal = () => {
        setShowModal(true);
    };


    return (
        <>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-2xl font-bold uppercase'>Title</h1>
                <div className='flex justify-between w-3/4'>
                    <button 
                        type='button' 
                        className='mt-5 flex items-center justify-center gap-2 py-2 px-4 bg-purple-700 hover:bg-purple-900 text-white rounded-md text-2xl'
                        onClick={() => handleModal()}
                    >
                        <BiAddToQueue className='' />
                        <span className=''>Share with customer</span>
                    </button>
                </div>

                <div className='mt-10 w-full flex flex-col'>
                    <h3 className='h-5 border-b-[2px] border-slate-400 text-2xl text-center'>
                        <span className='bg-white px-5'>All photos for my customer</span>
                    </h3>
                    {/* <div className='mt-10 w-full md:w-[70%] grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                        { clientGalleryImagesSigned ? clientGalleryImagesSigned.map((image) => (
                        
                            <BlurImage image={image} key={image.imageUrl}/>
                        ))
                            : null}
                    </div> */}
                </div>
            </div>

            { showModal 
                ? (
                    <>
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                        ></div>
                        <div
                            className="relative mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white flex items-center justify-center flex-col"
                        >
                            <h3 className='text-2xl font-semibold uppercase'>Please enter your customers email address</h3>
                            <input 
                                type="email" 
                                onChange={(e) => setClientEmail(e.target.value)} 
                                required
                                className='bg-gray-100 border text-center border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent rounded-md w-full py-2 px-4 mt-5 text-base'
                                placeholder="Your client's email address"
                            />

                            <div className="flex gap-2 justify-between items-center mt-5 py-3 w-full">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-purple-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"
                                    onClick={() => setShowModal(false)}
                                >
				Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-purple-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300"

                                >
				Send
                                </button>
                            </div>
                        </div>

                    </>
                ): null}
        </>
    );
};

export default Page;