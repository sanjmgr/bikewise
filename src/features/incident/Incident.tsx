import React, { useEffect } from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchIncident } from './IncidentSlice';
import { LazyLoader } from '../lottie';
import Details from './Details';

const useStyles = makeStyles(() =>
  createStyles({
    details: {
      paddingTop: 40,
      marginBottom: 70,
    },
  })
);

const Incident = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const status = useAppSelector(state => state.incident.status);
  const incident = useAppSelector(state => state.incident.incident);
  useEffect(() => {
    dispatch(fetchIncident(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {status === 'loading' ? (
        <LazyLoader isMulti={false} />
      ) : status === 'idle' && incident ? (
        <div className={classes.details}>
          <Details incident={incident} />
        </div>
      ) : (
        ''
      )}
      {/* <LazyLoader isMulti={false} /> */}
    </Container>
  );
};
export default Incident;
