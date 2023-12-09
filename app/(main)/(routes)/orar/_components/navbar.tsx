"use client";

import {ModeToggle} from "@/components/mode-toggle";
import {SelectPanel} from "@/app/(main)/(routes)/_components/select-panel";
import {Separator} from "@/components/ui/separator";
import {ScheduleCompress} from "@/app/(main)/(routes)/orar/_components/schedule-compress";
import {ScheduleSettings} from "@/app/(main)/(routes)/orar/_components/schedule-settings";
import {useTelegram} from "@/app/(main)/(routes)/_components/_providers/telegram-provider";
const Navbar = () => {
    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between p-4 max-lg:flex-col">
                <div className="flex flex-row justify-between items-center max-lg:pb-4">
                    <img
                        className="h-[50%] w-auto dark:block hidden"
                        src="/dark_icon.webp"
                        alt="logo"
                    />
                    <img
                        className="h-[50%] w-auto dark:hidden block"
                        src="/light_icon.webp"
                        alt="logo"
                    />
                    <div className="flex flex-row lg:hidden">
                        <ScheduleSettings/>
                        <ScheduleCompress/>
                        <ModeToggle/>
                    </div>
                </div>
                <SelectPanel/>
                <div className="flex flex-row max-lg:hidden">
                    <ScheduleSettings/>
                    <ScheduleCompress/>
                    <ModeToggle/>
                </div>
            </div>
            <Separator/>
        </div>
    );
};

export default Navbar;