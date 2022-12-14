import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import ClientGalleries from '../../../../models/ClientGallery';
import { authOptions } from '../../auth/[...nextauth]';
import { randomBytes } from 'crypto';

// eslint-disable-next-line consistent-return
export default async function newClientGallery (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        try {
        
            if(req.method === 'POST') {
                const { clientGalleryId } = req.body;
                console.log('clientGalleryId: ', clientGalleryId);

                const clientGallery = await ClientGalleries.findById(clientGalleryId);
                
                // check if previewId exists --> do not create new one
                if (clientGallery.previewId) {
                    res.status(200).send({ previewId: clientGallery.previewId });
                    return res.end();
                } 
                //create 32 hex string
                const previewId = await randomBytes(16).toString('hex');
                console.log('previewId: ', previewId);
                //find document and update previewId property
                const updatedClientGalleryProp = await ClientGalleries.findByIdAndUpdate(clientGalleryId, { previewId: previewId }, { new: true });
    
                console.log('updatedClientGalleryProp', updatedClientGalleryProp);
                return res.status(201).send({previewId: previewId});
                

            } 
            res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
            
    
        } catch (error) {
            //@ts-ignore
            res.send({error: error.message});
        }
    } else {
        // Not Signed in
        res.status(401);
    }
            
}