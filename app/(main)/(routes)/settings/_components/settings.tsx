"use client";
import React, {useContext} from 'react';
import {SelectPanel} from "@/app/(main)/(routes)/_components/select-panel";
import {ModeToggle} from "@/components/mode-toggle";
import {ReturnOrar} from "@/app/(main)/(routes)/settings/_components/return-orar";
import {Button} from "@/components/ui/button";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useTelegram} from "@/app/(main)/(routes)/_components/_providers/telegram-provider";
import {ScheduleContext} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import {toast} from "sonner";
import {useTheme} from "next-themes";
import {Info} from "@/app/(main)/(routes)/_components/info";

const Settings = () => {
    const { user, webApp } = useTelegram();

    const update = useMutation(api.settings.update);
    const create = useMutation(api.settings.create);
    const isExist = useQuery(api.settings.getUserSettings, {userId: user?.id.toString() || ""});

    const currentType = useContext(ScheduleContext)?.currentType;

    const currentId= useContext(ScheduleContext)?.currentId;

    const {theme} = useTheme();

    const onSubmit = () => {
        if(!isExist){
            const promise = create({
                userId: user?.id.toString() || "",
                type: currentType || "class",
                selectedId: currentId || "",
                theme: theme || "system"
            });

            toast.promise(promise, {
                loading: "Creating Settings...",
                success: "Settings Created!",
                error: "Failed to create settings."
            });
        }else{
            if(isExist.id === currentId && isExist.type === currentType && isExist.theme === theme){
                toast.error("Settings are already saved")
            }else {
                const promise = update({
                    userId: user?.id.toString() || "",
                    type: currentType || "class",
                    selectedId: currentId || "",
                    theme: theme || "system"
                });

                toast.promise(promise, {
                    loading: "Updating Settings...",
                    success: "Settings Updated!",
                    error: "Failed to update settings."
                });
            }
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <Info/>
            <h1 className="mb-8 mt-4 text-2xl">Settings</h1>
            <SelectPanel/>
            <div className="mt-4 flex">
                <ReturnOrar/>
                <ModeToggle/>
            </div>
            <Button onClick={onSubmit} className="mt-4" variant="outline">Save</Button>
        </div>
    );
};

export default Settings;