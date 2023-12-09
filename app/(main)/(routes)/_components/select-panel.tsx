"use client";

import React, {useContext, useEffect, useState} from 'react';
import {TypeSelect} from "@/app/(main)/(routes)/_components/type-select";
import {GroupSelect} from "@/app/(main)/(routes)/_components/group-select";
import {TeacherSelect} from "@/app/(main)/(routes)/_components/teacher-select";
import {ScheduleContext} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";

export const SelectPanel = () => {
    const [currentType, setCurrentType] = useState("class");
    const setType = useContext(ScheduleContext)?.setCurrentType;

    useEffect(() => {
        if(setType)
            setType(currentType)
    }, [currentType]);

    return (
        <div className="max-sm:flex-col max-lg:w-full max-lg:items-center
         flex flex-row max-lg:justify-center">
            <div className="max-sm:pb-4">
                <TypeSelect setType={setCurrentType}/>
            </div>
            <div className="sm:pl-4 md:pl-8">
                {currentType === "class" ? (
                    <GroupSelect/>
                ): (
                    <TeacherSelect/>
                )}
            </div>
        </div>
    );
};
