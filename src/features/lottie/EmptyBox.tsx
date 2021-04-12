import React from 'react';
import Lottie from 'react-lottie';
import emptyBox from './file/empty-cart.json';

const EmptyBox = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyBox,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div style={{ fontSize: '40px', textAlign: 'center' }}>
        <p>Sorry we don't found any element.</p>
        <p>Please try again.</p>
      </div>
      <Lottie options={defaultOptions} height={400} width={500} />
    </div>
  );
};

export default EmptyBox;
