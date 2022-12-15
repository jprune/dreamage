'use client';
import axios from 'axios';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ClientGallery, RenderImage } from '../../../types';
import BlurImage from '../../photographer/BlurImage';


type Props = {}

const Page = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const dynamicRoute = pathname?.slice(1).split('/')[1];
    const clientGalleryId = dynamicRoute?.slice(0, -33);
    const clientHex = dynamicRoute?.slice(-32);

    const [clientGallery, setClientGallery] = useState<ClientGallery>();
    const [imageArr, setImageArr] = useState<Array<RenderImage>>();
    const [isLoading, setIsLoading] = useState(true);

    console.log('clientGalleryId, clientGalleryHex', clientGalleryId, clientHex);

    const getClientDetails = async () => {
        try {
            const { data } = await axios.post('/api/galleries/client/getImagesClientSide', { galleryId: clientGalleryId, hexId: clientHex });
            setClientGallery(data.galleryDetails);
            setImageArr(data.images);
            console.log('clientGallery', data);
        } catch (error) {
            console.log('Error getting client galleries', error);
        }
    };

    const cn = (...classes: string[]) => {
        return classes.filter(Boolean).join(' ');
    };

    useEffect(() => {
        getClientDetails();
    }, []);

    if (!clientGallery) {
        return (
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-2xl font-bold uppercase'>Loading...</h1>
            </div>
        );
    }
    return (
        <div className='flex flex-wrap p-10 items-center justify-start bg-gradient-to-b from-indigo-100 to-purple-200 min-h-screen'>
            <h3 className='text-2xl font-bold uppercase w-full text-center'>{clientGallery.clientGalleryTitle}</h3>
            <div className='mt-10 w-full md:w-[70%] grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 mx-auto'>
                { imageArr?.map((image) => (
                    <div className="group" key={image.imageUuid}>
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
                                onLoadingComplete={() => setIsLoading(false)}
                                priority
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;