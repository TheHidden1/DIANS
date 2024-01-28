import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Comment {
    id: number,
    username: string,
    body: string,
    rating: number,
    location: {
        id: number,
        name: string,
        type: string,
        len: number,
        lat: number,
        description: string,
    }
}

const useUserComments = () => {
    const [userComments, setUserComments] = useState<Comment[]>([]);
    const [userName] = useState<string | undefined>(Cookies.get('username'))

    const postUserComment = async (commentInput: string, rating: number, locationId: number) => {
        try {
            const response = await axios.post<Comment[]>(import.meta.env.VITE_APP_BASE_URL + '/api/v1/review/create', {
                body: commentInput,
                rating: rating,
                id: locationId,
                username: userName,
            });

            setUserComments(response.data);
        } catch (error) {
            console.error('Error posting comment: ', error);
        }
    };

    return {
        userComments,
        postUserComment,
    };
};

export default useUserComments;
