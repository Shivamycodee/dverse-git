import React,{ useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useMatrixContext } from "../../context/matrix";
import ProfileChange from "./profileChange";
import { useGlobalContext } from "../../context/prime";

import Avatar, { genConfig } from "react-nice-avatar";



function TopBar() {

  
  const {setAddress } = useMatrixContext();
  const {
    profileFlag,
    setProfileFlag,
    avatarConfig,
    setAvatarConfig,
    userName,
    setUserName
  } = useGlobalContext();

  const { address, isConnecting, isDisconnected } = useAccount();
  const [flag,setFlag] = useState(false);


   const writeContract = async()=>{
   

    // Create an instance of the contract with the signer
    const contractWithSigner = contract.connect(signer);

    // Call the wimo function with an argument
    const wimoTx = await contractWithSigner.wimo(875812);
    console.log("wimo transaction:", wimoTx);

    // Wait for the transaction to be mined
    const receipt = await wimoTx.wait();
    console.log("wimo transaction receipt:", receipt);
  }


  useEffect(() => {
    if (address) {
      setAddress(address);
    }
  }, [address, setAddress]);


  // handle Offcanvas --- profile...

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  
  const handleCloseOffcanvas = () => {setShowOffcanvas(false)
  setFlag(false)};

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  
  
  // handle user avatar

  useEffect(() => {
    let storedConfig = localStorage.getItem("dverseIdAvatar");
    if (!storedConfig) {
      const newConfig = genConfig();
      localStorage.setItem("dverseIdAvatar", JSON.stringify(newConfig));
      storedConfig = JSON.stringify(newConfig);
    }
    setAvatarConfig(JSON.parse(storedConfig));
  }, [setAvatarConfig]);

  // handle user name

   useEffect(() => {
     let storedName = localStorage.getItem("dverseUserName");
     if (!storedName) {
       localStorage.setItem("dverseUserName", "king.eth");
       setUserName("king.eth");
     } else setUserName(storedName);
   }, [setUserName]);
  
  
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">Dverse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="https://shivams-organization.gitbook.io/dverse-docs/~/changes/SbFY9DcNxKmmcODmg0TI/" target="_blank">
                Docs
              </Nav.Link>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item href="chat">Chat</NavDropdown.Item>
                <NavDropdown.Item href="videocall">Video Call</NavDropdown.Item>
                <NavDropdown.Item href="livestream">Stream</NavDropdown.Item>
                <NavDropdown.Item href="drive">Store</NavDropdown.Item>
              </NavDropdown>
              {/* <Nav.Link href="#roadmap">Roadmap</Nav.Link> */}
            </Nav>
            <Nav>
              <ConnectButton></ConnectButton>
              <Nav.Link href="#profile" className="ml-2"></Nav.Link>
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
          <Offcanvas.Title style={{ marginLeft: "35%" }}>
            DVERSE ID
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <div className="box">
              <span className="title">🚀 ｄｖｅｒｓｅ 🚀</span>

              <div>
                {avatarConfig && (
                  <Avatar
                    className="userAvatar"
                    style={{
                      width: "10rem",
                      height: "10rem",
                      margin: "30px auto 40px auto",
                    }}
                    {...avatarConfig}
                  />
                )}

                <strong>{userName}</strong>

                {address ? (
                  <p>
                    {address.slice(0, 4)}...{address.slice(38)}
                  </p>
                ) : (
                  <p>connect your wallet</p>
                )}
                {/* <span>VALID</span> <span>01/28</span> */}
                <br></br>
                <button
                  style={{ width: "100%", marginBottom: 10 }}
                  data-label="Register"
                  className="rainbow-hover"
                  onClick={() => {
                    setFlag(true);
                    setProfileFlag(true);
                  }}
                >
                  <span className="sp">Change Profile</span>
                </button>
                <button
                  style={{ width: "100%" }}
                  data-label="Register"
                  className="rainbow-hover"
                >
                  <span className="sp">Share</span>
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
        {flag && profileFlag ? <ProfileChange /> : null}
      </Offcanvas>
    </>
  );
}


export default TopBar;
