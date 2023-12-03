"use client";

import {ModeToggle} from "@/components/mode-toggle";
import {SelectPanel} from "@/app/(main)/(routes)/_components/select-panel";
import {Separator} from "@/components/ui/separator";
import {ScheduleCompress} from "@/app/(main)/(routes)/orar/_components/schedule-compress";
const Navbar = () => {

    return (
        <div className="w-full">
            <div className="w-full flex flex-row justify-between p-4 max-sm:flex-col">
                <div className="flex flex-row justify-between items-center max-sm:pb-4">
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
                    <div className="flex flex-row sm:hidden">
                        <ScheduleCompress/>
                        <ModeToggle/>
                    </div>
                </div>
                <SelectPanel/>
                <div className="flex flex-row max-sm:hidden">
                    <ScheduleCompress/>
                    <ModeToggle/>
                </div>
            </div>
            <Separator/>
        </div>
    );
};

export default Navbar;