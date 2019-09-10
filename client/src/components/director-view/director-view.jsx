import React from 'react';
import PropTypes from 'prop-types';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';

// get bootstrap imports
import Media from 'react-bootstrap/Media';
// import Button from 'react-bootstrap/Button';

// imports for files to bundle
import './director-view.scss';


export const DirectorView = (props) => {
  const { director, movies } = props;
  if (!director) return null;
  return (
    <div className="director-view">
      <h1>{director.Name}</h1>
      { // render the birth year (4 chars) if present
        director.Birthyear && <h6 className="text-muted">Born in {director.Birthyear.substring(0,4)}</h6>}
      <br />
      <Media className="d-flex flex-column flex-md-row align-items-center">
        <Media.Body>
          <h5>Bio</h5>
          <p>{director.Bio}</p>
        </Media.Body>
      </Media>
      <br />
      <MoviesGrid movies={movies} title="Some movies from this Director" />
    </div>
  );
}

DirectorView.propTypes = {
  director: PropTypes.exact({
    _id: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string,
    Deathyear: PropTypes.string
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