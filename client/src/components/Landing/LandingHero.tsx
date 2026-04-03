import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import BrandLogoMark from '../BrandLogoMark';
import { landingImage } from './landingConstants';
import useStyles from './LandingHero.styles';

const LandingHero: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box component="section" className={classes.hero}>
      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className={classes.heroCopy}>
              <Typography variant="h1" className={classes.heroTitle} component="h1">
                Where your people see your{' '}
                <span className={classes.heroTitleAccent}>story.</span>
              </Typography>
              <Typography className={classes.heroLead} component="p">
                A calm, private surface for photos and moments—invite-only circles, no public discovery,
                and a feed that feels like yours.
              </Typography>
              <Typography className={classes.heroLeadFollow} component="p">
                Built for family albums, class reunions, and the groups that actually show up.
              </Typography>
              <Box className={classes.heroBtns}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disableElevation
                  className={classes.heroBtnMain}
                  onClick={() => history.push('/circles')}
                >
                  Open Circles
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  disableElevation
                  className={classes.heroBtnGhost}
                  onClick={() => history.push('/auth')}
                >
                  Create account
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" width="100%" className={classes.heroVisualWrap}>
              <Box className={classes.heroVisual}>
                <Box className={classes.heroArchStack}>
                  <Box className={classes.heroArchMain}>
                    <img
                      className={classes.heroArchImg}
                      src={landingImage('landing-outdoor')}
                      alt=""
                    />
                  </Box>
                  <Box className={classes.heroArchFloat}>
                    <img
                      className={classes.heroArchImg}
                      src={landingImage('landing-family')}
                      alt=""
                    />
                  </Box>
                  <Box className={classes.heroLogo}>
                    <BrandLogoMark className={classes.heroLogoMark} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingHero;
