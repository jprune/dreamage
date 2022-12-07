import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '../../../dbUser/conn';
import Users from '../../../models/User';
import { User } from '../../../types';

export default async function findUser (req: NextApiRequest, res: NextApiResponse) {
    connectMongo().catch(error => res.json({error: 'DB connection failed looking up user _id'}));

    if(req.method === 'POST') {
        const {email}: User = req.body;
        const user = await Users.findOne({ email }).select('username email initQuestionary');

        res.status(200).send({user});
    } else {
        res.status(500).send({message: 'HTTP method not valid. Only POST accepted'});
    }
}