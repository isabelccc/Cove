import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import BrandLogoMark from '../BrandLogoMark';
import useStyles from './LandingTopBar.styles';

const LandingTopBar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <header className={classes.topBar}>
      <RouterLink to="/" className={classes.brand}>
        <BrandLogoMark className={classes.brandMark} />
      </RouterLink>
      <nav className={classes.topActions} aria-label="Main">
        <RouterLink to="/auth" className={classes.navLink}>
          Sign in
        </RouterLink>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.primaryPill}
          onClick={() => history.push('/circles')}
        >
          Get started
        </Button>
      </nav>
    </header>
  );
};

export default LandingTopBar;
