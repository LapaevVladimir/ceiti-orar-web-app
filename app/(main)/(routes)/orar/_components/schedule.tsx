"use client";
import React, {useContext, useEffect, useState} from 'react';
import {getSchedule, ScheduleInterface} from "@/api-ceiti-get/api-ceiti-get";
import {ScheduleContext} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";
import ScheduleDay from "@/app/(main)/(routes)/orar/_components/schedule-day";
import ScheduleNavbar from "@/app/(main)/(routes)/orar/_components/schedule-navbar";

const Schedule = () => {
    const [loading, setLoading] = useState(true);
    const context = useContext(ScheduleContext);

    if (!context) {
        return null;
    }

    const {currentType, currentId} = context;

    const [result, setResult] = useState<ScheduleInterface>({data:{}, periods:[]});

    const fetchData = async () => {
        try {
            const result = await getSchedule(currentId, currentType);
            setResult(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("ok");
    }, [loading]);

    useEffect(() => {
        setLoading(true);
    }, [currentType, currentId]);

    const {periods, data} = result;

    return (
        <div className="w-full h-full p-4">
            <ScheduleNavbar periods={periods}/>
            {Object.entries(data).map((value) =>(
                <ScheduleDay
                    day={value[0].charAt(0).toUpperCase() + value[0].slice(1)}
                    data={value[1]}
                />
            ))}
        </div>
    );
};

export default Schedule;