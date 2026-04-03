import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './LandingCtaStrip.styles';

const LandingCtaStrip: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box component="section" className={classes.ctaStrip}>
      <Container maxWidth="sm">
        <Typography className={classes.ctaTitle} component="h2">
          Ready to share with your circle?
        </Typography>
        <Typography className={classes.ctaLead} component="p">
          Sign in, create a circle, and invite the people who matter. Your landing page stays here
          whenever you need it.
        </Typography>
        <Button
          variant="contained"
          size="large"
          disableElevation
          className={classes.ctaBtn}
          onClick={() => history.push('/circles')}
        >
          Go to Circles
        </Button>
      </Container>
    </Box>
  );
};

export default LandingCtaStrip;
