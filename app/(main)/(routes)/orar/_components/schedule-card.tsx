import React, {useEffect} from 'react';
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
    checkIsEven: () => boolean
}

const ScheduleCard = ({
    data,
    isCurrent,
    isNext,
    isDays,
    index,
    checkIsEven,
}:CardProps) => {
    const changeChecks = () => {
        isDays[index] = true
        if(data["impar"]?.length === 0 && data["par"]?.length === 0 && data["both"]?.length === 0){
            isDays[index] = false
        }
    }

    changeChecks();

    useEffect(() => {
        changeChecks();
    }, [data]);

    return (
        <div
            className={cn("max-xl:w-[300px] xl:w-1/6 aspect-[5/4] m-2 bg-muted rounded-xl overflow-hidden",
                isCurrent && "dark:bg-[#0F0F0F] bg-[#C0C0C0] font-bold border-primary border-[1px]",
                isNext && "dark:bg-[#0F0F0F] bg-[#DCDCDC] border-secondary font-bold border-[1px]")
        }>
            {(data["impar"]?.length > 0 || data["par"]?.length > 0) && (
                <div className="h-full">
                    <div className="h-1/2">
                        {data["impar"]?.length > 0 ? (
                            <ScheduleCardPart data={data["impar"]} checkIsEven={checkIsEven}/>
                        ):(
                            <ScheduleCardPart data={[]} checkIsEven={checkIsEven}/>
                        )}
                        <Separator className="bg-green-500 "/>
                    </div>
                    <div className="h-1/2">
                        {data["par"]?.length > 0 ? (
                            <ScheduleCardPart data={data["par"]} checkIsEven={checkIsEven}/>
                        ):(
                            <ScheduleCardPart data={[]} checkIsEven={checkIsEven}/>
                        )}
                    </div>
                </div>
            )}
            {data["both"]?.length > 0 && (
                <div className="h-full">
                    <ScheduleCardPart data={data["both"]} checkIsEven={checkIsEven}/>
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