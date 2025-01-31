import Lottie from 'lottie-react';

import loadingAnimation from './shopping-loader.json';

export const Spinner = () => {
    return (<div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Lottie animationData={loadingAnimation} loop={true} style={{ width: "50%", height: "50%" }} />
    </div>)
}