import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/chart">Charts</Nav.Link>
            <NavDropdown title="Map" id="basic-nav-dropdown">
              <NavDropdown.Item href='http://127.0.0.1:5500/Mapping2/day.html'>Day time</NavDropdown.Item>
              <NavDropdown.Item href='http://127.0.0.1:5500/Mapping2/night.html'>Night time</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/repo">Reports</Nav.Link>
          </Nav>
          <Button onClick={props.logout} style={{maxHeight:"50px" , marginRight:"10px"}}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;