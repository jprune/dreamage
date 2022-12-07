import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../dbUser/conn';
import Users from '../../../models/User';
import { User } from '../../../types';

// eslint-disable-next-line consistent-return
export default async function registerAuthUserHandler (req: NextApiRequest, res: NextApiResponse) {
    
    try {
        connectMongo().catch(error => res.json({error: 'DB connection failed signing up user'}));
    
        //only post method is accepted
        if(req.method === 'POST') {
            if(!req.body) return res.status(404).json({error: 'No data available'});

            const {name: username, email, image: userImage } = req.body;

            // check duplicate users
            const checkExisting = await Users.findOne({ email });
            if (checkExisting) return res.status(422).json({message: 'user already exists'});

            Users.create(
                { username, email, userImage}, 
                function(err: any, data: User) {
                    if(err) return res.status(404).json({ err });
                    return res.status(201).send({ status: true, user: data});
                }
            ); 
            
        } 
        
    } catch (error) {
        res.status(500).send({message: 'HTTP method not valid. Only POST accepted'});
    }
    
}