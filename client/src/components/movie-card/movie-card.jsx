import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    return (
      <div 
        className="movie-card"
        onClick={() => onClick(movie)}
      >
        {movie.Title}
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};