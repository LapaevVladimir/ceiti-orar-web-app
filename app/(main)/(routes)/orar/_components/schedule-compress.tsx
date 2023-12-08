"use client";
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ScheduleContext} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";

export const ScheduleCompress = () => {
    const [isChecked, setIsChecked] = useState(false);

    const setIsShowAll = useContext(ScheduleContext)?.setIsShowAll;
    const isShowAll = useContext(ScheduleContext)?.isShowAll;

    useEffect(() => {
        if(isShowAll !== undefined)
            setIsChecked(!isShowAll);
    }, [isShowAll]);

    const onClick = () => {
        if (setIsShowAll) {
            setIsShowAll(isChecked);
        }
        setIsChecked(!isChecked)
    }

    return (
        <div className="pr-8 max-sm:pr-4">
            <Button
                className="relative flex flex-col p-0 px-2 w-10 "
                variant="outline"
                onClick={onClick}
            >
                <ChevronUp
                    className={cn("absolute top-1 transition ease-in-out", isChecked && "rotate-180")}
                    size="20px"
                />
                <ChevronDown
                    className={cn("absolute top-4 transition ease-in-out", isChecked && "rotate-180")}
                    size="20px"
                />
            </Button>
        </div>
    );
};