import React from 'react';
import { Redirect } from 'react-router-dom';

/** Global tag/creator discovery is disabled for private circles. */
const CreatorOrTag: React.FC = () => <Redirect to="/circles" />;

export default CreatorOrTag;
