import { useEffect, useState } from "react";

interface LocationState {
    loaded: boolean;
    coordinates: {
        lat: string;
        lng: string;
    };
    error?: GeolocationPositionError;
}

const UserGeoLocation = () => {
    const [location, setLocation] = useState<LocationState>({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSucces = (location: GeolocationPosition) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            loaded: true,
            coordinates: {
                lat: location.coords.latitude.toString(),
                lng: location.coords.longitude.toString(),
            },
        }));
    };

    const onError = (error: GeolocationPositionError) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            loaded: true,
            coordinates: { lat: "", lng: "" }, // Provide default coordinates or adjust as needed
            error,
        }));
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "GeoLocation not supported!",
            } as GeolocationPositionError);
        }
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }, []);

    return location;
}
export default UserGeoLocation;