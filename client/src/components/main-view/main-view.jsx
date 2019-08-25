import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // super class constructor
    super();

    // init an empty state
    this.state = { 
      movies: null,
      selectedMovie: null
     };
  }

  componentDidMount() {
    // let url_root = 'http://localhost:3000'
    let url_root = 'https://soflix.herokuapp.com'
    axios.get(`${url_root}/movies`)
      .then( response => {
        // set state with result
        this.setState({
          movies: response.data
        });
      })
      .catch( err => {
        console.log(err);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    })
  }

  render() {

    const { movies, selectedMovie } = this.state;

    // if movies is not yet loaded
    if (!movies) return (<div className="main-view" />);

    return (
      <div className="main-view">
        { selectedMovie
          ? <MovieView 
              movie={selectedMovie}
              onClick={() => this.onMovieClick(null)}
            />
          : movies.map(movie => (
            <MovieCard 
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        }
        
      </div>
    );
  }
}