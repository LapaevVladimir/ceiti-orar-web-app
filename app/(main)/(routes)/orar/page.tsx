import Navbar from "@/app/(main)/(routes)/orar/_components/navbar";
import Schedule from "@/app/(main)/(routes)/orar/_components/schedule";
import {ScheduleProvider} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";
import {Separator} from "@/components/ui/separator";
import React from "react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <ScheduleProvider>
                <Navbar />
                <Schedule />
            </ScheduleProvider>
        </main>
    )
}
