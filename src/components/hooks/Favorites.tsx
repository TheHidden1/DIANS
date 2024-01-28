import { useState, useEffect } from 'react';
import axios from 'axios';
// import { parseNumbers } from 'xml2js/lib/processors';

interface ObjectData {
    id: string;
    name: string;
    category: string;
    description: string;
}

interface UserData {
    name: string;
    surname: string;
    username: string;
    favouritePlaces: ObjectData[];
}

const useBookmark = (username: string, objectData: ObjectData | null) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            if (!objectData || !username) {
                return;
            }

            try {
                const userResponse = await axios.get<UserData>(
                    `https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/${username}`
                );

                if (userResponse.data && userResponse.data.favouritePlaces) {
                    const isLocationInFavorites = userResponse.data.favouritePlaces.some(
                        (favorite) => favorite.id === objectData.id
                    );

                    // console.log('Is Location in Favorites:', isLocationInFavorites);

                    setIsBookmarked(isLocationInFavorites);
                } else {
                    setIsBookmarked(false);
                }
            } catch (error) {
                console.error('Error checking bookmark status: ', error);
            }
        };

        checkBookmarkStatus();
    }, [username, objectData]);

    const toggleBookmark = async () => {
        if (!objectData) {
            return;
        }

        try {
            const endpoint = isBookmarked ? 'remove' : 'add';

            const response = await axios.post(
                import.meta.env.VITE_APP_BASE_URL + `/api/v1/user/${endpoint}?placeId=${objectData.id}&username=${username}`
            );

            if (response.status === 200) {
                setIsBookmarked(!isBookmarked);
                console.log(`Location ${endpoint === 'add' ? 'added to' : 'removed from'} favorites.`);
            } else {
                console.error(`Failed to ${endpoint === 'add' ? 'add to' : 'remove from'} favorites.`, response.data);
            }
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
