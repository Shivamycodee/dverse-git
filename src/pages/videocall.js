import React,{useEffect} from 'react'
import VideoCallComponent from '@/components/videoCallComponent'
import withLazyLoader from '@/components/withLazyLoader'
import { Button } from "react-bootstrap";
import { useMatrixContext } from '../../context/matrix';

function Videocall() {

  const { address } = useMatrixContext();

  return (
    <>
    {address ? <VideoCallComponent />:<div>
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
          }
    </>
  );
}

export default withLazyLoader(Videocall);