import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./components/Movies/SavedList";
import MovieList from "./components/Movies/MovieList";
import Movie from "./components/Movies/Movie";
import EditForm from "./components/EditForm";
import axios from 'axios';

const App = (props) => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

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
  }, [movieList]);

  useEffect(() => {
    getMovieList();
  }, [savedList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      <Route 
        path="/update-movie/:id"
        render={props => {
          return <EditForm {...props} addToSavedList={addToSavedList}/>
        }}
        />
    </>
  );
};

export default App;
