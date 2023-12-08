"use client";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";
import Link from "next/link";

export const ScheduleSettings = () => {

    const onClick = () => {

    }

    return (
        <div className="pr-8 max-sm:pr-4">
            <Button
                asChild
                className="relative flex flex-col p-0 px-2 w-10 "
                variant="outline"
            >
                <Link href="/settings">
                    <Settings/>
                </Link>
            </Button>
        </div>
    );
};