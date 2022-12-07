import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Images from '../../../models/Image';
import { Image } from '../../../types';
import axios from 'axios';

// eslint-disable-next-line consistent-return
export default async function saveToDB (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        
        if(req.method === 'POST') {
            console.log('req.body is', req.body);
            const { imageUuid, imageName, imageSize, imageType } = req.body;

            //get user Id
            const email = session.user?.email;

            //change after deployment with actual address
            const userData = await axios.post('http://localhost:3000/api/user/findUser', {email});
            const userId = userData.data.user._id;


            // check duplicate users
            const checkExisting = await Images.findOne({ imageUuid });
            if (checkExisting) return res.status(422).json({message: 'image already exists'});

            //create entry
            Images.create(
                { imageUuid, userId, imageName, imageSize, imageType }, 
                function(err: any, data: Image) {
                    if(err) return res.status(404).json({ err });
                    return res.status(201).send({ status: true, data });
                }
            ); 
        } else {
            res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
        }

    } else {
        // Not Signed in
        res.status(401);
    }
}