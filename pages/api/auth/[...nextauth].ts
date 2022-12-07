import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../dbUser/conn';
import Users from '../../../models/User';
import { compare } from 'bcryptjs';
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        //@ts-ignore
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                connectMongo().catch(error => { error: 'connection failed logging in';});
                //check user exists
                //@ts-ignore
                const result = await Users.findOne({ email: credentials.email });
                console.log('result is', result);
                if(!result){
                    throw new Error('no user found with this email. Please sign up');
                }  
                // compare passwords
                //@ts-ignore
                const checkPassword = await compare(credentials.password, result.password);
                //incorrect password
                //@ts-ignore
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match");
                }
                return result;
            }
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID as string,
        //     clientSecret: process.env.APPLE_SECRET as string
        // })
    // ...add more providers here
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user, isNewUser }) {
            if(user) {
                token.user = {
                    //@ts-ignore
                    name: user.username || user.name,
                    email: user.email,
                    image: user.image || undefined
                },
                token.isNewUser = isNewUser;
            }
            return token;
        },
        async session({ session, token }) {
            //@ts-ignore
            session.user = token.user;
            //@ts-ignore
            session.isNewUser = token.isNewUser;
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);