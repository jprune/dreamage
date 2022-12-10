import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import ClientGalleries from '../../../../models/ClientGallery';
import { ClientGallery } from '../../../../types';
import { authOptions } from '../../auth/[...nextauth]';

// eslint-disable-next-line consistent-return
export default async function getAllGalleries (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        try {
            
            if(req.method === 'GET') {

                const email = session.user?.email;
    
                //change after deployment with actual address
                const userData = await axios.post('http://localhost:3000/api/user/findUser', {email});
                const userId = userData.data.user._id;
    
                const clientGalleries = await ClientGalleries.find({ userId }).select('-__v');
                    
                return res.status(201).send({ ClientGalleries: clientGalleries });
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