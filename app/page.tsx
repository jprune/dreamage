'use client';
import Link from 'next/link';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import axios from 'axios';

type Props = {}

const Guest = () => {
    return (
        <main className='container mx-auto text-center py-20'>
            <h3 className='text-4xl font-bold'>Guest Homepage</h3>

            <div className='flex justify-center'>
                <Link href={'/auth/login'} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500">Sign In</Link>
            </div>
        </main>
    );
};

const HomePage = (props: Props) => {
    const { data: session } = useSession();
    const registerUser = useMemo(() => getUser(session), [session]);

    async function getUser (session: any) {
        try {
            const options = {
                method: 'POST',
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify({email: session.user.email})
            };
            const { user } = await fetch('http://localhost:3000/api/user/findUser', options)
                .then(res => res.json())
                .then((data) => {
                    return data;
                });
            console.log('response is', user);
            if(user === null) {
                try {
                    const authOptions = {
                        method: 'POST',
                        headers : { 'Content-Type': 'application/json'},
                        body: JSON.stringify(session.user)
                    };
                    const response = await fetch('http:localhost:3000/api/auth/registerauthuser', authOptions);
                    console.log('response registering userAuth', response);
                } catch (error: any) {
                    console.log('error registering authUser', error.message);
                }
            }
        } catch (error: any) {
            console.log('error fetching user', error.message);
        }
    };
    //check for questionary property --> with session email find user in db and return results for property
    if (session) {
        return (
            <main className='container mx-auto text-center py-20'>
                <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>
    
                <div className='details'>
                    {/*@ts-ignore */}
                    <h5>{session.user.name}</h5>
                    {/*@ts-ignore */}
                    <h5>{session.user.email}</h5>
                </div>
                <div className='flex justify-center'>
                    <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500' onClick={() => signOut()}>Sign Out</button>
                </div>
    
                <div className='flex justify-center'>
                    <Link href={'/photographer'} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500">Dashboard</Link>
                </div>
            </main>
        );
    }

    return <Guest />;
};

export default HomePage;