import React, { useRef, useCallback, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import SendOutlined from '@material-ui/icons/SendOutlined';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

import {
  CIRCLE_CAROUSEL_AVATAR_PREVIEWS,
  CIRCLE_CAROUSEL_POSTS,
  CIRCLE_CAROUSEL_INTRO_TO_CARD_GAP_PX,
  CIRCLE_CAROUSEL_STRIP_HEIGHT_PX,
  landingImage,
} from './landingConstants';
import useStyles from './LandingCirclesCarousel.styles';

function getCarouselEffectiveMax(
  viewport: HTMLDivElement,
  _intro: HTMLElement | null,
  _gapPx: number,
): { hardwareMax: number; effectiveMax: number } {
  const hardwareMax = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const track = viewport.firstElementChild as HTMLElement | null;
  if (!track) {
    return { hardwareMax, effectiveMax: hardwareMax };
  }

  const feeds = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-feed]'));
  if (feeds.length <= 1) {
    return { hardwareMax, effectiveMax: 0 };
  }

  const firstFeed = feeds[0];
  const lastFeed = feeds[feeds.length - 1];
  const lastSnap = Math.max(0, lastFeed.offsetLeft - firstFeed.offsetLeft);
  const effectiveMax = Math.min(hardwareMax, lastSnap);

  return { hardwareMax, effectiveMax };
}

