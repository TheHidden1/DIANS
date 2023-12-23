import { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
    name: string;
    surname: string;
    username: string;
}

const useUserProfile = (username: string) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const apiUrl = `https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/${username}`;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<UserProfile>(apiUrl);
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile: ", error);
            }
        };
        fetchUserProfile();
    }, [apiUrl, username]);

    return userProfile;
};

export default useUserProfile;
