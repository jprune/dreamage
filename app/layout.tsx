import { headers } from 'next/headers';
import '../styles/globals.css';
import { getSession } from '../lib/session';
import SessionProvider from '../contexts/AuthSessionProvider';
import { ContextProvider } from '../contexts/ContextProvider';


export default async function RootLayout({children, props}: {
  children: React.ReactNode;
  props?: any;
}) {
    const session = await getSession(headers().get('cookie') ?? '');
    return (
        <ContextProvider>
            <SessionProvider session={session}>
                <html lang="en">
                    <body>{children}</body>
                </html>
            </SessionProvider>
        </ContextProvider>
    );
}