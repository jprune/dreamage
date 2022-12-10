import React from 'react';
import { RenderImage } from '../../types';
import BlurImage from './BlurImage';

type Props = {}

const ImageCard = ({ images }: { images: RenderImage[] }) => {
    if(!images) return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-bold uppercase'>Loading...</h1>
        </div>
    );

    return (
        <div className='flex flex-row space-between flex-wrap md:flex-nowrap max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='w-full md:w-[70%] grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
                {images.map((image) => (
                    <BlurImage key={image.imageUuid} image={image} />
                ))}
            </div>
        </div>
    );
};

export default ImageCard;