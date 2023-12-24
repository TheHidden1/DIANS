import { useEffect, useState, RefObject } from "react";
import * as L from "leaflet";
import "leaflet-routing-machine";

interface Coordinates {
    lat: number;
    lng: number;
}

const useRoutingControl = (
    mapRef: RefObject<L.Map>,
    userLocationCoordinates: Coordinates | null,
    attractionCoordinates: Coordinates | null
) => {
    const [routeControl, setRouteControl] = useState<L.Routing.Control | null>(
        null
    );

    useEffect(() => {
        if (mapRef.current && userLocationCoordinates && attractionCoordinates) {
            const userLocationLatLng = L.latLng(
                parseFloat(userLocationCoordinates.lat.toString()),
                parseFloat(userLocationCoordinates.lng.toString())
            );
            const attractionLatLng = L.latLng(
                parseFloat(attractionCoordinates.lat.toString()),
                parseFloat(attractionCoordinates.lng.toString())
            );

            const control = L.Routing.control({
                waypoints: [userLocationLatLng, attractionLatLng],
                routeWhileDragging: true,
            });

            setRouteControl(control);
        }
    }, [mapRef, userLocationCoordinates, attractionCoordinates]);

    return routeControl;
};

export default useRoutingControl;
