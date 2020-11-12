import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

// Set initial state.
const initialState = {
    title: "", 
    director: "",
    metascore: "",
    stars: "",
};

const UpdateMovie = (props) => {
    // Set up slice of state.
    const [item, setItem] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();

    // GET movie on page load.
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(res.data)
                setItem(res.data)
            })
            .catch((err) => console.log("GET request error: ", err));
    }, [id])

    // Change handler.
    const handleChanges = (e) => {
        setItem({
            ...item, 
            [e.target.name]: e.target.value,
          });
        
    };

    // Submission handler.
    const handleSubmit = (e) => {
        e.preventDefault();
        axios 
            .put(`http://localhost:5000/api/movies/${id}`, item) 
            .then((res) => {
                setItem(res.data)
                push(`/movies/${id}`)
                console.log(res.data)
            })
            .catch((err) => console.log("PUT request error: ", err));
    };

    // JSX form.
    return(
    <div>
        <h2>Update a Movie</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                onChange={handleChanges}
                placeholder="Movie Title"
                value={item.title}
            />
            <div className="baseline" />

            <input 
                type="text"
                name="director"
                onChange={handleChanges}
                placeholder="Movie Director"
                value={item.director}
            />
            <div className="baseline" />

            <input 
                type="number"
                name="metascore"
                onChange={handleChanges}
                placeholder="Metacritic Rating"
                value={item.metascore}
            />
            <div className="baseline" />

            <button>Click Here to Update!</button>

        </form>

    </div>)
}

export default UpdateMovie;