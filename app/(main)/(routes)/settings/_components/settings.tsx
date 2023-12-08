import React from 'react';
import {SelectPanel} from "@/app/(main)/(routes)/_components/select-panel";
import {ModeToggle} from "@/components/mode-toggle";
import {ReturnOrar} from "@/app/(main)/(routes)/settings/_components/return-orar";

const Settings = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="mb-8 text-2xl">Settings</h1>
            <SelectPanel/>
            <div className="mt-4 flex">
                <ReturnOrar/>
                <ModeToggle/>
            </div>
        </div>
    );
};

export default Settings;