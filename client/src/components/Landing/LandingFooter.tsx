import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './LandingFooter.styles';

const LandingFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="md">
        <div className={classes.footerRow}>
          <div className={classes.footerLinks}>
            <RouterLink to="/circles">Circles</RouterLink>
            <RouterLink to="/auth">Sign in</RouterLink>
          </div>
          <Typography className={classes.credit} component="p">
            Photos from{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>{' '}
            (license for use). This page is a layout homage to modern creator dashboards and is not
            affiliated with{' '}
            <a href="https://www.creatorland.com/" target="_blank" rel="noopener noreferrer">
              Creatorland
            </a>
            . Branding and product are Cove.
          </Typography>
        </div>
      </Container>
    </Box>
  );
};

export default LandingFooter;
