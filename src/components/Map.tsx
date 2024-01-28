import { useRef, useState, useEffect, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Skeleton } from "@mui/material";
import UserGeoLocation from "./hooks/UserGeoLocation";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
// import useRoutingControl from "./Routing";

interface APILocation {
  id: number,
  name: string,
  category: string,
  lat: string,
  lng: string,
}

interface Location {
  id: number,
  name: string,
  type: string,
  lat: number,
  lng: number,
  icon: L.Icon,
  link: string
}

const defaultCenter: L.LatLngExpression = [41.708, 21.653];
const defaultZoom = 8;
const LeafIcon = (iconUrl: string): L.Icon<L.IconOptions> => {
  const CustomIcon = L.Icon.extend({
    options: { iconSize: [24, 30], iconAnchor: [12, 24], popupAnchor: [0, -20], iconUrl: iconUrl },
  });

  return new CustomIcon();
};
const attractionIcon: L.Icon = LeafIcon("https://api.geoapify.com/v1/icon/?type=awesome&color=%23db4110&size=small&icon=attractions&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1"),
  compassIcon: L.Icon = LeafIcon(
    "https://api.geoapify.com/v1/icon/?type=awesome&color=%238b8b8b&size=small&icon=trip_origin&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const viewpointIcon: L.Icon = LeafIcon(
  "https://api.geoapify.com/v1/icon/?type=awesome&color=%233a9b1c&size=small&icon=landscape&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const museumIcon: L.Icon = LeafIcon(
  "https://api.geoapify.com/v1/icon/?type=awesome&color=%23a58a31&size=small&icon=museum&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=0.7&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const artIcon: L.Icon = LeafIcon(
  "https://api.geoapify.com/v1/icon/?type=awesome&color=%231c629b&size=small&icon=image&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");
const monumentIcon: L.Icon = LeafIcon(
  "https://api.geoapify.com/v1/icon/?type=awesome&color=%237a4992&size=small&icon=castle&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1");

