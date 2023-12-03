import React, {useContext, useEffect, useState} from 'react';
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {ScheduleContext} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import {getIsCurrentWeekEven} from "@/api-ceiti-get/api-ceiti-get";
import {cn} from "@/lib/utils";

interface CardProps{
    data: any,
    checkIsEven: () => boolean
}

const ScheduleCardPart = ({
    data,
    checkIsEven
}:CardProps) => {
    const context = useContext(ScheduleContext);
    const [isEven, setIsEven] = useState(false);
    const fetchData = async () => {
        try {
            const even = await getIsCurrentWeekEven();
            setIsEven(even);
        } catch (error) {
            console.error("Error fetching current week:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!context) {
        return null;
    }

    const {currentType} = context;

    const isTeacher = currentType === "teacher";

    const isGroup: boolean = data && data.length !== 0 && data[0]["groupids"] && data[0]["groupids"]["divisiontag"] === "1"
        ? data[0]["groupids"]["divisiontag"]
        : "";

    const subject: string = data && data.length !== 0 && data[0]["subjectid"] && data[0]["subjectid"]["name"]
        ? data[0]["subjectid"]["name"].toString()
        : "";

    let name: string;

    if(!isTeacher) {
        name = data && data.length !== 0 && data[0]["teacherids"] && data[0]["teacherids"]["name"]
            ? data[0]["teacherids"]["name"].toString()
            : "";
    }else{
        name = data && data.length !== 0 && data[0]["classids"] && data[0]["classids"]["name"]
            ? data[0]["classids"]["name"].toString()
            : "";
    }

    const groupId: string = data && data.length !== 0 && data[0]["groupids"] && data[0]["groupids"]["name"]
        ? data[0]["groupids"]["name"].slice(-1)
        : "";

    const classroom: string = data && data.length !== 0 && data[0]["classroomids"] && data[0]["classroomids"]["name"]
        ? data[0]["classroomids"]["name"].toString()
        : "";

    const subject2: string = isGroup && data && data.length > 1 && data[1]["subjectid"] && data[1]["subjectid"]["name"]
        ? data[1]["subjectid"]["name"].toString()
        : "";

    const name2: string = isGroup && data && data.length > 1 && data[1]["teacherids"] && data[1]["teacherids"]["name"]
        ? data[1]["teacherids"]["name"].toString()
        : "";

    const classroom2: string = isGroup && data && data.length > 1 && data[1]["classroomids"] && data[1]["classroomids"]["name"]
        ? data[1]["classroomids"]["name"].toString()
        : "";

    const isEntire: boolean = !(data && data.length > 1);

    console.log(data)

    return (
        <div className={cn("h-full w-full",
            checkIsEven() !== isEven ? "shadow-down" : "shadow-up"
            )}
        >
            {data.length > 0 && (
                <div className="h-full w-full flex justify-center items-center flex-col">
                    <div className="w-full h-1/2 flex flex-col justify-center">
                        <div className="flex justify-center">
                            <p className="text-sm">{subject}</p>
                            <Badge className="ml-2">{classroom}</Badge>
                        </div>
                        <div className="flex justify-center mt-2">
                            {isGroup && !isTeacher && (
                                <Badge className="ml-2 bg-blue-500 opacity-80 dark:bg-opacity-20 text-blue-950 dark:text-blue-200
                                hover:bg-blue-600 hover:bg-opacity-80 hover:dark:bg-opacity-20">Group {groupId}</Badge>
                            )}
                            {isTeacher && groupId !== "�" && (
                                <Badge className="ml-2 bg-blue-500 opacity-80 dark:bg-opacity-20 text-blue-950 dark:text-blue-200
                                hover:bg-blue-600 hover:bg-opacity-80 hover:dark:bg-opacity-20">Group {groupId}</Badge>
                            )}
                            <Badge className="ml-2 bg-green-500 opacity-80 dark:bg-opacity-20 text-green-950 dark:text-green-200
                                hover:bg-green-600 hover:bg-opacity-80 hover:dark:bg-opacity-20">{name}</Badge>
                        </div>
                    </div>
                    {!isEntire && (
                        <Separator className="bg-purple-600"/>
                    )}
                    {!isEntire && (
                        <div className="w-4/5 h-1/2 flex flex-col justify-center">
                            <div className="flex justify-center">
                                <p className="text-sm">{subject2}</p>
                                <Badge className="ml-2">{classroom2}</Badge>
                            </div>
                            <div className="flex justify-center mt-2">
                                <Badge className="ml-2 bg-blue-500 opacity-80 dark:bg-opacity-20 text-blue-950 dark:text-blue-200
                                hover:bg-blue-600 hover:bg-opacity-80 hover:dark:bg-opacity-20">Group {groupId === "1" ? 2 : 1}</Badge>
                                <Badge className="ml-2 bg-green-500 opacity-80 dark:bg-opacity-20 text-green-950 dark:text-green-200
                                hover:bg-green-600 hover:bg-opacity-80 hover:dark:bg-opacity-20">{name2}</Badge>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default ScheduleCardPart;