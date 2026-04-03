import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './LandingWideBanner.styles';

const LandingWideBanner: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box component="section" className={classes.wideBanner}>
      <div className={classes.wideBannerInner}>
        <Typography className={classes.wideBannerTitle} component="h2">
          Build a space that feels like your corner of the internet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          disableElevation
          className={classes.wideBannerBtn}
          onClick={() => history.push('/auth')}
        >
          Join Cove
        </Button>
      </div>
    </Box>
  );
};

export default LandingWideBanner;
