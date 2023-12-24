import { useState } from 'react';
import axios from 'axios';
import { parseNumbers } from 'xml2js/lib/processors';

interface ObjectData {
    id: string;
    name: string;
    category: string;
    description: string;
}

const useBookmark = (username: string, objectData: ObjectData | null) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    const toggleBookmark = async () => {
        if (!objectData) {
            return;
        }

        try {
            const endpoint = isBookmarked
                ? 'remove'
                : 'add';

            await axios.post(`https://mht-back-end-deployment.azurewebsites.net/api/v1/user/${endpoint}`, {

                placeId: parseNumbers(objectData.id),
                username: username,

            });

            setIsBookmarked(!isBookmarked);
        } catch (error) {
            console.error('Error toggling bookmark: ', error);
        }
    };

    return {
        isBookmarked,
        toggleBookmark,
    };
};

export default useBookmark;
