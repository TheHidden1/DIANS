import { useState } from 'react';
import axios from 'axios';

interface ObjectData {
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
            const userFavorites = await axios.get<string[]>(`https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/${username}`);
            const isCurrentlyBookmarked = userFavorites.data.includes(objectData.name);

            if (isCurrentlyBookmarked) {
                await axios.delete(`https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/${username}`, {
                    data: { locationName: objectData.name },
                });
            } else {
                await axios.post(`https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/${username}`, {
                    locationName: objectData.name,
                });
            }

            setIsBookmarked(!isCurrentlyBookmarked);
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
