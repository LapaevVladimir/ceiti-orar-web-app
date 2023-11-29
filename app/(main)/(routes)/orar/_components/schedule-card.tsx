import React from 'react';
import {cn} from "@/lib/utils";
import ScheduleCardPart from "@/app/(main)/(routes)/orar/_components/schedule-card-part";
import {Separator} from "@/components/ui/separator";

interface CardProps{
    data: any
}

const ScheduleCard = ({
    data,
}:CardProps) => {
    return (
        <div className="w-1/6 aspect-[5/4] m-2 bg-muted rounded-xl">
            {(data["impar"]?.length > 0 || data["par"]?.length > 0)  &&(
                <div className="h-full">
                    <div className="h-1/2">
                        {data["impar"]?.length > 0 ? (
                            <ScheduleCardPart data={data["impar"]}/>
                        ):(
                            <div className="h-full"></div>
                        )}
                        <Separator className="bg-green-500"/>
                    </div>
                    <div className="h-1/2">
                        {data["par"]?.length > 0 && (
                            <ScheduleCardPart data={data["par"]}/>
                        )}
                    </div>
                </div>
            )}
            {data["both"]?.length > 0 && (
                <div className="h-full">
                    <ScheduleCardPart data={data["both"]}/>
                </div>
            )}
        </div>
    );
};

export default ScheduleCard;