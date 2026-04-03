import React from 'react';
import { Box, Typography } from '@material-ui/core';

import { WALL_CREATORS, landingImage } from './landingConstants';
import useStyles from './LandingPhotoWall.styles';

type WallCreator = (typeof WALL_CREATORS)[0];

interface PhotoWallCardProps {
  c: WallCreator;
  classes: ReturnType<typeof useStyles>;
}

const PhotoWallCard: React.FC<PhotoWallCardProps> = ({ c, classes }) => (
  <Box className={classes.wallCard}>
    <div className={classes.wallCardImgWrap}>
      <img className={classes.wallCardImg} src={landingImage(c.img)} alt="" />
      <div className={classes.wallCardImgGrad} />
      <div className={classes.wallCardNameBlock}>
        <div className={classes.wallCardName}>{c.name}</div>
        <div className={classes.wallCardLoc}>{c.loc}</div>
      </div>
    </div>
    <div className={classes.wallCardFooter}>
      <div className={classes.wallPostBlock}>
        <div className={classes.wallPostLabel}>Post</div>
        <div className={classes.wallPostTitle}>{c.postTitle}</div>
      </div>
      <div className={classes.wallTags}>{c.tags}</div>
    </div>
  </Box>
);

const LandingPhotoWall: React.FC = () => {
  const classes = useStyles();

  return (
    <Box component="section" className={classes.photoWallSection} aria-label="Circle posts showcase">
      <div className={classes.photoWallHead}>
        <Typography component="h2" className={classes.photoWallTitle}>
          The posts from your{' '}
          <span className={classes.photoWallTitleAccent}>circle</span>
        </Typography>
        <Typography className={classes.photoWallLead} component="p">
          Infinite horizontal rows—hover to pause. Demo cards show family, classmates, and gatherings.
        </Typography>
      </div>
      <Box className={classes.photoWallRow}>
        <Box className={classes.photoWallTrack}>
          {WALL_CREATORS.map((c) => (
            <PhotoWallCard key={`w1a-${c.name}-${c.img}`} c={c} classes={classes} />
          ))}
          {WALL_CREATORS.map((c) => (
            <PhotoWallCard key={`w1b-${c.name}-${c.img}`} c={c} classes={classes} />
          ))}
        </Box>
      </Box>
      <Box className={classes.photoWallRow}>
        <Box className={classes.photoWallTrackRev}>
          {[...WALL_CREATORS].reverse().map((c) => (
            <PhotoWallCard key={`w2a-${c.name}-${c.img}`} c={c} classes={classes} />
          ))}
          {[...WALL_CREATORS].reverse().map((c) => (
            <PhotoWallCard key={`w2b-${c.name}-${c.img}`} c={c} classes={classes} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPhotoWall;
