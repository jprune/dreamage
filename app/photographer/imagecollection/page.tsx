'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {}

const Page = (props: Props) => {
    const [uiFileArray, setUiFileArray] = useState<Array<File>>();

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        const filesArr = Array.from(files as any);
        console.log(filesArr);
        setUiFileArray(filesArr as any);
        console.log(setUiFileArray);

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

            { uiFileArray ? 
                (
                    <div className='flex gap-2 mt-5'>
                        {uiFileArray.map((file) => (
                            <div className='flex flex-col' key={file.name}>  
                                <div className='relative w-52 h-52 z-0' >
                                    <Image src={window.URL.createObjectURL(file)} alt={file.name} objectFit="cover" layout='fill' />
                                </div>
                                <progress className='bg-blue-600 w-full' id="progress-bar" value="0" max="100"></progress>
                            </div>
                        ))}
                    </div>
                )
                : null}
            <div>

            </div>

        </div>
    );
};

export default Page;