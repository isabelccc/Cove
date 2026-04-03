import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile/Profile';
import BackToTop from './components/BackToTop/BackToTop';
import CirclesList from './components/Circles/CirclesList';
import GroupWall from './components/Circles/GroupWall';
import JoinGroup from './components/Circles/JoinGroup';

function readProfile() {
  try {
    const raw = localStorage.getItem('profile');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function AppRoutes() {
  const location = useLocation();
  const user = readProfile();
  const isLanding = location.pathname === '/';

  return (
    <Container maxWidth={isLanding ? false : 'xl'} disableGutters={isLanding}>
      {!isLanding && <Navbar />}
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/profile/:id" exact component={Profile} />
        <Route path="/circles" exact component={CirclesList} />
        <Route path="/circles/:groupId/search" exact component={GroupWall} />
        <Route path="/circles/:groupId" exact component={GroupWall} />
        <Route path="/join/:inviteToken" exact component={JoinGroup} />
        <Route path="/posts" exact component={Home} />
        <Route path="/posts/search" exact component={Home} />
        <Route path="/posts/:id" exact component={PostDetails} />
        <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
        <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/circles" />)} />
        <Redirect to="/circles" />
      </Switch>
      <BackToTop threshold={300} />
    </Container>
  );
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
