import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Box, Container } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleFrom, handleQuery, handleTo, handleType } from './FilterSlice';
import { fetchAll, fetchIncidents } from '../incidents/IncidentsSlice';
import { PayloadProps } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '19ch',
      },
    },
    input: {
      margin: theme.spacing(1),
      height: 38,
    },
  })
);

const incidentTypes = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'crash',
    label: 'Crash',
  },
  {
    value: 'hazard',
    label: 'Hazard',
  },
  {
    value: 'theft',
    label: 'Theft',
  },
  {
    value: 'unconfirmed',
    label: 'Unconfirmed',
  },
  {
    value: 'infrastructure_issue',
    label: 'Infrastructure issue',
  },
  {
    value: 'chop_shop',
    label: 'Chop shop',
  },
];

const Filter = () => {
  const classes = useStyles();
  const from = useAppSelector(state => state.filter.from);
  const to = useAppSelector(state => state.filter.to);
  const query = useAppSelector(state => state.filter.query);
  const type = useAppSelector(state => state.filter.type);
  const page = useAppSelector(state => state.pagination.page);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    const newFilter: PayloadProps = {
      from,
      to,
      query,
      type,
      page,
    };
    dispatch(fetchIncidents(newFilter));
    dispatch(fetchAll(newFilter));
  };
  return (
    <Container>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        minHeight='5vh'>
        <TextField
          className={classes.root}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          type='date'
          label='From'
          value={from}
          onChange={event => {
            const value = event.target.value;
            dispatch(handleFrom(value));
          }}
        />
        <TextField
          className={classes.root}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          type='date'
          label='To'
          value={to}
          onChange={event => {
            const value = event.target.value;
            dispatch(handleTo(value));
          }}
        />
        <TextField
          className={classes.root}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{ shrink: true }}
          variant='outlined'
          label='Query'
          placeholder='Berlin'
          value={query}
          onChange={event => {
            const value = event.target.value;
            dispatch(handleQuery(value));
          }}
        />
        <TextField
          id='incident-case'
          select
          className={classes.root}
          InputProps={{
            className: classes.input,
          }}
          label='Incident case'
          SelectProps={{
            native: true,
          }}
          value={type}
          InputLabelProps={{ shrink: true }}
          onChange={event => {
            const value = event.target.value;
            dispatch(handleType(value));
          }}
          variant='outlined'>
          {incidentTypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button
          variant='outlined'
          className={classes.input}
          onClick={handleSubmit}>
          Apply
        </Button>
      </Box>
    </Container>
  );
};
export default Filter;
