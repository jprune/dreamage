'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

// eslint-disable-next-line react/function-component-definition
export default function ClientSessionProvider(props: SessionProviderProps) {
    return <SessionProvider {...props} />;
}