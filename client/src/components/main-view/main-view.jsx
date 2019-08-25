import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    // super class constructor
    super();

    // init an empty state
    this.state = { movies: null };
  }

  componentDidMount() {
    let url_root = 'http://localhost:3000'
    // let url_root = 'https://soflix.herokuapp.com'
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

  render() {

    const { movies } = this.state;

    // if movies is not yet loaded
    if (!movies) return (<div className="main-view" />);

    return (
      <div className="main-view">
        { movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}