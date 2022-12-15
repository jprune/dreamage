import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { generateDownloadUrl } from '../../../../lib/s3';
import connectMongo from '../../../../dbUser/conn';
import Users from '../../../../models/User';
import Images from '../../../../models/Image';
import ClientGalleries from '../../../../models/ClientGallery';


// eslint-disable-next-line consistent-return
export default async function getImagesClientSide (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        
        const { galleryId, hexId }: {galleryId: string, hexId: string}= req.body;
        console.log('galleryId, hexId', galleryId, hexId);

        if (!galleryId || !hexId) {
            res.status(500).send({message: 'Access not allowed'});
            return res.end();
        } 

        const galleryDetails = await ClientGalleries.findOne({_id: galleryId, previewId: hexId});
        const imageCollection = galleryDetails.sections[0].imageCollection;

        const galleryImagesArr = await Promise.all(imageCollection.map(async (image) => {
            const signedUrl = await Images.findOne({ imageUuid: image });
            return signedUrl;
        }));

        console.log('galleryImagesArr', galleryImagesArr);
    
        const mappedArray = await Promise.all(
            galleryImagesArr.map(async (galleryImage) => {
                const url = await generateDownloadUrl(galleryImage.imageUuid);
                return {imageUuid: galleryImage.imageUuid, imageName: galleryImage.imageName, imageUrl: url};
            })
        );
        res.status(201).send({message: 'Images fetched', images: mappedArray, galleryDetails});
        
    } else {
        res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
    }

}