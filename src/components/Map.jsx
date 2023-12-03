import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const defaultCenter = [41.9981, 21.4254];
const defaultZoom = 11;
const LeafIcon = L.Icon.extend({
  options: { iconSize: [24, 30], iconAnchor: [12, 24], popupAnchor: [0, -20] },
});
const attractionIcon = new LeafIcon({
    iconUrl:
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%23db4110&size=small&icon=attractions&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1",
  }),
  compassIcon = new LeafIcon({
    iconUrl:
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%238b8b8b&size=small&icon=trip_origin&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1",
  });
  const viewpointIcon = new LeafIcon({
    iconUrl:
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%233a9b1c&size=small&icon=landscape&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1",
  });
  const museumIcon = new LeafIcon({
    iconUrl:
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%23a58a31&size=small&icon=museum&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=0.7&apiKey=ba18d9a04ea946e0908155e7bce3efc1",
  });
  const artIcon = new LeafIcon({
    iconUrl:
      "https://api.geoapify.com/v1/icon/?type=awesome&color=%231c629b&size=small&icon=image&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1",
  });
  const monumentIcon = new LeafIcon({
    iconUrl: "https://api.geoapify.com/v1/icon/?type=awesome&color=%237a4992&size=small&icon=castle&iconType=material&iconSize=small&strokeColor=%23ffffff&noShadow&noWhiteCircle&scaleFactor=2&apiKey=ba18d9a04ea946e0908155e7bce3efc1"
  })

const MapPage = () => {
    let history = useNavigate();
  const mapRef = useRef();
  const [locations, setLocations] = useState([])
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  let firstLetterBig = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let getIcon = (type) => {
    if (type === "attraction") return attractionIcon;
    else if (type === "artwork") return monumentIcon;
    else if (type === "gallery") return artIcon;
    else if (type === "museum") return museumIcon;
    else if (type === "viewpoint") return viewpointIcon;
    return compassIcon
  }

  let fetchData = async () => {
    const response = await axios.get("http://localhost:5000/places");
    let tmp = []
    let data = response.data;
    data.forEach((location) => {
      tmp.push({
        lat: location[2],
        lng: location[3],
        name: location[4],
        type: location[5],
        icon: getIcon(location[5]),
        link: "/attraction?id="+location[0]
      })
    })
    setLocations(tmp)
    setFetched(true)
  }

  return fetched ? (
    <div
      className="w-100 flex flex-column items-center justify-center rounded"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div
        style={{ width: "80vw", height: "80vh", zIndex: 0, background: "none" }}
      >
        <MapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
        >
          <TileLayer
            style={{ zIndex: 0 }}
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
                        history(attraction.link)
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
    <p>Loading...</p>
  );
};
export default MapPage;
