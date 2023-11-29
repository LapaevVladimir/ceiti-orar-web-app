"use client";
import React, {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';

type ScheduleContextType = {
    currentType: string;
    setCurrentType: Dispatch<SetStateAction<string>>;
    currentId: string;
    setCurrentId: Dispatch<SetStateAction<string>>;
};

export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export const ScheduleProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [currentType, setCurrentType] = useState("");
    const [currentId, setCurrentId] = useState("");

    return (
        <ScheduleContext.Provider value={{currentType, setCurrentType, currentId, setCurrentId}}>
            {children}
        </ScheduleContext.Provider>
    );
};