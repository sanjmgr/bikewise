import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import lazyLoader from './file/lazy-loader.json';
import useWindowSize from '../../app/useWindowSize';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      rowGap: 30,
      marginTop: 40,
    },
  })
);

const LazyLoader = ({ isMulti = false }: { isMulti: boolean }) => {
  const classes = useStyles();
  const { height, width } = useWindowSize();
  const _height = isMulti
    ? 450
    : height === undefined
    ? 450
    : (height * 2.5) / 3;
  const _width = isMulti ? 345 : width === undefined ? 345 : (width * 2) / 3;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lazyLoader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const content = isMulti
    ? [...new Array(6)].fill(0)
    : [...new Array(1)].fill(0);

  return (
    <div
      className={classes.container}
      style={{ display: isMulti ? 'inline-flex' : 'flex' }}>
      {content.map((_, index) => (
        <Lottie
          key={index}
          options={defaultOptions}
          height={_height}
          width={_width}
        />
      ))}
    </div>
  );
};

export default LazyLoader;
