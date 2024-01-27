import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';

function BasicExample(props) {
  const [time, setTime] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 1000 * 60); // Update time every minute

    return () => clearInterval(interval);
  }, []);

  const getMapLink = () => {
    return time < 18 ? 'https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/day.html' : 'https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/night.html';
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/chart">Charts</Nav.Link>
            {/* <NavDropdown title="Map" id="basic-nav-dropdown">
              <NavDropdown.Item href='https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/day.html'>Day time</NavDropdown.Item>
              <NavDropdown.Item href='https://490bj8xz-5500.inc1.devtunnels.ms/ml-model/night.html'>Night time</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href={getMapLink()} target='_blank'>Map</Nav.Link>
            <Nav.Link href="/repo">Reports</Nav.Link>
          </Nav>
          <Button onClick={props.logout} style={{maxHeight:"50px" , marginRight:"10px",color:"white",backgroundColor:'blue'}}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;