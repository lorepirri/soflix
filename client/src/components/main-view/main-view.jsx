import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// get bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

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
  
  const { movies, user, userProfile, onToggleFavourite, visibilityFilter } = props;

  // filter movies according to a specified filter
  let filteredMovies = movies;
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  return (
      movies.length === 0
      ? <NoMovies />
      : (
        <div className="main-view">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          <MoviesGrid 
            movies={filteredMovies}
            onToggleFavourite={movieId => onToggleFavourite(movieId)}
            user={user}
            userProfile={userProfile}
          />
        </div>
        )
  );
}

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MainView);

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
