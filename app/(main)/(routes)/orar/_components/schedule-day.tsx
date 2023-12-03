"use client";

import React, {useEffect, useState} from 'react';
import ScheduleCard from "@/app/(main)/(routes)/orar/_components/schedule-card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import ScheduleTimeCard from "@/app/(main)/(routes)/orar/_components/schedule-time-card";
import ScheduleCheckDays from "@/app/(main)/(routes)/orar/_components/schedule-check-days";

interface DayProps{
    day: string
    data: any
    periods: any
}

const ScheduleDay = ({
    day,
    data,
    periods
}: DayProps) => {

    const [currentPair, setCurrentPair] = useState(6)
    const [nextPair, setNextPair] = useState(6)

    const [isDays, setIsDays] = useState([true, true, true, true, true]);

    function TimeInRange() {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        const pos = days.indexOf(day);
        const c = new Date();

        let currentDay = c.getDay();
        currentDay += (currentDay === 0 ? 6 : -1);

        if(!days.includes(day) || pos !== currentDay){
            return ;
        }
        setNextPair(0)

        Object.entries(periods).slice(0, 5).map((value, index) => {
            const startDate = new Date(c.getFullYear(),
                c.getMonth(),
                c.getDate(),
                parseInt(periods[index]["starttime"].substr(0, 2)),
                parseInt(periods[index]["starttime"].substr(3, 2)),
                0);
            const endDate = new Date(c.getFullYear(),
                c.getMonth(),
                c.getDate(),
                parseInt(periods[index]["endtime"].substr(0, 2)),
                parseInt(periods[index]["endtime"].substr(3, 2)),
                0);

            if(startDate <= c && c <= endDate){
                setCurrentPair(index)
                if(currentPair === nextPair)
                    setNextPair(index + 1)
            }
            if(c > endDate){
                setNextPair(index + 1)
            }
        })
    }

    useEffect(() => {
        TimeInRange();
    }, []);

    return (
        <div className="flex sm:w-full h-full justify-center">
            <div className="sm:hidden w-screen mb-12 rounded-md border dark:bg-[#1F1F1F] dark:bg-opacity-10 bg-[#DCDCDC] bg-opacity-[2%]">
                <div className="m-2 mt-4 flex justify-center items-center">
                    <p className="text-3xl text-center">{day}</p>
                </div>
                <ScrollArea className="w-screen whitespace-nowrap">
                    <div className="flex w-max space-x-4 p-4 bg">
                        {Object.entries(data).slice(0, 5).map((value, index) => (
                            <div className="flex flex-col justify-center items-center" key={index}>
                                <ScheduleTimeCard
                                    numberPair={index + 1}
                                    startPair={periods[index]["starttime"]}
                                    endPair={periods[index]["endtime"]}
                                />
                                <ScheduleCard
                                    data={value[1]}
                                    isCurrent={currentPair === index}
                                    isNext={nextPair === index}
                                    isDays={isDays}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                <ScheduleCheckDays isDays={isDays}/>
            </div>

            <div className="max-sm:hidden sm:w-full flex justify-center">
                <div className="w-20 m-2 bg-muted rounded-xl flex justify-center items-center">
                    <p className="transform -rotate-90 text-3xl">{day}</p>
                </div>
                {Object.entries(data).slice(0, 5).map((value, index) => (
                    <ScheduleCard
                        data={value[1]}
                        key={value[0]}
                        isCurrent={currentPair === index}
                        isNext={nextPair === index}
                        isDays={isDays}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScheduleDay;