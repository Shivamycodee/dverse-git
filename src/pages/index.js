import Head from 'next/head'
import Link from "next/link"
import Image from 'next/image'
import { Typewriter } from "react-simple-typewriter";


import Styles from "@/styles/index.module.css";


import { useState, useEffect,useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WithLazyLoader from '../components/withLazyLoader'
import Footer from '../components/footer'

const showStr = [
  "Welcome to Dverse! the decentralized universe! 🚀",
  "Decentralized data store, chat, video call, and more.",
  "From the stars to your screen, Dverse brings you decentralized awesomeness",
  "Enter the dark sky of Dverse and discover decentralized wonders. 🌑",
  "Dverse: where decentralization meets the universe! 🪐",
];

function Home() {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Head>
        <title>Dverse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div
        className={Styles.magicHolder}
        style={{ background: "black", margin: 20 }}
      >
        <p>
          <Typewriter
            words={showStr}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            // onLoopDone={handleDone}
            // onType={handleType}
          />
        </p>
        <Image
          style={{ borderRadius: "10px" }}
          src="/images/v2.gif"
          alt="spaceMan"
          width={450} // Provide the width property
          height={400} // Provide the height property
        />
      </div>

      <div className={Styles.gridContainer}>
        <Link href="chat">
          <div className={Styles.cardWhite}>
            <Image height={"100%"} width={"100%"} src="/images/coverImages/roboChat.jpg" alt="chat" />
          </div>
        </Link>
        <Link href="videocall">
          <div className={Styles.cardWhite}>
            <Image height={"100%"} width={"100%"} src="/images/coverImages/videoCall01.jpg" alt="chat" />
          </div>
        </Link>
        <Link href="chat">
          <div className={Styles.cardWhite}>
            <Image height={"100%"} width={"100%"} src="/images/coverImages/videoCall02.jpg" alt="chat" />
          </div>
        </Link>
        <Link href="chat">
          <div className={Styles.cardWhite}>
            <Image height={"100%"} width={"100%"} src="/images/coverImages/videoCall03.jpg" alt="chat" />
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default WithLazyLoader(Home);