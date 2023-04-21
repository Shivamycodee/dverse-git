import React, { useState, useEffect } from "react";
import LazyLoader from "./lazyLoader";
import { useGlobalContext } from "../../context/prime";

export default function withLazyLoader(WrappedComponent) {

  
  const WithLazyLoader = (props) => {
     const { setIsLazy } = useGlobalContext();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsReady(true);
        setIsLazy(false);
      }, 500); // Change this value to adjust the delay time

      // return () => clearTimeout(timer);
    }, [setIsLazy]);

    if (!isReady) {
      return <LazyLoader />;
    }

    return <WrappedComponent {...props} />;
  };

    WithLazyLoader.displayName = `withLazyLoader(${getDisplayName(
      WrappedComponent
    )})`;

      return WithLazyLoader;

}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
