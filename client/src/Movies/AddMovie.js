import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Set initial state.
const initialState = {
    title: "", 
    director: "", 
    metascore: "", 
    stars: []
};

// AddMovie function.
const AddMovie = (props) => {
    // Set slice of state.
    const [item, setItem] = useState(initialState);
    const { id } = useParams();

    const handleChanges = (e) => {
        setItem({
            ...item, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addMovie(item);
    };

    // GET request.
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setItem({...res.data})
            })
            .catch((err) => console.log("AddMovie GET error: ", err));
    }, []);

    // JSX return.
    return (
        <div>
            <h2>Add Movie</h2>
            <form onClick={handleSubmit} >
                <input 
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="Title"
                    value={item.title}
                />
                <div className="baseline" />

                <input 
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="Director"
                    value={item.director}
                />
                <div className="baseline" />

                <input 
                    type="text"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="Metacritic Rating"
                    value={item.metascore}
                />
                <div className="baseline" />

                <input 
                    type="text"
                    name="stars"
                    onChange={handleChanges}
                    placeholder="Starring Actors"
                    value={item.stars}
                />
                <div className="baseline" />

                <button>Add a New Movie</button>

            </form>
        </div>
    )
}

export default AddMovie;