import {useState,useEffect} from 'react'

function LazyLoader({flag}) {


  return (
    <>
        <div className="loader-container">
          <div className="solar-system">
            <div className="sun"></div>
            <div className="planet mercury"></div>
            <div className="planet venus"></div>
            <div className="planet earth"></div>
            <div className="planet mars"></div>
            <div className="planet jupiter"></div>
            <div className="planet saturn"></div>
            <div className="planet uranus"></div>
            <div className="planet neptune"></div>

            <div className="planet-orbit mercury-orbit"></div>
            <div className="planet-orbit venus-orbit"></div>
            <div className="planet-orbit earth-orbit"></div>
            <div className="planet-orbit mars-orbit"></div>
            <div className="planet-orbit jupiter-orbit"></div>
            <div className="planet-orbit saturn-orbit"></div>
            <div className="planet-orbit uranus-orbit"></div>
            <div className="planet-orbit neptune-orbit"></div>
            <div className="loading-text">LOADING</div>
          </div>
        </div>
    </>
  );
}

export default LazyLoader