import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import TrendingUp from '@material-ui/icons/TrendingUp';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';

import useStyles from './LandingInsights.styles';

const LandingInsights: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={`${classes.section} ${classes.sectionWhite}`}>
      <Container maxWidth="lg">
        <Typography className={classes.insightsHeadTitle} component="h2">
          Your daily insights
        </Typography>
        <Typography className={classes.insightsHeadLead} component="p">
          Snapshot cards for how your circles are doing—trips, reunions, teams, whoever you invite.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.insightCard} elevation={0}>
              <div className={classes.insightIcon}>
                <TrendingUp />
              </div>
              <div>
                <div className={classes.insightLabel}>Engagement</div>
                <div className={classes.insightValue}>+24%</div>
                <Typography variant="caption" className={classes.insightCaption}>
                  vs last week in your circles
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.insightCard} elevation={0}>
              <div className={classes.insightIcon}>
                <PeopleOutline />
              </div>
              <div>
                <div className={classes.insightLabel}>Circle reach</div>
                <div className={classes.insightValue}>12</div>
                <Typography variant="caption" className={classes.insightCaption}>
                  people across your memberships
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.insightCard} elevation={0}>
              <div className={classes.insightIcon}>
                <VisibilityOutlined />
              </div>
              <div>
                <div className={classes.insightLabel}>Wall views</div>
                <div className={classes.insightValue}>1.4k</div>
                <Typography variant="caption" className={classes.insightCaption}>
                  illustrative demo metric
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingInsights;
