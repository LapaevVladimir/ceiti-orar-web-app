import Navbar from "@/app/(main)/(routes)/orar/_components/navbar";
import Schedule from "@/app/(main)/(routes)/orar/_components/schedule";
import {ScheduleProvider} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";
import React from "react";

export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between">
            <ScheduleProvider>
                <Navbar />
                <Schedule />
            </ScheduleProvider>
        </main>
    )
}
