import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handlePage } from './PaginationSlice';
import {
  fetchIncidents,
  fetchAll,
  totalIncident,
} from '../incidents/IncidentsSlice';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        float: 'right',
      },
    },
  })
);

const PaginationRounded = () => {
  const classes = useStyles();
  const totalIncident1 = useAppSelector(totalIncident);
  const page = useAppSelector(state => state.pagination.page);
  const totalPages = Math.ceil(totalIncident1 / 10);
  const dispatch = useAppDispatch();
  const from = useAppSelector(state => state.filter.from);
  const to = useAppSelector(state => state.filter.to);
  const query = useAppSelector(state => state.filter.query);
  const type = useAppSelector(state => state.filter.type);

  // run effect only once (on mount and unmount)
  useEffect(() => {
    dispatch(
      fetchAll({
        query,
        from,
        to,
        type,
        page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchIncidents({
        query,
        from,
        to,
        type,
        page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => {
          dispatch(handlePage(value));
        }}
        variant='outlined'
        shape='rounded'
      />
    </div>
  );
};
export default PaginationRounded;
