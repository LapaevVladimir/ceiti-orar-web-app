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

const url = 'https://orar-api.ceiti.md/v1/grupe';

export const getGroups = async (): Promise<Group[]> => {
    try {
        const response = await axios.get(url);
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