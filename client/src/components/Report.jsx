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
import { Toaster, toast } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';

// const RedirectAndReload = () => {
//   const history = useHistory();

//   const redirectToPage = () => {
//     // Redirect to the desired page
//     history.push('/new-page');

//     // Reload the page
//     window.location.reload(true); // Pass true to force a full page reload
//   };


export default function App() {
  const formD = useRef({
    time:"",
    desc:"",
    problem:0,
    latitude:null,
    longitude:null,
    file:"",
    fileName:null
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  async function handleFileUpload(e){
    const file= e.target.files[0];
    formD.current.fileName = e.target.files[0].name;
    const base64= await convertToBase64(file);
    formD.current.file = base64;
  }
  async function submitReport(e) {
    try{
    e.preventDefault();
    setLoading(true);
    formD.current.time = e.target[0].value;
    formD.current.desc = e.target[1].value;
    formD.current.problem = e.target[2].value;
    const response= await fetch("https://citypulse.onrender.com/api/report",{
      method: "POST",
      body: JSON.stringify({data:formD.current, customToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
    const res= await response.json();
    if(res.message === "success"){
      await fetch("https://smartcity-3sz3.onrender.com/map");
      toast.success("report submitted successfully!");
    }
    setLoading(false);
    formD.current={
      time:"",
      desc:"",
      problem:0,
      latitude:null,
      longitude:null,
      file:"",
      fileName:null
    }
  }
  catch(err){
    toast.error("error in submitting report");
    console.log("error in report area ",err);
  }
  }

  function FormView(){
    return(
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
                        <option value={10}>Riot</option>
                        <option value={9}>Murder</option>
                        <option value={8}>Rape</option>
                        <option value={7}>Molestation</option>
                        <option value={6}>Kidnapping</option>
                        <option value={5}>Violence</option>
                        <option value={4}>Robbery</option>
                        <option value={3}>Theft</option>
                        <option value={2}>Accident</option>
                        <option value={1}>Miscellaneous</option>
                    </Form.Select>
                </Col>
                {/* <Col sm={7} className="mb-4 element">
                    <Form.Select aria-label="Default select example" name="seriousness">
                        <option>select your complaint seriousness</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </Form.Select>
                </Col> */}
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
                <Button type="submit" className="mb-4 element bg-blue-500" >
                    Submit
                </Button>
            </Form>
        </Container>
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-20 z-500">
            <RingLoader
              color={"#FFFFFF"}
              size={150}
              loading={loading}
            />
          </div>
        
      ) : (
    <Container style={{height:"100vh"}}>
      <div className='fixed top-2 left-5 w-[100%] mb-5'>
      <FontAwesomeIcon icon={faHome} className='text-[30px]' onClick={()=>{
        navigate('/secret');
        window.location.reload(true);
      }} />
      </div>
      
      <div id='reportForm'>
        <FormView />
      </div>
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

    </Container>)}
  </>
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
