import React from 'react';
import ScheduleTimeCard from "@/app/(main)/(routes)/orar/_components/schedule-time-card";

const ScheduleNavbar = () => {
    return (
        <div className="flex w-full justify-center">
            <div className="w-[10%] m-2"/>
            <ScheduleTimeCard numberPair={1}/>
            <ScheduleTimeCard numberPair={2}/>
            <ScheduleTimeCard numberPair={3}/>
            <ScheduleTimeCard numberPair={4}/>
            <ScheduleTimeCard numberPair={5}/>
        </div>
    );
};

export default ScheduleNavbar;