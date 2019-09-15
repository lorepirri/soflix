import React from 'react';

import PropTypes from 'prop-types';

// get fontawesome imports
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// imports for files to bundle
import './star-button.scss';

export function StarButton(props) {
  const { movieId, isFavorite, onToggleFavourite, ...rest } = props;
  if (!movieId) {
    return null;
  }

  let icon = isFavorite ? faStarSolid : faStar;
  return (
    movieId &&
      <a href="#"
        onClick={(e) => { e.preventDefault(); onToggleFavourite(movieId);} }
      >
        <FontAwesomeIcon 
          icon={icon}
          {...rest} className="text-warning" />
      </a>
  );
}

StarButton.propTypes = {
  movieId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavourite: PropTypes.func.isRequired
};