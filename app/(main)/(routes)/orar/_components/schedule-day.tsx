"use client";

import React, {useEffect, useRef, useState} from 'react';
import ScheduleCard from "@/app/(main)/(routes)/orar/_components/schedule-card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import ScheduleTimeCard from "@/app/(main)/(routes)/orar/_components/schedule-time-card";
import ScheduleCheckDays from "@/app/(main)/(routes)/orar/_components/schedule-check-days";
import {getIsCurrentWeekEven} from "@/api-ceiti-get/api-ceiti-get";
import {Badge} from "@/components/ui/badge";

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
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    const [currentPair, setCurrentPair] = useState(6)
    const [nextPair, setNextPair] = useState(6)
    const [isEven, setIsEven] = useState(false);
    const [isDays, setIsDays] = useState([false, false, false, false, false]);

    const fetchData = async () => {
        try {
            const even = await getIsCurrentWeekEven();
            setIsEven(even);
        } catch (error) {
            console.error("Error fetching current week:", error);
        }
    };


    function TimeInRange() {
        const pos = daysOfWeek.indexOf(day);

        const c = new Date();

        let currentDay = c.getDay();
        currentDay += (currentDay === 0 ? 6 : -1);

        if(!day.includes("Today") && (!daysOfWeek.includes(day) || pos !== currentDay)){
            return ;
        }
        setNextPair(0)

        Object.entries(periods).slice(0, 5).map((value, index) => {
            const start: string = periods[index]["starttime"];
            const end: string = periods[index]["endtime"];

            const startDate = new Date(c.getFullYear(),
                c.getMonth(),
                c.getDate(),
                parseInt(start.length > 4 ? start.substr(0, 2) : start.substr(0, 1)),
                parseInt(start.length > 4 ? start.substr(3, 2) : start.substr(3, 1)),
                0);
            const endDate = new Date(c.getFullYear(),
                c.getMonth(),
                c.getDate(),
                parseInt(end.length > 4 ? end.substr(0, 2) : end.substr(0, 1)),
                parseInt(end.length > 4 ? end.substr(3, 2) : end.substr(3, 1)),
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
        fetchData();
    }, []);

    const checkIsEven = () =>{
        if(!daysOfWeek.includes(day) && day.includes("Next"))
            return !isEven;
        return isEven;
    }

    return (
        <div className="flex xl:w-full h-full justify-center">
            <div className="xl:hidden w-screen mb-12 rounded-md border dark:bg-[#1F1F1F] dark:bg-opacity-10 bg-[#DCDCDC] bg-opacity-[2%]">
                <div className="m-2 mt-4 flex justify-center items-center">
                    <p className="text-3xl text-center">{day}</p>
                </div>
                <ScrollArea className="w-screen whitespace-nowrap"

                >
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
                                    checkIsEven={checkIsEven}
                                />
                            </div>
                        ))}
                    </div>
                    <ScrollBar className="md:h-full md:opacity-0" orientation="horizontal"/>
                </ScrollArea>
                <div className="w-full flex flex-row justify-between">
                    <Badge className="ml-8 h-1/2 sm:h-2/3 sm:text-sm">{checkIsEven() ? "Even" : "Not Even"}</Badge>
                    <ScheduleCheckDays isDays={isDays}/>
                </div>
            </div>

            <div className="max-xl:hidden xl:w-full flex justify-center">
                <div className="w-20 m-2 bg-muted rounded-xl flex justify-center items-center">
                    <p style={{ writingMode: 'vertical-lr' }} className="h-[150px] -rotate-180 transform text-2xl text-center">{day}</p>
                </div>
                {Object.entries(data).slice(0, 5).map((value, index) => (
                    <ScheduleCard
                        data={value[1]}
                        key={value[0]}
                        isCurrent={currentPair === index}
                        isNext={nextPair === index}
                        isDays={isDays}
                        index={index}
                        checkIsEven={checkIsEven}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScheduleDay;