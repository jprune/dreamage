import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import ClientGalleries from '../../../../models/ClientGallery';
import { ClientGallery } from '../../../../types';
import { authOptions } from '../../auth/[...nextauth]';

// eslint-disable-next-line consistent-return
export default async function newClientGallery (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        try {
            
            if(req.method === 'POST') {
                console.log('req.body', req.body);
    
                const { clientGalleryTitle } = req.body;
    
                const email = session.user?.email;
    
                //change after deployment with actual address
                const userData = await axios.post('http://localhost:3000/api/user/findUser', {email});
                const userId = userData.data.user._id;
                console.log('userId', userId);
    
                const newGallery = await ClientGalleries.create({ clientGalleryTitle, userId });
                
                return res.status(201).send({ clientGallery: newGallery });
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