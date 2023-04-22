import React from 'react'

function Footer() {
  return (
    <>
      <main className="main-section"></main>

      <footer className="footer-sec">
        <div className="main">
          <div className="logo row">
            <div className="footer-header">
              {/* <img
                src="https://i.postimg.cc/tgk8X2w7/manik-low-resolution-logo-white-on-transparent-background.png"
                className="manik"
                alt=""
              /> */}
              <h1>🚀 ｄｖｅｒｓｅ </h1>
            </div>
            <div className="logo-des">
              <p>
                Welcome to Dverse, the decentralized universe where we offer a
                range of services including data storage, chat, video calls and
                much more. Our platform brings you decentralized solutions that
                are designed to meet your needs. From the stars to your screen,
                Dverse offers a unique experience that combines cutting-edge
                technology with the power of decentralization.Join us today and 
                experience a new level of security,privacy and efficiency.
              </p>

              <a href="#" className="btn-know">
                Know More
              </a>
            </div>
          </div>

          <div className="office row">
            <div className="footer-header">
              <h3>Office</h3>
            </div>
            <div className="office-des">
              {/* <p>here are <br> many variations of passages<br>of Lorem Ipsum<br>available</p> */}

              <a href="#">dverse@gmail.com</a>

              <p className="num">+91-9999999999</p>
            </div>
          </div>

          <div className="newsletter row">
            <div className="footer-header">
              <h3>Hey! say 👋 on...</h3>
            </div>
            <div className="newsletter-des">
              {/* icons  */}

              <ul className="wrapper">
                <a href="#" target="_blank">
                  <li className="icon linkedin">
                    <span className="tooltip">LinkedIn</span>
                    <span>
                      <i className="fab fa-linkedin"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank">
                  <li className="icon github">
                    <span className="tooltip">GitHub</span>
                    <span>
                      <i className="fab fa-github"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank">
                  <li className="icon facebook">
                    <span className="tooltip">Facebook</span>
                    <span>
                      <i className="fab fa-facebook-f"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank">
                  <li className="icon instagram">
                    <span className="tooltip">Instagram</span>
                    <span>
                      <i className="fab fa-instagram"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank">
                  <li className="icon twitter">
                    <span className="tooltip">Twitter</span>
                    <span>
                      <i className="fab fa-twitter"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank">
                  <li className="icon github">
                    <span className="tooltip">CodePen</span>
                    <span>
                      <i className="fab fa-codepen"></i>
                    </span>
                  </li>
                </a>
              </ul>

              {/* icons end  */}
            </div>
          </div>
        </div>
        <h6 style={{ textAlign: "center" }}>build with 💖, by dverse</h6>
        <div className="copyright">
          <p>© Copyright 2022 DVERE.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer