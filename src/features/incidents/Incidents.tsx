import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { EmptyBox, LazyLoader, NotFoundError } from '../lottie';
import IncidentCard from './IncidentCard';
import { selectIncidents } from './IncidentsSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      // width: 500,
      // height: 450,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      // transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
    incidents: {
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      rowGap: 30,
      marginTop: 40,
    },
  })
);

export default function Incidents() {
  const classes = useStyles();
  const incidents = useAppSelector(selectIncidents);
  const status = useAppSelector(state => state.incidents.status);

  const Lottie =
    status === 'loading' ? (
      <LazyLoader isMulti />
    ) : status === 'failed' ? (
      <NotFoundError />
    ) : status === 'idle' && incidents.length <= 0 ? (
      <EmptyBox />
    ) : (
      <div className={classes.incidents}>
        {incidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    );
  return Lottie;
}
