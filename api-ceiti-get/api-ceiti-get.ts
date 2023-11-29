import axios from 'axios';

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

export const getTeachers = async (): Promise<Group[]> => {
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

export const getSchedule = async (id:string, type:string): Promise<string> => {
    try {
        if(id === "" || type === "")
            return "";
        const response = await axios.get(urlSchedule + `?_id=${id}&tip=${type}`);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error(error);
        return '';
    }
}