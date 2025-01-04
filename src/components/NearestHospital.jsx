import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/NearestHospital.css";

const NearestHospital = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lon: 0 });
  const [hospitals, setHospitals] = useState([]);
  const apiKey = "AlzaSyLZZHqZwZkY3U5Ysb2laO5VxVfH_srOGtB"; // Replace with your GoMaps API key

  useEffect(() => {
    const leafletMap = L.map("map").setView([0, 0], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(leafletMap);
    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  const refreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          updateMapWithLocation(latitude, longitude);
          findNearbyHospitals(latitude, longitude);
        },
        () => {
          alert("Unable to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const updateMapWithLocation = (lat, lon) => {
    if (map) {
      map.setView([lat, lon], 13);

      // Using a valid icon URL
      const userIcon = L.icon({
        iconUrl: "https://img.icons8.com/ios/452/marker.png", // Working icon URL
        iconSize: [24, 24], // Icon size
        iconAnchor: [12, 12], // Anchor point
      });

      L.marker([lat, lon], { icon: userIcon })
        .addTo(map)
        .bindPopup("Your Accurate Location")
        .openPopup();
    }
  };

  const findNearbyHospitals = (lat, lon) => {
    const radius = 5000;
    fetch(
      `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=hospital&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const hospitalList = data.results.map((hospital) => ({
            id: hospital.place_id,
            name: hospital.name,
            lat: hospital.geometry.location.lat,
            lon: hospital.geometry.location.lng,
            address: hospital.vicinity,
            link: `https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${hospital.geometry.location.lat},${hospital.geometry.location.lng}`,
          }));
          setHospitals(hospitalList);
          updateHospitalMarkers(hospitalList);
        }
      })
      .catch((error) => console.error("Error fetching hospitals:", error));
  };

  const updateHospitalMarkers = (hospitalList) => {
    if (map) {
      hospitalList.forEach((hospital) => {
        L.marker([hospital.lat, hospital.lon])
          .addTo(map)
          .bindPopup(`
            <b>${hospital.name}</b><br>
            ${hospital.address}<br>
            <a href="${hospital.link}" target="_blank">Get Directions</a>
          `);
      });
    }
  };

  return (
    <div className="nearest-hospital">
      <h2>Find Nearest Hospitals</h2>
      <button onClick={refreshLocation}>Refresh Location</button>
      <div className="container">
        <div id="map"></div>
        <div className="hospital-table">
          <table>
            <thead>
              <tr>
                <th>Hospital Name</th>
                <th>Get Directions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id}>
                  <td>{hospital.name}</td>
                  <td>
                    <a href={hospital.link} target="_blank" rel="noopener noreferrer">
                      Directions
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NearestHospital;
