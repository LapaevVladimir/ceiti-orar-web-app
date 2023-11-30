"use client";
import React, {useContext, useEffect, useState} from 'react';
import {getSchedule, ScheduleInterface} from "@/api-ceiti-get/api-ceiti-get";
import {ScheduleContext} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";
import ScheduleDay from "@/app/(main)/(routes)/orar/_components/schedule-day";
import ScheduleNavbar from "@/app/(main)/(routes)/orar/_components/schedule-navbar";
import {Separator} from "@/components/ui/separator";

const Schedule = () => {
    const [loading, setLoading] = useState(true);

    const currentType = useContext(ScheduleContext)?.currentType;
    const currentId = useContext(ScheduleContext)?.currentId;

    const [result, setResult] = useState<ScheduleInterface>({data:{}, periods:[]});

    const fetchData = async () => {
        try {
            if (currentId != null && currentType != null) {
                const result = await getSchedule(currentId, currentType);
                setResult(result);
                setLoading(false);
            }
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
            {Object.entries(data).map((value) =>(
                <ScheduleDay
                    day={value[0].charAt(0).toUpperCase() + value[0].slice(1)}
                    data={value[1]}
                    periods={periods}
                    key={value[0]}
                />
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