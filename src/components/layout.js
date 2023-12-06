import Navbar from './navbar'
import {useGlobalContext} from '../../context/prime'

function Layout({children}) {

  const {isLazy} = useGlobalContext();

      const starsCount = 100;
      const stars = [];

      for (let i = 0; i < starsCount; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = 3 + Math.random() * 5; // Updated to make stars move faster
        stars.push(
          <div
            className="star"
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${animationDuration}s`,
            }}
          ></div>
        );
      }

      const shootingStarsCount = 10;
      const shootingStars = [];

      for (let i = 0; i < shootingStarsCount; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = 7 + Math.random() * 4;
        shootingStars.push(
          <div
            className="shooting-star"
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${animationDuration}s`,
            }}
          ></div>
        );
      }

  return (
    <>
      <div className="universe-background">
        {stars}
        {shootingStars}
      </div>
      {isLazy ? null:<Navbar />}
      {children}
    </>
  );
}

export default Layout