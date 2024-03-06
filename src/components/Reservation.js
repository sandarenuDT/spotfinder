import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

function Reservation(props) {
  const { email } = useParams();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapCenter] = useState({ lat: 6.7231, lng: 79.9718, zoom: 9.5 });
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [location, setLocation] = useState(''); // State for location input
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(5); // Number of places per page

  useEffect(() => {
    axios
      .get('http://localhost:8070/Parking/parking')
      .then((response) => {
        setPlaces(response.data);
        console.log(places)
      })
      .catch((error) => {
        console.error('Error fetching parking places:', error);
      });
  }, []);

  const onMapClick = (mapProps, map, e) => {
    setShowingInfoWindow(false);
    setActiveMarker(null);
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const handleMapReady = (mapProps, map) => {
    // Handle map ready event
    // You can use 'map' here if needed
  };

  const handleCheckInTimeChange = (event) => {
    setCheckInTime(event.target.value);
  };

  const handleCheckOutTimeChange = (event) => {
    setCheckOutTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFindSpot = () => {
    // Filter parking places by location (name) inputted
    const filteredPlaces = places.filter((place) =>
      place.name.toLowerCase().includes(location.toLowerCase())
    );

    // Set the filtered places in the state
    setPlaces(filteredPlaces);
  };

  const mapStyles = {
    width: '500px',
    height: '400px',
  };

  const mapContainerStyle = {
    padding: '20px',
    margin: '0px 10px 0px 0px',
  };

  return (
    <div>
      <div>
        <div style={mapContainerStyle}>
          <Map
            google={props.google}
            initialCenter={mapCenter}
            zoom={mapCenter.zoom}
            onReady={handleMapReady}
            style={{ mapStyles, width: '1480px', height: '600px' }}
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                name={place.name}
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={onMarkerClick}
              />
            ))}
            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
              <div>
                <h3>{selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <div style={{ margin: '650px 0px 0px 100px' }}>
            {email}
          </div>
          <div style={{ margin: '10px 0px 0px 100px' }}>
            <label>Check-In Time:</label>
            <input type="time" value={checkInTime} onChange={handleCheckInTimeChange} className="form-control" />
          </div>
          <div style={{ margin: '10px 0px 0px 100px' }}>
            <label>Check-Out Time:</label>
            <input type="time" value={checkOutTime} onChange={handleCheckOutTimeChange} className="form-control" />
          </div>
          <div style={{ margin: '10px 0px 0px 100px' }}>
            <label>Location:</label>
            <input type="text" value={location} onChange={handleLocationChange} className="form-control" />
          </div>
          <div style={{ margin: '10px 0px 0px 100px' }}>
            <button onClick={handleFindSpot} className="btn btn-primary">
              Find Spot
            </button>
          </div>
        </div>

        <div style={{ margin: '700px 0px 0px 400px', width: '700px' }}>
          <h2>Parking Places</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Maximum Space</th>
              
                <th>Number of Vehicles</th>{/* Added column */}
              </tr>
            </thead>
            <tbody>
              {places.map((place, index) => (
                <tr key={index}>
                  <td>{place.name}</td>
                  <td>{place.latitude}</td>
                  <td>{place.longitude}</td>
                  <td>{place.maximumSpace}</td>
                  
                  <td>{place.numberofvehicles}</td> {/* Display numberofvehicles */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_r1LftMIeZyWlPoruJcQFQN4NYd-DgUk',
})(Reservation); 