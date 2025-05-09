import React, { useState } from 'react'

function Footer() {
  // Hover state for social icons and button
  const [hovered, setHovered] = useState({});

  // Helper for icon hover color
  const getIconStyle = (icon, baseColor) => ({
    fontSize: 28,
    color: hovered[icon] ? (baseColor.hover || baseColor.default) : baseColor.default,
    transition: 'color 0.2s',
  });

  // Helper for button hover
  const getButtonStyle = () => ({
    display: 'inline-block',
    background: hovered.button ? '#181818' : '#fff',
    color: hovered.button ? '#fff' : '#181818',
    padding: '10px 28px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
    border: '2px solid #fff',
    transition: 'all 0.2s',
    cursor: 'pointer',
  });

  return (
    <>
      <main style={{ minHeight: '40px' }}></main>

      <footer
        style={{
          background: 'linear-gradient(120deg, #181818 60%, #232526 100%)',
          color: '#fff',
          padding: '48px 0 0 0',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            flexWrap: 'wrap',
            gap: 40,
          }}
        >
          <div style={{ flex: 1, minWidth: 260, marginRight: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <h1 style={{ letterSpacing: 7, fontSize: 36, margin: 0, fontWeight: 800 }}>🚀 DVERSE</h1>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, marginBottom: 22, textAlign: 'left', opacity: 0.92 }}>
                Welcome to Dverse, the decentralized universe where we offer a range of services including data storage, chat, video calls and much more. Our platform brings you decentralized solutions that are designed to meet your needs. Join us today and experience a new level of security, privacy and efficiency.
              </p>
              <a
                href="https://shivams-organization.gitbook.io/dverse-docs/~/changes/SbFY9DcNxKmmcODmg0TI/"
                style={getButtonStyle()}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHovered(h => ({ ...h, button: true }))}
                onMouseLeave={() => setHovered(h => ({ ...h, button: false }))}
              >
                Know More
              </a>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 220, maxWidth: 340, marginLeft: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ letterSpacing: 0, fontSize: 22, margin: 0, fontWeight: 700 }}>DROP A 👋 ON...</h4>
            </div>
            <div>
              <ul style={{
                display: 'flex',
                gap: 22,
                listStyle: 'none',
                padding: 0,
                margin: 0,
                flexWrap: 'wrap',
              }}>
                <a
                  href="https://www.linkedin.com/in/shivam-yadav-917863224/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <li
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(h => ({ ...h, linkedin: true }))}
                    onMouseLeave={() => setHovered(h => ({ ...h, linkedin: false }))}
                  >
                    <span style={{ fontSize: 13, marginBottom: 4, color: '#fff', opacity: 0.7 }}>LinkedIn</span>
                    <span>
                      <i className="fab fa-linkedin" style={getIconStyle('linkedin', { default: '#0e76a8', hover: '#0072b1' })}></i>
                    </span>
                  </li>
                </a>
                <a
                  href="http://github.com/shivamycodee"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <li
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(h => ({ ...h, github: true }))}
                    onMouseLeave={() => setHovered(h => ({ ...h, github: false }))}
                  >
                    <span style={{ fontSize: 13, marginBottom: 4, color: '#fff', opacity: 0.7 }}>GitHub</span>
                    <span>
                      <i className="fab fa-github" style={getIconStyle('github', { default: '#fff', hover: '#f5c518' })}></i>
                    </span>
                  </li>
                </a>
                <a
                  href="https://twitter.com/VibeWeb3"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <li
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(h => ({ ...h, twitter: true }))}
                    onMouseLeave={() => setHovered(h => ({ ...h, twitter: false }))}
                  >
                    <span style={{ fontSize: 13, marginBottom: 4, color: '#fff', opacity: 0.7 }}>Twitter</span>
                    <span>
                      <i className="fab fa-twitter" style={getIconStyle('twitter', { default: '#1da1f2', hover: '#0a8ddb' })}></i>
                    </span>
                  </li>
                </a>
                <a
                  href="https://devfolio.co/@Shivamycodee"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <li
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(h => ({ ...h, devfolio: true }))}
                    onMouseLeave={() => setHovered(h => ({ ...h, devfolio: false }))}
                  >
                    <span style={{ fontSize: 13, marginBottom: 4, color: '#fff', opacity: 0.7 }}>Devfolio</span>
                    <span>
                      <i className="fa-solid fa-d" style={getIconStyle('devfolio', { default: '#fff', hover: '#ff6f00' })}></i>
                    </span>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 36, textAlign: 'center', fontSize: 15, opacity: 0.8, letterSpacing: 1 }}>
          <span style={{ display: 'block', marginBottom: 6 }}>Built with <span style={{ color: '#ff6f91', fontWeight: 700 }}>💖</span> by Shivam Yadav</span>
        </div>
        <div style={{ borderTop: '1px solid #333', marginTop: 12, padding: '18px 0 8px 0', textAlign: 'center', fontSize: 15, opacity: 0.7, letterSpacing: 1 }}>
          <p style={{ margin: 0 }}>© Copyright 2022 DVERE.</p>
        </div>
        {/* Responsive tweaks */}
        <style>{`
          @media (max-width: 800px) {
            footer > div:first-child {
              flex-direction: column !important;
              gap: 24px !important;
              padding: 0 8px !important;
            }
            footer > div > div {
              margin: 0 !important;
              max-width: 100% !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

export default Footer