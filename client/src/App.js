import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovieList(movieList.filter(movie => {
          return movie.id !== res.data
        }))
        history.push("/")
      })
  }

  const addMovie = (data) => {
    const newMovie = {...data};
      axios
        .post(`http://localhost:5000/api/movies`, newMovie)
        .then((res) => {
          const newList = [...movieList]
          newList.push(newMovie)
          setMovieList(newList);
          history.push("/")
        })
        .catch((err) => console.log("POST request error: ", err));
  }

  return (
    <>
      <SavedList list={savedList} />

      <Route >
        <AddMovie addMovie={addMovie} />
      </Route>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
      </Route>

      <Route path="/update-movie/:id"
             render={(props) => <UpdateMovie {...props} />} >  
      </Route>
    </>
  );
};

export default App;
