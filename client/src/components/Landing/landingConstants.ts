export const LANDING_IMG_BASE = `${process.env.PUBLIC_URL || ''}/landing`;

/** Pass base name (e.g. `landing-family`) for `.jpg`, or full filename with extension (e.g. `photo.png`). */
export function landingImage(name: string): string {
  if (name.includes('.')) {
    return `${LANDING_IMG_BASE}/${name}`;
  }
  return `${LANDING_IMG_BASE}/${name}.jpg`;
}

export const WALL_CREATORS: {
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
    tags: '#classreunion #school #cove',
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

export const CIRCLE_CAROUSEL_AVATAR_PREVIEWS = ['landing-family', 'landing-classmates', 'landing-friends'] as const;

export const CIRCLE_CAROUSEL_POSTS: {
  name: string;
  subtitle: string;
  img: string;
  avatar: string;
  caption: string;
}[] = [
  {
    name: 'Emily Hart',
    subtitle: 'Picnic crew · 8 members',
    img: 'landing-friends',
    avatar: 'landing-friends',
    caption: 'Afternoon on the grass—snacks, sun, same people you actually text back.',
  },
  {
    name: 'James Crawford',
    subtitle: 'Reunion circle · 14 members',
    img: 'landing-classmates',
    avatar: 'landing-classmates',
    caption: 'Ten years out—the hallway still looks familiar.',
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

/** Shared strip height for yellow + white cards in the landing carousel (px). */
export const CIRCLE_CAROUSEL_STRIP_HEIGHT_PX = 500;

/**
 * Gap (px) between the intro panel’s right edge and the left edge of the last visible feed card at
 * max scroll — matches the flex `gap` on the track (MUI spacing(3) ≈ 24px) so the end state matches
 * reference layouts (green | gap | white card).
 */
export const CIRCLE_CAROUSEL_INTRO_TO_CARD_GAP_PX = 24;

/**
 * Fixed px per arrow click. “Collect under yellow”: each click advances the strip by this amount so the
 * previous card ends up fully under the yellow panel (wider than a white card) — you don’t see it keep
 * sliding; only the visible row updates. Match ~`card width + gap` in `LandingCirclesCarousel.styles.ts`
 * (e.g. 312 + 16) for tight alignment; 320 is a round default.
 * - `null`: snap to each card’s measured offset instead.
 */
export const CIRCLE_CAROUSEL_ARROW_SCROLL_STEP_PX: number | null = 320;

export const CIRCLE_FEED_STACK_PEEK = 52;
export const CIRCLE_FEED_CARD_WIDTH = 360;
export const CIRCLE_FEED_STACK_OVERLAP = CIRCLE_FEED_CARD_WIDTH - CIRCLE_FEED_STACK_PEEK;
export const CIRCLE_FIRST_FEED_MARGIN_LEFT = CIRCLE_FEED_STACK_PEEK;
