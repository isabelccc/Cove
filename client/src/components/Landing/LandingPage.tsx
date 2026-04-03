import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import LandingCtaStrip from './LandingCtaStrip';
import LandingCirclesCarousel from './LandingCirclesCarousel';
import LandingFooter from './LandingFooter';
import LandingHero from './LandingHero';
import LandingInsights from './LandingInsights';
import useLandingRootStyles from './LandingPage.styles';
import LandingPhotoWall from './LandingPhotoWall';
import LandingTopBar from './LandingTopBar';
import LandingWideBanner from './LandingWideBanner';

const LandingPage: React.FC = () => {
  const classes = useLandingRootStyles();

  useEffect(() => {
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollSnapType = 'y proximity';
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollSnapType = prevSnap;
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);

  return (
    <Box className={classes.root}>
      <LandingTopBar />
      <LandingHero />
      <LandingInsights />
      <LandingPhotoWall />
      <LandingCirclesCarousel />
      <LandingWideBanner />
      <LandingCtaStrip />
      <LandingFooter />
    </Box>
  );
};

export default LandingPage;