const LandingCirclesCarousel: React.FC = () => {
  const classes = useStyles();
  const carouselRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const [carouselAtStart, setCarouselAtStart] = useState(true);
  const [carouselAtEnd, setCarouselAtEnd] = useState(false);
  const [introMetrics, setIntroMetrics] = useState({ width: 0, left: 0 });
  const leadingSpacerWidth = useMemo(
    () => Math.max(0, introMetrics.width + CIRCLE_CAROUSEL_INTRO_TO_CARD_GAP_PX),
    [introMetrics.width],
  );
  const trailingSpacerWidth = useMemo(
    () => Math.max(0, introMetrics.width * 0.9),
    [introMetrics.width],
  );
  const leftMaskWidth = useMemo(() => Math.max(0, introMetrics.left + 24), [introMetrics.left]);

  const updateCarouselEdges = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft } = el;
    const { hardwareMax, effectiveMax } = getCarouselEffectiveMax(
      el,
      introRef.current,
      CIRCLE_CAROUSEL_INTRO_TO_CARD_GAP_PX,
    );
    setCarouselAtStart(scrollLeft <= 6);
    setCarouselAtEnd(hardwareMax <= 6 || scrollLeft >= effectiveMax - 6);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    const syncIntroMetrics = () => {
      const intro = introRef.current;
      const row = rowRef.current;
      if (!intro || !row) return;
      const introRect = intro.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      setIntroMetrics({
        width: introRect.width,
        left: Math.max(0, introRect.left - rowRect.left),
      });
    };

    updateCarouselEdges();
    if (!el) return undefined;

    syncIntroMetrics();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
      syncIntroMetrics();
      updateCarouselEdges();
    }) : null;
    ro?.observe(el);
    if (introRef.current) {
      ro?.observe(introRef.current);
    }
    const handleResize = () => {
      syncIntroMetrics();
      updateCarouselEdges();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ro?.disconnect();
    };
  }, [updateCarouselEdges]);

  useLayoutEffect(() => {
    const intro = introRef.current;
    const row = rowRef.current;
    if (!intro || !row) return;
    const introRect = intro.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    setIntroMetrics({
      width: introRect.width,
      left: Math.max(0, introRect.left - rowRect.left),
    });
  }, []);

  const stepCirclesCarousel = useCallback(
    (dir: -1 | 1) => {
      const vp = carouselRef.current;
      if (!vp) return;
      const sl = vp.scrollLeft;
      const { effectiveMax } = getCarouselEffectiveMax(
        vp,
        introRef.current,
        CIRCLE_CAROUSEL_INTRO_TO_CARD_GAP_PX,
      );

      const track = vp.firstElementChild as HTMLElement | null;
      if (!track) return;
      const feeds = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-feed]'));
      if (!feeds.length) return;

      // Distance between snap points, usually card width plus track gap.
      const step = feeds.length > 1
        ? feeds[1].offsetLeft - feeds[0].offsetLeft
        : feeds[0].offsetWidth;

      // Snap the current position before stepping so repeated clicks stay aligned.
      const snapped = Math.round(sl / step) * step;
      const nextLeft = Math.max(0, Math.min(effectiveMax, snapped + dir * step));

      vp.scrollTo({ left: nextLeft, behavior: 'smooth' });
      window.setTimeout(updateCarouselEdges, 450);
    },
    [updateCarouselEdges],
  );

  return (
    <Box component="section" className={classes.circlesCarouselSection} aria-label="The posts from your circle">
      <div className={classes.circlesCarouselHead}>
        <Typography className={classes.circlesCarouselHeadTitle} component="h2">
          The posts from your{' '}
          <span className={classes.circlesCarouselHeadTitleAccent}>circle</span>
        </Typography>
        <Typography className={classes.sectionLead} component="p">
          A wide intro panel and a row of posts—scroll or use arrows; each post can tuck under the panel.
        </Typography>
      </div>
      <div
        ref={rowRef}
        className={classes.circlesCarouselRow}
        style={{ ['--carousel-strip-height' as string]: `${CIRCLE_CAROUSEL_STRIP_HEIGHT_PX}px` }}
      >
        <div
          ref={carouselRef}
          className={classes.circlesCarouselViewport}
          onScroll={updateCarouselEdges}
        >
          <Box className={classes.circlesCarouselTrack}>
            <div
              aria-hidden
              style={{ flex: '0 0 auto', width: `${leadingSpacerWidth}px`, pointerEvents: 'none' }}
            />
            {CIRCLE_CAROUSEL_POSTS.map((post) => (
              <Box key={post.name} className={classes.circlesFeedCard} data-carousel-feed>
                <div className={classes.circlesFeedHead}>
                  <div className={classes.circlesFeedAvatar}>
                    <img
                      className={classes.circlesFeedAvatarImg}
                      src={landingImage(post.avatar)}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className={classes.circlesFeedName}>{post.name}</div>
                    <div className={classes.circlesFeedSub}>
                      <PeopleOutline fontSize="inherit" />
                      {post.subtitle}
                    </div>
                  </div>
                </div>
                <div className={classes.circlesFeedMedia}>
                  <img className={classes.circlesFeedImg} src={landingImage(post.img)} alt="" />
                </div>
                <div className={classes.circlesFeedCaption}>{post.caption}</div>
                <div className={classes.circlesFeedActions}>
                  <IconButton size="small" className={classes.circlesFeedActionBtn} aria-label="Like">
                    <Favorite style={{ color: '#e53935' }} />
                  </IconButton>
                  <IconButton size="small" className={classes.circlesFeedActionBtn} aria-label="Comment">
                    <ChatBubbleOutline />
                  </IconButton>
                  <IconButton size="small" className={classes.circlesFeedActionBtn} aria-label="Share">
                    <SendOutlined />
                  </IconButton>
                  <IconButton size="small" className={classes.circlesFeedActionBtn} aria-label="Save">
                    <BookmarkBorder />
                  </IconButton>
                </div>
              </Box>
            ))}
            <div
              aria-hidden
              style={{ flex: '0 0 auto', width: `${trailingSpacerWidth}px`, pointerEvents: 'none' }}
            />
          </Box>
        </div>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${leftMaskWidth + 24}px`,
            background: '#000',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <aside ref={introRef} className={classes.circlesIntroCard} aria-label="Cove intro">
          <div className={classes.circlesAvatarStack}>
            {CIRCLE_CAROUSEL_AVATAR_PREVIEWS.map((key) => (
              <Box key={key}>
                <img className={classes.circlesAvatarStackImg} src={landingImage(key)} alt="" />
              </Box>
            ))}
          </div>
          <Typography component="h3" className={classes.circlesIntroTitle}>
            Come Together,
            <br />
            <span className={classes.circlesIntroAccent}>Right Now!</span>
          </Typography>
          <div className={classes.circlesIntroBody}>
            <p>
              Connect with the people you already see at holidays, reunions, and the group chats that never
              quite replace being in the same room.
            </p>
            <p>
              Keep every photo in invite-only circles—one calm place for your crew, your family, your
              classmates. No public stage, just Cove.
            </p>
          </div>
        </aside>
      </div>
      <div className={classes.circlesNav}>
        <IconButton
          className={classes.circlesNavBtn}
          aria-label="Scroll carousel left"
          onClick={() => stepCirclesCarousel(-1)}
          disabled={carouselAtStart}
        >
          <ChevronLeft />
        </IconButton>
        <span className={classes.circlesNavDivider} aria-hidden />
        <IconButton
          className={classes.circlesNavBtn}
          aria-label="Scroll carousel right"
          onClick={() => stepCirclesCarousel(1)}
          disabled={carouselAtEnd}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </Box>
  );
};

export default LandingCirclesCarousel;
