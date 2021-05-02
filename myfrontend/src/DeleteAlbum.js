import React, {useState, useEffect} from "react";
import axios from 'axios';


const DeleteAlbum = (props) => {

    const [albumID, setAlbumID] = useState("");

    const handleSubmit = (event) =>{
        axios.delete(`http://localhost:5000/albums/${albumID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
        document.getElementById("deletealbumid").value = '';
    };

    return (
        <>
            <h1>Usuń album</h1>
            <label for="deletealbumid">ID:</label>
            <input id="deletealbumid" type='text' value={albumID} onStar onChange={event => setAlbumID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default DeleteAlbum;