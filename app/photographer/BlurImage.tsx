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
            <p className="mt-4 text-sm text-gray-700 break-all">{image.imageName}</p>
        </div>
    );
};

export default BlurImage;