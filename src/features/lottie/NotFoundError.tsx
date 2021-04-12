import React from 'react';
import Lottie from 'react-lottie';
import notfounderror from './file/404-error-page-not-found.json';
import { useWindowSize } from '../../app/hooks';
import { Size } from '../../app/useWindowSize';

const NotFoundError = () => {
  let { height, width }: Size = useWindowSize();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notfounderror,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default NotFoundError;
