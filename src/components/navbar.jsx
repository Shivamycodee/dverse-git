import { useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useMatrixContext } from "../../context/matrix";


function TopBar() {

  
  const { setAddress } = useMatrixContext();
  const { address, isConnecting, isDisconnected } = useAccount();
  if(address) setAddress(address)
   

  



  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);



  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">Dverse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#docs">Docs</Nav.Link>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="#chat">Chat</NavDropdown.Item>
                <NavDropdown.Item href="#video-call">
                  Video Call
                </NavDropdown.Item>
                <NavDropdown.Item href="#stream">Stream</NavDropdown.Item>
                <NavDropdown.Item href="#store">Store</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#roadmap">Roadmap</Nav.Link>
            </Nav>
            <Nav>
              <ConnectButton></ConnectButton>
              <Nav.Link href="#profile" className="ml-2">
                <i className="fas fa-user-circle" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            style={{ borderRadius: "12px" }}
            variant="outline-dark"
            onClick={handleShowOffcanvas}
          >
            USER 👤
          </Button>
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        placement="end"
        className="user-profile-offcanvas mycanva"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Hey Squad! 😎</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <div className="box">
              <span className="title">GLASS EFFECT</span>
              <div>
                <strong>JOE WATSON SBF</strong>
                <p>0000 000 000 0000</p>
                <span>VALID</span> <span>01/28</span>
                <br></br>
                <button
                  style={{ width: "100%" }}
                  data-label="Register"
                  className="rainbow-hover"
                >
                  <span className="sp">Share 🤙</span>
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default TopBar;
