import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import MapView from './Map/Map';
import {Map , Marker , Popup, TileLayer ,MapContainer, useMap} from 'react-leaflet'
import L from 'leaflet';
import icon from "./Map/constants";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";


export default function App() {
  const formD = useRef({
    time:"",
    desc:"",
    problem:"",
    seriousness:"",
    latitude:null,
    longitude:null,
    file:"",
    fileName:null
  })
  const navigate = useNavigate();
  
  async function handleFileUpload(e){
    const file= e.target.files[0];
    formD.current.fileName = e.target.files[0].name;
    const base64= await convertToBase64(file);
    console.log("uploaded");
    formD.current.file = base64;
    
  }

  async function submitReport(e) {
    e.preventDefault();
    formD.current.time = e.target[0].value;
    formD.current.desc = e.target[1].value;
    formD.current.problem = e.target[2].value;
    formD.current.seriousness = e.target[3].value;

    const response= await fetch("http://localhost:8080/api/report",{
      method: "POST",
      body: JSON.stringify({data:formD.current, customToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
    const res= await response.json();
    console.log(res);
    e.target.reset();
  }

  function FormView(){
    return(
      <>
        <Container id="rf" >
          <Form onSubmit={submitReport} id="f">
                <label htmlFor="formHorizontalEmail" className='element'>Select time of incident:</label>
                <Form.Group as={Row} className="mb-4 element" controlId="formHorizontalEmail">
                    <Col sm={7}>
                    <Form.Control type="time"  name="time" />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-4 element" >
                    <Col sm={7}>
                    <Form.Control as="textarea" rows={3} placeholder='enter your description' name="desc" />
                    </Col>
                </Form.Group>
                <Col sm={7} className="mb-4 element">
                    <Form.Select aria-label="Default select example" name="problem" >
                        <option>select your complaint</option>
                        <option value="Lighting issues">Lighting issues</option>
                        <option value="Safety Concerns">Safety Concerns</option>
                        <option value="Violence Report">Violence Report</option>
                        <option value="Molestation Cases">Molestation Cases</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </Form.Select>
                </Col>
                <Col sm={7} className="mb-4 element">
                    <Form.Select aria-label="Default select example" name="seriousness">
                        <option>select your complaint seriousness</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </Form.Select>
                </Col>
                <Col sm={7} className='element'>
                    <InputGroup className="mb-4">
                        <Form.Control
                        accept=".jpeg, .png, .jpeg"
                        type="file"
                        name="MyFile"
                        onChange={(e) => handleFileUpload(e)}
                        label={formD.current.fileName}
                        />
                    </InputGroup>
                </Col>
                <Button variant="primary" type="submit" className="mb-4 element" >
                    Submit
                </Button>
            </Form>
        </Container>
      </>
    );
  }
  
  function LocationMarker() {
    const [position, setPosition] = useState(null);  
    const [bbox, setBbox] = useState([]);
    const markerRef = useRef(null)
    const map = useMap();


    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
        formD.current.latitude = e.latlng.lat;
        formD.current.longitude = e.latlng.lng;
        console.log(formD.current);
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon} ref={markerRef} draggable={true} eventHandlers={{
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
          formD.current.latitude = marker.getLatLng().lat;
          formD.current.longitude = marker.getLatLng().lng;
        },
      }}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <Container style={{height:"100vh"}}>
      <div className='mb-5' id='map'>
          <MapContainer
          center={[28.7041, 77.1025]}
          zoom={18}
          scrollWheelZoom
          style={{ height: "80vh"}}
          >
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          </MapContainer>
      </div>

      <div id='reportForm'>
        <FormView />
      </div>
    </Container>
  );
}

function convertToBase64(file){
	return new Promise((resolve,reject) => {
	  const fileReader= new FileReader();
	  fileReader.readAsDataURL(file);
	  fileReader.onload = () => {
		resolve(fileReader.result)
	  };
	  fileReader.onerror = (err) => {
		reject(err);
	  }
	})
  }