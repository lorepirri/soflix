import React from 'react';
import PropTypes from 'prop-types';

// get bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';


function NoMovies(props) {
  return (
    <div className="spinner-view">
      <Row className="justify-content-center">
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </div>
  );
};

export function MainView(props) {
  
  const { movies, user, userProfile, onToggleFavourite } = props;
  return (
      !movies
      ? <NoMovies />
      : (<MoviesGrid 
            movies={movies}
            onToggleFavourite={movieId => onToggleFavourite(movieId)}
            user={user}
            userProfile={userProfile}
        />)
  );
}

MainView.propTypes = {

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
  ),
  onToggleFavourite: PropTypes.func.isRequired
};
