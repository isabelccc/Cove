import React from 'react';
import { Redirect } from 'react-router-dom';

/** Legacy route: all browsing is circle-scoped. */
const Home: React.FC = () => <Redirect to="/circles" />;

export default Home;
