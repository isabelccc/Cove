import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TrendingUp from '@material-ui/icons/TrendingUp';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import SendOutlined from '@material-ui/icons/SendOutlined';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import { useHistory, Link as RouterLink } from 'react-router-dom';

import memoriesLogo from '../images/memoriesLogo.png';

const L = `${process.env.PUBLIC_URL || ''}/landing`;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    minHeight: '100vh',
    fontFamily: '"Outfit", "Heebo", -apple-system, BlinkMacSystemFont, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 3),
    backgroundColor: alpha('#000', 0.85),
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${alpha('#fff', 0.08)}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5, 2),
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    textDecoration: 'none',
    color: '#fafafa',
  },
  brandWord: {
    fontWeight: 800,
    fontSize: '1.35rem',
    letterSpacing: '-0.02em',
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  navLink: {
    textDecoration: 'none',
    color: alpha('#fff', 0.75),
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: theme.spacing(1, 1.5),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  primaryPill: {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 800,
    fontSize: '0.7rem',
    borderRadius: 10,
    padding: '10px 20px',
    boxShadow: `0 1px 0 ${alpha('#fff', 0.2)} inset, 0 6px 20px ${alpha(theme.palette.primary.main, 0.22)}`,
    '&:hover': {
      boxShadow: `0 1px 0 ${alpha('#fff', 0.28)} inset, 0 8px 26px ${alpha(theme.palette.primary.main, 0.32)}`,
    },
  },
  hero: {
    padding: theme.spacing(6, 3, 8),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 4, 10),
    },
  },
  heroTitle: {
    fontWeight: 700,
    letterSpacing: '-0.038em',
    lineHeight: 1.08,
    color: '#fafafa',
    fontSize: '2.5rem',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.55rem',
    },
  },
  heroTitleAccent: {
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    fontWeight: 800,
  },
  heroLead: {
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.7,
    color: alpha('#fff', 0.72),
    maxWidth: 500,
    marginBottom: theme.spacing(3),
  },
  heroBtns: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  heroBtnMain: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 30px',
    boxShadow: `0 1px 0 ${alpha('#fff', 0.22)} inset, 0 10px 28px ${alpha(theme.palette.primary.main, 0.28)}`,
    '&:hover': {
      boxShadow: `0 1px 0 ${alpha('#fff', 0.3)} inset, 0 14px 36px ${alpha(theme.palette.primary.main, 0.38)}`,
    },
  },
  heroBtnGhost: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 700,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 26px',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.light,
    },
  },
  heroVisual: {
    position: 'relative',
    minHeight: 340,
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      minHeight: 420,
    },
  },
  heroImgBack: {
    position: 'absolute',
    width: '72%',
    left: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: `0 24px 60px ${alpha('#000', 0.45)}`,
    border: `1px solid ${alpha('#fff', 0.1)}`,
    zIndex: 1,
  },
  heroImgFront: {
    position: 'absolute',
    width: '58%',
    right: 0,
    top: 0,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: `0 32px 70px ${alpha('#000', 0.5)}`,
    border: `1px solid ${alpha('#fff', 0.12)}`,
    zIndex: 2,
  },
  heroImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
  },
  section: {
    padding: theme.spacing(6, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(7, 4),
    },
  },
  sectionWhite: {
    backgroundColor: '#000',
  },
  sectionTitle: {
    fontWeight: 700,
    letterSpacing: '-0.028em',
    fontSize: '1.75rem',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: '#fafafa',
  },
  sectionLead: {
    textAlign: 'center',
    color: alpha('#fff', 0.62),
    maxWidth: 520,
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    lineHeight: 1.65,
    fontSize: '1.02rem',
    fontWeight: 400,
  },
  insightCard: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2.5),
    borderRadius: 18,
    backgroundColor: '#141414',
    border: `1px solid ${alpha('#fff', 0.08)}`,
    height: '100%',
    boxShadow: `0 4px 24px ${alpha('#000', 0.5)}`,
  },
  insightIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.primary.main, 0.55),
    color: theme.palette.primary.contrastText,
    flexShrink: 0,
  },
  insightLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: alpha('#fff', 0.45),
    textTransform: 'uppercase',
  },
  insightValue: {
    fontWeight: 800,
    fontSize: '1.35rem',
    color: '#fafafa',
    lineHeight: 1.2,
  },
  insightCaption: {
    color: alpha('#fff', 0.5),
    display: 'block',
    marginTop: 4,
  },
  circlesCarouselSection: {
    backgroundColor: '#000',
    padding: theme.spacing(5, 0, 6),
  },
  circlesCarouselHead: {
    textAlign: 'center',
    padding: theme.spacing(0, 3, 3),
    maxWidth: 560,
    margin: '0 auto',
  },
  circlesCarouselViewport: {
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    scrollPaddingLeft: theme.spacing(2),
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingBottom: theme.spacing(1),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    WebkitOverflowScrolling: 'touch',
    [theme.breakpoints.up('md')]: {
      scrollPaddingLeft: theme.spacing(4),
    },
  },
  circlesCarouselSnapItem: {
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
  },
  circlesCarouselTrack: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: 'max-content',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  circlesIntroCard: {
    flexShrink: 0,
    width: 360,
    maxWidth: '85vw',
    borderRadius: 28,
    padding: theme.spacing(3.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'sticky',
    left: theme.spacing(2),
    zIndex: 10,
    marginRight: 20,
    boxShadow: `0 20px 50px ${alpha(theme.palette.primary.main, 0.25)}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      left: theme.spacing(4),
    },
  },
  circlesAvatarStack: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
    '& > *': {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: '3px solid #fff',
      overflow: 'hidden',
      marginLeft: -14,
      flexShrink: 0,
      backgroundColor: '#1a1a1a',
      boxShadow: `0 2px 8px ${alpha('#000', 0.2)}`,
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  circlesAvatarStackImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  circlesIntroTitle: {
    fontWeight: 800,
    fontSize: '1.65rem',
    lineHeight: 1.12,
    letterSpacing: '-0.02em',
    marginBottom: theme.spacing(2),
  },
  circlesIntroAccent: {
    color: '#ec4899',
    fontStyle: 'italic',
    fontWeight: 800,
  },
  circlesIntroBody: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: alpha(theme.palette.primary.contrastText, 0.82),
    '& p': {
      margin: 0,
      marginBottom: theme.spacing(1.5),
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  circlesFeedCard: {
    flexShrink: 0,
    width: 360,
    maxWidth: '85vw',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: `0 16px 48px ${alpha('#000', 0.35)}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  circlesFeedCardStacked: {
    boxShadow: `-10px 0 28px ${alpha('#000', 0.18)}, 0 16px 48px ${alpha('#000', 0.28)}`,
    borderLeft: `1px solid ${alpha('#000', 0.06)}`,
  },
  circlesFeedHead: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.75, 2),
  },
  circlesFeedAvatar: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: '#eee',
  },
  circlesFeedAvatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  circlesFeedName: {
    fontWeight: 800,
    fontSize: '0.95rem',
    color: '#111',
    lineHeight: 1.2,
  },
  circlesFeedSub: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.72rem',
    color: '#666',
    marginTop: 2,
    '& svg': {
      fontSize: '0.95rem',
    },
  },
  circlesFeedMedia: {
    padding: theme.spacing(0, 1.5, 1.5),
    flex: 1,
    minHeight: 0,
  },
  circlesFeedImg: {
    width: '100%',
    display: 'block',
    height: 240,
    objectFit: 'cover',
    borderRadius: 16,
  },
  circlesFeedCaption: {
    padding: theme.spacing(0, 2, 1.5),
    fontSize: '0.82rem',
    lineHeight: 1.45,
    color: '#444',
  },
  circlesFeedActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1, 1.5, 1.75),
    borderTop: '1px solid #eee',
  },
  circlesFeedActionBtn: {
    padding: theme.spacing(0.75),
    color: '#333',
  },
  circlesNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2.5),
    gap: theme.spacing(0.5),
  },
  circlesNavBtn: {
    color: alpha('#fff', 0.85),
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: alpha('#fff', 0.08),
      color: '#fff',
    },
    '&.Mui-disabled': {
      color: alpha('#fff', 0.25),
    },
  },
  circlesNavDivider: {
    width: 1,
    height: 22,
    backgroundColor: alpha('#fff', 0.25),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  wideBanner: {
    position: 'relative',
    minHeight: 300,
    backgroundImage: `url(${L}/landing-party.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 3),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(90deg, ${alpha('#000', 0.55)} 0%, ${alpha('#000', 0.35)} 100%)`,
    },
  },
  wideBannerInner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: 560,
  },
  wideBannerTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.85rem',
    marginBottom: theme.spacing(2),
    letterSpacing: '-0.025em',
  },
  wideBannerBtn: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 32px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 1px 0 ${alpha('#fff', 0.2)} inset, 0 8px 24px ${alpha('#000', 0.35)}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 1px 0 ${alpha('#fff', 0.25)} inset, 0 10px 28px ${alpha('#000', 0.4)}`,
    },
  },
  ctaStrip: {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    padding: theme.spacing(7, 3),
  },
  ctaTitle: {
    fontWeight: 700,
    fontSize: '1.85rem',
    marginBottom: theme.spacing(2),
    letterSpacing: '-0.025em',
  },
  ctaLead: {
    opacity: 0.95,
    lineHeight: 1.65,
    fontSize: '1.02rem',
    fontWeight: 400,
  },
  ctaBtn: {
    marginTop: theme.spacing(1),
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 34px',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.dark,
    boxShadow: `0 4px 22px ${alpha('#000', 0.2)}`,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: `0 6px 28px ${alpha('#000', 0.28)}`,
    },
  },
  footer: {
    padding: theme.spacing(4, 3),
    backgroundColor: '#000',
    borderTop: `1px solid ${alpha('#fff', 0.08)}`,
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    textAlign: 'center',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    justifyContent: 'center',
    '& a': {
      color: alpha('#fff', 0.72),
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      '&:hover': { color: theme.palette.primary.main },
    },
  },
  credit: {
    fontSize: '0.7rem',
    color: alpha('#fff', 0.45),
    maxWidth: 640,
    lineHeight: 1.5,
    '& a': {
      color: alpha('#fff', 0.78),
      '&:hover': { color: theme.palette.primary.main },
    },
  },
  '@keyframes wallMarqueeL': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
  '@keyframes wallMarqueeR': {
    from: { transform: 'translateX(-50%)' },
    to: { transform: 'translateX(0)' },
  },
  photoWallSection: {
    backgroundColor: '#000',
    padding: theme.spacing(7, 0, 8),
    overflow: 'hidden',
  },
  photoWallHead: {
    textAlign: 'center',
    padding: theme.spacing(0, 3, 4),
    maxWidth: 560,
    margin: '0 auto',
  },
  photoWallTitle: {
    color: '#fafafa',
    fontWeight: 700,
    letterSpacing: '-0.028em',
    fontSize: '1.85rem',
    marginBottom: theme.spacing(1),
  },
  photoWallLead: {
    color: alpha('#fff', 0.55),
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  photoWallRow: {
    overflow: 'hidden',
    width: '100%',
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  photoWallTrack: {
    display: 'flex',
    width: 'max-content',
    animation: '$wallMarqueeL 52s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  photoWallTrackRev: {
    display: 'flex',
    width: 'max-content',
    animation: '$wallMarqueeR 58s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  wallCard: {
    flexShrink: 0,
    width: 220,
    marginRight: theme.spacing(2),
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#141414',
    border: `1px solid ${alpha('#fff', 0.08)}`,
    boxShadow: `0 20px 50px ${alpha('#000', 0.5)}`,
  },
  wallCardImgWrap: {
    position: 'relative',
    height: 300,
    overflow: 'hidden',
  },
  wallCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  wallCardImgGrad: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  wallCardNameBlock: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    right: 14,
    zIndex: 1,
  },
  wallCardName: {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  wallCardLoc: {
    color: alpha('#fff', 0.8),
    fontSize: '0.78rem',
    marginTop: 2,
    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
  },
  wallCardFooter: {
    padding: theme.spacing(1.75, 2),
    backgroundColor: '#161616',
  },
  wallPostBlock: {
    marginBottom: theme.spacing(1),
  },
  wallPostLabel: {
    fontSize: '0.6rem',
    color: alpha('#fff', 0.4),
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 700,
    marginBottom: 4,
  },
  wallPostTitle: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: alpha('#fff', 0.92),
    lineHeight: 1.35,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  wallTags: {
    fontSize: '0.65rem',
    color: alpha('#fff', 0.35),
    lineHeight: 1.45,
  },
}));

const WALL_CREATORS: {
  img: string;
  name: string;
  loc: string;
  postTitle: string;
  tags: string;
}[] = [
  {
    img: 'landing-family',
    name: 'Sarah Mitchell',
    loc: 'Portland, OR',
    postTitle: 'Holiday family photo—Grandpa finally stood in the middle',
    tags: '#family #reunion #groupphoto',
  },
  {
    img: 'landing-classmates',
    name: 'James Crawford',
    loc: 'Boston, MA',
    postTitle: 'Ten years since graduation—the gang still feels the same',
    tags: '#classreunion #school #memories',
  },
  {
    img: 'landing-friends',
    name: 'Emily Hart',
    loc: 'Austin, TX',
    postTitle: 'Saturday picnic with the crew, perfect light',
    tags: '#friends #picnic #weekend',
  },
  {
    img: 'landing-party',
    name: 'Michael Brooks',
    loc: 'Denver, CO',
    postTitle: 'First birthday with the whole family under one roof',
    tags: '#family #celebration #baby',
  },
  {
    img: 'landing-outdoor',
    name: 'David Lawson',
    loc: 'Seattle, WA',
    postTitle: 'Team off-site: tents, fire pit, talking until sunrise',
    tags: '#teambuilding #camping #outdoors',
  },
  {
    img: 'landing-dinner',
    name: 'Jennifer Walsh',
    loc: 'Chicago, IL',
    postTitle: 'Holiday dinner table—the meal we wait for all year',
    tags: '#dinner #family #holidays',
  },
  {
    img: 'landing-bbq',
    name: "Ryan O'Connor",
    loc: 'Atlanta, GA',
    postTitle: 'Summer backyard BBQ, neighbors brought sides',
    tags: '#bbq #neighbors #summer',
  },
  {
    img: 'landing-toast',
    name: 'Kate Morrison',
    loc: 'Phoenix, AZ',
    postTitle: 'New Year toast—same friends, see you next year',
    tags: '#newyear #cheers #friends',
  },
];

const CIRCLE_CAROUSEL_AVATAR_PREVIEWS = ['landing-family', 'landing-classmates', 'landing-friends'] as const;

const CIRCLE_CAROUSEL_POSTS: {
  name: string;
  subtitle: string;
  img: string;
  avatar: string;
  caption: string;
}[] = [
  {
    name: 'James Crawford',
    subtitle: 'Reunion circle · 14 members',
    img: 'landing-classmates',
    avatar: 'landing-classmates',
    caption: 'Ten years out—the hallway still looks familiar.',
  },
  {
    name: 'Emily Hart',
    subtitle: 'Picnic crew · 8 members',
    img: 'landing-friends',
    avatar: 'landing-friends',
    caption: 'Afternoon on the grass with snacks nobody will log on Strava.',
  },
  {
    name: 'Jennifer Walsh',
    subtitle: 'Walsh family · invite-only',
    img: 'landing-dinner',
    avatar: 'landing-dinner',
    caption: 'The long table, the loud room—just us.',
  },
  {
    name: 'Haylie Turner',
    subtitle: 'Friendsgiving · 11 members',
    img: 'landing-party',
    avatar: 'landing-party',
    caption: 'Pass the rolls; keep the photos in the circle.',
  },
];

/** Archive-style stack: each card peeks out from behind the previous (px). */
const CIRCLE_FEED_STACK_PEEK = 52;
const CIRCLE_FEED_CARD_WIDTH = 360;
const CIRCLE_FEED_STACK_OVERLAP = CIRCLE_FEED_CARD_WIDTH - CIRCLE_FEED_STACK_PEEK;
/** Yellow card is 360px wide + 20px margin; pull first white card left so it sits under yellow with a peek strip. */
const CIRCLE_YELLOW_GAP_AFTER = 20;
const CIRCLE_FIRST_FEED_MARGIN_LEFT = CIRCLE_FEED_STACK_PEEK - (CIRCLE_FEED_CARD_WIDTH + CIRCLE_YELLOW_GAP_AFTER);

function wallImg(name: string): string {
  return `${L}/${name}.jpg`;
}

interface WallCardProps {
  c: (typeof WALL_CREATORS)[0];
  classes: Record<string, string>;
}

const PhotoWallCard: React.FC<WallCardProps> = ({ c, classes }) => (
  <Box className={classes.wallCard}>
    <div className={classes.wallCardImgWrap}>
      <img className={classes.wallCardImg} src={wallImg(c.img)} alt="" />
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

const LandingPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselAtStart, setCarouselAtStart] = useState(true);
  const [carouselAtEnd, setCarouselAtEnd] = useState(false);

  const updateCarouselEdges = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCarouselAtStart(scrollLeft <= 6);
    setCarouselAtEnd(max <= 6 || scrollLeft >= max - 6);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    updateCarouselEdges();
    if (!el) return undefined;
    el.addEventListener('scroll', updateCarouselEdges);
    window.addEventListener('resize', updateCarouselEdges);
    return () => {
      el.removeEventListener('scroll', updateCarouselEdges);
      window.removeEventListener('resize', updateCarouselEdges);
    };
  }, [updateCarouselEdges]);

  /** One step = align to the next/previous stack card (same rhythm as scroll-snap). */
  const stepCirclesCarousel = useCallback(
    (dir: -1 | 1) => {
      const vp = carouselRef.current;
      if (!vp) return;
      const track = vp.firstElementChild as HTMLElement | null;
      if (!track) return;
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const items = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-item]'));
      if (!items.length) return;
      const sl = vp.scrollLeft;
      const maxSl = Math.max(0, vp.scrollWidth - vp.clientWidth);
      const threshold = 6;

      if (dir === 1) {
        const next = items.find((el) => el.offsetLeft > sl + pad + threshold);
        if (next) {
          vp.scrollTo({
            left: Math.min(next.offsetLeft - pad, maxSl),
            behavior: 'smooth',
          });
        } else {
          vp.scrollTo({ left: maxSl, behavior: 'smooth' });
        }
      } else {
        const prev = [...items].reverse().find((el) => el.offsetLeft < sl + pad - threshold);
        if (prev) {
          vp.scrollTo({
            left: Math.max(0, prev.offsetLeft - pad),
            behavior: 'smooth',
          });
        } else {
          vp.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
      window.setTimeout(updateCarouselEdges, 450);
    },
    [updateCarouselEdges],
  );

  return (
    <Box className={classes.root}>
      <header className={classes.topBar}>
        <RouterLink to="/" className={classes.brand}>
          <img src={memoriesLogo} alt="" width={36} height={36} />
          <span className={classes.brandWord}>Memories</span>
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

      <Box component="section" className={classes.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" className={classes.heroTitle} component="h1">
                Where your people see your{' '}
                <span className={classes.heroTitleAccent}>story.</span>
              </Typography>
              <Typography className={classes.heroLead} component="p">
                A calm, private surface for photos and moments—invite-only circles, no public discovery,
                and a feed that feels like yours. Built for family albums, class reunions, and the groups
                that actually show up.
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.heroVisual}>
                <Box className={classes.heroImgBack}>
                  <img
                    className={classes.heroImg}
                    src={`${L}/landing-outdoor.jpg`}
                    alt=""
                  />
                </Box>
                <Box className={classes.heroImgFront}>
                  <img
                    className={classes.heroImg}
                    src={`${L}/landing-family.jpg`}
                    alt=""
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" className={`${classes.section} ${classes.sectionWhite}`}>
        <Container maxWidth="lg">
          <Typography className={classes.sectionTitle} component="h2">
            Your daily insights
          </Typography>
          <Typography className={classes.sectionLead} component="p">
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

      <Box component="section" className={classes.photoWallSection} aria-label="Circle posts showcase">
        <div className={classes.photoWallHead}>
          <Typography component="h2" className={classes.photoWallTitle}>
            The posts from your circle
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

      <Box component="section" className={classes.circlesCarouselSection} aria-label="From your circles">
        <div className={classes.circlesCarouselHead}>
          <Typography className={classes.sectionTitle} component="h2">
            From your circles
          </Typography>
          <Typography className={classes.sectionLead} component="p">
            Swipe or tap the arrows—each step brings the next post into the stack under the yellow card.
          </Typography>
        </div>
        <div
          ref={carouselRef}
          className={classes.circlesCarouselViewport}
          onScroll={updateCarouselEdges}
        >
          <Box className={classes.circlesCarouselTrack}>
            <Box
              className={`${classes.circlesIntroCard} ${classes.circlesCarouselSnapItem}`}
              data-carousel-item
            >
              <div className={classes.circlesAvatarStack}>
                {CIRCLE_CAROUSEL_AVATAR_PREVIEWS.map((key) => (
                  <Box key={key}>
                    <img
                      className={classes.circlesAvatarStackImg}
                      src={`${L}/${key}.jpg`}
                      alt=""
                    />
                  </Box>
                ))}
              </div>
              <Typography component="h3" className={classes.circlesIntroTitle}>
                Come together,{' '}
                <span className={classes.circlesIntroAccent}>right now.</span>
              </Typography>
              <div className={classes.circlesIntroBody}>
                <p>
                  Memories is built for the people you actually see at holidays, graduations, and the reunions
                  you swear you will not miss again.
                </p>
                <p>
                  Start a circle, share the album, and keep every photo where your family and friends already
                  are—never on a public stage.
                </p>
              </div>
            </Box>
            {CIRCLE_CAROUSEL_POSTS.map((post, idx) => (
              <Box
                key={post.name}
                className={`${classes.circlesFeedCard} ${classes.circlesCarouselSnapItem}${
                  idx > 0 ? ` ${classes.circlesFeedCardStacked}` : ''
                }`}
                data-carousel-item
                style={{
                  zIndex: CIRCLE_CAROUSEL_POSTS.length - idx,
                  marginLeft:
                    idx === 0 ? CIRCLE_FIRST_FEED_MARGIN_LEFT : -CIRCLE_FEED_STACK_OVERLAP,
                  transform: idx > 0 ? `scale(${1 - idx * 0.012})` : undefined,
                  transformOrigin: 'left center',
                }}
              >
                <div className={classes.circlesFeedHead}>
                  <div className={classes.circlesFeedAvatar}>
                    <img
                      className={classes.circlesFeedAvatarImg}
                      src={`${L}/${post.avatar}.jpg`}
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
                  <img className={classes.circlesFeedImg} src={`${L}/${post.img}.jpg`} alt="" />
                </div>
                <div className={classes.circlesFeedCaption}>{post.caption}</div>
                <div className={classes.circlesFeedActions}>
                  <IconButton
                    size="small"
                    className={classes.circlesFeedActionBtn}
                    aria-label="Like"
                  >
                    <Favorite style={{ color: '#e53935' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    className={classes.circlesFeedActionBtn}
                    aria-label="Comment"
                  >
                    <ChatBubbleOutline />
                  </IconButton>
                  <IconButton
                    size="small"
                    className={classes.circlesFeedActionBtn}
                    aria-label="Share"
                  >
                    <SendOutlined />
                  </IconButton>
                  <IconButton
                    size="small"
                    className={classes.circlesFeedActionBtn}
                    aria-label="Save"
                  >
                    <BookmarkBorder />
                  </IconButton>
                </div>
              </Box>
            ))}
          </Box>
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
            Join Memories
          </Button>
        </div>
      </Box>

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
              . Branding and product are Memories.
            </Typography>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
