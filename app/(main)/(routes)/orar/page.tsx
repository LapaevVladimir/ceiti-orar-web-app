"use client";
import Navbar from "@/app/(main)/(routes)/orar/_components/navbar";
import Schedule from "@/app/(main)/(routes)/orar/_components/schedule";
import {ScheduleProvider} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import React from "react";
import {TelegramProvider} from "@/app/(main)/(routes)/_components/_providers/telegram-provider";

export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between">
            <TelegramProvider>
                <ScheduleProvider>
                    <Navbar />
                    <Schedule />
                </ScheduleProvider>
            </TelegramProvider>
        </main>
    )
}
