import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [41.9981 , 21.4254];
const defaultZoom = 11;
const LeafIcon = L.Icon.extend({
  options: {iconSize: [24,24], iconAnchor: [12, 24], popupAnchor: [0, -24]},
});
      const airportIcon = new LeafIcon({
          iconUrl:
            "data:image/png;base64,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",
        }),
        compassIcon = new LeafIcon({
          iconUrl:
            "data:image/png;base64,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",
        });


const MapPage = () => {
      const mapRef = useRef();
let locations = [
  {
    lat: 41.956662,
    lng: 21.622830,
    name: "Airport Alexander the Great",
    type: "Transport",
    icon: airportIcon,
    link: '/attraction'
  },
  {
    lat: 41.996123,
    lng: 21.431698,
    name: "Macedonia Square",
    type: "Attraction",
    icon: compassIcon
  },
];


  return (
    <div className="flex align-center justify-center">
      <div style={{ width: "80vw", height: "80vh" }}>
        <MapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {locations.map((attraction) => (
            <Marker
              position={[attraction.lat, attraction.lng]}
              icon={attraction.icon}
            >
              <Popup>
                <h1 className="text-lg font-semibold mb-1">
                  {attraction.name}
                </h1>
                <h3>
                  <span className="font-bold">Type: </span>
                  {attraction.type}
                </h3>
                {attraction.link && (
                  <div className="flex justify-center w-100">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.pathname = attraction.link;
                      }}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 px-3 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
  );
};
export default MapPage;
