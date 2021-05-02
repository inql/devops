import React, {useState, useEffect} from "react";
import axios from 'axios';


const UpdateAlbum = (props) => {

    const [albumID, setAlbumID] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // TODO: Add call to get album of specified id to populate the initial data
    // Both parameters have to be passed (name and artist)
    const handleSubmit = (event) =>{
        console.log(`Dane do wyslania ${title} ${body}`);
        axios.put(`http://localhost:5000/albums/${albumID}`,{
            name: title,
            artist: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Aktualizowanie danych albumów</h1>
            <label for="updatealbumid">ID:</label>
            <input id="updatealbumid" type='text' value={albumID} onStar onChange={event => setAlbumID(event.target.value)}/><br/>
            <label for="updatealbumname">Tytuł:</label>
            <input id="updatealbumname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="updatealbumartist">Artysta:</label>
            <input id="updatealbumartist" type='text' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default UpdateAlbum;