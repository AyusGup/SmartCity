import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import avatar from '../user.png';
import logo from './icons/logo.png';
import { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUser } from '@fortawesome/free-solid-svg-icons';

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
    const response= await fetch(`https://citypulse.onrender.com/sms?lat=${loc.lat}&lng=${loc.lng}`,{
      method: "GET" ,
     })
     const result= await response.json();
     return;
  }

  return (
    <Navbar expand="lg" id="top" className="bg-body-tertiary bg-blue-400" sticky="top" style={{width:"100%"}}>
      <Container>
        <Navbar.Brand><img src={logo} className='rounded-full h-10' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/secret">Blogs</Nav.Link>
            <Nav.Link href="/report">Report</Nav.Link>
            <NavDropdown title="Map" id="basic-nav-dropdown">
              <NavDropdown.Item href='https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/day.html' target='_blank'>Day time</NavDropdown.Item>
              <NavDropdown.Item href='https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/night.html' target='_blank'>Night time</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <>
            <Button onClick={sendSms} className='max-h-50 bg-blue-500 mr-3'>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            </Button>  
            <Button onClick={props.logout} className='max-h-50 bg-blue-500 mr-3 font-bold'>Log Out</Button>
            <Button style={{maxHeight:"50px" , marginRight:"10px"}}
              href="/profile"
            >
              <FontAwesomeIcon icon={faUser} />
            </Button>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;

/*  <Button onClick={props.emergency} style={{maxHeight:"50px" , marginRight:"10px"}}>Emergency</Button> */
