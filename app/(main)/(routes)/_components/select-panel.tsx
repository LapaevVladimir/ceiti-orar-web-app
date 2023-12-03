"use client";

import React, {useState} from 'react';
import {TypeSelect} from "@/app/(main)/(routes)/_components/type-select";
import {GroupSelect} from "@/app/(main)/(routes)/_components/group-select";
import {TeacherSelect} from "@/app/(main)/(routes)/_components/teacher-select";

export const SelectPanel = () => {
    const [currentType, setCurrentType] = useState("group");

    return (
        <div className="max-sm:flex-col max-sm:w-full max-sm:items-center
         flex flex-row">
            <div className="max-sm:pb-4">
                <TypeSelect setType={setCurrentType}/>
            </div>
            <div className="sm:pl-4 md:pl-8">
                {currentType === "group" ? (
                    <GroupSelect/>
                ): (
                    <TeacherSelect/>
                )}
            </div>

        </div>
    );
};
