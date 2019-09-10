import React from 'react';
import PropTypes from 'prop-types';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';

// get bootstrap imports
import Media from 'react-bootstrap/Media';
// import Button from 'react-bootstrap/Button';

// imports for files to bundle
import './genre-view.scss';


export const GenreView = (props) => {
  const { genre, movies } = props;
  if (!genre) return null;
  return (
    <div className="genre-view">
      <h1>{genre.Name}</h1>
      <br />
      <Media className="d-flex flex-column flex-md-row align-items-center">
        <Media.Body>
          <h5>Description</h5>
          <p>{genre.Description}</p>
        </Media.Body>
      </Media>
      <br />
      <MoviesGrid movies={movies} title="Some movies that belong to this Genre" />
    </div>
  );
}

GenreView.propTypes = {
  genre: PropTypes.exact({
    _id: PropTypes.string,
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired,  
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  )
};