import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (page,name,status) => {
    try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character`, {
            params: {page,name,status},
        });
        return res.data;
    } catch(error) {
        return error;
    }
};