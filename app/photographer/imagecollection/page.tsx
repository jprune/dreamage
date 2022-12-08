'use client';
import axios, { AxiosRequestConfig } from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { RenderImage } from '../../../types';
import ImageCard from '../ImageCard';
import SimpleProgressBar from './ProgressBar';

type Props = {}

const Page = (props: Props) => {
    const [uiFileArray, setUiFileArray] = useState<Array<File>>();
    const [progressArr, setProgressArr] = useState<Array<number>>([]);
    const [userImages, setUserImages] = useState<Array<RenderImage>>([]);

    const getUserImages = async () => {
        //get all UUIDs for user
        //request signed urls for images
        const { data } = await axios.get('/api/images/getsdownloadurl');
        // update state with array
        setUserImages(data.userData);
    };

    useEffect(() => {
        getUserImages();
        console.log('userImages', userImages);
    }, []);
    

    const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        const filesArr = Array.from(files as any);

        setUiFileArray(filesArr as any);


        filesArr.forEach(async (file, idx) => {
            //@ts-ignore
            const { name, size, type } : {name: string, size: number, type: string} = file;
            // request secure url
            const { data } = await axios.get('/api/images/getsurl');

            //axios config for upload progress
            const config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: any) => {
                    const percentage = (progressEvent.loaded * 100) / progressEvent.total;
                    //define arr before setting state because setState is only excepting 1 arg
                    const newProgressArr = [...progressArr, progressArr[idx] = +percentage.toFixed(0)];
                    setProgressArr(newProgressArr);

                    if (progressEvent.total = 100) {
                        const newProgressArr = [...progressArr, progressArr[idx] = 100];
                        setProgressArr(newProgressArr);
                    }
                },
            };
            // post image directly to the bucket
            await axios.put(data.url, file, config);
            //get ImageTitle from url
            const imageUuid = data.url.split('?')[0].slice(-32);
        
            // post request to mongodb
            await axios.post('/api/images/savetodb', {imageUuid, imageName: name, imageSize: size, imageType: type});

            //update displayed images after upload
            await getUserImages();
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
                        {uiFileArray.map((file, idx) => (
                            <div className='flex flex-col' key={file.name}>  
                                <div className='relative w-52 h-52 z-0' >
                                    <Image src={window.URL.createObjectURL(file)} alt={file.name} fill={true} />
                                </div>
                                <SimpleProgressBar progress={progressArr[idx]}/>
                            </div>
                        ))}
                    </div>
                )
                : null
            }
            {
                userImages.length > 0 ? (
                    <div>
                        <hr className='w-full mb-10'/>
                        <ImageCard images={userImages}/>
                    </div>
                ) : null
            }

        </div>
    );
};

export default Page;