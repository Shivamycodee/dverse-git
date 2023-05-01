import React from 'react'
import DriveComponent from '../components/driveComponent'
import withLazyLoader from '@/components/withLazyLoader'
import DriveData from '@/components/driveData'
import { useMatrixContext } from '../../context/matrix'
import { Button } from "react-bootstrap";


function Drive() {

  const {address} = useMatrixContext();

  return address ? (
    <div className="drive-holder">
      <DriveComponent />
      <div className="data-css">
        <DriveData />
      </div>
    </div>
  ) : (
    <div>
      <div
        style={{ margin: "15% 20% 0 20%", background: "green" }}
        className="d-grid gap-2"
      >
        <Button
          style={{ padding: "7%", fontSize: "35px", fontWeight: "90" }}
          variant="light"
          size="lg"
        >
          Connect Your Wallet 👆
        </Button>
      </div>
    </div>
  );
}

export default withLazyLoader(Drive);