import React from 'react';
import ScheduleTimeCard from "@/app/(main)/(routes)/orar/_components/schedule-time-card";

interface NavbarProps{
    periods: []
}

const ScheduleNavbar = ({
    periods
}:NavbarProps) => {
    return (
        <div className="flex w-full justify-center">
            <div className="w-20 m-2"/>
            {periods.length > 0 ?
                periods.map((element, index) => (
                    <ScheduleTimeCard
                        numberPair={index + 1}
                        startPair={element["starttime"]}
                        endPair={element["endtime"]}
                        key={index}
                    />
                ))
            :(
                <>
                    <ScheduleTimeCard numberPair={0}/>
                    <ScheduleTimeCard numberPair={0}/>
                    <ScheduleTimeCard numberPair={0}/>
                    <ScheduleTimeCard numberPair={0}/>
                    <ScheduleTimeCard numberPair={0}/>
                </>
            )}

        </div>
    );
};

export default ScheduleNavbar;