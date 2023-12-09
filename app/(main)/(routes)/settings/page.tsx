"use client";
import {ScheduleProvider} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import React from "react";
import Settings from "@/app/(main)/(routes)/settings/_components/settings";
import {TelegramProvider} from "@/app/(main)/(routes)/_components/_providers/telegram-provider";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between">
            <TelegramProvider>
                <ScheduleProvider>
                    <Settings/>
                </ScheduleProvider>
            </TelegramProvider>
        </main>
    )
}
