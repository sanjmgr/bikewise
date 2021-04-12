import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { Formatter, Incident } from '../../utils';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 345,
      height: 450,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    caption: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    address: {
      wordWrap: 'break-word',
      display: 'flex',
      paddingLeft: '14px',
      paddingRight: '10px',
    },
    title: {
      marginBottom: '10px',
    },
  })
);

const IncidentCard: React.FC<{ incident: Incident }> = ({ incident }) => {
  const classes = useStyles();
  const default_image_url = 'https://bit.ly/2RkCWAl';
  return (
    <Paper elevation={1} variant='outlined'>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={incident.media.image_url || default_image_url}
          title={incident.title}
        />
        <CardContent>
          <Typography
            variant='body1'
            color='textPrimary'
            component='h4'
            className={classes.title}>
            <Link to={`/${incident.id}`}>{incident.title}</Link>
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {incident.description?.slice(0, 200).concat('...')}
          </Typography>
        </CardContent>
        <div className={classes.caption}>
          <Typography variant='caption' color='secondary' component='p'>
            Stolen: {Formatter(incident.occurred_at)}
          </Typography>
          <Typography variant='caption' color='primary' component='p'>
            Reported: {Formatter(incident.updated_at)}
          </Typography>
        </div>
        <Typography
          variant='caption'
          color='textPrimary'
          component='p'
          className={classes.address}>
          {incident.address}
        </Typography>
      </Card>
    </Paper>
  );
};
export default IncidentCard;
