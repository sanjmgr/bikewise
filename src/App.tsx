import React from 'react';
import { Box, Container, Fab, Typography } from '@material-ui/core';
import './App.css';
import { Filter, Incidents, Pagination } from './features';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Incident } from './features/incident';
import { ScrollTop } from './utils';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Link from '@material-ui/core/Link';

function App() {
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const Home = () => {
    return (
      <>
        <Typography component='div'>
          <Box
            letterSpacing={3}
            m={3}
            textAlign='center'
            fontWeight='fontWeightMedium'
            fontSize='h4.fontSize'
            fontFamily='Monospace'>
            Police department of Berlin
          </Box>
        </Typography>
        <Filter />
        <Incidents />
        <Pagination />
        <ScrollTop>
          <Fab color='secondary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Box
          style={{
            marginTop: 132,
            marginBottom: 30,
            display: 'grid',
            placeItems: 'center',
          }}>
          <Typography>
            Handicraft by
            <Link href='https://github.com/sanjmgr' onClick={preventDefault}>
              {' '}
              sanjmgr
            </Link>
          </Typography>
        </Box>
      </>
    );
  };
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path='/:id' component={Incident} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
