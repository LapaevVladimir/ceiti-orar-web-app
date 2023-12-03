import React, {useContext, useEffect} from 'react';
import ScheduleCardPart from "@/app/(main)/(routes)/orar/_components/schedule-card-part";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {CalendarX} from "lucide-react";

interface CardProps{
    data: any
    isCurrent: boolean
    isNext: boolean
    isDays: boolean[]
    index: number
}

const ScheduleCard = ({
    data,
    isCurrent,
    isNext,
    isDays,
    index,
}:CardProps) => {

    useEffect(() => {
        if(data["impar"]?.length === 0 && data["par"]?.length === 0 && data["both"]?.length === 0){
            isDays[index] = false
        }else{
            isDays[index] = true
        }
    }, [data]);

    return (
        <div
            className={cn("max-sm:w-[300px] sm:w-1/6 aspect-[5/4] m-2 bg-muted rounded-xl",
                isCurrent && "dark:bg-[#0F0F0F] bg-[#C0C0C0] font-bold border-primary border-[1px]",
                isNext && "dark:bg-[#0F0F0F] bg-[#DCDCDC] border-secondary font-bold border-[1px]")
        }>
            {(data["impar"]?.length > 0 || data["par"]?.length > 0) && (
                <div className="h-full">
                    <div className="h-1/2">
                        {data["impar"]?.length > 0 ? (
                            <ScheduleCardPart data={data["impar"]}/>
                        ):(
                            <div className="h-full"></div>
                        )}
                        <Separator className="bg-green-500"/>
                    </div>
                    <div className="h-1/2">
                        {data["par"]?.length > 0 && (
                            <ScheduleCardPart data={data["par"]}/>
                        )}
                    </div>
                </div>
            )}
            {data["both"]?.length > 0 && (
                <div className="h-full">
                    <ScheduleCardPart data={data["both"]}/>
                </div>
            )}
            {data["impar"]?.length === 0 &&  data["par"]?.length === 0 && data["both"]?.length === 0 && (
                <div className="h-full w-full flex justify-center items-center">
                    <CalendarX size="40px"/>
                </div>
            )}
        </div>
    );
};

export default ScheduleCard;