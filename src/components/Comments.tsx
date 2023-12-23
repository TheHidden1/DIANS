import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Comment {
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

const useUserComments = (username: string) => {
    const [ userComments, setUserComments ] = useState<Comment[]>([]);
    const [ userName ] = useState<string | undefined>(Cookies.get('username'))

    const postUserComment = async (commentInput: string, rating: number, locationId: number) => {
        try {
            const response = await axios.post<Comment[]>('https://mht-back-end-deployment.azurewebsites.net/api/v1/review/create', {
                body: commentInput,
                rating: rating,
                id: locationId,
                username: username,
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