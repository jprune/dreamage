'use client';

import axios from 'axios';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { ClientGallery, RenderImage } from '../../../../../../types';
import emailClient from '../../../../../../lib/emailClient';


type Props = {}

const Page = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const clientGalleryIdHex = pathname?.slice(1).split('/')[4];
    const clientGalleryId = clientGalleryIdHex?.slice(0, -33);
    console.log('clientGalleryId', clientGalleryId);

    const [showModal, setShowModal] = useState(false);
    const [clientEmail, setClientEmail] = useState<string>();
    const [galleryDetails, setGalleryDetails] = useState<ClientGallery>();
    const [clientGalleryImagesSigned, setClientGalleryImagesSigned] = useState<Array<RenderImage>>();
    const [isLoading, setLoading] = useState(true);

    const handleModal = () => {
        setShowModal(true);
    };
    
    const cn = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ');
    };

    const getGalleryDetails = async () => {
        try {
            const { data } = await axios.post('/api/galleries/client/getGalleryDetails', { clientGalleryId });
            console.log('galleryDetails', data);
            setGalleryDetails(data.clientGalleryDetails);
        } catch (error) {
            console.log('Error getting gallery details', error);
        }
    };

    const getClientGalleryImagesSigned = async () => {
        //get all UUIDs for user
        //request signed urls for images
        if(!galleryDetails) return;
        const { data } = await axios.post('/api/galleries/client/getDownloadUrlSelected', { imageCollection: galleryDetails?.sections[0]?.imageCollection });
        console.log('data from api', data);
        // update state with array
        setClientGalleryImagesSigned(data.galleryImages);
    };

    const emailHandler = async () => {
        if(!clientEmail) return;

        await axios.post('/api/galleries/client/sendLink', { clientEmail, galleryName: galleryDetails?.clientGalleryTitle, route: clientGalleryIdHex });

        setShowModal(false);
    };

    useEffect(() => {
        getGalleryDetails();
    }, []);

    useEffect(() => {
        if(galleryDetails?.sections?.length < 1) return;
        getClientGalleryImagesSigned();
    }, [galleryDetails]);

    if(!galleryDetails) {
        return (
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-2xl font-bold uppercase'>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-2xl font-bold uppercase'>Preview</h1>
                <div className='flex justify-center w-3/4'>
                    <button 
                        type='button' 
                        className='mt-5 flex items-center justify-center gap-2 py-2 px-4 bg-purple-700 hover:bg-purple-900 text-white rounded-md text-2xl'
                        onClick={() => handleModal()}
                    >
                        <BiAddToQueue className='' />
                        <span className=''>Share with customer</span>
                    </button>
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
                                        onClick={() => emailHandler()}
                                    >
                                    Send
                                    </button>
                                </div>
                            </div>
                    
                        </>
                    ): null}

                <div className='mt-10 w-full flex flex-col'>
                    <h3 className='h-5 border-b-[2px] border-slate-400 text-2xl text-center'>
                        <span className='bg-white px-5'>{galleryDetails.clientGalleryTitle}</span>
                    </h3>
                    <div className='mt-10 w-full md:w-[70%] grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 mx-auto'>
                        { clientGalleryImagesSigned ? clientGalleryImagesSigned.map((image) => (
                        
                            <div className="group" key={galleryDetails._id}>
                                <div className={cn(
                                    'aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-400 xl:aspect-w-7 xl:aspect-h-8',
                                    isLoading
                                        ? 'animate-pulse'
                                        : ''
                                )}>
                                    <Image
                                        alt=""
                                        src={image.imageUrl}
                                        fill={true}
                                        className={cn(
                                            'duration-700 ease-in-out group-hover:opacity-50',
                                            isLoading
                                                ? 'opacity-0 scale-95 blur-sm grayscale'
                                                : 'opacity-100 scale-100'
                                        )}
                                        onLoadingComplete={() => setLoading(false)}
                                        priority
                                    />
                                </div>
                            </div>
                        ))
                            : null}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Page;