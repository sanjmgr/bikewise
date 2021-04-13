import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useWindowSize from '../../app/useWindowSize';
import { useHistory } from 'react-router-dom';

import { Box, Button, Container, Theme, Typography } from '@material-ui/core';
import { Formatter, Incident } from '../../utils';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      borderRadius: theme.spacing(1),
      paddingBottom: 120,
      marginTop: 20,
      marginBottom: 30,
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
  let history = useHistory();
  const {
    media,
    title,
    description,
    occurred_at,
    updated_at,
    location_description,
    location_type,
  } = incident;
  return (
    <Container
      style={{
        width: _width,
        paddingTop: 40,
      }}>
      <Button
        variant='text'
        startIcon={<ArrowBackIosOutlinedIcon />}
        onClick={() => history.push('/')}>
        Back
      </Button>
      <Box className={classes.media} overflow='hidden' height={_height * 0.61}>
        <img
          src={media?.image_url || default_image_url}
          alt={title}
          style={{ width: _width }}
        />
      </Box>
      <Box className={classes.title}>
        <Typography variant='h5'>{title}</Typography>
      </Box>
      <Box className={classes.description}>
        <Typography>
          {description || 'Description is not available...'}
        </Typography>
      </Box>
      <Box className={classes.datetime}>
        <Typography variant='caption' color='secondary' component='p'>
          Missing: {Formatter(occurred_at)}
        </Typography>
        <Typography variant='caption' color='primary' component='p'>
          Reported: {Formatter(updated_at)}
        </Typography>
      </Box>
      <Box className={classes.location}>
        {location_description ? (
          <Typography>Location: {location_type}</Typography>
        ) : (
          ''
        )}
      </Box>
    </Container>
  );
};

export default Details;
