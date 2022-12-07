import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { generateUploadUrl } from '../../../lib/s3';

export default async function findUser (req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        console.log('Session during getsurl is', JSON.stringify(session, null, 2));
        
        if(req.method === 'GET') {
            const url = await generateUploadUrl();
            res.send({url});
        } else {
            res.status(500).send({message: 'HTTP method not valid. Only GET accepted'});
        }

    } else {
        // Not Signed in
        res.status(401);
    }
    res.end();
}