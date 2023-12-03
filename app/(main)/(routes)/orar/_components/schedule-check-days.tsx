"use client";
import {Circle, CircleDot} from "lucide-react";

interface Props{
    isDays: boolean[]
}

const ScheduleCheckDays = ({
    isDays
}:Props) => {

    return (
        <div className="flex justify-between sm:hidden w-1/4 pr-8 mb-4 ml-auto">
            {isDays?.map((value, index) => (
                value ? (
                    <CircleDot key={index}/>
                ): (
                    <Circle key={index}/>
                )
            ))}
        </div>
    );
};

export default ScheduleCheckDays;