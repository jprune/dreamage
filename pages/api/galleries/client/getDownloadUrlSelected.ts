import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { generateDownloadUrl } from '../../../../lib/s3';
import connectMongo from '../../../../dbUser/conn';
import Users from '../../../../models/User';
import Images from '../../../../models/Image';


export default async function getSDownloadUrl (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        
        if(req.method === 'POST') {
            const { imageCollection }: { imageCollection: string[]} = req.body;
            console.log('user data is', imageCollection);

            const galleryImagesArr = await Promise.all(imageCollection.map(async (image) => {
                const signedUrl = await Images.findOne({ imageUuid: image });
                return signedUrl;
            }));

            const mappedArray = await Promise.all(
                galleryImagesArr.map(async (galleryImage) => {
                    const url = await generateDownloadUrl(galleryImage.imageUuid);
                    return {imageUuid: galleryImage.imageUuid, imageName: galleryImage.imageName, imageUrl: url};
                })
            );
            res.status(201).send({galleryImages: mappedArray});
        } else {
            res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
        }

    } else {
        // Not Signed in
        res.status(401).send({message: 'Not signed in'});
    }
}