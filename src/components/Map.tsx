import { useRef, useState, useEffect, RefObject  } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Skeleton } from "@mui/material";

interface APILocation{
  id: number,
  name: string,
  category: string,
  lat: string,
  lng: string,
}

interface Location{
  id: number,
  name: string,
  type: string,
  lat: number,
  lng: number,
  icon: L.Icon,
  link: string
}

const defaultCenter:L.LatLngExpression = [41.708, 21.653];
const defaultZoom = 9;
const LeafIcon = (iconUrl: string): L.Icon<L.IconOptions> => {
  const CustomIcon = L.Icon.extend({
    options: { iconSize: [24, 30], iconAnchor: [12, 24], popupAnchor: [0, -20], iconUrl: iconUrl },
  });

  return new CustomIcon();
};
const attractionIcon: L.Icon = LeafIcon("https://api.geoapify.com/v1/icon/?type=awesome&color=%23db4110&size=small&icon=attractions&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1"),
  compassIcon :L.Icon = LeafIcon(
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%238b8b8b&size=small&icon=trip_origin&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const viewpointIcon :L.Icon = LeafIcon(
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%233a9b1c&size=small&icon=landscape&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const museumIcon :L.Icon = LeafIcon(
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%23a58a31&size=small&icon=museum&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=0.7&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const artIcon :L.Icon = LeafIcon(
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%231c629b&size=small&icon=image&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const monumentIcon :L.Icon = LeafIcon(
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%237a4992&size=small&icon=castle&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");

const MapPage = () => {
  const history = useNavigate();
  const mapRef:RefObject<L.Map> = useRef<L.Map>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const firstLetterBig = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getIcon = (type: string): L.Icon => {
    if (type === "attraction") return attractionIcon;
    else if (type === "artwork") return monumentIcon;
    else if (type === "gallery") return artIcon;
    else if (type === "museum") return museumIcon;
    else if (type === "viewpoint") return viewpointIcon;
    return compassIcon;
  };

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const fetchData = async () => {
    const response = await axios.get("https://mht-back-end-deployment.azurewebsites.net/api/v1/objects");
    await timeout(4000)
    const tmp: Location[] = [];
    const data = response.data;
    data.forEach((location: APILocation) => {
      tmp.push({
        id: location.id,
        lat: Number(location.lat),
        lng: Number(location.lng),
        name: location.name,
        type: location.category,
        icon: getIcon(location.category),
        link: "/attraction?id=" + location.id,
      });
    });
    setLocations(tmp);
    setFetched(true);
  };

  return fetched ? (
    <div
      className="w-100 flex flex-column items-center justify-center rounded"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div
        style={{
          width: "80vw",
          height: "80vh",
          zIndex: 0,
          borderRadius: "16px",
          overflow: "hidden",
          background: "none",
        }}
      >
        <MapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={defaultZoom}
          key={0}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <TileLayer
            key={0}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((attraction) => (
            <Marker
              position={[attraction.lat, attraction.lng]}
              icon={attraction.icon}
              key={attraction.id}
            >
              <Popup className="w-[250px]">
                <h1 className="text-lg font-semibold mb-1">
                  {attraction.name}
                </h1>
                {attraction.type !== "yes" && (
                  <h3>
                    <span className="font-bold">Type: </span>
                    {firstLetterBig(attraction.type)}
                  </h3>
                )}
                {attraction.link && (
                  <div className="flex justify-center w-100">
                    <button
                      type="button"
                      onClick={() => {
                        history(attraction.link);
                      }}
                      className="text-white bg-yellow-800 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm mt-2 px-3 py-1.5 me-2 mb-2 dark:bg-yellow-800 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Read more
                    </button>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}

          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  ) : (
    <div
      className="w-100 flex flex-column items-center justify-center rounded"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div
        style={{
          width: "80vw",
          height: "80vh",
          zIndex: 0,
          overflow: "hidden",
          background: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: "rgba(161, 98, 7,.1)" }}
          animation="wave"
          width="100%"
          height="100%"
          className="flex-1 rounded-2xl"
        />
        <p className="mt-3 flex-2 text-xl text-yellow-900 font-semibold">
          Loading content...
        </p>
      </div>
    </div>
  );
};
export default MapPage;
