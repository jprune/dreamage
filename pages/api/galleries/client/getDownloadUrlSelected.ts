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
            const { userData } = req.body;

            const mappedArray = await Promise.all(
                userData.map(async (imageData) => {
                    const url = await generateDownloadUrl(imageData.imageUuid);
                    return {imageUuid: imageData.imageUuid, imageName: imageData.imageName, imageUrl: url};
                })
            );
            res.status(201).send({userData: mappedArray});
        } else {
            res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
        }

    } else {
        // Not Signed in
        res.status(401).send({message: 'Not signed in'});
    }
}