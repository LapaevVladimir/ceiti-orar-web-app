import React from 'react';
import ScheduleCard from "@/app/(main)/(routes)/orar/_components/schedule-card";

interface DayProps{
    day: string
    data: any
}

const ScheduleDay = ({
    day,
    data
}: DayProps) => {
    return (
        <div className="flex w-full h-full justify-center">
            <div className="w-20 m-2 bg-muted rounded-xl flex justify-center items-center">
                <p className="transform -rotate-90 text-3xl">{day}</p>
            </div>
            {Object.entries(data).slice(0, 5).map((value) => (
                <ScheduleCard data={value[1]}/>
            ))}
        </div>
    );
};

export default ScheduleDay;