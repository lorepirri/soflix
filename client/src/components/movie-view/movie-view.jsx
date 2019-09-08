import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

// get bootstrap imports
import Media from 'react-bootstrap/Media';
// import Button from 'react-bootstrap/Button';

// imports for files to bundle
import './movie-view.scss';

export const MovieView = (props) => {
  const { movie } = props;
  if (!movie) return null;
  return (
    <div className="movie-view">
      <h1>{movie.Title}</h1>
      <Media className="d-flex flex-column flex-md-row align-items-center">
        <Media.Body>

          <h6>Genre:&nbsp;
            <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
          </h6>
          <h6>Director:&nbsp;
            <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
          </h6>




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