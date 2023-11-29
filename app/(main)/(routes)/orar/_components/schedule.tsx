"use client";
import React, {useContext, useEffect, useState} from 'react';
import {getSchedule} from "@/api-ceiti-get/api-ceiti-get";
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

    const [result, setResult] = useState("");

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

    return (
        <div className="w-full h-full p-4">
            <ScheduleNavbar/>
            <ScheduleDay day="Monday"/>
            <ScheduleDay day="Tuesday"/>
            <ScheduleDay day="Wednesday"/>
            <ScheduleDay day="Thursday"/>
            <ScheduleDay day="Friday"/>
        </div>
    );
};

export default Schedule;