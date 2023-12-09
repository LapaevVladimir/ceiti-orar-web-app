"use client";
import {createContext, useContext, useEffect, useMemo, useState} from "react";
import type { ITelegramUser, IWebApp } from "./types";

export interface ITelegramContext {
    webApp?: IWebApp;
    user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({ children }: { children: React.ReactNode; }) => {
    const [webApp, setWebApp] = useState<IWebApp | null>(null);

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
        }
        setIsClient(true)
    }, []);

    const value = useMemo(() => {
        return webApp ? {
            webApp,
            unsafeData: webApp.initDataUnsafe,
            user: webApp.initDataUnsafe.user,
        } : {};
    }, [webApp]);

    return (
        <TelegramContext.Provider value={value}>
            {<div dangerouslySetInnerHTML={{__html: `<script src="https://telegram.org/js/telegram-web-app.js"></script>`}} />}
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);