const MapPage = () => {
  const history = useNavigate();
  const mapRef: RefObject<L.Map> = useRef<L.Map>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [fetched, setFetched] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [selectedFilter, setSelectedFilter] = useState<string>("")
  const [searchName, setSearchName] = useState<string>("");

  const userlocation = UserGeoLocation();
  const [locateMeClicked, setLocateMeClicked] = useState(false);
  
  console.log("userlocation", userlocation);

  useEffect(() => {
    fetchData();
  }, []);

  const firstLetterBig = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const searchByName = () => {
    const filtered = locations.filter((location) => location.name.toLowerCase().includes(searchName.toLowerCase()));
    if (filtered.length > 0)
      window.location.href = '/attraction?id=' + filtered[0].id
  }

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
    const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/objects");
    await timeout(500)
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
    setFilteredLocations(tmp);
    setFetched(true);
  };

  // Prikazuvanje na lokaciite spored nivnata kategorija (type)
  const handleTypeChange = (type: string | null) => {
    if (type && type != selectedFilter) {
      const filtered = locations.filter((location) => location.type === type);
      setFilteredLocations(filtered)
      setSelectedFilter(type)
    } else {
      setFilteredLocations(locations);
      setSelectedFilter("")
    }
  };

  // Prikazuva momentalna lokacija na korisnikot
  const handleLocateMe = () => {
    if (mapRef.current && userlocation.loaded && !userlocation.error) {
      const userLocationLatLng = L.latLng(
        parseFloat(userlocation.coordinates.lat),
        parseFloat(userlocation.coordinates.lng)
      );
      setLocateMeClicked(true);

      // Animate the map to the user's location
      mapRef.current.flyTo(userLocationLatLng, 12, {
        duration: 2, // Animation duration in seconds
      });
      setTimeout(() => {
        setLocateMeClicked(false);
      }, 30000);

    }
  };

  const navigateToLocation = async (attraction: Location) => {
      //console.log(attraction);
      //console.log(userLocationLatLng)
    if (mapRef.current) {
      const map = mapRef.current;
      if (routingControlRef.current) {
        //routingControlRef.current.setWaypoints([])
        routingControlRef.current.remove()
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(parseFloat(userlocation.coordinates.lat), parseFloat(userlocation.coordinates.lng)),
          L.latLng(attraction.lat, attraction.lng),
        ],
      });

      routingControlRef.current.addTo(map);
    }

  };

  return fetched ? (
    <div className="flex flex-row w-full fullPageDiv">
      <div className="flex">
        <ul className="text-xl m-[32px] text-yellow-800 my-auto flex flex-col space-y-6 text-center">
          <h2 className="text-3xl">Categories:</h2>
          <li>
            <a href="#" onClick={() => handleTypeChange("attraction")} className={selectedFilter === "attraction" ? "text-yellow-600" : ""}>Attraction</a>
          </li>
          <li>
            <a href="#" onClick={() => handleTypeChange("artwork")} className={selectedFilter === "artwork" ? "text-yellow-600" : ""}>Artwork</a>
          </li>
          <li>
            <a href="#" onClick={() => handleTypeChange("museum")} className={selectedFilter === "museum" ? "text-yellow-600" : ""}>Museum</a>
          </li>
          <li>
            <a href="#" onClick={() => handleTypeChange("gallery")} className={selectedFilter === "gallery" ? "text-yellow-600" : ""}>Gallery</a>
          </li>
          <li>
            <a href="#" onClick={() => handleTypeChange("viewpoint")} className={selectedFilter === "viewpoint" ? "text-yellow-600" : ""}>Viewpoint</a>
          </li>
        </ul>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center rounded"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="ml-16 mt-3">
          <input type="text" className="mb-3 bg-yellow-800 rounded-lg border-white placeholder-white font-semibold text-white" placeholder="Enter Location Name" onChange={(e) => setSearchName(e.target.value)}></input>
          <button type="submit" onClick={searchByName} className="px-3 py-2 rounded text-white bg-yellow-800/70 hover:bg-yellow-600/70 font-semibold ml-3">Search</button>
        </div>

        <div
          style={{
            width: "80%",
            height: "80%",
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
            
            {filteredLocations.map((attraction) => (
              <Marker
                position={[attraction.lat, attraction.lng]}
                icon={attraction.icon}
                key={attraction.id}
              >
                <Popup className="w-[250px]">
                  <h1 className="text-lg font-semibold mb-1">
                    {firstLetterBig(attraction.name)}
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
                        Read More
                      </button>
                      {/* <button type="button" onClick={ findRoute } className="text-white bg-yellow-800 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm mt-2 px-3 py-1.5 me-2 mb-2 dark:bg-yellow-800 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-blue-800">
                        Find Route
                      </button> */}
                      <button type="button" 
                      onClick={() => {
                        navigateToLocation(attraction)
                      }}
                      className="text-white bg-yellow-800 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm mt-2 px-3 py-1.5 me-2 mb-2 dark:bg-yellow-800 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-blue-800">
                        Navigate
                      </button>
                    </div>
                  )}
                </Popup>
              </Marker>
            ))}

            {locateMeClicked && userlocation.loaded && !userlocation.error && (
              <>
                <Marker
                  position={[
                    parseFloat(userlocation.coordinates.lat),
                    parseFloat(userlocation.coordinates.lng),
                  ]}
                >

                </Marker>
                <Circle
                  center={[
                    parseFloat(userlocation.coordinates.lat),
                    parseFloat(userlocation.coordinates.lng),
                  ]}
                  radius={5000} // Radius in meters (5 kilometers)
                  color="blue" // Circle color
                  fillOpacity={0.1} // Opacity of the filled area
                />
              </>
            )}
          </MapContainer>
        </div>
        <div className="row my-4">
          <div className="w-100 text-center mt-4">
            <button
              type="button"
              onClick={handleLocateMe}
              className="text-white bg-yellow-800 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 focus:outline-none">
              Locate Me
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="w-100 flex flex-column items-center justify-center rounded"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div
        style={{
          width: "60vw",
          height: "70vh",
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
