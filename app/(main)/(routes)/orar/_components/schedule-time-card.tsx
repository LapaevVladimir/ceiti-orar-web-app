import React from 'react';

interface CardProps{
    numberPair: number,
    startPair?: string,
    endPair?: string,
}

const ScheduleTimeCard = ({
    numberPair,
    startPair,
    endPair
}: CardProps) => {
    return (
        <div className="w-1/6 h-20 m-2 bg-muted rounded-xl flex justify-center items-center">
            <div className="flex">
                <p className="self-center rounded-md w-8 border text-center border-primary bg-muted">{numberPair}</p>
                <p className="font-bold text-2xl">&nbsp; 00:00 - 00:00</p>
            </div>
        </div>
    );
};

export default ScheduleTimeCard;