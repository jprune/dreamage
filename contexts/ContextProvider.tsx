'use client';
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext<any>({} as any);

export const ContextProvider = ({ children } : {children: any}) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [activeMenu, setActiveMenu] = useState(true);

    return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider value={{ activeMenu, screenSize, setScreenSize, setActiveMenu }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);