import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Roadmap() {
  return (
    <>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          // date="May 2023"
          date="April 2025"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          //   icon={<WorkIcon />}
        >
          {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
          <h4 className="vertical-timeline-element-subtitle">
            Version 1.0.0 Launched.
          </h4>
          <p>
            Basic functionality inclueds chatting, one-to-one video call,
            livestream and data storage.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ color: "#fff" }}
          // date="June 2023"
          date="June 2025"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h4
            style={{ color: "black" }}
            className="vertical-timeline-element-subtitle"
          >
            Payment System
          </h4>
          <p style={{ color: "black" }}>Including Crypto payment mechenisim.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          // date="July 2023"
          date="July 2025"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentStyle={{ color: "#fff" }}
        >
          <h4
            style={{ color: "black" }}
            className="vertical-timeline-element-subtitle"
          >
            Chatting Protocol
          </h4>
          <p style={{ color: "black" }}>
            Chatting protocol will be shifted from Matrix to Libp2p
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          // date="August 2023"
          date="August 2025"
          contentStyle={{ color: "#fff" }}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        >
          <h4
            className="vertical-timeline-element-subtitle"
            style={{ color: "black" }}
          >
            Conference Call
          </h4>
          <p style={{ color: "black" }}>
            one-to-one video call will be updated to secure conference calls.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          // date="September 2023"
          date="September 2025"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          contentStyle={{ color: "#fff" }}
        >
          <h4
            style={{ color: "black" }}
            className="vertical-timeline-element-subtitle"
          >
            Desktop Application
          </h4>
          <p style={{ color: "black" }}>
            A Desktop Application of DVERSE will be launched using electron.js
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          // date="October 2023"
          date="October 2025"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          contentStyle={{ color: "#fff" }}
        >
          <h4
            style={{ color: "black" }}
            className="vertical-timeline-element-subtitle"
          >
           Mobile Application
          </h4>
          <p style={{ color: "black" }}>
            A Mobile applicaiton for both android and ios will be launched.
          </p>
        </VerticalTimelineElement>

      </VerticalTimeline>
    </>
  );
}

export default Roadmap