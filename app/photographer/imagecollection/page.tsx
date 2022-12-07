'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {}

const Page = (props: Props) => {
    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        const filesArr = Array.from(files as any);

        filesArr.forEach(async (file) => {
            console.log('file is', file);
            //@ts-ignore
            const { name, size, type } : {name: string, size: number, type: string} = file;
            // request secure url
            const { data } = await axios.get('/api/images/getsurl');

            // post image directly to the bucket
            await fetch(data.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: file as BodyInit,
            });
            //get ImageTitle from url
            const imageUuid = data.url.split('?')[0].slice(-32);
        
            // post request to mongodb
            await axios.post('/api/images/savetodb', {imageUuid, imageName: name, imageSize: size, imageType: type});
        });

    };

    return (
        <div className='flex justify-center items-center flex-wrap'>
            <div className='flex w-full justify-center'>Photo library</div>

            <label className='w-full'>
                <span>Upload for files here</span>
                <input type="file" name="image" accept='image/*' multiple onChange={(e) => uploadHandler(e)}/>
            </label>

        </div>
    );
};

export default Page;