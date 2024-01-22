import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import avatar from '../user.png';
import { useState, useEffect } from 'react';

/**/
function OffcanvasExample(props) {
  const [loc, setLoc] = useState({});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
  }

  function showPosition(position) {
    setLoc({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }

    useEffect(() => {
      getLocation();
    }, []);

  async function sendSms(){
    console.log("sms");
    const response= await fetch(`http://localhost:8080/sms?lat=${loc.lat}&lng=${loc.lng}`,{
      method: "GET" ,
     })
     const result= await response.json();
     return;
  }

  return (
    <Navbar expand="lg" id="top" className="bg-body-tertiary" sticky="top" style={{width:"100%"}}>
      <Container>
        <Navbar.Brand>Virangana</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/secret">Blogs</Nav.Link>
            <Nav.Link href="/report">Report</Nav.Link>
            <Nav.Link href="http://127.0.0.1:5500/Mapping/map.html">Map</Nav.Link>
          </Nav>
          <>
            <Button onClick={sendSms} style={{maxHeight:"50px" , marginRight:"10px"}}>Alert</Button>  
            <Button onClick={props.logout} style={{maxHeight:"50px" , marginRight:"10px"}}>Log Out</Button>
            <Button
                href="/profile"
              >
                Profile
            </Button>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;

/*  <Button onClick={props.emergency} style={{maxHeight:"50px" , marginRight:"10px"}}>Emergency</Button> */