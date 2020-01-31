import React, { Component, useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Row,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import firebase from "../firebase";
import "./Map.css";
const API_KEY = "AIzaSyArr8VXow5emvehdROfhZ7YcItqSBBNYbQ";
const ListMenu = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  return (
    <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
      <Button
        color="danger"
        onClick={toggle}
        style={{ marginBottom: "0.25rem", marginTop: "0.5rem", width: "100%" }}
        block
      >
        ID : {props.value.id}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Container fluid>
              <Row>
                <Col>
                  <img
                    src={props.value.img_link}
                    style={{
                      width: "150px",
                      height: "150px"
                    }}
                    alt="Spam"
                  ></img>
                </Col>
                <Col>
                  <h6>Latitude : {props.value.latitude}</h6>
                  <h6>Longitude : {props.value.longitude}</h6>
                  <h6>Severity : {props.value.severity}</h6>
                  <br></br>
                  <Button outline color="danger" onClick={toggleModal}>
                    Image Link
                  </Button>
                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                      Coordinates : {props.value.latitude},
                      {props.value.longitude}
                    </ModalHeader>
                    <ModalBody>
                      <img
                        alt="Spam"
                        src={props.value.img_link}
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "1rem"
                        }}
                      ></img>
                    </ModalBody>
                  </Modal>
                </Col>
                <Col>
                  <iframe
                    title={props.value.id}
                    width="100%"
                    frameBorder="0"
                    style={{ border: "0" }}
                    src={`https://www.google.com/maps/embed/v1/place?q=${props.value.latitude},${props.value.longitude}&key=${API_KEY}&zoom=18`}
                    allowFullScreen
                  ></iframe>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default class Severity1Map extends Component {
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
      let a = 1;
      for (let item in places) {
        latLng = places[item].gps_coordinates.split(",");
        assignLatitude = latLng[0];
        assignLongitude = latLng[1];
        if (
          places[item].issue_fixed === "false" &&
          (places[item].severity === 0 || places[item].validity === 0)
        ) {
          potholes.push({
            id: a,
            latitude: parseFloat(assignLatitude),
            longitude: parseFloat(assignLongitude),
            img_link: places[item].img_link,
            severity: "None"
          });
          a = a + 1;
        }
      }
      this.setState({
        places: potholes
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.places.map(data => (
          <ListMenu key={data.id} value={data} />
        ))}
      </div>
    );
  }
}
