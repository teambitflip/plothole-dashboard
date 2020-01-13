import React, { Component, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 20.2961,
            lng: 85.8245
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"Bhubaneswar"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
          >
            <div className="card card-style">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSml9XQieWck8AyQcvBKT0HDZxOeo5BTmjL37LAhl4fHke-coSw"
                className="img-card"
              ></img>

              <div className="card-body card-body-style">
                <h5 className="card-title">Validity: %</h5>
                <h6 className="card-subtitle mb-2 text-muted"> Priority</h6>
              </div>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCHrKJe9b5FK5azAKfYo5MoH98-Lv9Q8ag"
})(MapContainer);
