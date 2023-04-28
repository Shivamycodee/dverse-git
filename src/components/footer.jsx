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
              {/* <h1>🚀 ｄｖｅｒｓｅ </h1> */}
              <h1 style={{ letterSpacing: 7 }}>🚀 DVERSE</h1>
            </div>
            <div className="logo-des">
              <p className="formatted-text">
                Welcome to Dverse, the decentralized universe where we offer a
                range of services including data storage, chat, video calls and
                much more. Our platform brings you decentralized solutions that
                are designed to meet your needs. Join us today and experience a
                new level of security,privacy and efficiency.
              </p>

              <a
                href="https://shivams-organization.gitbook.io/dverse-docs/"
                className="btn-know"
                target="_blank"
                rel="noreferrer"
              >
                Know More
              </a>
            </div>
          </div>

          <div className="office row">
            <div className="footer-header">
              {/* <h2>ｏｆｆｉｃｅ</h2> */}
              <h1 style={{ letterSpacing: 7 }}>OFFICE</h1>
            </div>
            <div className="office-des">
              <a href="https://www.gmail.com" target="_blank" rel="noreferrer">
                dverse@gmail.com
              </a>
              <p className="num">+91-8758128274</p>
            </div>
          </div>

          <div className="newsletter row">
            <div className="footer-header">
              {/* <h2>ｄｒｏｐ ａ 👋 ｏｎ．．．</h2> */}
              <h4 style={{ letterSpacing: 0 }}>DROP A 👋 ON...</h4>
            </div>
            <div className="newsletter-des">
              {/* icons  */}

              <ul className="wrapper">
                <a
                  href="https://www.linkedin.com/in/shivam-yadav-917863224/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="icon linkedin">
                    <span className="tooltip">LinkedIn</span>
                    <span>
                      <i className="fab fa-linkedin"></i>
                    </span>
                  </li>
                </a>
                <a
                  href="http://github.com/shivamycodee"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="icon github">
                    <span className="tooltip">GitHub</span>
                    <span>
                      <i className="fab fa-github"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <li className="icon facebook">
                    <span className="tooltip">Devfolio</span>
                    <span>
                      <i className="fab fa-facebook-f"></i>
                    </span>
                  </li>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <li className="icon instagram">
                    <span className="tooltip">Instagram</span>
                    <span>
                      <i className="fab fa-instagram"></i>
                    </span>
                  </li>
                </a>
                <a
                  href="https://twitter.com/VibeWeb3"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="icon twitter">
                    <span className="tooltip">Twitter</span>
                    <span>
                      <i className="fab fa-twitter"></i>
                    </span>
                  </li>
                </a>
                <a
                  href="https://devfolio.co/@shivam_code"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="icon facebook">
                    <span className="tooltip">Devfolio</span>
                    <span>
                      {/* <i className="fab fa-codepen"></i> */}
                      <i class="fa-solid fa-d"></i>
                    </span>
                  </li>
                </a>
              </ul>

              {/* icons end  */}
            </div>
          </div>
        </div>
        {/* <h6 style={{ textAlign: "center" }}>build with 💖, by dverse</h6> */}
        <div className="copyright">
          <p>© Copyright 2022 DVERE.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer