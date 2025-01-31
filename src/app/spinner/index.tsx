import React, { useState, useEffect } from 'react';
import loadingAnimation from './shopping-loader.json';

export const Spinner = () => {
  const [LottieComponent, setLottieComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Dynamically import Lottie only in the browser
    import('lottie-react').then((module) => {
      setLottieComponent(() => module.default);
    });
  }, []);

  if (!LottieComponent) {
    return <div>Loading spinner...</div>; // Fallback while Lottie is loading
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <LottieComponent
        animationData={loadingAnimation}
        loop={true}
        style={{ width: '50%', height: '50%' }}
      />
    </div>
  );
};