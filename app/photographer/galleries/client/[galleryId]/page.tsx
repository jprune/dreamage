'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { ClientGallery, Section } from '../../../../../types';
import { RenderImage } from '../../../../../types';
import BlurImage from '../../../BlurImage';


type Props = {}

const Page = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const clientGalleryId = pathname?.slice(1).split('/')[3];

    const [galleryDetails, setGalleryDetails] = useState<ClientGallery>();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imagesArray, setImagesArray] = useState<Array<RenderImage>>();
    const [selectedImagesArr, setSelectedImagesArr] = useState<any>([]);
    
    const getGalleryDetails = async () => {
        try {
            const { data } = await axios.post('/api/galleries/client/getGalleryDetails', { clientGalleryId });
            setGalleryDetails(data.clientGalleryDetails);
        } catch (error) {
            console.log('Error getting gallery details', error);
        }
    };

    const deleteGallery = async () => {
        try {
            const { data } = await axios.post('/api/galleries/client/delete', { clientGalleryId });
            console.log('data', data);
            router.push('/photographer/galleries');
        } catch (error) {
            console.log('Error deleting gallery', error);
        }
    };

    const handleModal = async () => {
        setShowModal(true);
        const { data } = await axios.get('/api/images/getsdownloadurl');
        setImagesArray(data.userData);
        setIsLoading(false);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newImagesArr = [...selectedImagesArr, e.target.value];
        setSelectedImagesArr(newImagesArr);
        const newSectionObject = { imageCollection: newImagesArr };

        const newGalleryDetails = { ...galleryDetails};
        //@ts-ignore
        newGalleryDetails.sections = [newSectionObject];
        console.log(newGalleryDetails);
        setGalleryDetails(newGalleryDetails);
    };

    const updateClientGallery = async () => {
        try {
            console.log(galleryDetails);
            const { data } = await axios.post('/api/galleries/client/updateGalleryDetails', { galleryDetails });
            console.log('data send back', data);
        } catch (error) {
            console.log('Error updating gallery', error);
        }
        setShowModal(false);
    };

    useEffect(() => {
        getGalleryDetails();
    }, []);

    // const getUserImages = async () => {
    //     //get all UUIDs for user
    //     //request signed urls for images
    //     if(!galleryDetails) return;
    //     const { data } = await axios.post('/api/images/getDownloadUrlSelected', { imagesArr: galleryDetails?.sections[0].images });
    //     // update state with array
    //     // setUserImages(data.userData);
    // };

    // useEffect(() => {
    //     getUserImages();
    // }, [galleryDetails]);

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
                <h1 className='text-2xl font-bold uppercase'>{galleryDetails?.clientGalleryTitle}</h1>
                <div className='flex justify-between w-3/4'>
                    <button 
                        type='button' 
                        className='mt-5 flex items-center justify-center gap-2 py-2 px-4 bg-purple-700 hover:bg-purple-900 text-white rounded-md text-2xl'
                        onClick={() => handleModal()}
                    >
                        <BiAddToQueue className='' />
                        <span className=''>Add photos</span>
                    </button>
                    <button 
                        type='button' 
                        className='mt-5 flex items-center justify-center gap-2 py-2 px-4 bg-purple-700 hover:bg-purple-900 text-white rounded-md text-2xl'
                        onClick={() => deleteGallery()}
                    >
                        <MdDeleteForever className='' />
                        <span className=''>Delete gallery</span>
                    </button>
                </div>

                <div className='mt-10 w-full'>
                    <h3 className='h-5 border-b-[2px] border-slate-400 text-2xl text-center'>
                        <span className='bg-white px-5'>All photos</span>
                    </h3>
                    {}
                </div>
            </div>

            { showModal 
                ? isLoading 
                    ? (
                        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
                            <div className='flex flex-col justify-center items-center mt-10'>
                                <h1 className='text-2xl font-bold uppercase'>Loading...</h1>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                            ></div>
                            <div
                                className="relative mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white flex items-center justify-center flex-col"
                            >
                                <h3 className='text-2xl font-semibold uppercase'>Add images to library</h3>
                                <div className='mt-5 w-full md:w-[70%] grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                                    { imagesArray ? (
                                        imagesArray.map((image) => (
                                            <label key={image.imageUuid} className="relative">
                                                <BlurImage image={image} />
                                                <input type="checkbox" className='absolute bottom-16 right-3 w-4 h-4' value={image.imageUuid} onChange={(e) => handleImageSelect(e)} />
                                            </label>
                                        ))
                                    ) : null}
                                </div>

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
                                        onClick={() => updateClientGallery()}
                                    >
				Done
                                    </button>
                                </div>
                            </div>

                        </>
                    ): null}
        </>
    );
};

export default Page;