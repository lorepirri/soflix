import React from 'react';

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