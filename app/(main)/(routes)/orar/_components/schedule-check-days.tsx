"use client";
import {Circle, CircleDot} from "lucide-react";

interface Props{
    isDays: boolean[]
}

const ScheduleCheckDays = ({
    isDays
}:Props) => {

    return (
        <div className="flex justify-between xl:hidden md:w-1/5 lg:w-1/6 w-1/4 pr-8 mb-4 ml-auto">
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