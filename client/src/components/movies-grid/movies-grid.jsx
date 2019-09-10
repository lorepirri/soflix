import React from 'react';
import PropTypes from 'prop-types';

// import app components
import { MovieCard } from '../movie-card/movie-card';


export function MoviesGrid(props) {
  
  const { movies, title } = props;

  return (
    movies &&
    (<React.Fragment>
      {title && (<React.Fragment><h5>{title}</h5><br /></React.Fragment>)}
      <div className="movies-grid card-deck">
          {movies.map(movie => (
          <MovieCard 
            key={movie._id}
            movie={movie}
          />
          ))}
        </div>
      </React.Fragment>
    )
  );
}

MoviesGrid.propTypes = {

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
