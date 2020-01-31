import React, { Component } from "react";
import firebase from "../firebase";
import { compose } from "recompose";
import "./Map.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 20.3546207, lng: 85.8206245 }}
    >
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude)
            }}
          >
            {props.selectedMarker === marker && (
              <InfoWindow>
                <div className="infoWindowStyle">
                  <div className="card" style={{ maxWidth: "100%" }}>
                    <img
                      alt="Pothole"
                      src={marker.img_link}
                      style={{
                        width: "80%",
                        paddingTop: "1rem",
                        alignSelf: "center"
                      }}
                    ></img>
                    <div className="card-body" style={{ textAlign: "left" }}>
                      <h6 className="card-title">
                        Latitude : {marker.latitude}
                      </h6>
                      <h6 className="card-title">
                        Longitude : {marker.longitude}
                      </h6>
                      <h6 className="card-title">
                        Severity : {marker.severity}
                      </h6>
                      <h6 className="card-title">
                        Action Taken : {marker.action_taken}
                      </h6>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      selectedMarker: false
    };
  }
  componentDidMount() {
    let rootRef = firebase.database().ref("/results");
    rootRef.on("value", snap => {
      let places = snap.val();
      let potholes = [];
      let latLng = [];
      let assignLatitude = [];
      let assignLongitude = [];
      let assignSeverity = [];
      let assignAction = [];
      for (let item in places) {
        latLng = places[item].gps_coordinates.split(",");
        assignLatitude = latLng[0];
        assignLongitude = latLng[1];
        if (places[item].severity === 1) {
          assignSeverity = "Low";
        } else if (places[item].severity === 2) {
          assignSeverity = "Medium to High";
        } else if (places[item].severity === 3) {
          assignSeverity = "Extremely High";
        } else {
          assignSeverity = "Low";
        }
        if (places[item].action_taken === "true") {
          assignAction = "Yes";
        } else {
          assignAction = "No";
        }
        if (places[item].issue_fixed === "false" && places[item].validity > 0) {
          potholes.push({
            id: item,
            latitude: assignLatitude,
            longitude: assignLongitude,
            severity: assignSeverity,
            img_link: places[item].img_link,
            action_taken: assignAction
          });
        }
      }
      this.setState({
        places: potholes
      });
    });
  }
  handleClick = marker => {
    this.setState({ selectedMarker: marker });
  };
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.places}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHrKJe9b5FK5azAKfYo5MoH98-Lv9Q8ag&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
