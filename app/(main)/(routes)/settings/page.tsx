import {ScheduleProvider} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import React from "react";
import {SelectPanel} from "@/app/(main)/(routes)/_components/select-panel";
import Settings from "@/app/(main)/(routes)/settings/_components/settings";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between">
            <ScheduleProvider>
                <Settings/>
            </ScheduleProvider>
        </main>
    )
}
