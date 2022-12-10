'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ClientGallery } from '../../../types';


type Props = {}

const Page = (props: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [clientInput, setClientInput] = useState('');
    const [clientGalleries, setClientGalleries] = useState<Array<ClientGallery>>();
    const router = useRouter();

    const getClientGalleries = async () => {
        try {
            const { data } = await axios.get('/api/galleries/client/getAll');
            setClientGalleries(data.ClientGalleries);
        } catch (error) {
            console.log('Error getting client galleries', error);
        }
    };

    const createClientGallery = async () => {
        if(clientInput.length > 0) {
            try {
                console.log(clientInput);
                const { data } = await axios.post('/api/galleries/client/new', { clientGalleryTitle: clientInput });
                console.log('data', data);
                const id = data.clientGallery._id;
                router.push(`/photographer/galleries/client/${id}`);
            } catch (error) {
                console.log('Error registering client gallery', error);
            }
        } else {
            alert('Please enter a gallery name');
        }
    };

    useEffect(() => {
        getClientGalleries();
    }, []);

    if (!clientGalleries) {
        return (
            <div className='flex flex-col justify-center items-center mt-10'>
                <h1 className='text-2xl font-bold uppercase'>Loading...</h1>
            </div>
        );
    }
    return (
        <>
            <div className='flex flex-col items-center w-full mt-10 gap-10'>
                <h2 className='text-2xl font-bold uppercase shadow-sm'>Client Galleries</h2>

                <div className='flex flex-wrap items-center justify-center gap-3 w-full'>
                    <div className='w-1/4 h-[230px] bg-slate-300 flex justify-center items-center'>
                        <button type='button' className='flex flex-col justify-center items-center gap-3 text-xl focus:text-white' onClick={() => setShowModal(true)}>
                            <AiOutlinePlusCircle className='text-2xl' />
                            <p>Create New</p>
                        </button>
                    </div>
                    {clientGalleries?.map((gallery) => (
                        <div className='w-1/4 h-[230px] bg-slate-300 flex justify-center items-center' key={gallery._id}>
                            <button 
                                type='button' 
                                className='flex flex-col justify-center items-center gap-3 text-xl focus:text-white' 
                                onClick={() => router.push(`/photographer/galleries/client/${gallery._id}`)}
                                
                            >
                                <p>{gallery.clientGalleryTitle}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            { showModal ? (
                <>
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                    ></div>
                    <div
                        className="relative mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white flex items-center justify-center flex-col"
                    >
                        <h3 className='text-2xl font-semibold uppercase'>New Client Gallery</h3>
                        <input type='text' className='w-full border rounded-md p-2 mt-5 text-md' placeholder='Gallery Name' value={clientInput} onChange={(e) => setClientInput(e.target.value)}/>
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
                                onClick={() => createClientGallery()}
                            >
				Create Gallery
                            </button>
                        </div>
                    </div>

                </>
            ): null}
        </>
    );
};

export default Page;