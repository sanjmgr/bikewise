import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useWindowSize from '../../app/useWindowSize';
import { useHistory } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@material-ui/core';
import { Formatter, Incident } from '../../utils';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: 'lightblue',
      rowGap: 30,
      marginTop: 40,
    },
    box: { textAlign: 'center' },
    img: {
      width: ' 400px',
      height: '200px',
      objectFit: 'cover',
    },
    title: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    description: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    location: { paddingTop: 12, paddingBottom: 12 },
    datetime: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);

const Details = ({ incident }: { incident: Incident }) => {
  const classes = useStyles();
  const { height, width } = useWindowSize();
  const _height = height === undefined ? 450 : (height * 2.5) / 3;
  const _width = width === undefined ? 345 : (width * 2) / 3;
  const default_image_url = 'https://bit.ly/2RkCWAl';
  console.log(incident.location_description);
  let history = useHistory();

  return (
    <Container
      style={{
        height: _height,
        width: _width,
        paddingTop: 40,
      }}>
      <Button
        variant='text'
        startIcon={<ArrowBackIosOutlinedIcon />}
        onClick={() => history.push('/')}>
        Back
      </Button>
      <Box className={classes.title}>
        <Typography variant='h5'>{incident.title}</Typography>
      </Box>
      <Box className={classes.description}>
        <Typography>{incident.description}</Typography>
      </Box>
      <Box className={classes.datetime}>
        <Typography variant='caption' color='secondary' component='p'>
          Missing: {Formatter(incident.occurred_at)}
        </Typography>
        <Typography variant='caption' color='primary' component='p'>
          Reported: {Formatter(incident.updated_at)}
        </Typography>
      </Box>
      <Box className={classes.location}>
        {incident.location_description ? (
          <Typography>Location: {incident?.location_type}</Typography>
        ) : (
          ''
        )}
      </Box>
    </Container>
  );
};

export default Details;
