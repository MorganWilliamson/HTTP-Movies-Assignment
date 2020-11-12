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
                setItem(res.data)
            })
            .catch((err) => console.log("GET request error: ", err));
    })

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
                props.setItem(res.data)
                push(`/`)
            })
            .catch((err) => console.log("PUT request error: ", err));
    };

    // JSX form.
    return(<h1>Hi</h1>)
}

export default UpdateMovie;