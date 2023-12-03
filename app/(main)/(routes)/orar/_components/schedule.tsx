"use client";
import React, {useContext, useEffect, useState} from 'react';
import {getSchedule, ScheduleInterface} from "@/api-ceiti-get/api-ceiti-get";
import {ScheduleContext} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";
import ScheduleDay from "@/app/(main)/(routes)/orar/_components/schedule-day";
import ScheduleNavbar from "@/app/(main)/(routes)/orar/_components/schedule-navbar";
import {Separator} from "@/components/ui/separator";

const Schedule = () => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ScheduleInterface>({data:{}, periods:[]});

    const getCurrentDay = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        return currentDay + (currentDay === 0 ? 6 : -1);
    }

    const currentDay: number = getCurrentDay();

    const currentType = useContext(ScheduleContext)?.currentType;
    const currentId = useContext(ScheduleContext)?.currentId;
    const isShowAll = useContext(ScheduleContext)?.isShowAll;


    const fetchData = async () => {
        try {
            const result = await getSchedule(currentId ? currentId : "", currentType ? currentType : "");
            setResult(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [loading]);

    useEffect(() => {
        setLoading(true);
    }, [currentType, currentId]);

    const {periods, data} = result;

    return (
        <div className="sm:w-full h-full p-4 max-sm:w-screen">
            <div className="max-sm:hidden">
                <ScheduleNavbar periods={periods}/>
            </div>
            {Object.entries(data).map((value, index) => (
                isShowAll ? (
                    <ScheduleDay
                        day={value[0].charAt(0).toUpperCase() + value[0].slice(1)}
                        data={value[1]}
                        periods={periods}
                        key={value[0]}
                    />
                ):(
                    currentDay === index || (currentDay > 4 && index == 4) ? (
                        <div key={value[0]}>
                            {currentDay === index &&
                                <ScheduleDay
                                day={`Today/${value[0].charAt(0).toUpperCase() + value[0].slice(1)}`}
                                data={value[1]}
                                periods={periods}
                                />
                            }
                            <ScheduleDay
                                day={index >= 4 ? "Next Week/Monday" : "Tomorrow"}
                                data={Object.entries(data)[(index + 1) % 5][1]}
                                periods={periods}
                            />
                        </div>
                    ) : (
                        <div key={value[0]}></div>
                    )
                )
            ))}
            <div className="fixed right-0 bottom-0 h-[40px] mb-8 mr-8 flex flex-row max-sm:mb-4 max-sm:mr-4">
                <div className="w-[40px] h-full flex flex-col justify-around">
                    <Separator className="bg-green-500 h-[2px]"/>
                    <Separator className="bg-purple-600 h-[2px]"/>
                </div>
                <div className="text-sm ml-2">
                    <p>- week</p>
                    <p>- group</p>
                </div>
            </div>
        </div>
    );
};

export default Schedule;