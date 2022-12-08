import Image from 'next/image';
import React, { useState } from 'react';
import { RenderImage } from '../../types';

const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};


const BlurImage = ({image}: {image: RenderImage}) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    alt=""
                    src={image.imageUrl}
                    fill={true}
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-75',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{image.imageName}</h3>
        </div>
    );
};

export default BlurImage;