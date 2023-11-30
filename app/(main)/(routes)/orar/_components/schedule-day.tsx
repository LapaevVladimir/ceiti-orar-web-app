import React from 'react';
import ScheduleCard from "@/app/(main)/(routes)/orar/_components/schedule-card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import ScheduleTimeCard from "@/app/(main)/(routes)/orar/_components/schedule-time-card";

interface DayProps{
    day: string
    data: any
    periods: []
}

const ScheduleDay = ({
    day,
    data,
    periods
}: DayProps) => {
    return (
        <div className="flex sm:w-full h-full justify-center">
            <div className="sm:hidden w-screen mb-12 rounded-md border bg-blue-950 bg-opacity-10">
                <div className="m-2 flex justify-center items-center">
                    <p className="text-3xl">{day}</p>
                </div>
                <ScrollArea className="w-screen whitespace-nowrap">
                    <div className="flex w-max space-x-4 p-4">
                        {Object.entries(data).slice(0, 5).map((value, index) => (
                            <div className="flex flex-col justify-center items-center">
                                <ScheduleTimeCard
                                    numberPair={index + 1}
                                    startPair={periods[index]["starttime"]}
                                    endPair={periods[index]["endtime"]}
                                />
                                <ScheduleCard data={value[1]}/>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            <div className="max-sm:hidden sm:w-full flex justify-center">
                <div className="w-20 m-2 bg-muted rounded-xl flex justify-center items-center">
                    <p className="transform -rotate-90 text-3xl">{day}</p>
                </div>
                {Object.entries(data).slice(0, 5).map((value) => (
                    <ScheduleCard data={value[1]}/>
                ))}
            </div>
        </div>
    );
};

export default ScheduleDay;