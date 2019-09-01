import React from 'react';
import PropTypes from 'prop-types';

import Media from 'react-bootstrap/Media';

// imports for files to bundle
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <h1>{movie.Title}</h1>
        <Media className="d-flex flex-column flex-md-row align-items-center">
          <Media.Body>

            <h6>Genre: {movie.Genre.Name}</h6>
            <h6>Director: {movie.Director.Name}</h6>
            <br />
            <h6>Description</h6>
            <p>
              {movie.Description}
            </p>
          </Media.Body>
          <img
            width={220}
            height={326}
            className="ml-3"
            src={movie.ImageUrl}
            alt="Generic placeholder"
          />
        </Media>      
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImageUrl: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.exact({
      _id: PropTypes.string,
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })    
  }).isRequired
};