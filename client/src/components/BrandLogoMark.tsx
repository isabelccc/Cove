import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import brandLogoSrc from '../images/transparent-logo.png';

const useStyles = makeStyles((theme) => ({
  mark: {
    display: 'block',
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
    WebkitMaskImage: `url(${brandLogoSrc})`,
    maskImage: `url(${brandLogoSrc})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  },
}));

export type BrandLogoMarkProps = {
  className?: string;
  'aria-label'?: string;
};

/**
 * Renders the transparent PNG logo in `theme.palette.primary.main` (homepage lime) via CSS mask.
 */
const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className,
  'aria-label': ariaLabel,
}) => {
  const classes = useStyles();
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={[classes.mark, className].filter(Boolean).join(' ')}
    />
  );
};

BrandLogoMark.defaultProps = {
  className: '',
  'aria-label': 'Cove',
};

export default BrandLogoMark;
