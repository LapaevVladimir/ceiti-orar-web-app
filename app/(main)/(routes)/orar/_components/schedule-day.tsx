import React from 'react';
import ScheduleCard from "@/app/(main)/(routes)/orar/_components/schedule-card";

interface DayProps{
    day: string
}

const ScheduleDay = ({
    day
}: DayProps) => {
    return (
        <div className="flex w-full h-full justify-center">
            <div className="w-[10%] m-2 bg-muted rounded-xl flex justify-center items-center">
                <p className="transform -rotate-90 text-3xl">{day}</p>
            </div>
            <ScheduleCard/>
            <ScheduleCard/>
            <ScheduleCard/>
            <ScheduleCard/>
            <ScheduleCard/>
        </div>
    );
};

export default ScheduleDay;