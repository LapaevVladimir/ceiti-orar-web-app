import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

interface CardProps{
    numberPair: number,
    startPair?: string,
    endPair?: string,
}

const ScheduleTimeCard = ({
    numberPair,
    startPair,
    endPair
}: CardProps) => {

    return (
        <>
            {numberPair === 0 ? (
                <Skeleton className="w-1/6 h-20 m-2 bg-muted rounded-xl flex justify-center items-center"/>
            ):(
                <div className="w-1/6 h-20 m-2 rounded-xl flex justify-center items-center ">
                    <div className="flex">
                        <p className="self-center rounded-md w-8 border text-center border-primary bg-muted">{numberPair}</p>
                        <p className="font-bold text-2xl">&nbsp; {startPair} - {endPair}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScheduleTimeCard;