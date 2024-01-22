import axios from 'axios';
import {bool} from "prop-types";

interface GroupGet {
    _id: string;
    id: string;
    name: string;
    diriginte: {
        name: string;
    };
}

export interface Group {
    id: string;
    name: string;
}

export interface Teacher {
    id: string;
    name: string;
}

export interface ScheduleInterface {
    data: {

    }
    periods: [

    ]
}

const urlGroups = 'https://orar-api.ceiti.md/v1/grupe';
const urlTeachers = 'https://orar-api.ceiti.md/v1/profesori';
const urlSchedule = 'https://orar-api.ceiti.md/v1/orar';


export const getGroups = async (): Promise<Group[]> => {
    try {
        const response = await axios.get(urlGroups);
        const groups = response.data.map((group: GroupGet) => ({
            id: group._id,
            name: group.name
        }));
        return groups;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getTeachers = async (): Promise<Teacher[]> => {
    try {
        const response = await axios.get(urlTeachers);
        const teachers = response.data.map((teacher: {_id: string, name: string}) => ({
            id: teacher._id,
            name: teacher.name
        }));
        return teachers;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getSchedule = async (id:string, type:string): Promise<ScheduleInterface> => {
    try {
        if(id === "" || type === "")
            return {data:{}, periods:[]};
        const response = await axios.get(urlSchedule + `?_id=${id}&tip=${type}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return {data:{}, periods:[]};
    }
}

export const getIsCurrentWeekEven = async (): Promise<boolean> => {
    try {
        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
        const startDate = new Date(2024, 0, 15, 0, 0, 1);
        const currentDate = new Date();

        const timeDifference = Math.abs(startDate.getTime() - currentDate.getTime());
        const weeksDifference = Math.floor(timeDifference / millisecondsInWeek);

        return (weeksDifference % 2) === 1;
    }catch (error) {
        console.error(error);
        return false;
    }
}
