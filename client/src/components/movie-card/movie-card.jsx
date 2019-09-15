import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// import app components
import { StarButton } from '../star-button/star-button';

const MAX_CHARS_IN_A_DESCRIPTION = 100;

export class MovieCard extends React.Component {
  render() {
    const { movie, user, isFavorite, onToggleFavourite } = this.props;
    let movieDescription = movie.Description;
    if (movieDescription.length > MAX_CHARS_IN_A_DESCRIPTION) {
      movieDescription = `${movieDescription.substring(0, MAX_CHARS_IN_A_DESCRIPTION)}...`;
    }
    return (
      <Card className="mb-3 mb-sm-4" style={{ minWidth: '12rem' }}>
        <Card.Img variant="top" src={movie.ImageUrl} />
        <Card.Body>
          <Card.Title>
            {movie.Title}
            {user &&
              <StarButton
                movieId={movie._id}
                isFavorite={isFavorite}
                onToggleFavourite={movieId => onToggleFavourite(movieId)}
                className="ml-2 ml-sm-4" />
            }            
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.Genre.Name}</Card.Subtitle>
          <Card.Text>{movieDescription}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="outline-primary" variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImageUrl: PropTypes.string,
    Genre: PropTypes.exact({
      _id: PropTypes.string,
      Name: PropTypes.string,
      Description: PropTypes.string
    })
  }).isRequired,
  onToggleFavourite: PropTypes.func.isRequired
};